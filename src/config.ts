// ─── Site Configuration ───
// Edit this file to update your personal info, social links, and project cards.

export const siteConfig = {
  /** Your display name (used in hero & footer) */
  name: 'Facundo Presa',

  /** Hero tagline shown below your name */
  tagline: 'Entrepreneur | Design | Programming',

  /** Contact email shown in the footer */
  email: 'hola@faku.pro',

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
// CSS style variant is applied:
//   • 'itica'    → dark teal card, spans 7 columns
//   • 'talentum' → peach card, spans 5 columns
//   • 'adastra'  → teal wide card, spans full width

export const projects = [
  {
    title: 'Itica',
    url: 'https://itica.lat',
    description:
      'Technology-driven business solutions. Building digital infrastructure for modern enterprises.',
    modifier: 'itica',
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
] as const
