import c1 from "/assets/pg-card-1.png";
// Digital Nomads media (peichidesign.framer.website/work/cities-mapping-digital-nomads)
import dnHero from "/images/Pn5gBOXaYtFSO4ljjnIStmigs.jpg";
import dnShow1 from "/images/DHhCyOmMP948lkouiQh79v9IS2A.png";
import dnShow2 from "/images/sqsMdk5nO5tPyLgwIENDB60Xw.png";
import dnShow3 from "/images/FA3OMDPKG9LtI70yVabrXsKY64Y.jpg";
// Fowl Justice media (peichidesign.framer.website/work/fowl-justice) — video hero
import fjVideo from "/images/fowl-video.mp4";
import fjHero from "/images/zg7TxwrcPaOD9Vh1vO7CKiC8oII.jpg";
import fjChars from "/images/7RaER4SCg7SxNwy4j1XUoOFHeAU.jpg";
import fjScenes from "/images/I8WxqRT6tvbmut8kqQug019NuXU.jpg";
// In Fact media (original portfolio) — YouTube hero
import ifHero from "/images/infact-hero.jpg";
import ifShow1 from "/images/infact-1.jpg";
import ifShow2 from "/images/infact-2.jpg";
// One Way media (original portfolio) — YouTube hero
import owHero from "/images/oneway-hero.jpg";
import owShow1 from "/images/oneway-1.jpg";
import owShow2 from "/images/oneway-2.jpg";

export interface PgWork {
  title: string;
  eyebrow: string;
  card: string;
  overview: string[];
  block?: { label: string; text: string };
  gallery?: string[];                  // up to 3 showcase images
  zh?: { title: string; eyebrow: string; overview: string[]; block?: { label: string; text: string } };
}

export const PG_WORKS: PgWork[] = [
  {
    title: "Under the Skirt", eyebrow: "Interactive Installation | 2022", card: c1,
    overview: [
      "An interactive installation linking camera and sensors, where the viewer's movement reshapes the projection in real time.",
      "I led the visual design and interaction flow, building it with an engineering partner.",
    ],
    block: { label: "About", text: "A class experiment exploring the relationship between the body and projected image." },
    zh: { title: "裙子底下有...", eyebrow: "互動裝置 | 2022", overview: ["一件連動攝影機與感測器的互動裝置，觀者的動作會即時重塑投影畫面。", "我主導視覺設計與互動流程，與工程夥伴一起完成。"], block: { label: "關於", text: "一堂課的實驗，探索身體與投影影像之間的關係。" } },
  },
  {
    title: "Fowl Justice", eyebrow: "PC Game | 2021", card: fjVideo,
    overview: [
      "A 2D vertical-scrolling action game across four levels. You play the turtledoves' last, strongest warrior, reclaiming a home overrun by invading pigeons.",
      "As lead visualizer I did character design, key art and animation, with a UI designer and a programmer.",
    ],
    block: { label: "Outcome", text: "Shown at the final exhibition and opened up to other departments — our game won first place in the audience-vote popularity award." },
    gallery: [fjHero, fjChars, fjScenes],
    zh: { title: "鳩地正法", eyebrow: "PC 遊戲 | 2021", overview: ["一款四關卡的 2D 縱向捲軸動作遊戲。你扮演斑鳩族最後、也最強的戰士，奪回被入侵鴿群佔據的家園。", "身為主視覺，我負責角色設計、主視覺與動畫，與一位 UI 設計師和一位工程師合作。"], block: { label: "成果", text: "於畢業展展出並開放給其他系所體驗，遊戲獲得觀眾票選人氣獎第一名。" } },
  },
  {
    title: "Digital Nomads", eyebrow: "Data Visualisation | 2024", card: dnHero,
    overview: ["A data-journalism scrollytelling site made in a data-visualisation course with the Urban Journalist Network (UJN). Using open data, it examines the rise of digital nomads and their impact on local communities."],
    block: { label: "What I did", text: "Research & framing — reviewed papers, reports and case studies to define “digital nomad” and back the story with evidence.\nData & visualisation — collected and structured data from multiple sources, then built charts and maps in Datawrapper and D3.js.\nVisual & story design — set the illustrated visual style and shaped the scrollytelling flow that guides readers through the story." },
    gallery: [dnShow1, dnShow2, dnShow3],
    zh: { title: "數位遊牧", eyebrow: "資料視覺化 | 2024", overview: ["一個在資料視覺化課程中、與城市記者網絡（Urban Journalist Network, UJN）合作完成的資料新聞 scrollytelling 網站。運用公開資料，檢視數位遊牧的興起，以及他們對在地社群的影響。"], block: { label: "我做了什麼", text: "研究與定位——爬梳論文、報告與案例研究，定義「數位遊牧」，並以證據支撐整個敘事。\n資料與視覺化——從多個來源蒐集並整理資料，以 Datawrapper 與 D3.js 製作圖表與地圖。\n視覺與敘事設計——定調插畫式視覺風格，規劃引導讀者的 scrollytelling 敘事流程。" } },
  },
  {
    title: "In Fact", eyebrow: "VR Interactive Experience | 2021–22", card: "https://www.youtube.com/embed/XOMniF4ePP8",
    overview: [
      "A VR experience that walks you behind the headlines. The same custody dispute is told from two opposing viewpoints, so you piece your own “truth” together from fragments of information.",
      "I handled 3D modelling, newspaper design and sound, in a retro black-and-white, newsprint-toned world.",
    ],
    block: { label: "Concept", text: "Starting in a hall papered with newspapers, two large front pages become portals into the scene behind the news — a reflection on how partial facts shape what we believe." },
    gallery: [ifHero, ifShow1, ifShow2],
    zh: { title: "其實", eyebrow: "VR 互動體驗 | 2021–22", overview: ["一段帶你走到新聞背後的 VR 體驗。同一起監護權爭議，從兩個對立的視角敘述，你得從零散的資訊中拼湊出自己的「真相」。", "我負責 3D 建模、報紙設計與聲音，打造一個復古黑白、報紙色調的世界。"], block: { label: "概念", text: "從一座貼滿報紙的大廳開始，兩張大型頭版成為通往新聞背後場景的入口——反思片面的事實如何形塑我們的認知。" } },
  },
  {
    title: "One Way", eyebrow: "Interactive Installation | 2019–21", card: "https://www.youtube.com/embed/cZy6JV_IXLc",
    overview: [
      "An interactive installation themed around “driving the train of time” — a lifetime cast as a single, one-way rail journey whose pace is entirely up to you.",
      "As 3D / scene designer I built the four worlds — spring, summer, autumn, winter — mapped to school, career, marriage and old age.",
    ],
    block: { label: "Concept", text: "The viewer plays the conductor, controlling the train's speed; how fast you travel changes the scenery you pass. A reminder that life is finite — and ours to steer." },
    gallery: [owHero, owShow1, owShow2],
    zh: { title: "One Way", eyebrow: "互動裝置 | 2019–21", overview: ["一件以「駕駛時間列車」為題的互動裝置——把一生比喻成一段速度由你掌控的單向鐵道旅程。", "身為 3D／場景設計師，我打造了春、夏、秋、冬四個世界，分別對應求學、職場、婚姻與年老。"], block: { label: "概念", text: "觀者扮演列車長，控制列車速度；前進的快慢會改變沿途的風景。提醒著：人生有限，而方向由我們掌舵。" } },
  },
];
