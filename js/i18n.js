/* Bilingual (EN / 繁中) layer. Default English; choice persists.
   - UI: static interface strings by key.
   - PROJECT_ZH / ABOUT_ZH: Chinese overrides layered over the English
     source in data.js (English base keeps images / slug / category).
   Render code calls t(key), projectView(p) and aboutView(). */

const SUPPORTED = ["en", "zh"];
const DEFAULT_LANG = "en";

const UI = {
  en: {
    "nav.about": "About", "nav.work": "Work", "nav.playground": "Playground", "nav.resume": "Resume ↗", "nav.cv": "CV ↗",

    "hero.h2": "I'm Peichi, a product designer",
    "hero.sub2": "I always love exploring different media and tools, mixing interaction, imagination, and storytelling into digital experiences worth staying for.",
    "home.reachOut": "Feel free to reach out",
    "home.selectedWorks": "Selected Works",
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
    "project.problem": "Problem", "project.goal": "Goal", "project.takeaway": "Take away", "project.prev": "Previous", "project.next": "Next", "project.results": "Results",

    "contact.getInTouch": "Get in touch", "contact.title": "Let's create together!",
    "footer.linkedin": "LinkedIn", "footer.medium": "Medium", "footer.email": "Email",
    "footer.copy": "© 2026 Peichi Lin. All rights reserved."
  },
  zh: {
    "nav.about": "關於我", "nav.work": "作品", "nav.playground": "Playground", "nav.resume": "履歷 ↗", "nav.cv": "CV ↗",

    "hero.h2": "我是 Peichi，產品設計師",
    "hero.sub2": "我喜歡探索不同媒材與工具，把互動、想像與敘事揉進值得停留的數位體驗裡。",
    "home.reachOut": "歡迎與我聯繫",
    "home.selectedWorks": "精選作品",
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
    "project.problem": "Problem", "project.goal": "Goal", "project.takeaway": "反思", "project.prev": "上一個", "project.next": "下一個", "project.results": "專案成效",

    "contact.getInTouch": "保持聯絡", "contact.title": "讓我們一起創作！",
    "footer.linkedin": "LinkedIn", "footer.medium": "Medium", "footer.email": "Email",
    "footer.copy": "© 2026 林沛琪 Peichi Lin. 版權所有。"
  }
};

/* Chinese overrides per project (layered over English base in data.js) */
const PROJECT_ZH = {
  "fubon-life": {
    categoryLabel: "金融保險", homeMeta: "金融保險｜官方網站改版", client: "富邦人壽（台灣）", role: "UI 設計師", timeline: "2025/05–2026/01",
    title: "富邦人壽 — 從品牌定調視覺，模組化收斂龐大頁面",
    intro: "富邦人壽擁有多年品牌信任作為核心資產，但官網歷經多年擴充，資訊架構複雜、視覺也未能充分傳遞應有的專業形象。我主導官網視覺優化與模組化版型，延伸品牌視覺語彙定調全站風格，收斂模組與版型，確保品牌體驗一致，新版官網每月服務 180K 活躍使用者。",
    challengeTitle: "如何整合多元需求，打造一致且易用的數位體驗？",
    challengeBody: "1. 選單多達 5 層，同類內容分散，相同商品重複出現在多個入口。\n2. 以企業內部視角、過多專業術語溝通，用戶難判斷商品是否符合需求。\n3. 元件與視覺未對齊集團規範，與金控其他數位平台缺乏一致形象。",
    solutionTitle: "以品牌定調視覺、模組化系統，255 → 46 版型",
    solutionBody: "我從富邦 Logo 拆出「圓、方、交疊」三個特徵，轉化為全站共用的形狀語言，並以 App 既有插畫系統為基礎，為官網重新繪製一組商品情境插畫。與另一位 UI 共同將 255 頁收斂為 46 個版型，並為金融友善專區建立符合 WCAG AA 的專屬版型。",
    features: [
      { title: "延伸品牌視覺語彙，提高品牌連結度", body: "從富邦 Logo 拆出「圓、方、交疊」轉化為頁面圖騰與元素，全站共用同一套形狀語言；並以 App 既有插畫系統為基礎重新繪製商品情境插畫，承載官網較大的版面與較長的閱讀情境。" },
      { title: "模組化元件設計，建立集團一致的企業視覺", body: "依功能需求延伸新元件，建立元件類型、適用情境與使用規範，經客戶討論後整併至設計系統；同時盤點版型，收斂共通模組與樣式，建立可複用的設計規則以降低維運成本。" },
      { title: "無障礙頁面設計，建立符合 WCAG AA 的專屬版型", body: "依 WCAG 與客戶既有無障礙規範，為樂齡與身心障礙用戶規劃金融友善專區的專屬版型，調整元件尺寸、間距與互動狀態，並將 AA 對比標準納入版型規劃。" }
    ],
    research: [
      { title: "重構資訊架構並對齊品牌", body: "將 5 層選單與內部術語內容重整為以用戶為中心的架構，並以更年輕、更親民的視覺與語言對齊金控集團形象。" },
      { title: "參與 12 場易用性測試驗證概念", body: "多數受測者認為新版官網符合需求、容易使用與理解；觀察中也發現部分阻礙來自視覺樣式與版面而非資訊架構，因此同步迭代視覺設計。" },
      { title: "無障礙是預設條件，而非最後的檢核", body: "將 AA 對比標準納入按鈕等基礎元件的設計規範，讓無障礙從單一專區的要求延伸為全站設計時的基本考量。" }
    ]
  },
  "ctbc-bank": {
    categoryLabel: "金融銀行", homeMeta: "金融銀行｜官方網站改版", client: "中國信託（台灣）", role: "UI 設計師", timeline: "2026/02–08",
    title: "中國信託 — 重新定位 AI 時代的官網體驗",
    intro: "中國信託是台灣大型民營銀行，正推動數位轉型與 AI 應用，但品牌仍偏向傳統穩健，網站內容由多部門維運、資訊量大且架構複雜。本次改版聚焦提升資訊尋找效率、建立一致體驗與可擴充且符合 WCAG AA 的網站架構。我與 UI 團隊共同建立全站視覺方向，負責 AI 搜尋等關鍵頁面，並建立設計系統與 AEM 模組，支援跨部門長期維運。",
    challengeTitle: "當使用者已在站外找到答案，官網要如何重新變得新穎、好找且可擴充？",
    challengeBody: "1. 中年穩重的品牌形象難以觸及年輕客群。\n2. 內容依部門權責分類、不符使用情境，站內搜尋成效不彰，尋路困難。\n3. 各頁面由不同部門以 AEM 自行上稿、缺乏可依循的設計系統。",
    solutionTitle: "從 0 到 1：視覺語彙、無障礙設計系統與 AEM 模組",
    solutionBody: "我們將抽象的品牌期待收斂成色彩流動、視覺層次、動態運作三個視覺要素並提出兩個方向。我以帶呼吸感的有機漸層光體、圖示旋轉等微動效視覺化「AI 正在運算」，以 Figma 製作高擬真原型，並建立符合 AA 的設計系統、依 AEM 邏輯切分為模組：全站收斂為 40＋ 版型與 45＋ 模組，供 23 個部門共用；新版選單與 AI 搜尋的 SUS 由 62 提升至 84。",
    features: [
      { title: "把抽象的品牌期待，收斂成可執行的視覺語彙", body: "針對現代風格銀行網站與 AI 產品進行競品分析，提取色彩流動、視覺層次、動態運作三個視覺要素，並依此為首頁與關鍵頁面提出兩個方向。" },
      { title: "製作動態與高擬真原型，加速雙方對焦", body: "以帶呼吸感的有機漸層光體與圖示旋轉等微動效視覺化 AI 運算過程，以 Figma Animate 製作動效並串接首頁到 L2 的可操作原型，提供大小網同步交付。" },
      { title: "依 AEM 邏輯，從 0 到 1 建立設計系統", body: "初期建立元件與色彩規則，後期依客戶新色彩系統設定 token、更新元件並確保全站通過 AA；模組依 AEM 上稿邏輯切分，確保同一套模組在大小網都成立——全站 40＋ 版型、45＋ 模組供 23 個部門自行更新。" }
    ],
    research: [
      { title: "專案範圍與交付", body: "由於本案止於驗證階段、未進入開發，團隊收斂了歷次視覺方向提案、首頁與 AI 搜尋等關鍵頁面概念設計、設計系統、模組化版型規範，以及全站無障礙 WCAG AA 設計規範。" },
      { title: "卡住專案的往往不是設計，而是溝通與決策", body: "客戶組織龐大、各層級意見不同，同一份提案可能收到不同方向的回饋。若能在一開始就確認具決策權的窗口並建立明確的收斂機制，整體合作會更有效率。" }
    ]
  },
  "tea-island-tea-stories": {
    categoryLabel: "文化體驗", homeMeta: "文化體驗｜服務設計與遊戲化系統", client: null, role: "UI/UX 設計師／主視覺", timeline: "2022/03–2023/05",
    title: "茶嶼茶語 — 以服務設計重新定義茶館體驗",
    intro: "「茶嶼茶語」是一套遊戲化點餐系統，協助茶館顧客找到適合自己口味的茶。我們以雙鑽石流程從田野訪查出發，用「調茶」重新想像整套服務流程，設計出一組雙軌系統，讓對茶認識深淺不同、或對遊戲操作熟悉程度不同的顧客，各走一條適合自己的路。本專案獲 2024 Indigo 互動設計銀獎、2023 Red Dot 設計概念入圍與 VGW Award 提名。",
    challengeTitle: "吸引年輕族群，同時不犧牲服務效率",
    challengeBody: "1. 傳統茶館文化底蘊深厚，卻讓年輕人覺得老派、難以親近，缺少輕鬆認識茶文化的入口。\n2. 品項名稱與描述較文謅謅，提高了選擇與點茶門檻。\n3. 點茶流程仰賴店員一對一介紹，尖峰時段容易形成等待。",
    solutionTitle: "以雙軌系統，兼顧體驗與效率",
    solutionBody: "我們從「調茶」出發徹底重構服務流程：以遊戲化採集流程讓顧客在探索中認識茶的風味與功效，用顧客的語言重寫選單，並為熟客保留以 POS 為入口的快速調茶動線——兩條路徑共用同一套視覺語言，避免體驗割裂。",
    features: [
      { title: "遊戲化點餐體驗", body: "將茶的資訊融入遊戲，讓顧客在探索過程中認識茶的風味與功效，為點餐帶來更多想像，也降低點茶門檻。" },
      { title: "為熟客保留更快速的動線", body: "針對熟悉茶品或不想玩遊戲的顧客，重新設計 POS 介面，讓顧客可直接完成茶品選擇與調茶，並延續遊戲的視覺風格。" },
      { title: "整合虛擬與實體體驗", body: "遊戲結束後依玩家選擇生成專屬命名茶卡，隨茶飲一同送上，成為收藏與再訪的理由，讓體驗不止於喝完這杯茶。" }
    ],
    research: [
      { title: "服務藍圖與顧客旅程", body: "我們實地體驗紫藤廬等茶館完整服務流程、訪談利害關係人，繪製服務藍圖與同理心／顧客旅程地圖，整理顧客在點茶前中後的情緒起伏，找出真實痛點。" },
      { title: "定調視覺風格", body: "身為主視覺，我研究 3D 與遊戲美學，最終以 Low Poly 為基礎在可愛與真實間取得平衡，並兼顧小團隊製作能力與時程，透過概念草圖與 3D 測試逐步確立。" },
      { title: "依六大茶類設計遊戲化調茶", body: "將六大茶類轉化為六個探索場景，把茶與配料資訊融入遊戲，讓顧客在探索中建立對調茶風味的想像。" }
    ]
  },
  "xnfun-app": {
    categoryLabel: "雲端儲存", homeMeta: "雲端儲存｜共享相簿 App", client: "環鴻科技 USI（台灣）", role: "UI/UX 設計師", timeline: "2022/08–2023/03",
    title: "XnFun — 優化既有系統，從 0 到 1 打造模組化新功能",
    intro: "XnFun 是環鴻科技（USI）搭配 XnBay 智慧儲存伺服器的共享相簿 App，提供照片備份、相簿分享、留言與通知。隨著產品從日常照片延伸至旅遊與寶貝成長情境，既有 iOS／Android 介面差異與缺乏可延伸架構開始限制擴展。我在 3 人 UI/UX 團隊中主責「旅遊相簿」從 0 到 1，並共同處理跨平台一致性與設計規範。",
    challengeTitle: "在既有系統上，從 0 到 1 打造可延伸的新功能",
    challengeBody: "1. iOS／Android 在相簿名稱、成員管理等操作上流程不同，增加使用與維護成本。\n2. 作為雲端儲存 Server 持續累積上傳內容，但既有系統主要依賴時間軸，難以快速找到特定內容。\n3. 原有相簿以日常照片為主，缺乏可沿用的模組與規範，使旅遊、寶貝等新功能需重複設計。",
    solutionTitle: "統一跨平台邏輯，建立可複用的設計系統",
    solutionBody: "走查 iOS／Android 14 項關鍵流程、對比 4 種權限層級建立一致的互動基準，以「日期 × 地點」定義旅遊相簿資訊架構，並將色彩、Icon、元件狀態與互動規則系統化，讓日常、旅遊、寶貝三種相簿皆可沿用同一套模組。",
    features: [
      { title: "建立一致的跨平台互動基準", body: "走查 iOS／Android 14 項關鍵流程、對比 4 種權限層級，重新設計聚焦防錯、權限與一致性：為不可逆操作加入確認與復原、以按鈕狀態呈現權限限制，並統一核心互動邏輯。" },
      { title: "旅遊相簿從 0 到 1", body: "透過訪談 4 位使用者與分析 8 項競品，發現使用者以時間與地點理解照片，因此以「日期 × 地點」設計旅遊日程，搭配回憶關鍵字、備註、景點標籤與旅遊地圖提供不同回顧方式。" },
      { title: "可延伸的產品設計系統", body: "建立色彩、Icon、元件狀態與跨平台互動規範，並整理日期、成員、Scroll 等情境的 IX Flow，形成設計、工程與業主共用的規格，三種相簿皆可沿用。" }
    ],
    research: [
      { title: "盤點雙平台與其差異", body: "透過全面產品盤點與功能地圖整理功能、釐清流程並找出效率不彰之處，鎖定跨平台的可用性痛點與改善方向。" },
      { title: "使用者測試與競品分析", body: "訪談 4 位使用者、分析 8 項競品，發現使用者依賴時間與地點理解與整理旅遊照片，且旅遊照片常被重新瀏覽用於整理與分享，形塑同時支援快速搜尋與旅程脈絡瀏覽的功能。" },
      { title: "與非設計背景業主的溝通", body: "比起 UX、元件等術語，直接使用產品畫面與競品案例更能幫助不同專業背景的利害關係人快速理解問題，也能與 IT 更快對焦互動效果。" }
    ]
  }
};

const CARD_ZH = {
  "fubon-life": "富邦人壽",
  "ctbc-bank": "中國信託",
  "tea-island-tea-stories": "茶嶼茶語",
  "xnfun-app": "XnFun App"
};

const PROJECT_META_ZH = {
  "fubon-life": {
    metrics: [ { v: "180K", k: "每月活躍使用者" }, { v: "255 → 46", k: "頁面收斂為版型" } ],
    goalBody: "重構資訊架構、簡化選單加速分流；以用戶視角、白話說明溝通商品；延伸金控調性並以更年輕親民的視覺與語言對齊規範。"
  },
  "ctbc-bank": {
    metrics: [ { v: "62 → 84", k: "新選單與 AI 搜尋 SUS（電腦版）" }, { v: "40 / 45", k: "版型 / 模組，供 23 部門共用" } ],
    goalBody: "形塑年輕、聰明、特色鮮明的形象；以使用情境重組內容並強化轉換引導；建立可在 AEM 維運且通過無障礙的設計模組。"
  },
  "tea-island-tea-stories": {
    metrics: [ { v: "銀獎", k: "2024 Indigo 互動設計" }, { v: "入圍", k: "2023 Red Dot 設計概念" } ],
    goalBody: "將茶知識融入遊戲化點餐流程；用顧客的語言重寫選單；雙軌並行，讓體驗不犧牲效率。"
  },
  "xnfun-app": {
    metrics: [ { v: "iOS + Android", k: "統一核心互動" }, { v: "0 → 1", k: "旅遊相簿：日期 × 地點" } ],
    goalBody: "統一跨平台操作邏輯；以更有脈絡的方式整理內容；建立可延伸的產品設計系統供新功能沿用。"
  }
};
function projectMeta(slug){
  return (getLang() === "zh" && typeof PROJECT_META_ZH !== "undefined" && PROJECT_META_ZH[slug])
    ? PROJECT_META_ZH[slug]
    : (typeof PROJECT_META !== "undefined" ? PROJECT_META[slug] : null);
}

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
