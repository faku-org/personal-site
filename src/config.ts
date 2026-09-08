import type { L } from './i18n/types'

// ─── Site Configuration ───
// Content is authored per locale: `{ en: '…', es: '…' }`.
//
// Dates and stacks below were extracted from the actual repositories (first
// commit dates, READMEs, package.json, GitHub metadata), then corrected against
// Facundo's own account where the two disagreed. See docs/content-sources.md
// for the provenance of every entry.

export const siteConfig = {
  name: 'Facundo Presa',
  tagline: {
    en: 'Entrepreneur | Design | Programming',
    es: 'Emprendedor | Diseño | Programación',
  } satisfies L,
  email: 'hola@facupresa.com',
  footerSubtext: {
    en: 'Open for collaborations & new ventures.',
    es: 'Abierto a colaboraciones y nuevos proyectos.',
  } satisfies L,
}

// ─── Background / Story ───

export const background = {
  heading: {
    en: 'How I got here',
    es: 'Cómo llegué acá',
  } satisfies L,
  paragraphs: {
    en: [
      'I started programming at 14 because the roleplay servers I played on never had what I wanted — loose mechanics, communities with no sense of belonging. Building Ad Astra meant first learning what a variable was, how one works, how a script even runs. On my own, with nothing but the ambition to give people an experience worth their time.',
      'That is still the foundation of everything since: connect with people, and build tools good enough that what they get is genuinely top tier.',
      'I also consider myself resilient — not only in sticking with my ideas, but in my life. I had low points, stretches where I did not trust myself. Almost five years of therapy changed that radically: my self-esteem, and the way I relate to people.',
      'That process is why I work the way I do. Everyone has potential; what people lack are the tools to get out of their own head, which is what limits us. Today I can talk to people, listen to them honestly, and put together solutions that fit them completely — most often young people, which is where I focus.',
    ],
    es: [
      'Empecé a programar a los 14 porque los servidores de roleplay que jugaba nunca tenían lo que yo quería — mecánicas laxas, comunidades sin sentido de pertenencia. Hacer Ad Astra significó aprender primero qué era una variable, cómo funciona, cómo se ejecuta un script. Por mi cuenta, y solo con la ambición de darle a la gente una experiencia que valiera su tiempo.',
      'Ese sigue siendo el fundamento de todo lo que vino después: conectar con la gente y construir herramientas lo bastante buenas como para que lo que reciben sea realmente top tier.',
      'También me considero alguien resiliente — no solo en la insistencia con mis ideas, sino en mi vida. Tuve momentos bajos, momentos donde no confiaba en mí. Casi cinco años de terapia cambiaron eso de forma radical: mi autoestima, y cómo me relacionaba con la gente.',
      'Ese proceso es la razón por la que trabajo como trabajo. Todos tenemos potencial; lo que falta son las herramientas para salir de nuestra propia cabeza, que es la que siempre nos limita. Hoy puedo hablar con las personas, escucharlas con honestidad y armarles soluciones para ellos en su totalidad, muchas veces enfocadas en jóvenes, que es donde me enfoco.',
    ],
  } satisfies L<readonly string[]>,
  stats: [
    { value: '14', label: { en: 'Age I started coding', es: 'Edad en que empecé' } satisfies L },
    { value: '13', label: { en: 'Projects shipped', es: 'Proyectos publicados' } satisfies L },
    { value: 'Uruguay', label: { en: 'Based in', es: 'Desde' } satisfies L },
  ],
} as const

// ─── Social Media Links ───

export const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/fakuuy' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/fakup' },
  { label: 'X', url: 'https://x.com/faku_sys' },
  { label: 'Instagram', url: 'https://instagram.com/faku.sys' },
] as const

// ─── Orgs / Brands ───
// The umbrellas the work is organised under. Each project points at one via
// `org`, and the Orgs section explains what each is for.

export type OrgId = 'fakuuy' | 'faku-org' | 'wefaber' | 'eternum' | 'talentum' | 'novum' | 'adastra'

export interface Org {
  id: OrgId
  name: string
  url: string
  purpose: L
}

export const orgs: readonly Org[] = [
  {
    id: 'adastra',
    name: 'Ad Astra',
    url: 'https://github.com/adastra-org',
    purpose: {
      en: 'Where it began. The FiveM roleplay server and the tooling built around it.',
      es: 'Donde empezó todo. El servidor de rol en FiveM y las herramientas que lo rodean.',
    },
  },
  {
    id: 'fakuuy',
    name: 'fakuuy',
    url: 'https://github.com/fakuuy',
    purpose: {
      en: 'My personal profile: UTU coursework and things not directly tied to what I do. Side quests.',
      es: 'Mi perfil personal: proyectos de UTU y cosas no relacionadas directamente con lo que hago. Side-quests.',
    },
  },
  {
    id: 'faku-org',
    name: 'faku-org',
    url: 'https://github.com/faku-org',
    purpose: {
      en: 'Personal projects tied directly to my ideology and how I work. Where ideas are born before it is clear what sector they belong to, or whether they become commercial products.',
      es: 'Proyectos personales que se relacionan directamente con mi ideología y forma de funcionar. Donde nacen mis ideas antes de tener claro a qué sector pertenecen o si van a ser productos comerciales.',
    },
  },
  {
    id: 'wefaber',
    name: 'WeFaber',
    url: 'https://wefaber.net',
    purpose: {
      en: 'The strong one. Enterprise-class projects, or ones seeking incubator investment — anything carrying the WeFaber ideology. A roadmap of products and sub-brands still to come.',
      es: 'El proyecto fuerte. Proyectos de clase empresarial o que buscan inversión por incubadoras — lo que carga la ideología de WeFaber. Un roadmap de productos y sub-marcas pendientes.',
    },
  },
  {
    id: 'eternum',
    name: 'Eternum',
    url: 'https://eternum.lat',
    purpose: {
      en: 'A class team building productivity software for students. Aimed at becoming a local reference in Uruguay — tools, resources, papers and books.',
      es: 'Equipo de clase que produce software de productividad a nivel estudiantil. Apunta a ser un referente local en Uruguay — herramientas, recursos, papers y libros.',
    },
  },
  {
    id: 'talentum',
    name: 'Talentum',
    url: 'https://talentum.live',
    purpose: {
      en: 'Talent management: resources, information and content for content creators and anyone who puts themselves in front of an audience — speakers, presenters.',
      es: 'Gestión de talento: recursos, información y contenido para creadores de contenido o personas que busquen exponerse de forma pública — oradores, presentadores.',
    },
  },
  {
    id: 'novum',
    name: 'Novum',
    url: 'https://github.com/novum-org',
    purpose: {
      en: 'A Minecraft world built on geopolitics, with mechanics far deeper than what the genre currently offers.',
      es: 'Un mundo de Minecraft construido sobre geopolítica, con mecánicas mucho más profundas que las que ofrece el género hoy.',
    },
  },
]

/** Lookup for resolving a project's `org` to its record. */
export const orgById: Readonly<Record<OrgId, Org>> = Object.fromEntries(
  orgs.map((o) => [o.id, o]),
) as Readonly<Record<OrgId, Org>>

// ─── Eras ───
// `id` drives the CSS hook `.era--<id>`; adding one needs a rule in Timeline.css.

export type EraId = 'roots' | 'studio' | 'velocity'

export interface Era {
  id: EraId
  label: L
  range: string
  blurb: L
}

export const eras: readonly Era[] = [
  {
    id: 'roots',
    label: { en: 'Roots', es: 'Raíces' },
    range: '2021 — 2024',
    blurb: {
      en: 'Running communities and servers with real users, long before the tooling got serious.',
      es: 'Comunidades y servidores con usuarios reales, mucho antes de que las herramientas se pusieran serias.',
    },
  },
  {
    id: 'studio',
    label: { en: 'The Studio', es: 'El Estudio' },
    range: '2025',
    blurb: {
      en: 'Itica opens, and the work turns from running things to building them for other people.',
      es: 'Nace Itica, y el trabajo pasa de gestionar cosas a construirlas para otros.',
    },
  },
  {
    id: 'velocity',
    label: { en: 'Velocity', es: 'Velocidad' },
    range: '2026',
    blurb: {
      en: 'A company, a product in production, and a run of tools shipped in months instead of years.',
      es: 'Una empresa, un producto en producción, y una seguidilla de herramientas publicadas en meses en vez de años.',
    },
  },
]

// ─── Projects ───

export type ProjectStatus = 'live' | 'building' | 'archived' | 'concept'

export interface Milestone {
  /** `YYYY-MM`, or a free label. Shown as-is. */
  when: string
  title: L
  detail: L
}

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  url: string
  /**
   * `YYYY` or `YYYY-MM` — drives both the displayed year and the sort order.
   * A bare year sorts before any month within it, which is what you want when
   * only the year is known.
   */
  started: string
  era: EraId
  /** Which umbrella it lives under — see `orgs`. */
  org: OrgId
  status: ProjectStatus
  /** Short topic/tech keywords. Left untranslated: they are proper nouns. */
  tags: readonly string[]
  description: L
  role: L
  stack: readonly string[]
  story: L<readonly string[]>
  milestones: readonly Milestone[]
  links?: readonly ProjectLink[]
}

export const projects: readonly Project[] = [
  {
    id: 'adastra',
    title: 'Ad Astra',
    url: 'https://adastrarp.com',
    started: '2021', // Age 14 (born 2006-12-06). The astra repo came later, 2023-10-29.
    era: 'roots',
    org: 'adastra',
    status: 'live',
    tags: ['FiveM', 'Roleplay', 'Community', 'Live ops'],
    description: {
      en: 'A FiveM roleplay server — an immersive world with storytelling written by people.',
      es: 'Un servidor de rol en FiveM — un mundo inmersivo con historias escritas por personas.',
    },
    role: { en: 'Founder and developer', es: 'Fundador y desarrollador' },
    stack: ['FiveM', 'Lua', 'Tauri'],
    story: {
      en: [
        'My first project, and the reason I learned to program at all. The roleplay servers I played on never had what I wanted: loose mechanics, and communities with no real sense of belonging.',
        'I was 14 and did not know what a variable was, how one worked, or how a script even ran. I learned the fundamentals on my own, with nothing driving it but wanting to give people an experience worth their time.',
        'The work was never only the code: a live economy, a UI revamped more than once, a bug queue and a launch to plan — all with players already inside the world. I stayed on it for years before anything else started.',
        'It is still going. The next chapter is waiting on the platform: either Project ROMA — roleplay on GTA VI — or FiveM Enhanced once it stabilises.',
      ],
      es: [
        'Mi primer proyecto, y la razón por la que aprendí a programar. Los servidores de rol que jugaba nunca tenían lo que yo quería: mecánicas laxas y comunidades sin un sentido real de pertenencia.',
        'Tenía 14 años y no sabía qué era una variable, cómo funcionaba, ni cómo se ejecutaba un script. Aprendí los fundamentos por mi cuenta, sin más motor que querer darle a la gente una experiencia que valiera su tiempo.',
        'El trabajo nunca fue solo el código: una economía viva, una interfaz rehecha más de una vez, una cola de bugs y un lanzamiento que planificar — todo con jugadores ya dentro del mundo. Me quedé en él varios años antes de que empezara cualquier otra cosa.',
        'Sigue en pie. El próximo capítulo depende de la plataforma: o sale Project ROMA — rol sobre GTA VI — o arrancar con FiveM Enhanced cuando se estabilice.',
      ],
    },
    milestones: [
      {
        when: '2023',
        title: { en: 'The source goes up', es: 'Sube el código' },
        detail: {
          en: 'The server source finally lands in its own repository — two years into the project.',
          es: 'El código del servidor entra por fin en su propio repositorio — dos años después de arrancar.',
        },
      },
      {
        when: '2026',
        title: { en: 'Tooling of its own', es: 'Herramientas propias' },
        detail: {
          en: 'A site, then CodeWalker and AstraMapper — a port of CodeWalker to Tauri v2 — built to work on the world itself.',
          es: 'Un sitio, y después CodeWalker y AstraMapper — un port de CodeWalker a Tauri v2 — hechos para trabajar sobre el mundo mismo.',
        },
      },
      {
        when: 'Next',
        title: { en: 'Waiting on the platform', es: 'Esperando la plataforma' },
        detail: {
          en: 'The next chapter depends on Project ROMA — roleplay on GTA VI — or on FiveM Enhanced settling down.',
          es: 'El próximo capítulo depende de Project ROMA — rol sobre GTA VI — o de que FiveM Enhanced se estabilice.',
        },
      },
    ],
  },
  {
    id: 'talentum',
    title: 'Talentum',
    url: 'https://talentum.live',
    started: '2026-05', // wefaber/talentum-site 2026-05-07; wefaber/talentum 2026-06-10.
    era: 'velocity',
    org: 'talentum',
    status: 'live',
    tags: ['Creators', 'Streaming', 'Branding', 'Public speaking'],
    description: {
      en: 'Talent management — resources, information and content for creators and anyone who goes public.',
      es: 'Gestión de talento — recursos, información y contenido para creadores y quien se exponga públicamente.',
    },
    role: { en: 'Founder', es: 'Fundador' },
    stack: ['Brand', 'Social', 'Ops'],
    story: {
      en: [
        'A project to help streamers and content creators grow: sharpening their professional image, improving what they publish, and backing specific projects — events, equipment — with actual money.',
        'The first target was deliberately small and measurable: three creators, a minimum 20% growth, and enough marketing, social, design and management skill picked up along the way to keep going.',
        'It aims at IRL and gaming creators — and more broadly at anyone who puts themselves in front of an audience, speakers and presenters included. Slots, adult content and unregulated casinos are excluded on purpose.',
        'Stream Panel is the first tool built under it. The structure is in place; what it is waiting on now is creators.',
      ],
      es: [
        'Un proyecto para ayudar a streamers y creadores de contenido a crecer: afinar su imagen profesional, mejorar lo que publican, y bancar proyectos puntuales — eventos, equipamiento — con plata real.',
        'La primera meta fue chica y medible a propósito: tres creadores, un crecimiento mínimo del 20%, y el marketing, social media, diseño y gestión suficientes aprendidos en el camino como para seguir.',
        'Apunta a creadores IRL y de juegos — y más ampliamente a cualquiera que se exponga ante una audiencia, oradores y presentadores incluidos. Slots, contenido adulto y casinos no regulados quedan afuera a propósito.',
        'Stream Panel es la primera herramienta construida bajo su paraguas. La estructura ya está; lo que falta ahora son creadores.',
      ],
    },
    milestones: [
      {
        when: 'First 3 months',
        title: { en: 'Three creators, +20%', es: 'Tres creadores, +20%' },
        detail: {
          en: 'The opening goal: find three creators to work with and grow each of them by at least 20%.',
          es: 'La meta inicial: encontrar tres creadores para acompañar y hacer crecer a cada uno al menos un 20%.',
        },
      },
      {
        when: 'Year one',
        title: { en: 'Personalised management', es: 'Gestión personalizada' },
        detail: {
          en: 'Tiered, personalised creator management with a partner, and automation for engagement and advice.',
          es: 'Gestión de creadores personalizada por niveles junto a un socio, con automatización de engagement y consejos.',
        },
      },
    ],
  },
  {
    id: 'wefaber',
    title: 'WeFaber',
    url: 'https://wefaber.net',
    started: '2025-07', // itica-web first commit 2025-07-26; later rebranded Itica → WeFaber.
    era: 'studio',
    org: 'wefaber',
    status: 'live',
    tags: ['Studio', 'Applied AI', 'React', 'Product'],
    description: {
      en: 'Software & applied AI studio from Uruguay. We fabricate real products — fast, beautiful and useful.',
      es: 'Estudio de software e IA aplicada desde Uruguay. Fabricamos productos reales — rápidos, lindos y útiles.',
    },
    role: { en: 'Founder', es: 'Fundador' },
    stack: ['Bun', 'Elysia', 'React 19', 'TypeScript', 'TailwindCSS'],
    story: {
      en: [
        'The strong one. A software and applied AI studio out of Uruguay, fabricating real products — fast, beautiful and useful.',
        'It started as Itica in July 2025 and ran under that name for most of a year — 72 commits on the web build alone — before the rebrand to WeFaber and a more stable footing.',
        'It is where the enterprise-class work goes: projects seeking incubator investment, or anything carrying the WeFaber ideology. There is a roadmap of products and sub-brands still to come, and most of what sits below this line in the timeline was built under it.',
      ],
      es: [
        'El proyecto fuerte. Un estudio de software e IA aplicada desde Uruguay, que fabrica productos reales — rápidos, lindos y útiles.',
        'Arrancó como Itica en julio de 2025 y funcionó con ese nombre casi un año — 72 commits solo en la web — antes del cambio a WeFaber y de asentarse.',
        'Es donde va el trabajo de clase empresarial: proyectos que buscan inversión por incubadoras, o lo que carga la ideología de WeFaber. Hay un roadmap de productos y sub-marcas pendientes, y casi todo lo que aparece más abajo se construyó bajo su paraguas.',
      ],
    },
    milestones: [
      {
        when: '2025-07',
        title: { en: 'Itica opens', es: 'Nace Itica' },
        detail: {
          en: 'First commit on the studio web build — the start of working on software for other people.',
          es: 'Primer commit de la web del estudio — el comienzo de hacer software para otros.',
        },
      },
      {
        when: '2026-05',
        title: { en: 'Rebrand to WeFaber', es: 'Cambio de marca a WeFaber' },
        detail: {
          en: 'Itica becomes WeFaber after roughly ten months and 72 commits under the original name — and the org grows to hold Eternum, Talentum, Lux, Libraria and Novum’s first site.',
          es: 'Itica pasa a ser WeFaber tras unos diez meses y 72 commits con el nombre original — y la organización pasa a alojar Eternum, Talentum, Lux, Libraria y el primer sitio de Novum.',
        },
      },
    ],
  },
  {
    id: 'novum',
    title: 'Novum',
    url: 'https://github.com/novum-org',
    started: '2026-04', // wefaber/novum-site 2026-04-06; novum-org/novum 2026-05-31.
    era: 'velocity',
    org: 'novum',
    status: 'building',
    tags: ['Minecraft', 'Geopolitics', 'Towny', 'Roleplay', 'Economy'],
    description: {
      en: 'A Minecraft world built on geopolitics, with mechanics far deeper than the genre currently offers.',
      es: 'Un mundo de Minecraft construido sobre geopolítica, con mecánicas mucho más profundas que las del género hoy.',
    },
    role: { en: 'Founder and author of the charter', es: 'Fundador y autor de la carta orgánica' },
    stack: ['Minecraft', 'Towny', 'Java'],
    story: {
      en: [
        'Geopolitical Minecraft servers exist, but they stop where the interesting part begins. Novum is an attempt at the full expansion of that idea: territory that escalates from camps to colonies to cities to nations to blocs, with invasions, wars and an actual balance of power between them.',
        'Underneath sits an economy with its own currencies, economic activities, business types, treaties and sanctions — and an RPG layer of skills, user-driven quests, clans and reputation running alongside the roleplay rules.',
        'It is specified before it is built. The charter is a working document that exists to define, mediate and justify decisions: what it states is not contradicted later in design, staff or marketing.',
      ],
      es: [
        'Los servidores de Minecraft geopolíticos existen, pero se detienen justo donde empieza lo interesante. Novum es un intento de expandir esa idea por completo: territorio que escala de campamentos a colonias, ciudades, naciones y bloques, con invasiones, guerras y un balance de potencias real entre ellos.',
        'Por debajo hay una economía con monedas propias, actividades económicas, tipos de negocios, tratados y sanciones — y una capa RPG de habilidades, quests dirigidas por usuarios, clanes y reputación corriendo junto a las reglas de roleplay.',
        'Se especifica antes de construirse. La carta orgánica es un documento de trabajo que existe para definir, mediar y fundamentar decisiones: lo que se afirma ahí no se contradice después en diseño, staff ni marketing.',
      ],
    },
    milestones: [
      {
        when: '2026-04',
        title: { en: 'The idea gets a site', es: 'La idea tiene sitio' },
        detail: {
          en: 'Novum appears first as a site, before any of the server work.',
          es: 'Novum aparece primero como sitio, antes de cualquier trabajo del servidor.',
        },
      },
      {
        when: '2026-08',
        title: { en: 'The charter', es: 'La carta orgánica' },
        detail: {
          en: 'A full founding document: economy, roleplay, RPG systems, territory and geopolitics, environment and lore, plus the Alpha → Beta → V1 roadmap and how it sustains itself.',
          es: 'Un documento fundacional completo: economía, roleplay, sistemas RPG, territorio y geopolítica, entorno y lore, más el roadmap Alfa → Beta → V1 y cómo se sostiene.',
        },
      },
    ],
  },
  {
    id: 'eternum',
    title: 'Eternum',
    url: 'https://eternum.lat',
    started: '2026-01', // Founded early 2026; the first repos land in April.
    era: 'velocity',
    org: 'eternum',
    status: 'live',
    tags: ['Student tools', 'EdTech', 'Uruguay', 'Team'],
    description: {
      en: 'A class team building productivity software for students, aiming to become a local reference.',
      es: 'Equipo de clase que hace software de productividad estudiantil, apuntando a ser un referente local.',
    },
    role: { en: 'Founder', es: 'Fundador' },
    stack: ['React 19', 'TypeScript', 'Bun'],
    story: {
      en: [
        'A class team producing productivity software at student level. The goal was always bigger than any one product: to become a local reference in Uruguay, helping students with tools, resources, papers and books.',
        'It began as a semantic HTML5 and CSS frontend mockup of a resource management system for the computer labs of ITI CETP — no JavaScript, no backend, just markup documenting exactly how the system should behave. That mockup is what Lux was built from.',
        'Alumnus runs internally alongside it, and OhMy grew directly out of the same goal — the tools half of the promise.',
      ],
      es: [
        'Equipo de clase que produce software de productividad a nivel estudiantil. El objetivo siempre fue más grande que cualquier producto: ser un referente local en Uruguay, ayudando a estudiantes con herramientas, recursos, papers y libros.',
        'Empezó como un mockup de frontend en HTML5 semántico y CSS de un sistema de gestión de recursos para los laboratorios del ITI CETP — sin JavaScript ni backend, solo marcado documentando cómo debía comportarse el sistema. De ese mockup salió Lux.',
        'Alumnus corre internamente en paralelo, y OhMy nació directamente del mismo objetivo — la mitad del compromiso que son las herramientas.',
      ],
    },
    milestones: [
      {
        when: '2026-04',
        title: { en: 'The SGRSI mockup', es: 'El mockup del SGRSI' },
        detail: {
          en: 'A full static frontend in semantic HTML5 and hand-written CSS, specifying inventory, tickets, loans, requests and the lab usage sheet.',
          es: 'Un frontend estático completo en HTML5 semántico y CSS a mano, especificando inventario, tickets, préstamos, solicitudes y la planilla de laboratorio.',
        },
      },
      {
        when: '2026-04',
        title: { en: 'A site, then a suite', es: 'Un sitio, después una suite' },
        detail: {
          en: 'The team site goes up four days after the mockup; five days later the first OhMy tool ships.',
          es: 'El sitio del equipo sale cuatro días después del mockup; cinco días más tarde sale la primera herramienta de OhMy.',
        },
      },
    ],
  },
  {
    id: 'mindvault',
    title: 'MindVault',
    url: 'https://github.com/faku-org/mindvault',
    started: '2026-05',
    era: 'velocity',
    org: 'faku-org',
    status: 'building',
    tags: ['Knowledge graph', 'TypeScript', 'AI agents', 'Versioning'],
    description: {
      en: 'Knowledge externalization with dynamic graphs — typed memories, append-only versioning, co-evolving with AI agents.',
      es: 'Externalización de conocimiento con grafos dinámicos — memorias tipadas, versionado append-only, co-evolución con agentes de IA.',
    },
    role: { en: 'Sole developer', es: 'Desarrollador único' },
    stack: ['TypeScript', 'Bun'],
    story: {
      en: [
        'Knowledge externalization built on dynamic graphs: typed memories, append-only versioning, and a store designed to co-evolve with the AI agents reading it.',
        'Phase one is the Raw Vault — getting knowledge out of your head and into a structure before worrying about what reads it.',
        'The longest-running build here: opened in May and still being pushed to today.',
      ],
      es: [
        'Externalización de conocimiento sobre grafos dinámicos: memorias tipadas, versionado append-only, y un almacén pensado para co-evolucionar con los agentes de IA que lo leen.',
        'La fase uno es la Bóveda Cruda — sacar el conocimiento de la cabeza y meterlo en una estructura antes de preocuparse por quién lo lee.',
        'El desarrollo más largo de esta lista: abierto en mayo y todavía con commits hoy.',
      ],
    },
    milestones: [
      {
        when: '2026-05',
        title: { en: 'Phase 1 — Raw Vault', es: 'Fase 1 — Bóveda Cruda' },
        detail: {
          en: 'The first phase: capture knowledge as typed, versioned entries.',
          es: 'La primera fase: capturar conocimiento como entradas tipadas y versionadas.',
        },
      },
      {
        when: '2026-09',
        title: { en: 'Still in active build', es: 'Todavía en desarrollo activo' },
        detail: {
          en: 'Four months of continuous work — the longest-running project in the timeline.',
          es: 'Cuatro meses de trabajo continuo — el proyecto más largo de la línea de tiempo.',
        },
      },
    ],
    links: [{ label: 'Source', url: 'https://github.com/faku-org/mindvault' }],
  },
  {
    id: 'cipher',
    title: 'Cipher',
    url: 'https://github.com/faku-org/cipher',
    started: '2026-05',
    era: 'velocity',
    org: 'faku-org',
    status: 'concept',
    tags: ['E2E encryption', 'Zero data', 'TypeScript', 'Proof of concept'],
    description: {
      en: 'End-to-end encrypted messaging and file sharing. Zero data. Proof of concept.',
      es: 'Mensajería y archivos cifrados de extremo a extremo. Cero datos. Prueba de concepto.',
    },
    role: { en: 'Sole developer', es: 'Desarrollador único' },
    stack: ['TypeScript', 'Web Crypto API'],
    story: {
      en: [
        'End-to-end encrypted messaging and file sharing, with nothing retained on the server.',
        'Deliberately a proof of concept and nothing more: built and closed inside two days to test whether the idea held together, not to become a product. It has sat untouched since.',
      ],
      es: [
        'Mensajería y archivos cifrados de extremo a extremo, sin nada retenido en el servidor.',
        'Una prueba de concepto a propósito y nada más: construida y cerrada en dos días para ver si la idea se sostenía, no para volverse producto. Quedó intacta desde entonces.',
      ],
    },
    milestones: [
      {
        when: '2026-05',
        title: { en: 'Built and parked in two days', es: 'Construido y parado en dos días' },
        detail: {
          en: 'The whole proof of concept, start to finish, over a single weekend.',
          es: 'Toda la prueba de concepto, de principio a fin, en un solo fin de semana.',
        },
      },
    ],
    links: [{ label: 'Source', url: 'https://github.com/faku-org/cipher' }],
  },
  {
    id: 'ohmy',
    title: 'OhMy',
    url: 'https://ohmy.lat',
    started: '2026-04', // ohmymail 2026-04-23 was the first tool in the suite.
    era: 'velocity',
    org: 'eternum',
    status: 'live',
    tags: ['Browser-only', 'No account', 'React 19', 'Suite'],
    description: {
      en: 'Eternum’s tool suite — small, focused, browser-only apps: mail, docs, grids, forms, charts, gantt and diagrams.',
      es: 'La suite de herramientas de Eternum — apps chicas y enfocadas que corren solo en el navegador: mail, documentos, grillas, formularios, gráficos, gantt y diagramas.'
    },
    role: { en: 'Sole developer', es: 'Desarrollador único' },
    stack: ['React 19', 'TypeScript', 'Vite'],
    story: {
      en: [
        'Born out of Eternum’s goal of being a resource for students: small, focused tools that each do one job and run entirely in the browser — no account, no server holding your data.',
        'It grew one tool at a time rather than being designed as a suite: mail first, then docs and grids three days later, forms the day after, charts the following week, gantt in May and diagrams in August.',
        'The diagram editor is the most specific of them — UML 2.5 use-case diagrams with a live validation checklist.',
      ],
      es: [
        'Nació del objetivo de Eternum de ser un recurso para estudiantes: herramientas chicas y enfocadas, cada una hace una sola cosa y corre entera en el navegador — sin cuenta y sin un servidor guardando tus datos.',
        'Creció de a una herramienta por vez, no como una suite diseñada de entrada: primero mail, tres días después documentos y grillas, al día siguiente formularios, gráficos la semana siguiente, gantt en mayo y diagramas en agosto.',
        'El editor de diagramas es el más específico de todos — diagramas de casos de uso UML 2.5 con checklist de validación en vivo.',
      ],
    },
    milestones: [
      {
        when: '2026-04',
        title: { en: 'OhMyMail, then Docs and Grid', es: 'OhMyMail, después Docs y Grid' },
        detail: {
          en: 'Mail lands first, with docs and grids three days later, forms the day after, and charts the following week.',
          es: 'Mail sale primero; documentos y grillas tres días después, formularios al día siguiente, y gráficos la semana siguiente.',
        },
      },
      {
        when: '2026-05',
        title: { en: 'OhMyGantt', es: 'OhMyGantt' },
        detail: {
          en: 'Project scheduling joins the suite.',
          es: 'La planificación de proyectos se suma a la suite.',
        },
      },
      {
        when: '2026-08',
        title: { en: 'OhMyDiagrams', es: 'OhMyDiagrams' },
        detail: {
          en: 'A UML 2.5 use-case editor with live validation rounds out the set — the densest build of the group at 24 commits in three days.',
          es: 'Un editor de casos de uso UML 2.5 con validación en vivo cierra el conjunto — el build más denso del grupo: 24 commits en tres días.',
        },
      },
    ],
  },
  {
    id: 'lux',
    title: 'Lux',
    url: 'https://lux.eternum.lat',
    started: '2026-05',
    era: 'velocity',
    org: 'eternum',
    status: 'live',
    tags: ['React 19', 'Bun', 'TailwindCSS', 'Radix UI', 'MSW', 'EdTech'],
    description: {
      en: 'SGRSI — IT resource and service management for UTU. Equipment, tickets, loans and requests across four roles.',
      es: 'SGRSI — gestión de recursos y servicios informáticos para UTU. Equipamiento, tickets, préstamos y solicitudes en cuatro roles.',
    },
    role: { en: 'Sole developer', es: 'Desarrollador único' },
    stack: ['Bun', 'Vite', 'React 19', 'TypeScript', 'TailwindCSS v4', 'Radix UI', 'Recharts', 'MSW'],
    story: {
      en: [
        'Sistema de Gestión de Recursos y Servicios Informáticos: a platform that centralises how a technical school administers its computer equipment, support tickets, equipment loans and service requests.',
        'It runs across four distinct roles — Super Admin, Administrator, Technician and Requester — and covers inventory by serial and state, a help-desk queue, loans, service requests, a dashboard, and a lab usage sheet that assigns students to numbered machines and records the state of each one per session.',
        'The public build runs on an MSW mock layer, so the whole flow can be explored without an account or real data.',
      ],
      es: [
        'Sistema de Gestión de Recursos y Servicios Informáticos: una plataforma que centraliza cómo una escuela técnica administra su equipamiento informático, tickets de soporte, préstamos de equipos y solicitudes de servicio.',
        'Funciona con cuatro roles diferenciados — Super Admin, Administrador, Técnico y Solicitante — y cubre inventario por serie y estado, cola de soporte, préstamos, solicitudes, dashboard, y una planilla de laboratorio que asigna estudiantes a máquinas numeradas y registra el estado de cada una por sesión.',
        'La versión pública corre sobre una capa mock con MSW, así se puede recorrer todo el flujo sin cuenta ni datos reales.',
      ],
    },
    milestones: [
      {
        when: '2026-04',
        title: { en: 'From static mockup', es: 'Desde el mockup estático' },
        detail: {
          en: 'The system starts life inside the Eternum repo as HTML and CSS with no behaviour attached.',
          es: 'El sistema nace dentro del repo de Eternum como HTML y CSS sin comportamiento.',
        },
      },
      {
        when: '2026-05',
        title: { en: 'Rebuilt as a real app', es: 'Rehecho como app real' },
        detail: {
          en: 'A design system, a Radix + CVA component library, an MSW GraphQL mock layer, then dashboard, inventory and tickets — the bulk of it in one push.',
          es: 'Un design system, una librería de componentes Radix + CVA, una capa mock GraphQL con MSW, y después dashboard, inventario y tickets — casi todo de una.',
        },
      },
      {
        when: '2026-08',
        title: { en: 'Four roles, in production', es: 'Cuatro roles, en producción' },
        detail: {
          en: 'Forty commits in, with the public demo live at lux.eternum.lat.',
          es: 'Cuarenta commits después, con la demo pública en vivo en lux.eternum.lat.',
        },
      },
    ],
  },
  {
    id: 'libraria',
    title: 'Libraria',
    url: 'https://libraria.wefaber.net',
    started: '2026-06', // wefaber/libraria created 2026-06-10.
    era: 'velocity',
    org: 'wefaber',
    status: 'concept',
    tags: ['Design tokens', 'Component builder', 'React', 'Proof of concept'],
    description: {
      en: 'A visual component builder with a theme engine — manual-first, AI-assisted.',
      es: 'Un constructor visual de componentes con motor de temas — manual primero, asistido por IA.',
    },
    role: { en: 'Sole developer', es: 'Desarrollador único' },
    stack: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS'],
    story: {
      en: [
        'A visual component builder sitting on a generic design-token theme engine: build the component once, then retheme it for any brand by swapping tokens.',
        'It is manual-first and AI-assisted, in that order: you drive it, the model helps. The build itself runs a navy-blue liquid-glass interface.',
      ],
      es: [
        'Un constructor visual de componentes sobre un motor de temas genérico basado en design tokens: construís el componente una vez y lo re-tematizás para cualquier marca cambiando tokens.',
        'Es manual primero y asistido por IA, en ese orden: lo manejás vos, el modelo ayuda. La interfaz del build corre un liquid glass azul marino.',
      ],
    },
    milestones: [
      {
        when: '2026-06',
        title: { en: 'Manual-first builder', es: 'Constructor manual primero' },
        detail: {
          en: 'A visual builder over a theme engine, with the model assisting rather than driving.',
          es: 'Un constructor visual sobre un motor de temas, con el modelo asistiendo en vez de conducir.',
        },
      },
    ],
  },
  {
    id: 'learnit',
    title: 'LearnIt',
    url: 'https://github.com/faku-org/learnit',
    started: '2026-06',
    era: 'velocity',
    org: 'faku-org',
    status: 'building',
    tags: ['Astro', 'React 19', 'Elysia', 'MongoDB', 'LLM', 'SRS'],
    description: {
      en: 'AI-powered language learning — generated exercises, spaced repetition, and lessons that adapt to you.',
      es: 'Aprendizaje de idiomas con IA — ejercicios generados, repetición espaciada y lecciones que se adaptan a vos.',
    },
    role: { en: 'Sole developer', es: 'Desarrollador único' },
    stack: ['Astro', 'React 19', 'TailwindCSS v4', 'Elysia', 'MongoDB', 'Bun', 'Deepseek'],
    story: {
      en: [
        'A language learning app where the curriculum is generated for you: give it a language and a goal, and an LLM builds the learning path.',
        'Exercises come as multiple choice, fill-in-the-blank and translation, preloaded two ahead so nothing stalls. Stuck on one? "I don’t know" asks for an explanation with key points and examples. Vocabulary saves words with conjugations and usage, and Web Speech handles pronunciation practice.',
        'Underneath it runs SM-2 spaced repetition with adaptive difficulty, plus a calibration flow that places you at the right level before you start.',
      ],
      es: [
        'Una app de idiomas donde el plan de estudio se genera para vos: le das un idioma y un objetivo, y un LLM arma el camino de aprendizaje.',
        'Los ejercicios vienen como opción múltiple, completar espacios y traducción, precargados de a dos para que nada se trabe. ¿Trancado en uno? "No sé" pide una explicación con puntos clave y ejemplos. Vocabulario guarda palabras con conjugaciones y uso, y Web Speech maneja la práctica de pronunciación.',
        'Por debajo corre repetición espaciada SM-2 con dificultad adaptativa, más un flujo de calibración que te ubica en el nivel correcto antes de empezar.',
      ],
    },
    milestones: [
      {
        when: '2026-06',
        title: { en: 'Scaffold and LLM integration', es: 'Base e integración con LLM' },
        detail: {
          en: 'Astro + React 19 + Elysia scaffold, MongoDB with Zod schemas, and Deepseek generating paths, exercises and grammar correction.',
          es: 'Base con Astro + React 19 + Elysia, MongoDB con esquemas Zod, y Deepseek generando caminos, ejercicios y corrección gramatical.',
        },
      },
      {
        when: '2026-06',
        title: { en: 'Auth, SRS and calibration', es: 'Auth, SRS y calibración' },
        detail: {
          en: 'Google OAuth with JWT, SM-2 spaced repetition, adaptive difficulty, and a calibration flow for level assessment.',
          es: 'Google OAuth con JWT, repetición espaciada SM-2, dificultad adaptativa, y un flujo de calibración para evaluar el nivel.',
        },
      },
    ],
    links: [{ label: 'Source', url: 'https://github.com/faku-org/learnit' }],
  },
  {
    id: 'searchit',
    title: 'SearchIt',
    url: 'https://github.com/faku-org/searchit',
    started: '2026-07',
    era: 'velocity',
    org: 'faku-org',
    status: 'building',
    tags: ['Tauri', 'Rust', 'Local-first', 'CLIP', 'Photography'],
    description: {
      en: "A desktop app that turns a photographer's raw photo dump into a searchable archive — faces, GPS, OCR and CLIP.",
      es: 'Una app de escritorio que convierte el volcado de fotos de un fotógrafo en un archivo buscable — caras, GPS, OCR y CLIP.',
    },
    role: { en: 'Sole developer', es: 'Desarrollador único' },
    stack: ['Tauri', 'Rust', 'React', 'TypeScript', 'TailwindCSS', 'Leaflet'],
    story: {
      en: [
        'A desktop app for photographers: point it at a folder of raw exports and it indexes faces, GPS coordinates, text found in the images and CLIP embeddings, so the archive becomes searchable instead of a pile of filenames.',
        'It ships as three processes in one app — the interface, a server and an inference service — bundled as Tauri sidecars that start themselves, with a CI smoke test gating every release on those sidecars actually coming up.',
        'Everything runs on the machine. Nothing is uploaded.',
      ],
      es: [
        'Una app de escritorio para fotógrafos: la apuntás a una carpeta de exportados en crudo e indexa caras, coordenadas GPS, texto encontrado en las imágenes y embeddings CLIP, y el archivo pasa a ser buscable en vez de una pila de nombres de archivo.',
        'Se distribuye como tres procesos en una sola app — la interfaz, un servidor y un servicio de inferencia — empaquetados como sidecars de Tauri que arrancan solos, con un smoke test en CI que bloquea cada release si esos sidecars no levantan.',
        'Todo corre en la máquina. No se sube nada.',
      ],
    },
    milestones: [
      {
        when: '2026-07',
        title: { en: 'App, server and inference', es: 'App, servidor e inferencia' },
        detail: {
          en: 'The three pieces land together, then get bundled as autostarting Tauri sidecars with a CI smoke test gating releases.',
          es: 'Las tres piezas llegan juntas y después se empaquetan como sidecars de Tauri que arrancan solos, con un smoke test en CI que condiciona los releases.',
        },
      },
      {
        when: '2026-07',
        title: { en: 'Import, retry and diagnostics', es: 'Importación, reintentos y diagnóstico' },
        detail: {
          en: 'A photo import flow, retry handling for failed photos, a developer diagnostics panel, and localization — nineteen commits in four days.',
          es: 'Un flujo de importación de fotos, reintentos para las que fallan, un panel de diagnóstico y localización — diecinueve commits en cuatro días.',
        },
      },
    ],
    links: [{ label: 'Source', url: 'https://github.com/faku-org/searchit' }],
  },
  {
    id: 'jobit',
    title: 'JobIt',
    url: 'https://jobs.wefaber.net',
    started: '2026-08',
    era: 'velocity',
    org: 'faku-org',
    status: 'live',
    tags: ['Bun', 'Elysia', 'React 19', 'Uruguay', 'Job board', 'Scraping'],
    description: {
      en: "Uruguay's job board — every field, built for people looking for their first job.",
      es: 'El buscador de empleo de Uruguay — todos los rubros, pensado para quien busca su primer trabajo.',
    },
    role: { en: 'Sole developer', es: 'Desarrollador único' },
    stack: ['Bun', 'Elysia', 'React 19', 'TypeScript', 'TailwindCSS v4'],
    story: {
      en: [
        'A job board covering every field in Uruguay, built around one specific person: someone looking for their first job. Filters by field, department and schedule, a "no experience required" flag, a saved list, and a way to discard listings you have already seen.',
        'It remembers what you are after — on-site, remote or hybrid, level, schedule, fields — highlights matching listings and can show only those. A profile records what you studied so it can flag listings asking for more than you have.',
        'State job listings from Uruguay Concursa sit in their own tab, ordered by closing date. Three services: scrapers that write a JSON feed, a Bun + Elysia API serving filters, facets and pagination, and a React 19 front end. Everything user-side lives in the browser, with no account.',
      ],
      es: [
        'Un buscador de empleo de todos los rubros en Uruguay, construido alrededor de una persona concreta: alguien buscando su primer trabajo. Filtros por rubro, departamento y jornada, marca de "sin experiencia", lista de guardadas, y forma de descartar las que ya viste.',
        'Se acuerda de lo que buscás — presencial, remoto o híbrido, nivel, jornada, rubros — destaca las ofertas que coinciden y puede mostrar solo esas. Un perfil guarda lo que estudiaste para marcar las que piden más nivel del que tenés.',
        'Los llamados del Estado de Uruguay Concursa van en su propia pestaña, ordenados por fecha de cierre. Tres servicios: scrapers que escriben un JSON, una API en Bun + Elysia que sirve filtros, facetas y paginado, y un front en React 19. Todo lo del usuario vive en el navegador, sin cuenta.',
      ],
    },
    milestones: [
      {
        when: '2026-08',
        title: { en: 'API and scrapers', es: 'API y scrapers' },
        detail: {
          en: 'Jobs and meta endpoints with filtering and pagination, then a BuscoJobs scraper widening it to every field.',
          es: 'Endpoints de ofertas y metadatos con filtrado y paginado, y después un scraper de BuscoJobs que lo amplía a todos los rubros.',
        },
      },
      {
        when: '2026-09',
        title: { en: 'Uruguay Concursa and profiles', es: 'Uruguay Concursa y perfiles' },
        detail: {
          en: 'State listings by closing date, search preferences, a personal profile, CV import and structured descriptions.',
          es: 'Llamados del Estado por fecha de cierre, preferencias de búsqueda, perfil personal, importación de CV y descripciones estructuradas.',
        },
      },
      {
        when: '2026-09',
        title: { en: 'Shipped', es: 'Publicado' },
        detail: {
          en: 'Brand assets, SEO metadata and previews, filters reflected in the URL, and the API hardened and deployed.',
          es: 'Archivos de marca, metadatos y previsualizaciones para SEO, filtros reflejados en la URL, y la API blindada y desplegada.',
        },
      },
    ],
    links: [{ label: 'Source', url: 'https://github.com/faku-org/jobit' }],
  },
]
