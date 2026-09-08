// ─── Site Configuration ───
// Edit this file to update your personal info, social links, and project cards.

export const siteConfig = {
  /** Your display name (used in hero & footer) */
  name: 'Facundo Presa',

  /** Hero tagline shown below your name */
  tagline: 'Entrepreneur | Design | Programming',

  /** Contact email shown in the footer */
  email: 'hola@facupresa.com',

  /** Footer call-to-action subtitle */
  footerSubtext: 'Open for collaborations & new ventures.',
}

// ─── Social Media Links ───
// Set a URL to show the icon, or remove/comment out an entry to hide it.

export const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/fakuuy' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/fakup' },
  { label: 'X', url: 'https://x.com/faku_sys' },
  { label: 'Instagram', url: 'https://instagram.com/faku.sys' },
] as const

// ─── Project Cards ───
// Each card appears in the Bauhaus-style grid. The `modifier` controls which
// CSS style variant is applied (see App.css for grid position & tone).

export const projects = [
  {
    title: 'WeFaber',
    url: 'https://wefaber.net',
    description:
      'Software & applied AI studio from Uruguay. We fabricate real products — fast, beautiful and useful.',
    modifier: 'wefaber',
  },
  {
    title: 'Eternum',
    url: 'https://eternum.lat',
    description:
      'High School Team. A community of passionate students exploring the world of technology and innovation.',
    modifier: 'eternum',
  },
  {
    title: 'Talentum',
    url: 'https://talentum.live',
    description:
      'A talent agency connecting creative professionals with opportunities that matter.',
    modifier: 'talentum',
  },
  {
    title: 'Ad Astra',
    url: 'https://adastrarp.com',
    description:
      'A FiveM roleplay server — immersive world, storytelling made by humans.',
    modifier: 'adastra',
  },
  {
    title: 'Lux',
    url: 'https://lux.eternum.lat',
    description:
      'SGRSI — IT resource & service management system for UTU. Equipment, tickets, loans and service requests across four roles. Live demo on mock data.',
    modifier: 'lux',
  },
  {
    title: 'Libraria',
    url: 'https://libraria.wefaber.net',
    description:
      'A visual component builder with a generic design-token theme engine. Proof of concept.',
    modifier: 'libraria',
  },
  {
    title: 'JobIt',
    url: 'https://jobs.wefaber.net',
    description:
      "Uruguay's job board — every field, every level, filtered by no-experience roles. Bun + Elysia + React 19.",
    modifier: 'jobit',
  },
  {
    title: 'LearnIt',
    url: 'https://github.com/faku-org/learnit',
    description:
      'Language learning app — lessons that stick. Built with Astro, React 19 and Elysia.',
    modifier: 'learnit',
  },
  {
    title: 'SearchIt',
    url: 'https://github.com/faku-org/searchit',
    description:
      "Desktop app (Tauri) that turns a photographer's raw photo dump into a searchable archive — faces, GPS, OCR and CLIP.",
    modifier: 'searchit',
  },
  {
    title: 'MindVault',
    url: 'https://github.com/faku-org/mindvault',
    description:
      'Knowledge externalization with dynamic graphs — typed memories, append-only versioning, co-evolving with AI agents.',
    modifier: 'mindvault',
  },
  {
    title: 'Cipher',
    url: 'https://github.com/faku-org/cipher',
    description:
      'End-to-end encrypted messaging and file sharing. Zero data. Proof of concept.',
    modifier: 'cipher',
  },
  {
    title: 'OhMy',
    url: 'https://ohmy.lat',
    description:
      'The OhMy suite — small, focused browser-only tools. Documents, mail, grids, forms, charts, diagrams and gantt.',
    modifier: 'ohmy',
  },
  {
    title: 'OhMyDocs',
    url: 'https://docs.ohmy.lat',
    description:
      'Documents that look designed, not typed. Local-first block editor with branding.',
    modifier: 'ohmydocs',
  },
  {
    title: 'OhMyMail',
    url: 'https://mail.ohmy.lat',
    description:
      'Professional email templates — write in Markdown, preview live, brand every detail.',
    modifier: 'ohmymail',
  },
  {
    title: 'OhMyGrid',
    url: 'https://grid.ohmy.lat',
    description:
      'Visual bento grid designer — export layouts as React TSX or standalone HTML.',
    modifier: 'ohmygrid',
  },
  {
    title: 'OhMyForms',
    url: 'https://forms.ohmy.lat',
    description:
      'Browser-only form builder — build, share, collect responses. No backend, no account.',
    modifier: 'ohmyforms',
  },
  {
    title: 'OhMyCharts',
    url: 'https://charts.ohmy.lat',
    description:
      'Scrum burndown calculator — plan, track and forecast sprint progress in the browser.',
    modifier: 'ohmycharts',
  },
  {
    title: 'OhMyDiagrams',
    url: 'https://diagrams.ohmy.lat',
    description:
      'Visual UML 2.5 use-case editor with live validation as you draw.',
    modifier: 'ohmydiagrams',
  },
  {
    title: 'OhMyGantt',
    url: 'https://gantt.ohmy.lat',
    description:
      'Project planning on a Gantt chart — GitHub Projects, Trello or manual tasks.',
    modifier: 'ohmygantt',
  },
] as const
