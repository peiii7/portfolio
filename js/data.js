/* Project + About data — English only, 1:1 with peichidesign.framer.website.
   Images are the real Framer assets (hotlinked from framerusercontent.com).
   Each project: hero image + gallery (content images used for feature /
   research blocks and the closing Showcase, in document order). */

const IMG = "images/";

const ABOUT_DATA = {
  photo: IMG + "jw6j7PbAhVViYXBL21VDt0O11F4.jpg",
  experience: [
    { role: "UI Designer - AJA Creative", time: "2025/5~NOW", desc: "Involved in insurance and financial-sector projects, focusing on UI design and proposal support" },
    { role: "Freelancer", time: "2023~NOW", desc: "Contributed to various projects including web UI design, exhibition visuals, and promotional materials" },
    { role: "UIUX Design Intern - UXI Design Co.", time: "2022/3~2023/3", desc: "Involved in B2C projects by creating wireframes and prototypes, conducting user research, and delivering design guidelines, supported to proposal" },
    { role: "Artistic Design - General Education Center(NTUT)", time: "2022/3~2023/6", desc: "Produced posters and website motion graphics for institutional communication" },
    { role: "Freelancer", time: "2021~2022", desc: "Delivered illustration commissions and graphic design solutions across various client needs" },
    { role: "Article Writing & Translation - Mifly Design Company", time: "2021/4~2021/12", desc: "Drafted tutorial articles for XR products and provided English–Chinese article translation" }
  ],
  education: [
    { time: "2023-2024", school: "Fachhochschule Potsdam (Germany)", detail: "Interface design - Exchange Student" },
    { time: "2019-2023", school: "National Taipei University of Technology (Taiwan)", detail: "Interaction Design - Bachelor Degree" }
  ],
  skills: [
    { name: "Figma", level: "Proficient" },
    { name: "Miro", level: "Fluent" },
    { name: "After Effect", level: "Familiar" },
    { name: "HTML / Css", level: "Familiar" },
    { name: "Blender", level: "Familiar" },
    { name: "Clip Studio Paint", level: "Proficient" }
  ],
  awards: [
    { year: "2024", items: ["Indigo Award : Interaction Design - Silver Award"] },
    { year: "2023", items: [
      "Red Dot Design Award : Design Concept - Final list",
      "VGW Award : Interdisciplinary - Nomination",
      "Ministry of Education (MOE) Scholarship - Winner"
    ] }
  ],
  languages: [
    { name: "Mandarin", level: "Native" },
    { name: "English", level: "Confident within corporate settings." },
    { name: "Japanese", level: "Comfortable with reading and listening on familiar topics." },
    { name: "German", level: "Procuring basic phrases and terms." }
  ]
};

/* category: "uiux" | "interdisciplinary" | "graphic" — order matches the Framer Work page */
const PROJECTS = [
  {
    slug: "fubon-life",
    cardTitle: "Fubon Life",
    category: "uiux",
    categoryLabel: "Finance & Insurance",
    homeMeta: "Finance & Insurance ｜ Website Redesign",
    client: "Fubon Life (Taiwan)",
    role: "UI Designer",
    timeline: "2025/05–2026/01",
    hero: IMG + "fubon-hero.jpg",
    gallery: [
      IMG + "fubon-hero.jpg"
    ],
    title: "Fubon Life — Brand-led visuals, modular templates for a vast site",
    intro: "Fubon Life's core asset is years of accumulated brand trust, yet after years of incremental expansion its website had grown into a complex information architecture, and the visual design no longer conveyed the professional image the brand deserved. I led the visual optimization and the modular templates of the website, extending the brand's visual vocabulary to set the tone across the site and consolidating modules and templates to ensure a consistent brand experience — the redesigned site serves 180K monthly active users, with 255 pages consolidated into 46 templates.",
    challengeTitle: "How do we integrate diverse requirements into a consistent, easy-to-use digital experience?",
    challengeBody: "1. A complex menu structure made content hard to find — up to 5 levels deep, with similar content scattered and the same products appearing under multiple entry points.\n2. Too much jargon, written from an internal corporate perspective, made it hard for users to judge whether a product fit their needs.\n3. Visual styles were inconsistent with the group's image, leaving the site disconnected from the holding group's other digital platforms.",
    solutionTitle: "Brand-led visuals and a modular system — 255 → 46 templates",
    solutionBody: "I extracted three characteristics from the Fubon logo — circle, square, and overlap — into one shape language used across the whole site, and redrew a set of product scenario illustrations on top of the Fubon Life app's existing illustration system. With another UI designer I consolidated 255 pages into 46 reusable templates, and built dedicated WCAG AA templates for the Financial Friendly Services section.",
    features: [
      { title: "Extending the brand's visual vocabulary", body: "Design is built up through details. I extracted circle, square and overlap from the Fubon logo and translated them into graphic motifs and page elements, so the whole site shares one shape language. Building on the Fubon Life app's existing illustration system, I redrew product scenario illustrations to carry the website's larger layouts and longer reading contexts." },
      { title: "Modular component design for a consistent corporate visual identity", body: "Following the brand guidelines and design system, I extended new components based on functional needs, defined their types, applicable scenarios and usage rules, and merged them into the design system after discussion with the client. I also audited templates, consolidating shared modules and styles into reusable design rules so future requests extend from existing guidelines and maintenance costs stay low." },
      { title: "Accessible page design: dedicated templates meeting WCAG AA", body: "Following WCAG and the client's existing accessibility guidelines, I designed dedicated templates for the Financial Friendly Services section around senior and disabled users, adjusting component size, spacing and interaction states to suit the content, with AA-level contrast built into the template planning as the design basis for related pages." },
      { title: "Validating the concept across 12 usability tests", body: "Most participants found the new website met their needs and was easy to use and understand, with consistently positive concept validation. The tests also revealed some obstacles came from visual style and layout rather than features or information architecture, so I observed user reactions and iterated the visuals in parallel to reduce friction." }
    ],
    research: [
      { title: "Design is also about reconciling different positions", body: "Even after features and pages are finalized, clients still request visual changes; judging by maintenance cost, page purpose and usability — rather than aesthetics or preference — brings the conversation back to the problem. Behind most requests lies an implicit, unarticulated problem, so clarifying the needs of different decision levels, operations teams and stakeholders is what finds the common ground that moves the design forward." },
      { title: "Accessibility as a default, not a final checklist", body: "Rather than confining accessibility to the \"Financial Friendly\" section, building AA contrast into foundational components such as buttons turns it from a single-section requirement into a baseline consideration across the whole site." }
    ]
  },
  {
    slug: "ctbc-bank",
    cardTitle: "CTBC Bank",
    category: "uiux",
    categoryLabel: "Banking & Finance",
    homeMeta: "Banking & Finance ｜ Website Redesign",
    client: "CTBC Bank (Taiwan)",
    role: "UI Designer",
    timeline: "2026/02–08",
    hero: "",
    gallery: [],
    title: "CTBC — Repositioning the website experience for the AI era",
    intro: "CTBC is one of Taiwan's largest private banks and is investing heavily in digital transformation and AI, but the brand still reads as traditional and conservative. Its website is maintained by many departments at once, which has left it large and hard to navigate, while people increasingly find answers through search, AI or social media first and only visit the site to confirm the details. The redesign set out to make information easier to find, create a consistent experience on a structure that can grow, and meet WCAG AA. I set the visual direction with the UI team, owned key pages such as AI search, and built the design system and AEM modules that support long-term maintenance across departments.",
    challengeTitle: "When people already have their answer before they arrive, how does a website become fresh, findable and built to grow?",
    challengeBody: "1. A conservative brand image with little appeal to younger customers — the visuals said little about the brand and did not match the group's other digital platforms.\n2. An information architecture people could not navigate: content filed by product and owning department rather than by task, with poor on-site search.\n3. Technical and ownership constraints that broke consistency — each department published its own pages through AEM, with no shared design system to work from.",
    solutionTitle: "From 0 to 1 — a visual language, an accessible design system, and AEM modules",
    solutionBody: "We pulled three elements from research into contemporary banks and mainstream AI products — flowing color, visual depth and motion — and proposed two directions. To show the AI was working, I designed an organic gradient light form with a breathing rhythm plus subtle motion, built in Figma Animate and turned into a working homepage-to-L2 prototype with Figma Sites, delivered for desktop and mobile. The design system was rebuilt on the client's new color system with tokens and site-wide WCAG AA, split into AEM modules — 40+ templates and 45+ modules shared across 23 departments. SUS for the new navigation and AI search rose 62 → 84.",
    features: [
      { title: "Turning abstract brand expectations into a visual vocabulary", body: "People come to the site to confirm what they found elsewhere, so it has to be recognizable within seconds. Our UI team studied how contemporary banks and mainstream AI products present themselves, pulled out flowing color, visual depth and motion as three elements, and proposed two directions built on them." },
      { title: "Motion and high-fidelity prototypes in Figma to align faster", body: "To show the AI was working, I designed an organic gradient light form with a breathing rhythm and small touches of motion such as a slowly rotating icon. I built the motion in Figma Animate and used Figma Sites to turn it into a working prototype running from the homepage to L2, so everyone watched the same screen rather than describing motion in meetings. Desktop and mobile were delivered together." },
      { title: "Building the design system from scratch, shaped by AEM", body: "Components and color rules first extended the homepage guideline, then were rebuilt on the client's new color system with tokens for quick changes and every component updated to hold WCAG AA. The modules follow how content is actually published in AEM and were checked on both desktop and mobile, bringing the site down to 40+ templates and 45+ modules that 23 departments can update themselves." }
    ],
    research: [
      { title: "Scope & deliverables", body: "The project ended after the validation stage and never went into development, so the team packaged what had been produced: the source files from every round of visual proposals, concept designs for key pages including the homepage and AI search, the design system, the modular template specifications, and the site-wide WCAG AA guidelines." },
      { title: "What holds a project back is rarely the design", body: "What slows things down is usually communication and decision-making rather than the design itself. The client's organization is large and every level has an opinion, so one proposal can come back with feedback pulling in opposite directions; finding out early who really holds that authority, and agreeing on how decisions would be made, would have made the whole engagement run far better." }
    ]
  },
  {
    slug: "tea-island-tea-stories",
    cardTitle: "Tea island, Tea stories",
    category: "interdisciplinary",
    categoryLabel: "Cultural Experience",
    homeMeta: "Cultural Experience ｜ Service Design",
    client: null,
    role: "UI/UX & Lead Visual",
    timeline: "2022/03–2023/05",
    hero: IMG + "Vcu76U8qMwwfcPJzYDfgQcTDRk.jpg",
    gallery: [
      IMG + "oWqsdRZp1XjEfR285hn2NxIGU.jpg",
      IMG + "NdwizdYBJm7o7n2P6wVuwcMc13E.jpg",
      IMG + "6JUrRP1XmafvZ17kv7HrqfSybMY.jpg",
      IMG + "EaeL9ZIxpeBQB3rdhgeoglldCI.jpg",
      IMG + "5i5NClGJQNODUsE09RrnublxI.jpg",
      IMG + "HxBZFKZhDnJnEWG72VCYYgCmso.jpg",
      IMG + "YXlfBhNXKQkGi7XTpbMidrZzA.png",
      IMG + "u2ILkZQLoBsPqbTEAQazthgqKg.jpg",
      IMG + "NBOLC0WKwyAAq9Gr1becTb267SE.jpg",
      IMG + "ZP5evuPm18gMoRVfzhuK0GROCE.jpg"
    ],
    title: "Tea island, Tea stories — Reimagining the tea-house experience through service design",
    intro: "A gamified ordering system that helps tea-house customers discover the tea that suits their taste. Starting from field research and a double-diamond process, we reimagined the whole service flow around \"blending tea\", designing a dual-track system so customers with different tea knowledge or game familiarity each follow a path that fits them. Awarded Indigo Silver (2024), Red Dot Design Concept final list (2023) and a VGW Award nomination.",
    challengeTitle: "Engaging younger customers without slowing service",
    challengeBody: "1. Deep tea culture felt old-fashioned and hard for younger people to approach, with no easy entry point.\n2. Literary item names and descriptions raised the barrier to choosing and ordering.\n3. Ordering relied on one-to-one staff guidance, creating queues at peak times.",
    solutionTitle: "A dual-track system that keeps experience and efficiency in balance",
    solutionBody: "We started from \"blending tea\" to rebuild the service from the ground up: a gamified collection flow that teaches tea knowledge through exploration, a menu rewritten in the customer's language, and a faster POS track for regulars — both paths sharing one visual language so the experience never feels fragmented.",
    features: [
      { title: "Gamified ordering experience", body: "Tea information is woven into a game where flavours and effects are discovered through exploration, bringing more imagination to ordering and lowering the barrier to choosing tea." },
      { title: "A faster track for regulars", body: "For customers familiar with tea or uninterested in the game, a redesigned POS interface offers a direct, quick way to choose and blend tea, keeping the same visual language as the game." },
      { title: "Bridging virtual and physical", body: "After the game, a uniquely named tea card is generated from the player's choices and served with the drink — a reason to collect and return, extending the experience beyond a single visit." }
    ],
    research: [
      { title: "Service blueprint and customer journey", body: "We visited traditional tea houses, experienced the full service flow and interviewed stakeholders, then mapped a service blueprint and an empathy / journey map of the customer's emotions before, during and after ordering to surface the real pain points." },
      { title: "Defining the visual world", body: "As lead visual, I researched 3D and game aesthetics and settled on a Low-Poly base balancing cute and real, verified through concept sketches and 3D tests against the small team's capacity and timeline." },
      { title: "Gamified tea-blending by six tea types", body: "The six major tea types became six exploration scenes, folding tea and topping information into play so customers build an intuition for flavour while they explore." }
    ]
  },
  {
    slug: "xnfun-app",
    cardTitle: "XnFun App",
    category: "uiux",
    categoryLabel: "Cloud Storage",
    homeMeta: "Cloud Storage ｜ Shared Album App",
    client: "USI Global (Taiwan)",
    role: "UI/UX Designer",
    timeline: "2022/08–2023/03",
    hero: IMG + "kFalKp6RbAvnYP1zIhRxjWzIdOo.jpg",
    gallery: [
      IMG + "BXF0CBBHbIjtqRGd31BRMA1MXs.jpg",
      IMG + "wlmW6GhT9We1eR0y3oomWgr0.jpg",
      IMG + "fmJooqdkivF5L3ptvDbjQLnW4.jpg",
      IMG + "Nr8M0YCrzJFzpaNq4tQgbTrN8.jpg",
      IMG + "53vv3yHapCpUoQxxeH6MvTFI.jpg",
      IMG + "H3SRRAaLihJ7L2BLiV4BOIBdGKs.jpg",
      IMG + "HsGblrcqPtNY08gwnZw4891Wjgs.jpg",
      IMG + "IZ6iUpvkhfEmOwe1MKLTUTAgt8.jpg",
      IMG + "Z7rG7G6Wrcz4GqraqoEhLDsnDo.jpg",
      IMG + "mqSoTbqm10O9OPBbnmt8gyChsFM.jpg"
    ],
    title: "XnFun — Optimising an existing system, building a modular new feature from 0 to 1",
    intro: "XnFun is a shared-album app paired with USI's XnBay smart storage server, offering photo backup, album sharing, comments and notifications. As the product grew from daily photos into travel and baby-growth scenarios, long-accumulated iOS / Android differences and a lack of extensible structure began to limit it. In a team of three UI/UX designers I owned the \"Travel Album\" from 0 to 1 and worked on cross-platform consistency and the design system.",
    challengeTitle: "Building an extensible new feature on top of an existing system",
    challengeBody: "1. iOS and Android differed in album naming, member management and more, raising usage and maintenance cost.\n2. As a cloud storage server, uploads kept accumulating but the timeline-only system made finding specific content hard.\n3. The album structure, built for daily photos, couldn't support new travel and baby scenarios without repeated design.",
    solutionTitle: "Unified cross-platform logic and a reusable design system",
    solutionBody: "I audited 14 key flows across iOS / Android and 4 permission levels to set a consistent interaction baseline, defined a \"date × location\" information architecture for the Travel Album, and systematised colour, icons, component states and interaction rules so Daily, Travel and Baby albums all reuse one module set.",
    features: [
      { title: "A consistent cross-platform baseline", body: "Walked 14 key flows across iOS / Android against 4 permission levels, then redesigned around error-prevention, permissions and consistency — confirmation and undo for irreversible actions, button states that express permission limits, and unified core interaction logic." },
      { title: "Travel Album from 0 to 1", body: "From guerrilla testing with 4 users and analysis of 8 competitors, I found people organise photos by time and place — so the Travel Album is built on \"date × location\" with memory keywords, notes, spot tags and a travel map for different ways to review and browse." },
      { title: "An extensible product design system", body: "Built shared rules for colour, icons, component states and cross-platform interaction, plus IX Flows for date, member and scroll scenarios — one spec for design, engineering and client, reused across Daily, Travel and Baby albums." }
    ],
    research: [
      { title: "Mapping both platforms and their differences", body: "A full product audit and functional map organised features, clarified flows and surfaced inefficiencies across the two platforms, pinpointing usability pain points and the areas to improve." },
      { title: "Testing and competitive analysis for the Travel Album", body: "Interviews with 4 users and analysis of 8 competitors showed people rely on time and place to understand and organise travel photos, which often get re-browsed for sorting and sharing — shaping a feature that supports both quick search and journey-led browsing." },
      { title: "Communicating with non-design stakeholders", body: "Using product screens and competitor examples, rather than UX jargon, helped stakeholders of different backgrounds grasp the problem quickly, and aligned interaction expectations with engineering faster." }
    ]
  }
];

function getProject(slug){
  return PROJECTS.find(p => p.slug === slug);
}

/* Case-study extras (metrics bar + Goal column), EN base. zh overlay in i18n.js */
const PROJECT_META = {
  "fubon-life": {
    metrics: [ { v: "180K", k: "Monthly active users" }, { v: "255 → 46", k: "Pages consolidated into templates" } ],
    goalBody: "Restructure the information architecture and simplify the menu to speed up navigation; communicate products in plain, user-centred language; and extend the group's tone with a younger, more approachable visual language."
  },
  "ctbc-bank": {
    metrics: [ { v: "62 → 84", k: "SUS — new nav & AI search (desktop)" }, { v: "40 / 45", k: "Templates / modules for 23 depts" } ],
    goalBody: "Build a younger, smarter and more distinctive image; organise content around what users are trying to do and strengthen the cues that lead to action; and create accessible modules that work in AEM across platforms."
  },
  "tea-island-tea-stories": {
    metrics: [ { v: "Silver", k: "Indigo Award 2024 — Interaction" }, { v: "Finalist", k: "Red Dot 2023 — Design Concept" } ],
    goalBody: "Fold tea knowledge into a gamified ordering flow; rewrite the menu in the customer's language; and run a dual-track system so experience never comes at the cost of efficiency."
  },
  "xnfun-app": {
    metrics: [ { v: "iOS + Android", k: "Unified core interactions" }, { v: "0 → 1", k: "Travel Album, date × location" } ],
    goalBody: "Unify the cross-platform interaction logic; organise content with more context than a bare timeline; and build an extensible design system new features can reuse."
  }
};

const ILLUST_IMAGES = [
  IMG + "gfqJJJHcyDm4FaechmT8BGUIvgE.png",
  IMG + "Y0mYZRZgPFXCOn5gYD5UmaLwNBU.png",
  IMG + "RDxCRkXqC7s6xPXWezkKQ2TczNE.png",
  IMG + "SNPx1WFlvq1Cjju55t2Dx9RV6Zo.png",
  IMG + "MHnVGRUTjiB2WQHP1y1FdjxihgE.png",
  IMG + "YeBDXf1UzBzFTRQTUETq7SfOLw.png",
  IMG + "O7IhRNIHSfT2EMK5VVdHBZRqQ.png",
  IMG + "4PZ9ErWb9oZGWwPjbwbIkdeCEY.png",
  IMG + "HTfSHs31AT7SUnhCAcAS9sE5WY.jpg",
  IMG + "mB36RbuvylVnOe3qmtGL3Vpe8.png",
  IMG + "BjstQ31L27g3D9AnyHMD9FlktTU.png",
  IMG + "XW3IPR5XBOTokThxoukQTaCiQEg.png",
  IMG + "4U8unIyey3UbMlLWFKNN3p14yc.png",
  IMG + "WaTPINumAwTtZKk3wM83cCkGGHU.png",
  IMG + "0BAP0KWtgAk5Ve5xCPIcY0YAHfg.png",
  IMG + "KI1ihbSBh519gmg8qgyV6fGwY.png",
  IMG + "6JJULnO13TEmG7k72JbW2C48BE.png",
  IMG + "fBqvuJ66SKk55ZPuScP9K7byG0.png",
  IMG + "CQqMgZWu7GDWrJze3JtkKGg9M.png",
  IMG + "4ScLQEYhD5PyjFi2XqdbKFhsWA.png",
  IMG + "ttbdYGFJC4kiVeRQjoz8FNdHY.png",
  IMG + "ZvzUwm2islThLx4zhuz9sVGkPWA.png",
  IMG + "nat3xfep2WwgsKISrNQeDUdOc.png",
  IMG + "Lsg6E1c7zXqxq1xh6ifSyzXLLMA.png",
  IMG + "NLJv0dQoZImfTPU5rAdAM455HoE.png"
];
