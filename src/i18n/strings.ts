import type { L } from './types'

/** Interface chrome. Page content lives in `src/config.ts`. */
export const ui = {
  heroKicker: { en: 'Portfolio', es: 'Portafolio' },
  heroLocation: { en: 'Uruguay', es: 'Uruguay' },

  backgroundLabel: { en: 'Background', es: 'Recorrido' },
  orgsLabel: { en: 'Where the work lives', es: 'Dónde vive el trabajo' },
  orgsHeading: {
    en: (n: number) => `${n} umbrellas`,
    es: (n: number) => `${n} paraguas`,
  },
  orgsBlurb: {
    en: 'Ideas start in one place and move as they find their sector. These are the homes they move between.',
    es: 'Las ideas arrancan en un lugar y se mueven a medida que encuentran su sector. Estos son los lugares por los que pasan.',
  },
  timelineLabel: { en: 'The Timeline', es: 'La Línea de Tiempo' },

  cardCta: { en: 'Read the story', es: 'Ver la historia' },
  milestoneCount: {
    en: (n: number) => `${n} milestone${n === 1 ? '' : 's'}`,
    es: (n: number) => `${n} hito${n === 1 ? '' : 's'}`,
  },

  modalRole: { en: 'Role', es: 'Rol' },
  modalStack: { en: 'Stack', es: 'Stack' },
  modalTags: { en: 'Tags', es: 'Etiquetas' },
  modalOrg: { en: 'Lives in', es: 'Vive en' },
  modalBackground: { en: 'Background', es: 'Contexto' },
  modalEvolution: { en: 'Evolution', es: 'Evolución' },
  modalVisit: { en: (name: string) => `Visit ${name}`, es: (name: string) => `Ir a ${name}` },
  modalClose: { en: 'Close', es: 'Cerrar' },

  footerHeading: { en: ['Let’s work', 'together'], es: ['Trabajemos', 'juntos'] },

  themeToLight: { en: 'Switch to light mode', es: 'Cambiar a modo claro' },
  themeToDark: { en: 'Switch to dark mode', es: 'Cambiar a modo oscuro' },
  languageToggle: { en: 'Cambiar a español', es: 'Switch to English' },

  socialNav: { en: 'Social media links', es: 'Redes sociales' },
} satisfies Record<string, L<unknown>>

export const statusLabels = {
  live: { en: 'Live', es: 'Activo' },
  building: { en: 'Building', es: 'En curso' },
  archived: { en: 'Archived', es: 'Archivado' },
  concept: { en: 'Concept', es: 'Concepto' },
} as const
