// Fowl Justice media (peichidesign.framer.website/work/fowl-justice) — video hero
import fjVideo from "/images/fowl-video.mp4";
import fjHero from "/images/fowl-hero.jpg";
import fjChars from "/images/fowl-chars.jpg";
import fjScenes from "/images/fowl-scenes.jpg";
// Under the Skirt / Digital Nomads / In Fact / One Way media live in public/case/playground/
const pg = (f: string) => `/case/playground/${f}`;

export interface PgBlock { label: string; text: string; }

export interface PgWork {
  title: string;
  eyebrow: string;
  card: string;
  overview: string[];
  blocks?: PgBlock[];                  // labelled sections (Concept, Story, My Role, Tools…)
  gallery?: string[];                  // showcase images, 3 per row
  zh?: { title: string; eyebrow: string; overview: string[]; blocks?: PgBlock[] };
}

export const PG_WORKS: PgWork[] = [
  {
    title: "What's Under the Skirt…", eyebrow: "Interactive Game｜2023.02–06", card: pg("skirt-hero.webm"),
    overview: ["An interactive game that combines a computer with physical devices. Players play the role of a teenager who tries to lift a girl's skirt by blowing before the bus arrives, while avoiding being seen by the character. If caught, the system takes a photo of the player and triggers a slap."],
    gallery: [pg("skirt-1.jpg"), pg("skirt-2.png"), pg("skirt-3.gif"), pg("skirt-4.gif"), pg("skirt-5.jpg"), pg("skirt-6.jpg")],
    blocks: [{ label: "Concept", text: "The game uses a Raspberry Pi to connect a microphone, camera, and servo motor, bringing together blowing detection, gaze detection, and physical feedback. The microphone detects the player's blowing, while the camera detects whether the player is peeking. If caught, the player gets slapped." }, { label: "My Role", text: "2D Motion · Game Concept" }],
    zh: { title: "裙子底下有…", eyebrow: "互動遊戲｜2023.02–06", overview: ["一款結合電腦與實體裝置的互動遊戲。玩家扮演一名青少年，在公車抵達前透過吹氣掀起少女裙擺，同時避開角色視線，若被發現，系統便會拍下玩家影像並觸發巴掌攻擊。"], blocks: [{ label: "理念", text: "遊戲以 Raspberry Pi 串接麥克風、攝影機與伺服馬達，將吹氣、視線偵測及實體回饋整合為互動機制。麥克風偵測玩家的吹氣動作，攝影機辨識玩家有沒有偷看，如果被抓到就會被打巴掌。" }, { label: "我的角色", text: "2D 動畫繪製 · 遊戲概念" }] },
  },
  {
    title: "Fowl Justice", eyebrow: "PC Game｜2020.10–2021.01 · 4 months", card: fjVideo,
    overview: ["A 2D vertical-scrolling action game where players take on the role of a turtledove warrior fighting invading pigeons to defend their home. I was responsible for character design, story concept, and animation, and collaborated with the programmer on game development."],
    blocks: [{ label: "Story", text: "One day, pigeons invaded the turtledoves' territory, using their sheer numbers to dominate, bully, and steal food. Oppressed and outnumbered, the turtledoves made a final stand—sending their strongest warrior to face the pigeon horde in a battle to reclaim their rightful home…" }, { label: "My Role", text: "Character Design · Story Concept · Animation" }],
    gallery: [fjHero, fjChars, fjScenes],
    zh: { title: "鳩地正法", eyebrow: "PC 遊戲｜2020.10–2021.01 · 4 個月", overview: ["一款 2D 直向捲軸動作遊戲，玩家扮演斑鳩戰士，對抗入侵的鴿群並保衛家園。我負責角色設計、故事概念與動畫，並與程式設計成員共同完成遊戲開發。"], blocks: [{ label: "故事", text: "某一天，鴿子大舉入侵斑鳩的地盤，仗著數量優勢橫行霸道、欺壓斑鳩，甚至搶奪牠們的食物。面對強勢又人多勢眾的敵人，飽受壓迫的斑鳩們決定背水一戰，派出族群中最強大的戰士，迎戰成群的鴿子，誓要奪回原本屬於自己的家園……" }, { label: "我的角色", text: "角色設計 · 故事概念 · 動畫" }] },
  },
  {
    title: "Digital Nomads: Global Lifestyle Rise and Local Impact", eyebrow: "Data Visualization｜2024.04–05 · 2 months", card: pg("nomad-hero.jpg"),
    overview: ["This project was developed as part of a data visualization course in collaboration with UJN, focusing on uncovering narratives within existing data. By combining data with journalism, it explores the growing presence of digital nomads and their impact on local communities, presenting the findings through scrollytelling. With an illustrated style UI, the website creates an immersive journey where users follow the story as they scroll, discovering key issues and insights along the way."],
    blocks: [{ label: "Challenge", text: "1. Clarify the ambiguous term “digital nomad” and its varying definitions.\n2. Focus on key aspects: coworking spaces and micro apartments for a travel lifestyle.\n3. Simplify wireframe design and consolidate complex ideas.\n4. Create a clear, engaging narrative to visualize the impact of digital nomads on local communities." }, { label: "My Role", text: "Research · Web Development" }],
    gallery: [1, 2, 3, 4, 5].map((n) => pg(`nomad-show${n}.${n <= 2 ? "png" : "jpg"}`)),
    zh: { title: "數位遊牧：全球生活型態的興起與在地影響", eyebrow: "資料可視化｜2024.04–05 · 2 個月", overview: ["本專案為與 UJN 合作的資料視覺化課程作品，旨在從既有資料中挖掘故事。透過結合數據與新聞報導，探討數位遊牧者日益增加的現象，以及他們對在地社群帶來的影響，並以 Scrollytelling 呈現研究成果。結合插畫風格的介面設計，將網站轉化為一場沉浸式探索旅程，隨著頁面捲動，跟隨數位遊牧者探索其中的重要議題與洞察。"], blocks: [{ label: "挑戰", text: "1. 釐清「數位遊牧者」一詞模糊且多元的定義。\n2. 聚焦於共享工作空間與微型公寓，探討適應旅行生活型態的居住與工作模式。\n3. 簡化線框稿設計，整合複雜的概念與資訊。\n4. 建立清晰且引人入勝的敘事脈絡，視覺化呈現數位遊牧者對在地社群的影響。" }, { label: "我的角色", text: "研究 · 網頁開發" }] },
  },
  {
    title: "In Fact", eyebrow: "VR Interactive Experience｜2021.10–2022.01 · 4 months", card: pg("infact-hero.webm"),
    overview: ["A VR interactive experience exploring how one-sided information shapes our perception. Participants experience the same event from two opposing media perspectives, piece together fragmented clues, and form their own understanding of what happened."],
    blocks: [{ label: "My Role", text: "3D Modeling · Visual Design · Sound Design" }],
    gallery: [1, 2, 3, 4, 5, 6].map((n) => pg(`infact-${n}.jpg`)),
    zh: { title: "其實…", eyebrow: "VR 互動體驗｜2021.10–2022.01 · 4 個月", overview: ["透過 VR 體驗的方式走進報導背後的不同視角尋找真相，以兩種相對的觀點講述同一事件，讓體驗者從碎片化的資訊中，建構自己的看法，拼湊出自己所認定的事實。"], blocks: [{ label: "動機與目的", text: "許多時候所見不一定為所得，但在最初依舊容易被單方面的說詞誤導，得出不全面而偏頗的看法。假設我們能看到事件背後的故事，看法會有所改變嗎？" }, { label: "理念", text: "以 VR 虛擬展場的形式，透過立場各異的媒體描述同一件事情，讓體驗者置身於充斥碎片化資訊的環境中，省思片面事實帶給人們的影響。\n體驗者最初會進到佈滿報紙的展場中，其中兩張大報紙則為通往事件的入口。靠近後使用者將被傳送到新聞背後的案發現場。透過不同的線索，嘗試拼湊出事實的真相。在兩輪體驗結束後，回到最開始的展場中選擇自己認定的真相。" }, { label: "我的角色", text: "3D 建模 · 報紙設計 · 聲音設計" }] },
  },
  {
    title: "One Way", eyebrow: "Interactive Experience｜2020.10–2021.01 · 4 months", card: pg("oneway-hero.webm"),
    overview: ["ONE WAY is an interactive installation built around the idea of operating a train through time. It uses a finite railway journey as a metaphor for the passage of life. Since the journey can only be taken once, its pace—fast or slow—is entirely in the participant’s hands."],
    blocks: [{ label: "Concept", text: "We wanted to create an interactive installation that reminds participants that their lives are in their own hands, while time is always moving forward. The four seasons represent key stages of life—school, work, marriage, and old age. The changing elevations of the track also symbolize life’s ups and downs. Participants take on the role of the conductor, controlling the train’s speed and, in turn, the scenery they encounter along the way." }, { label: "My Role", text: "3D Modeling · Exhibition Design · Scene Design · Hardware Prototyping" }],
    gallery: [1, 2, 3, 4, 5, 6].map((n) => pg(`oneway-${n}.${n === 4 ? "png" : "jpg"}`)),
    zh: { title: "One Way", eyebrow: "互動體驗｜2020.10–2021.01 · 4 個月", overview: ["ONE WAY 是以「駕駛時間列車」為題的互動裝置。在體驗中，體驗者的人生歲月將隱喻為有限的鐵道旅程。僅有一次機會的路途是快或慢，全取決於體驗者的意志。"], blocks: [{ label: "理念", text: "我們希望能製作一個互動裝置，讓體驗者重新認知人生是由自己所掌握的，並且時間無時無刻都在流逝。春夏秋冬代表人生中必經的過程——校園、職場、婚禮、晚年，隨著軌道的高低變化，也暗喻著人生遇到的跌宕。體驗者將扮演「車長」的角色，控制列車的行進速度，列車行駛的快慢將影響路途上的景色……。" }, { label: "我的角色", text: "3D 建模 · 展場設計 · 場景設計 · 硬體原型" }] },
  },
];
