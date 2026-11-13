import React from 'react';
import type { AppIconKey } from '../data/apps';

export function StudioLogoIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" className="fill-slate-900 dark:fill-emerald-500" />
      <path
        d="M11 13.5C11 12.6716 11.6716 12 12.5 12H27.5C28.3284 12 29 12.6716 29 13.5V16.5C29 17.3284 28.3284 18 27.5 18H22.75V28.5C22.75 29.3284 22.0784 30 21.25 30H18.75C17.9216 30 17.25 29.3284 17.25 28.5V18H12.5C11.6716 18 11 17.3284 11 16.5V13.5Z"
        className="fill-white dark:fill-slate-950"
      />
      <circle cx="28.5" cy="26.5" r="3" className="fill-emerald-400 dark:fill-slate-950" />
    </svg>
  );
}

export function GooglePlayIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3.609 1.814L13.792 12 3.61 22.186a1.75 1.75 0 0 1-.61-1.335V3.149c0-.52.231-.995.609-1.335z"
        fill="#32BBFF"
      />
      <path
        d="M17.213 8.579L13.792 12l3.421 3.421 3.864-2.199c.903-.514.903-1.93 0-2.444l-3.864-2.199z"
        fill="#FFCE00"
      />
      <path
        d="M3.609 22.186L13.792 12l3.421 3.421-12.137 6.906c-.553.314-1.148.248-1.467-.141z"
        fill="#F14336"
      />
      <path
        d="M3.609 1.814c.319-.389.914-.455 1.467-.141L17.213 8.58 13.792 12 3.609 1.814z"
        fill="#00F076"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375a9.92 9.92 0 0 0 4.75 1.219h.004c5.512 0 9.965-4.453 9.965-9.969 0-2.656-1.035-5.156-2.914-7.035A9.888 9.888 0 0 0 12.031 2zm5.805 14.172c-.246.691-1.43 1.324-1.984 1.406-.508.074-1.152.105-1.855-.121-.426-.137-.977-.32-1.676-.621-2.945-1.273-4.867-4.242-5.016-4.438-.145-.195-1.195-1.59-1.195-3.035 0-1.445.754-2.156 1.023-2.449.266-.293.582-.367.777-.367.195 0 .391.004.562.012.18.008.422-.07.66.504.246.59.836 2.043.91 2.191.074.148.125.32.023.516-.098.195-.148.316-.297.488-.148.172-.312.383-.445.516-.148.148-.305.309-.133.605.176.297.777 1.281 1.668 2.074 1.148 1.023 2.113 1.34 2.41 1.488.297.148.469.125.645-.074.172-.199.742-.867.941-1.164.199-.297.398-.246.668-.148.273.098 1.727.816 2.023.965.297.148.496.223.566.344.074.125.074.719-.172 1.41z" />
    </svg>
  );
}

export function AppThemeIcon({
  iconKey,
  className = 'w-16 h-16',
}: {
  iconKey: AppIconKey;
  className?: string;
}) {
  switch (iconKey) {
    case 'machine-record':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="mrt-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#mrt-bg)" />
          {/* Base plate */}
          <rect x="12" y="42" width="40" height="7" rx="2.5" fill="#F59E0B" />
          {/* Vertical pillar & top arm of industrial sewing machine */}
          <path
            d="M42 42V22C42 18.6863 39.3137 16 36 16H19C16.7909 16 15 17.7909 15 20V25C15 26.1046 15.8954 27 17 27H23V24H35V42H42Z"
            fill="#E2E8F0"
          />
          {/* Needle assembly */}
          <rect x="18" y="27" width="3" height="7" rx="1" fill="#94A3B8" />
          <path d="M19.5 34V40.5" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
          {/* Presser foot */}
          <path d="M16 40.5H23" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          {/* Handwheel / Gear accent */}
          <circle cx="45" cy="24" r="5" fill="#334155" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="45" cy="24" r="1.5" fill="#F59E0B" />
          {/* Spool pin */}
          <rect x="27" y="11" width="5" height="5" rx="1" fill="#F59E0B" />
          {/* Ledger indicator lines */}
          <path d="M27 32H32M27 36H32" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'documents-reader':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="adr-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#adr-bg)" />
          {/* Folder back */}
          <path
            d="M12 20C12 17.7909 13.7909 16 16 16H26L29.5 20H48C50.2091 20 52 21.7909 52 24V44C52 46.2091 50.2091 48 48 48H16C13.7909 48 12 46.2091 12 44V20Z"
            fill="#60A5FA"
          />
          {/* Tucked documents: PDF red, Word blue, Excel green */}
          <rect x="17" y="18" width="14" height="18" rx="2" fill="#EF4444" />
          <rect x="25" y="15" width="14" height="20" rx="2" fill="#F8FAFC" />
          <rect x="33" y="18" width="14" height="18" rx="2" fill="#10B981" />
          {/* Lines on center white document */}
          <path d="M28 20H36M28 24H36M28 28H33" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" />
          {/* Folder front flap */}
          <path
            d="M12 26C12 24.8954 12.8954 24 14 24H50C51.1046 24 52 24.8954 52 26V44C52 46.2091 50.2091 48 48 48H16C13.7909 48 12 46.2091 12 44V26Z"
            fill="#3B82F6"
          />
          <path d="M20 35H44M20 40H36" stroke="#DBEAFE" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'calculator':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="calc-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#calc-bg)" />
          {/* Calculator body */}
          <rect x="15" y="10" width="34" height="44" rx="6" fill="#1E293B" stroke="#34D399" strokeWidth="1.5" />
          {/* Glowing LCD display */}
          <rect x="19" y="14" width="26" height="10" rx="2.5" fill="#022C22" stroke="#10B981" strokeWidth="1" />
          <path d="M34 19H41M39 17V21" stroke="#34D399" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="24" cy="19" r="1.4" fill="#34D399" />
          <circle cx="28.5" cy="19" r="1.4" fill="#34D399" />
          {/* Keypad buttons */}
          <rect x="19" y="28" width="6" height="5" rx="1.5" fill="#475569" />
          <rect x="27" y="28" width="6" height="5" rx="1.5" fill="#475569" />
          <rect x="35" y="28" width="10" height="5" rx="1.5" fill="#0EA5E9" />

          <rect x="19" y="36" width="6" height="5" rx="1.5" fill="#475569" />
          <rect x="27" y="36" width="6" height="5" rx="1.5" fill="#475569" />
          <rect x="35" y="36" width="10" height="5" rx="1.5" fill="#0EA5E9" />

          <rect x="19" y="44" width="6" height="5" rx="1.5" fill="#475569" />
          <rect x="27" y="44" width="6" height="5" rx="1.5" fill="#475569" />
          <rect x="35" y="44" width="10" height="5" rx="1.5" fill="#10B981" />
        </svg>
      );

    case 'plt-viewer':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="plt-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0C4A6E" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#plt-bg)" />
          {/* Blueprint Grid */}
          <path
            d="M16 12V52M26.6 12V52M37.3 12V52M48 12V52M12 16H52M12 26.6H52M12 37.3H52M12 48H52"
            stroke="#38BDF8"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          {/* Vector CAD curve */}
          <path
            d="M15 44C19 26 29 22 36 32C41 39 47 34 49 20"
            stroke="#22D3EE"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Control nodes */}
          <rect x="13" y="42" width="4" height="4" rx="1" fill="#F8FAFC" />
          <rect x="34" y="30" width="4" height="4" rx="1" fill="#F8FAFC" />
          {/* Technical CAD Pen Nib */}
          <path
            d="M42 13L51 22L38 35L29 36L30 27L42 13Z"
            fill="#F8FAFC"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M39 16L48 25" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
      );

    case 'construction-cost':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="ccc-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#ccc-bg)" />
          {/* Blueprint Grid */}
          <path
            d="M16 12V52M32 12V52M48 12V52M12 20H52M12 36H52M12 50H52"
            stroke="#93C5FD"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          {/* Tower Crane Mast */}
          <rect x="20" y="16" width="5" height="34" fill="#F59E0B" />
          {/* Crane Jib / Boom */}
          <path d="M12 20H50L46 16H14L12 20Z" fill="#FBBF24" />
          {/* Counterweight */}
          <rect x="11" y="20" width="6" height="4" rx="1" fill="#CBD5E1" />
          {/* Support cable */}
          <path d="M22.5 11L44 16M22.5 11L14 16" stroke="#FDE68A" strokeWidth="1.4" />
          {/* Hook & Load */}
          <path d="M41 20V31" stroke="#E2E8F0" strokeWidth="1.6" />
          <rect x="35" y="31" width="12" height="8" rx="1.5" fill="#38BDF8" />
          {/* Foundation block */}
          <rect x="14" y="48" width="36" height="4" rx="1" fill="#E2E8F0" />
        </svg>
      );

    case 'dots-boxes':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="db-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#18181B" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#db-bg)" />
          {/* Claimed Neon Boxes */}
          <rect x="16" y="16" width="16" height="16" fill="#06B6D4" fillOpacity="0.24" />
          <rect x="32" y="32" width="16" height="16" fill="#F59E0B" fillOpacity="0.24" />
          {/* Active neon segments */}
          <path d="M16 16H32M16 16V32M32 16V32M16 32H32" stroke="#22D3EE" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M32 32H48M32 32V48M48 32V48M32 48H48" stroke="#FBBF24" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M32 16H48" stroke="#3F3F46" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
          <path d="M16 32V48H32" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
          {/* 3x3 Neon Dots */}
          <circle cx="16" cy="16" r="3" fill="#F8FAFC" />
          <circle cx="32" cy="16" r="3" fill="#F8FAFC" />
          <circle cx="48" cy="16" r="3" fill="#71717A" />
          <circle cx="16" cy="32" r="3" fill="#F8FAFC" />
          <circle cx="32" cy="32" r="3" fill="#22D3EE" />
          <circle cx="48" cy="32" r="3" fill="#F8FAFC" />
          <circle cx="16" cy="48" r="3" fill="#10B981" />
          <circle cx="32" cy="48" r="3" fill="#F8FAFC" />
          <circle cx="48" cy="48" r="3" fill="#FBBF24" />
        </svg>
      );
  }
}
