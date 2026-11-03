import c1 from "/assets/pg-card-1.png";
import c2 from "/assets/pg-card-2.png";
import c3 from "/assets/pg-card-3.png";
import c4 from "/assets/pg-card-4.png";
import c5 from "/assets/pg-card-5.png";

export interface PgWork {
  title: string;
  eyebrow: string;
  card: string;
  overview: string[];
  block?: { label: string; text: string };
  gallery?: string[];                  // up to 3 showcase images
}

export const PG_WORKS: PgWork[] = [
  {
    title: "Under the Skirt", eyebrow: "Interactive Installation | 2022", card: c1,
    overview: [
      "An interactive installation linking camera and sensors, where the viewer's movement reshapes the projection in real time.",
      "I led the visual design and interaction flow, building it with an engineering partner.",
    ],
    block: { label: "About", text: "A class experiment exploring the relationship between the body and projected image." },
  },
  {
    title: "Fowl Justice", eyebrow: "PC Game | 2021", card: c2,
    overview: [
      "A 2D vertical-scrolling action game across four levels. You play the turtledoves' last, strongest warrior, reclaiming a home overrun by invading pigeons.",
      "As lead visualizer I did character design, key art and animation, with a UI designer and a programmer.",
    ],
    block: { label: "Outcome", text: "Shown at the final exhibition and opened up to other departments — our game won first place in the audience-vote popularity award." },
  },
  {
    title: "Digital Nomads", eyebrow: "Data Visualisation | 2024", card: c3,
    overview: ["A data-visualisation course project with UJN, uncovering narratives in existing data about the rise of digital nomads and their impact on local communities."],
  },
  {
    title: "In Fact", eyebrow: "VR Interactive Experience | 2021–22", card: c4,
    overview: [
      "A VR experience that walks you behind the headlines. The same custody dispute is told from two opposing viewpoints, so you piece your own “truth” together from fragments of information.",
      "I handled 3D modelling, newspaper design and sound, in a retro black-and-white, newsprint-toned world.",
    ],
    block: { label: "Concept", text: "Starting in a hall papered with newspapers, two large front pages become portals into the scene behind the news — a reflection on how partial facts shape what we believe." },
  },
  {
    title: "One Way", eyebrow: "Interactive Installation | 2019–21", card: c5,
    overview: [
      "An interactive installation themed around “driving the train of time” — a lifetime cast as a single, one-way rail journey whose pace is entirely up to you.",
      "As 3D / scene designer I built the four worlds — spring, summer, autumn, winter — mapped to school, career, marriage and old age.",
    ],
    block: { label: "Concept", text: "The viewer plays the conductor, controlling the train's speed; how fast you travel changes the scenery you pass. A reminder that life is finite — and ours to steer." },
  },
];
