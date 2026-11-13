import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Layers,
  Moon,
  Search,
  ShieldCheck,
  Smartphone,
  Sun,
  X,
  Zap,
} from 'lucide-react';
import {
  AppThemeIcon,
  GooglePlayIcon,
  StudioLogoIcon,
  WhatsAppIcon,
} from './components/AppIcons';
import {
  CATEGORIES,
  STUDIO_APPS,
  type AppCategory,
  type StudioApp,
} from './data/apps';

type FilterCategory = 'All' | AppCategory;

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [selectedApp, setSelectedApp] = useState<StudioApp | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync .dark class and persist user preference
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      try {
        localStorage.setItem('tas-theme', 'dark');
      } catch {
        // Ignore storage restrictions
      }
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('tas-theme', 'light');
      } catch {
        // Ignore storage restrictions
      }
    }
  }, [isDark]);

  // Keyboard shortcut "/" focuses search; "Escape" closes modals
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setSelectedApp(null);
        setContactModalOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-dismiss toast notice
  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return STUDIO_APPS.filter((app) => {
      const matchesCategory =
        activeCategory === 'All' || app.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        app.title.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.highlights.some((item) => item.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      All: STUDIO_APPS.length,
      Business: 0,
      Productivity: 0,
      Tools: 0,
      Board: 0,
    };
    for (const app of STUDIO_APPS) {
      counts[app.category] += 1;
    }
    return counts;
  }, []);

  function handlePlayStoreClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    app: StudioApp
  ) {
    if (app.playStoreUrl === '#') {
      e.preventDefault();
      setToastMessage(
        `${app.title}: Play Store link placeholder. Replace href="#" in apps data when publishing.`
      );
    }
  }

  function handleResetFilters() {
    setSearchQuery('');
    setActiveCategory('All');
    searchInputRef.current?.focus();
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070B12] dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">
      {/* Subtle Ambient Background Mesh for Glassmorphism Refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[480px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/12 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-sky-500/8 dark:bg-blue-600/10 blur-[130px]" />
      </div>

      {/* Top Bar: Clean 3-Zone Header Contract */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#070B12]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Title + Clean Logo Icon */}
          <a
            href="#top"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
          >
            <StudioLogoIcon className="w-8 h-8 shrink-0" />
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Technical App Studio
            </span>
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="#apps"
              className="hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Apps
            </a>
            <a
              href="#capabilities"
              className="hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Standards
            </a>
            <a
              href="#contact"
              className="hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Theme Switcher + Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold hover:bg-slate-800 dark:hover:bg-emerald-400 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>Contact / WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10 flex-1">
        {/* Hero Showcase Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 sm:pt-14 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Studio Proposition */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 tracking-wide mb-3">
                Official Android App Showcase · Google Play Publisher
              </p>

              <h1
                className="font-display font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-5"
                style={{
                  fontSize: 'clamp(2.15rem, 4vw, 3.35rem)',
                  textWrap: 'balance',
                }}
              >
                Smart Tools, Productivity &amp; Games for Everyone
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-7 dark:tracking-[0.01em]">
                Technical App Studio builds fast, focused Android applications for workshop
                operations, multi-format document reading, CAD plotting, construction planning,
                and classic strategy play.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a
                  href="#apps"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span>Browse All 6 Apps</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Contact / WhatsApp</span>
                </button>
              </div>

              {/* Quiet Unboxed Studio Metadata Strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 tabular-nums">
                <span>6 Published Android Apps</span>
                <span aria-hidden="true">·</span>
                <span>4 Specialized Categories</span>
                <span aria-hidden="true">·</span>
                <span>Direct Google Play Distribution</span>
              </div>
            </div>

            {/* Right Column: Interactive Storefront Preview Matrix */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/55 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200/70 dark:border-slate-800/80">
                  <div>
                    <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                      Studio Release Suite
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Select any app to inspect highlights
                    </p>
                  </div>
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 tabular-nums">
                    6 / 6 Live
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 my-5">
                  {STUDIO_APPS.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setSelectedApp(app)}
                      className="group flex flex-col items-center text-center p-2.5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700/80 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                    >
                      <AppThemeIcon
                        iconKey={app.iconKey}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-150"
                      />
                      <span className="mt-2 text-[11px] font-medium text-slate-700 dark:text-slate-300 line-clamp-1 w-full">
                        {app.title}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Compatible with Android Smartphones &amp; Tablets</span>
                  <Smartphone className="w-4 h-4 shrink-0 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Storefront Toolbar: Live Search + Category Filter Buttons */}
        <section
          id="apps"
          aria-label="Published Android Apps"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-slate-900/60 backdrop-blur-xl p-4 sm:p-5 mb-8 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Live Search Input */}
              <div className="relative flex-1 max-w-xl">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search apps by name, file type, or feature..."
                  aria-label="Search Android apps"
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-950/60 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter Buttons */}
              <div
                role="tablist"
                aria-label="Filter apps by category"
                className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-950/70 border border-slate-200/70 dark:border-slate-800/80"
              >
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/70'
                      }`}
                    >
                      {category}{' '}
                      <span
                        className={`ml-1 tabular-nums text-[11px] ${
                          isActive
                            ? 'text-slate-300 dark:text-slate-900/80'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {categoryCounts[category]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quiet Unboxed Result Summary */}
            <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              <span>
                Showing {filteredApps.length} of {STUDIO_APPS.length} apps
                {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ''}
              </span>
              {(searchQuery || activeCategory !== 'All') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* App Showcase Grid */}
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <article
                  key={app.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/85 dark:border-slate-800/85 bg-white/75 dark:bg-slate-900/60 backdrop-blur-xl p-6 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.06)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/45 dark:hover:border-emerald-400/45"
                >
                  {/* Subtle top-corner ambient tint matching app theme */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-28 rounded-t-2xl bg-gradient-to-br ${app.accentClass} opacity-60 dark:opacity-45`}
                  />

                  <div className="relative">
                    {/* Top Row: Custom SVG App Icon + Category Badge */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        aria-label={`Inspect ${app.title}`}
                        className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                      >
                        <AppThemeIcon
                          iconKey={app.iconKey}
                          className="w-16 h-16 rounded-2xl shadow-md group-hover:scale-[1.03] transition-transform duration-200"
                        />
                      </button>

                      <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-slate-200/90 dark:border-slate-700/90 bg-white/80 dark:bg-slate-950/60 text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0">
                        {app.category}
                      </span>
                    </div>

                    {/* App Title */}
                    <h3 className="font-display text-xl font-bold tracking-tight text-slate-950 dark:text-white mb-2">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="text-left hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                      >
                        {app.title}
                      </button>
                    </h3>

                    {/* Compelling 2-Line Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-5 dark:tracking-[0.01em]">
                      {app.description}
                    </p>
                  </div>

                  {/* Card Footer: Quiet Details Link + Prominent Google Play Button */}
                  <div className="relative pt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="truncate">{app.platformNote}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap shrink-0 ml-2 cursor-pointer"
                      >
                        App Details
                      </button>
                    </div>

                    {/* GOOGLE PLAY BUTTON: Replace "#" in src/data/apps.ts with your live Play Store URL */}
                    <a
                      href={app.playStoreUrl}
                      target={app.playStoreUrl === '#' ? undefined : '_blank'}
                      rel={app.playStoreUrl === '#' ? undefined : 'noopener noreferrer'}
                      onClick={(e) => handlePlayStoreClick(e, app)}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <GooglePlayIcon className="w-4 h-4 shrink-0" />
                      <span>Get it on Google Play</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-slate-900/60 backdrop-blur-xl p-10 text-center">
              <p className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No matching apps found
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
                Try adjusting your search keywords or switching back to all categories.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-sm font-semibold transition-colors cursor-pointer"
              >
                Show All 6 Apps
              </button>
            </div>
          )}
        </section>

        {/* Studio Engineering Standards */}
        <section
          id="capabilities"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-12">
            <div className="max-w-2xl mb-8">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 tracking-wide mb-2">
                Studio Craftsmanship
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Built for everyday clarity and field reliability
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/65 dark:bg-slate-900/50 backdrop-blur-xl p-6">
                <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-3" />
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                  01. Fast, Lightweight Builds
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Optimized Android binaries that launch immediately and run smoothly across
                  modern and budget devices alike.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/65 dark:bg-slate-900/50 backdrop-blur-xl p-6">
                <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-3" />
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                  02. Offline-Ready Workflows
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Core calculators, document readers, PLT viewers, and machine records work
                  reliably on job sites and factory floors without constant connectivity.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/65 dark:bg-slate-900/50 backdrop-blur-xl p-6">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-3" />
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                  03. Focused Privacy &amp; UX
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clean Material-inspired layouts with zero unnecessary clutter, keeping your
                  files, calculations, and records right at hand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / WhatsApp Banner */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="rounded-2xl border border-slate-200/85 dark:border-slate-800/85 bg-white/75 dark:bg-slate-900/65 backdrop-blur-xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-2">
                Support &amp; Custom Android Inquiries
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white mb-2">
                Need help with an app or custom business tool?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Reach out to Technical App Studio directly for app support, feature
                suggestions, or tailored Android utility development.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* WHATSAPP URL PLACEHOLDER: Replace "#" with "https://wa.me/YOUR_PHONE_NUMBER" */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setContactModalOpen(true);
                }}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Contact / WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Quiet Footer */}
      <footer className="relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#070B12]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <StudioLogoIcon className="w-6 h-6 shrink-0" />
            <span className="font-display text-sm font-semibold text-slate-900 dark:text-white">
              Technical App Studio
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
            &copy; 2026 Technical App Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#apps" className="hover:text-slate-950 dark:hover:text-white">
              Apps
            </a>
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="hover:text-slate-950 dark:hover:text-white cursor-pointer"
            >
              Contact / WhatsApp
            </button>
          </div>
        </div>
      </footer>

      {/* App Detail Modal */}
      {selectedApp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="app-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedApp(null)}
              aria-label="Close app details"
              className="absolute right-4 top-4 w-9 h-9 inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-5 pr-8">
              <AppThemeIcon
                iconKey={selectedApp.iconKey}
                className="w-16 h-16 rounded-2xl shadow-md shrink-0"
              />
              <div>
                <span className="inline-block text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">
                  {selectedApp.category} · Technical App Studio
                </span>
                <h3
                  id="app-modal-title"
                  className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white"
                >
                  {selectedApp.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {selectedApp.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Key Highlights
              </h4>
              <ul className="space-y-2.5">
                {selectedApp.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Replace "#" in src/data/apps.ts with your live Google Play URL */}
              <a
                href={selectedApp.playStoreUrl}
                target={selectedApp.playStoreUrl === '#' ? undefined : '_blank'}
                rel={selectedApp.playStoreUrl === '#' ? undefined : 'noopener noreferrer'}
                onClick={(e) => handlePlayStoreClick(e, selectedApp)}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-sm font-semibold transition-colors"
              >
                <GooglePlayIcon className="w-4 h-4 shrink-0" />
                <span>Get it on Google Play</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact / WhatsApp Modal */}
      {contactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setContactModalOpen(false)}
              aria-label="Close contact dialog"
              className="absolute right-4 top-4 w-9 h-9 inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <StudioLogoIcon className="w-9 h-9" />
              <div>
                <h3
                  id="contact-modal-title"
                  className="font-display text-lg font-bold text-slate-950 dark:text-white"
                >
                  Contact Technical App Studio
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Support, Feedback &amp; Inquiries
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              Connect directly on WhatsApp for quick app support, business licensing, or
              collaboration requests.
            </p>

            <div className="space-y-3">
              {/* Replace "#" with your WhatsApp link, e.g. https://wa.me/15551234567 */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setToastMessage(
                    'WhatsApp placeholder: Replace href="#" with https://wa.me/YOUR_NUMBER.'
                  );
                }}
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-sm font-semibold transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Non-intrusive Toast Notification for Placeholder Links */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-3 shadow-lg flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
        >
          <span className="flex-1 leading-snug">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
