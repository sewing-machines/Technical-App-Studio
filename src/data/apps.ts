export type AppCategory = 'Business' | 'Productivity' | 'Tools' | 'Board';

export type AppIconKey =
  | 'machine-record'
  | 'documents-reader'
  | 'calculator'
  | 'plt-viewer'
  | 'construction-cost'
  | 'dots-boxes';

export interface StudioApp {
  id: string;
  title: string;
  category: AppCategory;
  description: string;
  iconKey: AppIconKey;
  /**
   * GOOGLE PLAY URL PLACEHOLDER:
   * Replace "#" with your live Google Play Store URL, e.g.:
   * "https://play.google.com/store/apps/details?id=com.technicalappstudio.yourapp"
   */
  playStoreUrl: string;
  highlights: string[];
  platformNote: string;
  accentClass: string;
}

export const CATEGORIES: readonly ('All' | AppCategory)[] = [
  'All',
  'Business',
  'Productivity',
  'Tools',
  'Board',
];

export const STUDIO_APPS: StudioApp[] = [
  {
    id: 'machine-record-tracker',
    title: 'Machine Record Tracker',
    category: 'Business',
    description:
      'Easily manage, track, and maintain service records and operations for industrial and stitching machines.',
    iconKey: 'machine-record',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.aistudio.machinerecordtracker.rkpz',
    highlights: [
      'Log daily machine maintenance, part replacements, and technician notes',
      'Track stitching unit operational status across workshop floors',
      'Instant service history lookup organized by machine serial or bay',
    ],
    platformNote: 'Android · Offline-Ready Workshop Ledger',
    accentClass: 'from-amber-500/15 to-slate-500/10',
  },
  {
    id: 'all-documents-reader',
    title: 'All Documents Reader',
    category: 'Productivity',
    description:
      'A fast, all-in-one file viewer to open and read PDF, Word, Excel, and text documents seamlessly on your phone.',
    iconKey: 'documents-reader',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.aistudio.omnireader.mfxkpl',
    highlights: [
      'Unified viewer for PDF, DOCX, XLSX, PPT, and plain TXT files',
      'Smart folder indexing with instant filename search',
      'Clean full-screen reading mode with smooth pinch-to-zoom',
    ],
    platformNote: 'Android · Multi-Format Document Suite',
    accentClass: 'from-blue-500/15 to-indigo-500/10',
  },
  {
    id: 'all-in-one-calculator',
    title: 'All-in-One Calculator',
    category: 'Tools',
    description:
      'Perform everyday math, scientific calculations, unit conversions, and financial estimates in one smart tool.',
    iconKey: 'calculator',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.sajid.allinonecalculator.offcal',
    highlights: [
      'Standard, scientific, and engineering calculation modes',
      'Built-in converter for length, mass, area, currency, and temperature',
      'Loan, EMI, discount, and percentage financial calculators',
    ],
    platformNote: 'Android · Everyday & Scientific Utility',
    accentClass: 'from-emerald-500/15 to-teal-500/10',
  },
  {
    id: 'plt-file-viewer',
    title: 'PLT File Viewer',
    category: 'Productivity',
    description:
      'View, zoom, and inspect HPGL (.plt) plotter and CAD vector design files directly on your Android device.',
    iconKey: 'plt-viewer',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.aistudio.pltviewer.xywzqp',
    highlights: [
      'Accurate HPGL (.plt) vector line and pen-color rendering',
      'High-precision pan and zoom for inspecting garment & CAD patterns',
      'Open plotter files directly from device storage or messaging apps',
    ],
    platformNote: 'Android · CAD & HPGL Plotter Inspector',
    accentClass: 'from-cyan-500/15 to-blue-500/10',
  },
  {
    id: 'construction-cost-calculator',
    title: 'Construction Cost Calculator',
    category: 'Tools',
    description:
      'Estimate building materials, cement, bricks, and total house construction expenses accurately before you build.',
    iconKey: 'construction-cost',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.aistudio.constcalc.mepvsy',
    highlights: [
      'Calculate cement bags, sand, aggregate, steel, and brick quantities',
      'Break down grey structure vs. finishing budgets by square footage',
      'Save and compare project material estimates on-site',
    ],
    platformNote: 'Android · Civil & Home Cost Estimator',
    accentClass: 'from-sky-500/15 to-amber-500/10',
  },
  {
    id: 'dots-and-boxes-premium',
    title: 'Dots & Boxes Premium Edition',
    category: 'Board',
    description:
      'Enjoy the classic pen-and-paper strategy board game with sleek neon visuals, smart AI, and multiplayer modes.',
    iconKey: 'dots-boxes',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.sajid.dots.and.boxes',
    highlights: [
      'Crisp neon grid aesthetics with smooth haptic-friendly line placement',
      'Adaptive single-player AI with multiple strategic difficulty levels',
      'Pass-and-play local multiplayer on multiple board sizes',
    ],
    platformNote: 'Android · Classic Strategy Board Game',
    accentClass: 'from-violet-500/15 to-cyan-500/10',
  },
];
