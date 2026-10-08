/* Bilingual (EN / 繁中) layer. Default English; choice persists.
   - UI: static interface strings by key.
   - PROJECT_ZH / ABOUT_ZH: Chinese overrides layered over the English
     source in data.js (English base keeps images / slug / category).
   Render code calls t(key), projectView(p) and aboutView(). */

const SUPPORTED = ["en", "zh"];
const DEFAULT_LANG = "en";

const UI = {
  en: {
    "nav.about": "About", "nav.work": "Work", "nav.playground": "Playground", "nav.resume": "Resume ↗",

    "hero.title": "Hi, I'm Peichi",
    "hero.subtitle": "A Product Designer crafting innovative and user-friendly solutions.",

    "home.experience": "Experience",
    "home.exp.t1": "UI/UX Design Roles",
    "home.exp.d1": "Focusing on user research and prototype, gaining hands-on experiences.",
    "home.exp.t2": "Freelance & Creative Projects",
    "home.exp.d2": "Practical proficiency in diverse mediums through independent assignments.",
    "home.more": "More →",
    "home.selectedWork": "Selected Work",
    "home.featureWorks": "Feature Works",
    "home.viewWork": "View my work",
    "home.openTitle": "Open for New Opportunities",
    "home.openDesc": "I'm currently available and excited to take on new projects! If you're looking for a creative partner to bring your ideas to life, let's collaborate and create something amazing together. Feel free to reach out!",
    "home.contactMe": "Contact Me",

    "work.portfolio": "Portfolio",
    "work.title": "Checkout my works",
    "work.desc": "I love exploring different design mediums, from graphic design to interactive media, keeping my ideas fresh and creative.",
    "filter.all": "All", "filter.uiux": "UI | UX", "filter.interdisciplinary": "Interdisciplinary", "filter.graphic": "Graphic | Motion",

    "pg.label": "Playground",
    "pg.title": "Side projects & experiments",
    "pg.desc": "A space for my self-initiated work — illustration, graphic design, and small tools I build for fun.",
    "pg.illustration": "Illustration", "pg.ai": "AI Tools", "pg.graphic": "Graphic",
    "pg.aiSoon": "AI Tools — coming soon", "pg.graphicSoon": "Graphic Design — coming soon",
    "pg.aiLine": "Small AI-powered tools and experiments I'm building for fun — landing here soon.",
    "pg.graphicLine": "Graphic design pieces and visual experiments — landing here soon.",

    "about.label": "About Me",
    "about.name": "Peichi Lin",
    "about.bio": "I'm a product designer based in Taiwan, driven by curiosity and creativity. I thrive on experimenting with styles and media to craft engaging digital experiences and compelling stories that enhance user interactions. Let's bring extraordinary ideas to life!",
    "about.experience": "Experience", "about.education": "Education", "about.specialize": "Specialize", "about.award": "Award", "about.language": "Language",
    "about.beyond": "Beyond Work",
    "about.beyondDesc": "〔One personal line — who you are outside work: hobbies, what you're into lately.〕",
    "about.currently": "Currently",
    "about.reading": "Reading", "about.listening": "Listening", "about.into": "Into", "about.based": "Based in",
    "about.readingV": "〔current book〕", "about.listeningV": "〔playlist / podcast〕", "about.intoV": "〔what you're into〕", "about.basedV": "Taiwan",
    "about.findme": "Find me",

    "project.industry": "Industry", "project.client": "Client", "project.role": "My Role", "project.timeline": "Timeline",
    "project.overview": "Overview", "project.challenge": "Challenge", "project.solution": "Solution",
    "project.feature": "Feature", "project.research": "Research", "project.showcase": "Showcase", "project.back": "← Back to work",

    "contact.getInTouch": "Get in touch", "contact.title": "Let's create together!",
    "footer.linkedin": "LinkedIn", "footer.medium": "Medium", "footer.email": "Email",
    "footer.copy": "© 2026 Peichi Lin. All rights reserved."
  },
  zh: {
    "nav.about": "關於我", "nav.work": "作品", "nav.playground": "Playground", "nav.resume": "履歷 ↗",

    "hero.title": "嗨，我是 Peichi",
    "hero.subtitle": "一位打造創新且友善使用者體驗的產品設計師。",

    "home.experience": "經歷",
    "home.exp.t1": "UI/UX 設計職務",
    "home.exp.d1": "專注於使用者研究與原型設計，累積實務經驗。",
    "home.exp.t2": "接案與創意專案",
    "home.exp.d2": "透過獨立接案，累積多元媒材的實作能力。",
    "home.more": "更多 →",
    "home.selectedWork": "精選作品",
    "home.featureWorks": "精選作品集",
    "home.viewWork": "查看我的作品",
    "home.openTitle": "歡迎洽談新機會",
    "home.openDesc": "我目前正在尋找新的合作機會！如果你正在尋找能將想法化為現實的創意夥伴，歡迎與我聯絡，一起打造精彩的作品。",
    "home.contactMe": "聯絡我",

    "work.portfolio": "作品集",
    "work.title": "看看我的作品",
    "work.desc": "我喜歡探索不同的設計媒材，從平面設計到互動媒體，讓我的創意保持新鮮與活力。",
    "filter.all": "全部", "filter.uiux": "UI | UX", "filter.interdisciplinary": "跨領域專案", "filter.graphic": "平面設計 | 動態設計",

    "pg.label": "Playground",
    "pg.title": "side project 與實驗",
    "pg.desc": "這裡是我自發性創作的空間——插畫、平面設計，以及一些為了好玩而做的小工具。",
    "pg.illustration": "插畫", "pg.ai": "AI 工具", "pg.graphic": "平面設計",
    "pg.aiSoon": "AI 工具 — 即將推出", "pg.graphicSoon": "平面設計 — 即將推出",
    "pg.aiLine": "為了好玩而打造的 AI 小工具與實驗，即將在這裡登場。",
    "pg.graphicLine": "平面設計作品與視覺實驗，即將在這裡登場。",

    "about.label": "關於我",
    "about.name": "林沛琪 Peichi Lin",
    "about.bio": "我是一位來自台灣的產品設計師，對世界充滿好奇與創造力。我熱衷於嘗試各種風格與媒材，打造引人入勝的數位體驗與動人的故事，藉此提升使用者互動。讓我們一起把非凡的點子化為現實！",
    "about.experience": "工作經歷", "about.education": "學歷", "about.specialize": "專長工具", "about.award": "獲獎經歷", "about.language": "語言能力",
    "about.beyond": "工作之外",
    "about.beyondDesc": "〔用一句話寫寫工作以外的你——興趣、最近著迷的事。〕",
    "about.currently": "近況",
    "about.reading": "閱讀", "about.listening": "聆聽", "about.into": "著迷", "about.based": "座標",
    "about.readingV": "〔最近在讀〕", "about.listeningV": "〔歌單 / podcast〕", "about.intoV": "〔最近著迷的事〕", "about.basedV": "台灣",
    "about.findme": "找我",

    "project.industry": "產業", "project.client": "客戶", "project.role": "我的角色", "project.timeline": "專案期間",
    "project.overview": "專案概覽", "project.challenge": "挑戰", "project.solution": "解決方案",
    "project.feature": "功能亮點", "project.research": "研究過程", "project.showcase": "作品展示", "project.back": "← 返回作品",

    "contact.getInTouch": "保持聯絡", "contact.title": "讓我們一起創作！",
    "footer.linkedin": "LinkedIn", "footer.medium": "Medium", "footer.email": "Email",
    "footer.copy": "© 2026 林沛琪 Peichi Lin. 版權所有。"
  }
};

/* Chinese overrides per project (layered over English base in data.js) */
const PROJECT_ZH = {
  "green-english": {
    categoryLabel: "教育", client: "Green English 美語（台灣）", role: "UIUX / 網站開發", timeline: "2024/12-2025/2",
    title: "Green English — 打開文字的鑰匙",
    intro: "Green English 是嘉義深耕近 20 年、值得信賴的英語教育品牌。我重新梳理品牌方向，並設計具備 CMS 後台的 WordPress 網站，方便日後自行更新內容。網站串連學生、家長與機構，提供課程資訊、活動更新，以及過往活動的作品集展示。",
    challengeTitle: "為小型教育品牌建立獨特識別",
    challengeBody: "1. 拓展曝光並強化行銷成效\n2. 與強調升學考試的競爭者做出區隔\n3. 系統性整理過往活動紀錄",
    solutionTitle: "溫暖且聚焦品牌的網站識別",
    solutionBody: "網站設計採取溫暖且親和的風格，呼應品牌以社群與成長為核心的理念。透過圓角造型與柔和色調，營造出令人安心的氛圍。WordPress CMS 讓客戶能輕鬆管理內容，持續與社群保持互動，同時鞏固品牌作為值得信賴的教育夥伴的形象。",
    features: [
      { title: "以品牌為核心的網站設計", body: "運用品牌代表性的綠色強化識別，友善的版面設計確保瀏覽動線清楚，協助拓展在地口碑之外的觸及範圍，同時維持親和且值得信賴的形象。" },
      { title: "凸顯以成長為核心的教學理念", body: "打造強調孩童發展歷程的品牌識別與網站設計，使 Green English 有別於強調應試的競爭對手。" },
      { title: "標誌重新設計與印刷物件", body: "重新設計品牌標誌，並將全新識別延伸應用至各式印刷物件，確保各平台呈現一致且專業的視覺形象。" }
    ],
    research: [
      { title: "競品研究與分析", body: "深入分析傳統與線上教育機構的競品，評估其網站設計風格、架構與使用者流程。根據研究結果規劃出完整的網站架構圖，確保網站符合最佳實踐，同時保有 Green English 獨特的品牌識別。" },
      { title: "視覺風格定義與品牌識別研究", body: "我發展了四款不同的標誌概念，分別呈現 Green English 品牌的不同面向。最終客戶選擇了最能傳達其陪伴成長、社群導向精神的設計。" },
      { title: "初版線框稿修正與後續可行性評估", body: "我一開始將品牌色大量延伸至線框稿以營造活潑感，但發現色彩過重反而造成視覺負擔；加上 WordPress 開發限制，進一步限縮設計彈性，因此重新調整版面以取得更好的平衡與可用性。" }
    ]
  },
  "darwin-lab": {
    categoryLabel: "Web3", client: "Darwin Lab（中國）", role: "UIUX / 互動設計", timeline: "2024/11-2025/1",
    title: "Darwin Lab — 讓真實世界價值與區塊鏈接軌",
    intro: "DarwinLabs 是一個創新的 Web3 金融中介平台，透過債券結構提供不同風險偏好的投資選項，讓投資人能依據自身風險承受度選擇合適的商品。我協助品牌形象、官網 UIUX 與互動原型設計，與另一位設計師合作，共同打造銜接傳統金融與數位未來的流暢體驗。",
    challengeTitle: "如何在 Web3 中平衡傳統與創新？",
    challengeBody: "挑戰在於打造有別於其他區塊鏈產品的獨特視覺識別，同時傳遞穩定與信任感。我們也需要將 REAL Card App 無縫整合進網站，使其適應 Web3 情境，同時不打亂原有的使用者體驗。",
    solutionTitle: "在極簡風格與 Web3 創新之間取得和諧",
    solutionBody: "以簡約設計搭配清晰的色彩計畫與字體排版，喚起信任與穩定感。為了自然融入 Web3 元素，我們加入細膩的動畫效果，在不增加過多開發複雜度的前提下提升沉浸感，打造平衡且易用的平台。",
    features: [
      { title: "資訊視覺化", body: "與 AI 協作，將複雜資訊簡化為清楚易懂的訊息，並將部分資訊視覺化呈現，讓使用者更直覺理解網站內容與架構。" },
      { title: "3D 與玻璃擬態視覺設計", body: "在傳統金融與 Web3 美學之間取得平衡，將 3D 元素融入扁平化設計，強化深度與未來感。玻璃擬態效果增添精緻質感，同時維持清晰度與可用性。" },
      { title: "將 Web3 錢包整合進官方網站", body: "在網站設計定案後，我們針對原本獨立的錢包產品進行迭代，將其功能自然整合進平台。此整合確保體驗的一致性，同時維持企業官網應有的專業感。" }
    ],
    research: [
      { title: "相關產品探索與風格分析", body: "分析超過 15 個 Web3 品牌並歸納其視覺風格以掌握設計趨勢，作為在創新、可用性與品牌差異化之間取捨的依據。" },
      { title: "多元 UI 設計風格探索", body: "探索多種設計方向，包括 Web3 領域廣泛採用的賽博龐克美學。為了進一步推進未來感，我與 AI 協作生成 3D 元素，強化視覺深度並打造更具沉浸感、前瞻性的體驗。" }
    ]
  },
  "cities-mapping-digital-nomads": {
    categoryLabel: "數據新聞", client: "Urban Journalist Network", role: "研究 / 網頁開發", timeline: "2024/4-2024/5",
    title: "數位遊牧：全球生活型態的興起與在地衝擊",
    intro: "本專案為資料視覺化課程的一部分，與 UJN 合作，聚焦於從既有資料中挖掘故事。透過結合資料與新聞敘事，探討數位遊牧族日漸增加的現象及其對在地社群的影響，並以報導式的呈現手法整理成果。",
    challengeTitle: "釐清並視覺化數位遊牧族的影響",
    challengeBody: "1. 釐清「數位遊牧族」一詞的模糊定義與各種解讀方式。\n2. 聚焦關鍵面向：共同工作空間與小坪數公寓等旅居生活型態。\n3. 簡化線框設計，統整複雜的概念內容。\n4. 打造清晰且引人入勝的敘事，呈現數位遊牧族對在地社群的影響。",
    solutionTitle: "以插畫介面打造沉浸式滾動敘事",
    solutionBody: "我們採用滾動敘事（scrolly-telling）手法，搭配插畫風格介面設計，將網站轉化為一趟沉浸式的旅程。使用者隨著滾動跟隨數位遊牧族的故事，逐步探索關鍵主題與洞察。此設計旨在打造引人入勝的視覺體驗，引導使用者理解敘事，使故事兼具互動性與視覺吸引力。",
    features: [
      { title: "滾動敘事結構", body: "我將網站架構為一段旅程，讓使用者能透過流暢的滾動互動探索數位遊牧族的故事。" },
      { title: "插畫風格介面", body: "我發展出獨特的視覺風格以強化敘事效果，讓複雜的數據更容易理解與親近。" },
      { title: "無縫整合資料圖表", body: "我使用 Datawrapper 製作多種資料圖表，確保統計洞察能清楚有效地支撐敘事內容。" }
    ],
    research: [
      { title: "故事探索與文獻回顧", body: "我們探索既有資料集，找出與數位遊牧族相關且有意義的模式與敘事。為提升研究可信度，我參考了學術論文、報告與案例研究，為故事提供脈絡與佐證。" },
      { title: "資料蒐集、分析與視覺化", body: "我們從多個來源蒐集並整理相關資料，確保其準確性與可靠性。透過將資料整理為可驗證的證據，產出清楚、有資料支持的洞察，並運用 Datawrapper、D3.js 及插畫等視覺化工具，以易懂且吸引人的方式呈現複雜資訊。" },
      { title: "草圖與初期線框稿", body: "在定義視覺風格時，我著重於在趣味性與清晰的資料視覺化之間取得平衡。初版線框稿色彩過於繽紛，反而分散注意力並削弱新聞內容與資料之間的連結。因此我簡化配色方案，確保視覺元素是支撐而非蓋過敘事本身。最終設計維持吸引人的插畫風格，同時聚焦於資訊與資料洞察的流暢整合。" }
    ]
  },
  "tea-island-tea-stories": {
    categoryLabel: "文化體驗", client: null, role: "產品設計師 / 動畫師", timeline: "2022/5~2023/5",
    title: "茶島，茶物語 — 活化台灣茶文化，重新定義茶館體驗",
    intro: "「茶島，茶物語」是一套遊戲化點餐系統，協助茶館顧客找到適合自己口味的茶。在遊戲中，玩家扮演一位受村中長老委派特殊任務的冒險者。玩家在遊戲中所做的每個決定，都會影響最終調配出的茶——那正是遊戲的目標，也是玩家在現實中將會拿到的那杯茶。",
    challengeTitle: "吸引年輕族群並優化服務流程",
    challengeBody: "1. 讓茶文化對年輕世代更具吸引力\n2. 提升服務效率",
    solutionTitle: "以遊戲化點餐系統重新設計茶館體驗",
    solutionBody: "我們從「跳茶」出發，以全新角度徹底重新構思服務流程。設計雙軌系統以滿足不同顧客需求，提升服務流暢度，打造更個人化、更有效率的茶館體驗。",
    features: [
      { title: "數位整合與遊戲化點餐體驗", body: "將茶品資訊融入遊戲之中，讓顧客能在探索過程中認識茶品，為點餐帶來更多想像空間。" },
      { title: "一般點餐系統", body: "針對熟悉茶品或不想玩遊戲的顧客，我們提供更直覺、快速的點餐系統，滿足不同類型顧客的需求。" },
      { title: "虛實整合設計", body: "為強化個人化體驗，遊戲中命名的茶卡將隨茶品一同送出，增加茶與玩家之間的連結，同時吸引喜愛收集的顧客再次光臨。" }
    ],
    research: [
      { title: "服務藍圖與顧客旅程地圖繪製", body: "我們實際走訪傳統茶館體驗服務流程，訪談相關利害關係人，並繪製服務藍圖與顧客旅程地圖，藉此找出痛點。" },
      { title: "使用者輪廓定義", body: "根據觀察結果，我們定義出兩種主要使用者輪廓：1. 已具備充分茶知識、較資深年長的顧客。2. 對茶所知不多，但對茶文化抱有好奇心的年輕世代。" },
      { title: "視覺識別 / 美術風格定義", body: "身為主美術，我針對 3D 美術與遊戲美學進行大量研究，打造出兼具辨識度與製作可行性的風格。目標是在維持強烈品牌識別的同時兼顧製作效率。透過反覆修正概念草圖，我們發展出兼顧視覺吸引力與專案時程內可執行性的一致 3D 場景。" }
    ]
  },
  "xnfun-app": {
    categoryLabel: "雲端儲存 / 數位媒體", client: "USI Global（台灣）", role: "UIUX 設計師", timeline: "2022/10-2023/5",
    title: "XnFun — 記錄回憶，分享日常",
    intro: "XnFun App 是搭配 XnBay 智慧儲存伺服器的共享相簿應用程式，提供照片備份與相簿分享功能。我協助優化介面、強化社群功能，並主責設計與建置「旅行相簿」與「寶寶相簿」功能。",
    challengeTitle: "解決系統落差並提升使用者黏著度",
    challengeBody: "1. 系統邏輯不一致\n2. 缺乏直覺的導航設計\n3. 客戶端的產品願景\n\n該如何在整合符合使用者需求與客戶願景的新功能的同時，優化既有邏輯與設計？",
    solutionTitle: "以使用者為核心重新定義體驗",
    solutionBody: "模組化設計：提升延展性與彈性。\n介面優化：強化導航與可用性。\n新增功能：在使用者需求與客戶願景之間取得平衡。",
    features: [
      { title: "介面優化與社群功能強化", body: "我們優化 UI 以打造更直覺的體驗，同時導入社群功能。新增互動元素以打造更具沉浸感的瀏覽體驗，鼓勵互動並促成流暢的照片分享。" },
      { title: "旅行相簿：無縫留存回憶", body: "以既有相簿架構為基礎，旅行相簿提供更貼合旅程記錄需求的體驗。使用者可依地點排序、時間軸整理與主題分類自訂相簿，以高度個人化的方式回味並分享旅行回憶。" },
      { title: "模組化設計打造可延展的相簿建立流程", body: "寶寶相簿採用模組化設計方式打造，提升未來功能擴充的彈性，同時降低開發時間與使用者的學習成本。" }
    ],
    research: [
      { title: "功能盤點與痛點釐清", body: "我們對既有產品進行全面盤點，分析現有介面與功能。透過建立功能地圖，系統性整理功能項目、釐清使用者流程，並找出效率不彰之處。此過程協助鎖定可用性痛點，並指出關鍵改善方向。" },
      { title: "競品分析與使用者訪談以規劃功能", body: "我們進行競品分析，評估產業標竿並找出創新機會；同時透過使用者訪談，了解真實需求與痛點。這些發現形塑了我們的功能規劃，確保新功能既符合使用者期待，也具備競爭優勢。" },
      { title: "融合競品洞察與既有視覺風格", body: "運用這些洞察，我設計出符合產品既有視覺風格與互動邏輯的線框稿，確保流暢且直覺的使用者體驗，進一步提升旅程紀錄與分享的品質。" }
    ]
  },
  "clinic-diary": {
    categoryLabel: "醫療照護", client: "共振身心科診所（台灣）", role: "視覺設計師", timeline: "2022/4-2022/5",
    title: "Clinic Diary — 溫柔的陪伴，記錄每一天",
    intro: "本專案為共振身心科診所網頁日記功能中，提供患者使用的部分。患者可透過網頁記錄自身狀況並設定服藥提醒；心理師則能在網頁版查看患者紀錄，協助在諮商時更加了解患者狀況。專案目標是提升醫師與患者在諮詢與治療過程中的服務體驗。",
    challengeTitle: "打破冰冷的醫療印象",
    challengeBody: "挑戰在於將醫療給人的冰冷、臨床印象，轉化為能鼓勵持續使用的療癒型應用程式。透過讓使用者記錄自身進展，此應用程式旨在提升治療成效，同時優化患者與醫師雙方的體驗。",
    solutionTitle: "療癒、生動且富陪伴感的設計",
    solutionBody: "我們採用溫暖、生動的設計搭配療癒插畫，打造令人安心且具支持感的體驗，同時強化患者的療癒感與陪伴感。",
    features: [
      { title: "親切且吸引人的設計", body: "療癒插畫搭配溫暖介面打造令人安心的體驗，打破傳統醫療應用程式冰冷、臨床的印象。" },
      { title: "個人化健康紀錄", body: "患者能輕鬆記錄自身狀況並設定服藥提醒，促進持續的自我照護與治療配合度。" },
      { title: "醫病無縫連結", body: "心理師可透過網頁存取患者紀錄，有助於進行更充分掌握資訊的諮詢，並提升整體照護品質。" }
    ],
    research: [
      { title: "強化品牌訊息以延伸品牌精神", body: "運用品牌五大核心理念的視覺化呈現來設計角色，藉由療癒系角色與使用者建立同理連結，同時強化品牌印象。" },
      { title: "傳遞療癒、生動與陪伴感的設計風格", body: "擬人化設計有助於促進互動，強化與使用者的溝通，並使風格能廣泛應用於各種情境。" }
    ]
  }
};

const CARD_ZH = {
  "green-english": "Green English",
  "darwin-lab": "Darwin Lab",
  "cities-mapping-digital-nomads": "Cities Mapping-數位遊牧",
  "tea-island-tea-stories": "茶島，茶物語",
  "xnfun-app": "XnFun App",
  "clinic-diary": "Clinic Diary"
};

const ABOUT_ZH = {
  experience: [
    { role: "UI 設計師 - AJA Creative", time: "2025/5~現在", desc: "參與保險與金融產業相關專案，負責 UI 設計與提案支援。" },
    { role: "接案設計師", time: "2023~現在", desc: "參與多元專案，包含網頁 UI 設計、展覽視覺與宣傳素材製作。" },
    { role: "UIUX 設計實習生 - UXI Design Co.", time: "2022/3~2023/3", desc: "參與 B2C 專案，製作 wireframe 與原型、執行使用者研究並產出設計規範，協助提案作業。" },
    { role: "美術設計 - 台北科技大學通識教育中心", time: "2022/3~2023/6", desc: "製作海報與網站動態視覺，支援單位對外傳播。" },
    { role: "接案設計師", time: "2021~2022", desc: "承接插畫委託與平面設計案件，滿足不同客戶需求。" },
    { role: "文案撰寫與翻譯 - Mifly Design Company", time: "2021/4~2021/12", desc: "撰寫 XR 產品教學文章，並提供中英文翻譯支援。" }
  ],
  education: [
    { time: "2023-2024", school: "波茨坦應用科技大學（德國）", detail: "介面設計 – 交換學生" },
    { time: "2019-2023", school: "國立臺北科技大學（台灣）", detail: "互動設計學系 – 學士學位" }
  ],
  skills: [
    { name: "Figma", level: "熟練" },
    { name: "Miro", level: "流利" },
    { name: "After Effect", level: "熟悉" },
    { name: "HTML / Css", level: "熟悉" },
    { name: "Blender", level: "熟悉" },
    { name: "Clip Studio Paint", level: "熟練" }
  ],
  awards: [
    { year: "2024", items: ["Indigo Award：互動設計類 - 銀獎"] },
    { year: "2023", items: [
      "德國紅點設計獎：Design Concept 類 - 入圍決選",
      "VGW Award：跨領域類 - 入圍",
      "教育部（MOE）獎學金 - 得主"
    ] }
  ],
  languages: [
    { name: "中文", level: "母語" },
    { name: "英文", level: "可自信應對職場情境。" },
    { name: "日文", level: "熟悉主題的閱讀與聽力沒問題。" },
    { name: "德文", level: "學習基礎用語與詞彙中。" }
  ]
};

/* ---------- helpers ---------- */
function getLang() {
  const s = localStorage.getItem("peichi-lang");
  return SUPPORTED.includes(s) ? s : DEFAULT_LANG;
}
function t(key) {
  const l = getLang();
  return (UI[l] && UI[l][key] !== undefined) ? UI[l][key] : (UI.en[key] !== undefined ? UI.en[key] : key);
}
function projectView(p) {
  if (getLang() === "zh" && PROJECT_ZH[p.slug]) {
    const v = Object.assign({}, p, PROJECT_ZH[p.slug]);
    v.cardTitle = CARD_ZH[p.slug] || p.cardTitle;
    return v;
  }
  return p;
}
function aboutView() {
  return getLang() === "zh"
    ? Object.assign({}, ABOUT_DATA, ABOUT_ZH, { photo: ABOUT_DATA.photo })
    : ABOUT_DATA;
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
}
function updateToggleUI() {
  const l = getLang();
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-lang") === l);
  });
}
function setLang(l) {
  if (!SUPPORTED.includes(l)) l = DEFAULT_LANG;
  localStorage.setItem("peichi-lang", l);
  document.documentElement.setAttribute("lang", l === "zh" ? "zh-Hant" : "en");
  applyStaticI18n();
  updateToggleUI();
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: l } }));
}
function initI18n() {
  document.documentElement.setAttribute("lang", getLang() === "zh" ? "zh-Hant" : "en");
  applyStaticI18n();
  updateToggleUI();
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.addEventListener("click", () => setLang(b.getAttribute("data-lang")));
  });
}
document.addEventListener("DOMContentLoaded", initI18n);
