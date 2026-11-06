/* Case-study long-form content (Figma 15:31025 template).
   Chinese first, straight from the Notion "專案紀錄" pages; English lives in
   CASE_STUDIES_EN below and is merged in by getCaseStudy(slug, "en"). */

export interface Metric { value: string; label: string; }
export interface PG { h: string; p: string; }
export type Media = string | { en: string; zh: string };   // lang-aware when object
export interface Step { n: string; title: string; body: string; figs?: Media[]; plain?: boolean; } // plain = no "Outcome n" label, no figure
export interface Takeaway { h: string; points: string[]; }

export interface CaseStudy {
  slug: string;
  title: string;
  eyebrow?: string;                    // short line above the title
  hero?: Media;                        // optional override of proj.hero (projects.ts); can be a video / lang-aware
  industry: string;
  role: string;
  team: string;
  timeline: string;
  extra?: { k: string; v: string };   // 上架時間 / 專案性質 …
  did: string[];                       // 我做了什麼
  metrics: Metric[];                   // 專案成效 / Key outcomes
  background: string;                  // 專案背景
  problem: PG[];
  goal: PG[];
  question: string;                    // the big driving question
  steps: Step[];
  takeaways: Takeaway[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "fubon-life": {
    slug: "fubon-life",
    eyebrow: "富邦人壽官網改版｜2026 上線",
    title: "從品牌定調視覺，模組化收斂龐大頁面",
    industry: "金融保險｜官方網站改版",
    role: "UI 設計師",
    team: "1 Design Lead、1 PM、1 User Researcher、2 UX、2 UI",
    timeline: "2025.05–2026.01",
    extra: { k: "上架時間", v: "2026.10" },
    did: [
      "主導視覺方向——延伸品牌精神與 Logo 視覺語彙，定調全站調性，強化官網與集團形象的連結。",
      "依循品牌規範與設計系統——依官網需求延伸繪製新元件、補齊使用規範，與另一位 UI 共同將 255 頁收斂為 46 個版型。",
      "支援提案與驗證——製作高擬真原型加速客戶決策；參與 12 場易用性測試觀察，依回饋調整元件視覺與資訊層級。",
    ],
    metrics: [
      { value: "180K", label: "每月活躍使用者" },
      { value: "255→46", label: "模組化版型收斂" },
      { value: "AAA", label: "WCAG 無障礙規範" },
    ],
    background:
      "富邦人壽擁有多年品牌信任為核心資產，但官網歷經多年擴充，資訊架構複雜、視覺也未能充分傳遞應有的專業形象。我主導官網視覺優化與模組化版型，延伸品牌視覺語彙定調全站風格，收斂模組與版型，確保品牌體驗一致。",
    problem: [
      { h: "選單架構複雜，內容不易查找", p: "選單多達 5 層，同類型內容分散，相同商品重複出現在多個入口。" },
      { h: "專業術語過多，資訊難以吸收", p: "以企業內部視角溝通，用戶難判斷商品是否符合自身需求。" },
      { h: "視覺樣式未與集團形象一致", p: "官網元件與視覺未對齊集團規範，與金控旗下其他數位平台缺乏一致的形象。" },
    ],
    goal: [
      { h: "重構資訊架構，簡化選單加速分流", p: "整合多元視角、凸顯資訊優先順序，提升查找效率。" },
      { h: "以用戶視角溝通商品", p: "以易懂的白話說明降低理解阻力，讓用戶判斷商品是否符合自身需求。" },
      { h: "延伸金控調性，對齊視覺規範", p: "統一集團形象，並以更年輕、更親民的視覺與語言，傳遞品牌價值。" },
    ],
    question: "如何整合多元需求，打造一致且易用的數位體驗？",
    steps: [
      { n: "01", title: "延伸品牌視覺語彙，提高品牌連結度", body: "設計是藉由細節堆疊出來，我從富邦 Logo 拆出「圓、方、交疊」三個特徵，將它們轉化為頁面上的圖騰與畫面元素，全站共用同一套形狀語言。插畫也延伸同一套邏輯。我以富邦人壽 App 既有的插畫系統為基礎，為官網重新繪製一組商品情境插畫：保留原本的繪製邏輯與角色語彙，調整色彩層次與細節密度，讓它能承載官網較大的版面與較長的閱讀情境。", figs: ["/case/fubon/o1.mov"] },
      { n: "02", title: "模組化元件設計，建立集團一致的企業視覺", body: "依循品牌規範與設計系統，依功能需求延伸新元件，建立元件類型、適用情境與使用規範，經客戶團隊討論後整併至設計系統；同時進行版型盤點，從不同頁面需求中收斂共通的模組與樣式，建立可複用的設計規則，讓後續需求能依循既有規範延伸，降低維運成本。", figs: ["/case/fubon/o2.webm"] },
      { n: "03", title: "無障礙頁面設計，建立符合 WCAG AAA 的專屬版型", body: "依 WCAG 與客戶既有的無障礙規範，針對樂齡與身心障礙用戶的使用需求，規劃金融友善服務專區的專屬版型，並依內容與使用情境調整既有元件的尺寸、間距與互動狀態，同時將 AAA 級對比標準納入版型規劃，確保資訊具備良好的可讀性與操作性，並作為後續相關頁面延伸的設計依據。", figs: ["/case/fubon/o3.jpg"] },
      { n: "04", title: "參與 12 場易用性測試，驗證設計概念", body: "易用性測試中，多數受測者認為新版官網是符合需求的、容易使用的、容易理解的，概念驗證獲得一致的正向回饋。測試過程中也發現，部分使用阻礙並非來自功能或資訊架構，而是受到視覺樣式、版面配置影響，因此同步觀察使用者反應並迭代視覺設計，降低理解與操作阻力。", figs: [{ en: "/case/fubon/o4-1-en.png", zh: "/case/fubon/o4-1-zh.png" }, "/case/fubon/o4-2.mp4"] },
    ],
    takeaways: [
      { h: "設計不只是在解決問題，也是在協調不同立場", points: [
        "功能與頁面定案之後，客戶仍會針對視覺提出調整需求。若僅以美感或個人偏好回應，討論容易陷入反覆來回；改以維運成本、頁面目的與易用性作為判斷依據，才能讓對話回到問題本身。",
        "多數調整需求的背後，是尚未被說清楚的隱性問題。釐清客戶內部不同決策層級、維運單位與利害關係人的需求，才能在不同立場之間找到推進設計的共識。",
      ] },
      { h: "無障礙不應是最後的檢核項目，而是元件設計時的預設條件", points: [
        "過去銀行網站的無障礙設計多集中於「金融友善專區」，但這次專案讓我更認同無障礙不應只是特定頁面的功能，而應成為整個網站的設計預設，讓更多人都能更容易地使用數位服務。",
        "將 AA 對比標準納入按鈕等基礎元件的設計規範，讓無障礙從單一專區的要求，延伸為全站設計時的基本考量。",
      ] },
    ],
  },

  "tea-island-tea-stories": {
    slug: "tea-island-tea-stories",
    eyebrow: "茶嶼茶語｜畢業專題",
    title: "從服務藍圖釐清需求，打造沉浸式茶館服務設計",
    industry: "文化體驗｜服務設計與遊戲化系統",
    role: "UI/UX 設計師／主視覺",
    team: "1 PM & Developer、1 UI/UX & Visual Designer、1 3D Designer、1 Developer",
    timeline: "2022.03–2023.05",
    extra: { k: "專案性質", v: "茶嶼茶語 Tea Island｜畢業專題，後續延伸經營" },
    did: [
      "茶館實地研究與服務流程分析——實地探訪茶館、觀察服務流程並進行訪談，將研究結果轉化為設計依據。",
      "建立整體視覺與介面系統——定義 3D 模型與遊戲視覺風格，並負責產品介面設計，建立一致的 UI 與遊戲視覺體驗。",
      "遊戲視覺內容與展覽影像製作——負責角色、場景概念、動畫等遊戲視覺製作，並製作展覽行銷影片與專案介紹影片。",
    ],
    metrics: [
      { value: "銀獎", label: "2024 Indigo Award 互動設計組" },
      { value: "Final List", label: "2023 Red Dot Design Award 設計概念組" },
      { value: "提名", label: "2023 VGW Award 跨領域組" },
    ],
    background:
      "傳統茶館有深厚的文化底蘊，卻同時面對兩種流失：年輕世代覺得它老派，而熟客又被過於文謅謅的選單和緩慢的出餐拖住。我們以雙鑽石流程從田野訪查出發，用「調茶」重新想像整套服務流程，設計出一組雙軌系統，讓對茶認識深淺不同、或對遊戲操作熟悉程度不同的顧客，各走一條適合自己的路。",
    problem: [
      { h: "茶文化缺少親近年輕世代的入口", p: "傳統茶館的文化底蘊深厚，卻容易讓年輕人聯想到老派、難以親近，缺少輕鬆認識茶文化的入口。" },
      { h: "茶品資訊提高了選擇門檻", p: "品項名稱與描述較為文謅謅，對不熟悉茶文化的顧客而言難以理解，也提高了選擇與點茶的門檻。" },
      { h: "點茶流程仰賴店員，服務效率受限", p: "顧客需要依賴店員一對一介紹與推薦，尖峰時段容易形成等待，也讓個人化服務與營運效率難以兼顧。" },
    ],
    goal: [
      { h: "將知識融入遊戲化點餐流程", p: "以遊戲化的採集流程取代純文字說明，讓顧客在探索中，以輕鬆有趣的方式認識茶的風味與功效。" },
      { h: "用顧客的語言重寫選單", p: "以直覺的分類與具體描述降低選擇門檻，讓新手也能自行完成決定。" },
      { h: "雙軌並行，體驗不犧牲效率", p: "熟客與新手各走一條動線，服務流程不因為多了遊戲而變慢。" },
    ],
    question: "如何用雙軌系統，重新定義茶館的服務體驗？",
    steps: [
      { n: "01", title: "走訪傳統茶館，用服務藍圖找出真實的斷點", body: "我們實地體驗紫藤廬等茶館的完整服務流程，訪談店員與利害關係人，繪製茶館服務藍圖，並以同理心地圖整理顧客在點茶前中後的情緒起伏，繪製出顧客旅程圖，發覺真實體驗的痛點，以此為專案發展基礎。", figs: ["/case/tea/o1-1.jpg", "/case/tea/o1-2.jpg"] },
      { n: "02", title: "定調視覺風格，建立茶文化的遊戲世界", body: "作為主視覺，我研究不同的 3D 藝術與遊戲美學，探索適合茶文化與遊戲體驗的視覺方向。最終以 Low Poly 為基礎，在可愛與真實之間取得平衡，同時考量小團隊的製作能力與專案時程，透過概念草圖與 3D 測試逐步確立整體視覺風格。", figs: ["/case/tea/o2.jpg"] },
      { n: "03", title: "設計遊戲化調茶系統，讓茶文化融入探索過程", body: "依據六大茶類，將茶的特色轉化為遊戲中的六個探索場景，將茶與配料的資訊融入遊戲中，提供給玩家對調茶風味的想像，在探索過程中了解茶的知識，協助顧客選擇調茶，降低點茶門檻。", figs: ["/case/tea/o3-1.jpg", "/case/tea/o3-2.jpg"] },
      { n: "04", title: "為熟客與不熟悉遊戲的顧客提供更快速的調茶流程", body: "除了遊戲化調茶體驗，也為熟客與不熟悉遊戲操作的顧客保留更直接的調茶方式。以一般 POS 機作為快速調茶入口，重新設計 POS 介面與內容，讓顧客可以跳過遊戲探索，直接完成茶品選擇與調茶；同時延續遊戲中的視覺風格與元素，讓兩條路徑維持一致的視覺語言，在整體調茶服務上保持視覺一致，避免不同體驗之間產生割裂感。", figs: ["/case/tea/o4.jpg"] },
      { n: "05", title: "整合虛擬與實體的體驗", body: "遊戲結束後依玩家的選擇生成專屬命名茶卡，隨茶飲一同送上。體驗因此不會隨著喝完而結束，茶卡本身會成為收藏與再訪的理由，提升回客率。專案完成後，我們也透過 Instagram 延伸經營服務設計與茶文化內容，讓影響力不止於畢業展。", figs: ["/case/tea/o5-1.jpg", "/case/tea/o5-2.jpg"] },
    ],
    takeaways: [
      { h: "遊戲化不是加法，而是重新設計服務的骨架", points: [
        "一開始很容易把遊戲化當成貼在既有流程上的裝飾。真正有效的做法是回到服務藍圖，讓遊戲機制去承擔原本由店員承擔的說明工作，並吸引年輕族群興趣，因此必須考量較廣的年齡層，而非為了將遊戲做得有趣而拉高體驗門檻。",
        "設計要解決的是痛點，並考量用戶習慣，因此應承認使用者的差異確實存在，然後給出各自適合的選擇。",
      ] },
      { h: "視覺風格要同時服務品牌與製作現實", points: [
        "身為主視覺，我學到風格決策不能只看美感，也需要兼顧技術上的考量：若是太精緻的 3D 模型，在遊戲中反而會影響效能，且在全組一起建立模型時，也容易出現風格落差，難以讓視覺風格統一。",
      ] },
    ],
  },

  "xnfun-app": {
    slug: "xnfun-app",
    eyebrow: "XnFun 共享相簿 App",
    title: "優化既有系統，從 0 到 1 打造模組化新功能",
    industry: "雲端儲存｜共享相簿 App",
    role: "UI/UX 設計師",
    team: "1 PM、3 UI/UX",
    timeline: "2022.08–2023.03",
    extra: { k: "上架時間", v: "已上線（現行版本尚未套用本次設計交付內容）" },
    did: [
      "盤點雙平台介面差異——走查 iOS／Android 14 項關鍵操作流程，對比 4 種權限層級，建立一致的互動基準。",
      "主責「旅遊相簿」從 0 到 1——訪談 4 位使用者、分析 8 項競品，定義以日期與地點為核心的資訊架構，設計旅遊日程、回憶關鍵字、景點標籤與旅遊地圖等核心功能。",
      "建立可延伸的設計系統——統整色彩、Icon、元件狀態與跨平台互動規則，並建立 IX Flow，讓設計、工程與業主以同一套規格協作。",
    ],
    metrics: [
      { value: "14", label: "UX flow 梳理" },
      { value: "0–1", label: "設計系統建置" },
      { value: "模組化設計", label: "提供產品擴充性" },
    ],
    background:
      "XnFun 是環鴻科技（USI）旗下搭配 XnBay 智慧儲存伺服器使用的共享相簿 App，提供照片備份、相簿分享、留言與動態通知。隨著產品從日常照片延伸至旅遊與寶貝成長等情境，既有 iOS／Android 介面長期累積的差異，以及缺乏可延伸的內容與設計架構，開始限制產品的擴展。我在 3 位 UI/UX 設計師的團隊中主責「旅遊相簿」，並與團隊共同處理跨平台一致性與設計規範；寶貝相簿主要由另一位設計師負責。",
    problem: [
      { h: "跨平台體驗缺乏一致性", p: "iOS／Android 在相簿名稱、成員管理等操作上有不同的介面與流程，增加使用與維護成本。" },
      { h: "大量上傳內容缺乏有效的整理邏輯", p: "產品作為雲端儲存 Server，持續累積使用者上傳的照片與檔案，但既有系統主要依賴時間軸，難以快速找到特定內容。" },
      { h: "既有架構難以支撐新的使用情境", p: "原有相簿以日常照片為主，缺乏可沿用的功能模組與設計規範，使旅遊、寶貝等新功能需要重複設計與維護。" },
    ],
    goal: [
      { h: "統一跨平台的操作邏輯", p: "重新整理 iOS／Android 的介面與操作規則，建立一致且可延伸的跨平台體驗。" },
      { h: "建立更有脈絡的內容整理方式", p: "以不同使用情境重新思考照片與檔案的分類，提升內容的尋找與瀏覽效率。" },
      { h: "建立可延伸的產品設計系統", p: "將色彩、Icon、元件與互動規則系統化，讓新功能能沿用既有模組。" },
    ],
    question: "如何在既有系統上，從 0 到 1 打造可延伸的新功能？",
    steps: [
      { n: "01", title: "盤點雙平台差異，建立一致的互動基準", body: "走查 iOS／Android 14 項關鍵流程，對比 4 種權限層級，整理平台間的介面與操作差異。重新設計聚焦防錯、權限與跨平台一致性：為不可逆操作加入確認與復原機制，以按鈕狀態與提示呈現權限限制，並依循兩平台規範統一核心互動邏輯。", figs: ["/case/xnfun/o1-1.jpg", "/case/xnfun/o1-2.jpg"] },
      { n: "02", title: "透過使用者測試與競品分析，定義旅遊相簿的需求", body: "我參與游擊測試訪談 4 位使用者，並分析 8 項競品，了解使用者如何整理與回顧旅遊回憶。研究發現，使用者主要依靠「時間」與「地點」理解與整理照片，而旅遊照片也常被重新瀏覽，用於整理與分享。這些洞察成為後續設計的基礎，讓旅遊相簿同時支援「快速搜尋」與「以旅程脈絡瀏覽內容」。", figs: ["/case/xnfun/o2-1.jpg", "/case/xnfun/o2-2.jpg"] },
      { n: "03", title: "從 0 到 1 設計「旅遊日程」資訊架構", body: "以「日期 × 地點」作為主要資訊維度，從 0 到 1 設計「旅遊日程」，重新組織多日行程的照片；搭配回憶關鍵字、旅遊備註、景點標籤與旅遊地圖功能，提供不同方式的回顧與瀏覽，以應對使用者在搜尋與整理時的不同情境。", figs: ["/case/xnfun/o3.jpg"] },
      { n: "04", title: "建立產品設計系統，支援後續功能擴充", body: "從色彩、Icon、元件狀態到跨平台操作規則建立共用規範，並整理日期、成員、Scroll 等情境的 IX Flow，形成設計、工程與業主共用的規格。日常、旅遊、寶貝三種相簿皆可沿用同一套模組與規則。", figs: ["/case/xnfun/o4-1.jpg", "/case/xnfun/o4-2.jpg"] },
    ],
    takeaways: [
      { h: "面對非設計背景的業主，溝通方式比術語更重要", points: [
        "比起 UX、元件等專有名詞，直接使用產品畫面與競品案例，更能幫助不同專業背景的利害關係人快速理解問題與方向，也能更快與 IT 對焦互動效果。",
      ] },
      { h: "從 0 到 1 建立設計系統，讓產品具備延伸基礎", points: [
        "Design System 不只是統一介面，也將分散的設計決策轉化為可共用的規則與模組，讓後續功能能建立在既有系統上持續擴展。",
      ] },
    ],
  },
};

/* English copy, from the English article under each Notion project page.
   Steps are matched by index; figures (figs/plain) stay on the zh entry. */
type StepText = Pick<Step, "title" | "body">;
export type CaseStudyEN = Omit<CaseStudy, "slug" | "hero" | "steps"> & { steps: StepText[] };

export const CASE_STUDIES_EN: Record<string, CaseStudyEN> = {
  "fubon-life": {
    eyebrow: "Fubon Life Website Redesign｜Launched 2026",
    title: "Defining the Visual Direction Through Branding and Modularize Extensive Pages",
    industry: "Finance & Insurance｜Corporate Website Redesign",
    role: "UI Designer",
    team: "1 Design Lead、1 Project Manager、1 User Researcher、2 UX Designers、2 UI Designers",
    timeline: "2025.05–2026.01",
    extra: { k: "Launch Date", v: "2026.10" },
    did: [
      "Led the visual direction——Extended the brand identity and visual language of the logo to define the visual tone across the website and strengthen its connection to the group’s corporate image.",
      "Applied brand guidelines and the design system——Developed new components to meet the website’s needs and documented their usage guidelines. Together with another UI designer, I consolidated 255 pages into 46 templates.",
      "Supported proposals and design validation——Created high-fidelity prototypes to support client decision-making and participated in 12 usability testing sessions. Refined component visuals and information hierarchy based on user feedback.",
    ],
    metrics: [
      { value: "180K", label: "Monthly active users" },
      { value: "255→46", label: "Templates modularization" },
      { value: "AAA", label: "WCAG Accessibility" },
    ],
    background:
      "Fubon Life’s long-standing brand trust is one of its core assets. However, after years of expansion, its website had developed a complex information architecture, and its visual design no longer fully conveyed the brand’s professional image. I led the visual refinement and template modularization, extending the brand’s visual language to establish a consistent look across the site while consolidating modules and templates to ensure a cohesive brand experience.",
    problem: [
      { h: "A complex menu structure made information difficult to find", p: "The menu had up to five levels. Similar content was scattered across different sections, and the same products appeared under multiple entry points." },
      { h: "Excessive technical terminology made information hard to understand", p: "Content was written from an internal corporate perspective, making it difficult for users to determine whether a product suited their needs." },
      { h: "The visual style was inconsistent with the group’s identity", p: "The website’s components and visuals were not aligned with the group’s design guidelines, creating an inconsistent image across the group’s digital platforms." },
    ],
    goal: [
      { h: "Restructure the information architecture and simplify navigation", p: "Bring different perspectives together and clarify information priorities to help users find what they need more efficiently." },
      { h: "Communicate products from the user’s perspective", p: "Use clear, everyday language to make information easier to understand and help users assess whether a product meets their needs." },
      { h: "Extend the group’s visual identity and align with its design guidelines", p: "Create a consistent group image and communicate brand values through a younger, more approachable visual and verbal style." },
    ],
    question: "How can diverse requirements be brought together to create a consistent, user-friendly digital experience?",
    steps: [
      { title: "Extending the brand’s visual language to strengthen brand recognition", body: "Good design is built through details. I identified three visual characteristics in the Fubon logo — circles, squares, and overlapping forms — and translated them into graphic motifs and page elements, creating a shared visual language throughout the website.\nThe illustrations follow the same approach. Using the existing illustration system from the Fubon Life app as a starting point, I redrew a set of product scenario illustrations for the website. I retained the original drawing logic and character language while adjusting the color layers and level of detail to suit the website’s larger layouts and longer reading contexts." },
      { title: "Modular component design to establish a consistent corporate visual identity", body: "Following the brand guidelines and design system, I developed new components based on functional needs and defined their types, use cases, and usage guidelines. After discussion with the client’s team, these components were incorporated into the design system.\nIn parallel, I reviewed the existing page templates and identified common modules and styles across different page requirements. By consolidating them into reusable design rules, the team could extend future designs based on established guidelines and reduce ongoing maintenance costs." },
      { title: "Accessible page design: creating dedicated templates that meet WCAG AAA standards", body: "Following WCAG and the client’s existing accessibility guidelines, I designed dedicated templates for the Financial Friendly Services section to address the needs of older adults and users with disabilities.\nI adjusted the size, spacing, and interaction states of existing components according to the content and usage scenarios. AAA-level color contrast was also incorporated into the template design to ensure that information remained readable and interfaces easy to operate. These templates also serve as a design reference for related pages." },
      { title: "Participating in 12 usability testing sessions to validate the design", body: "During usability testing, most participants felt that the redesigned website met their needs, was easy to use, and was easy to understand. The concept validation received consistently positive feedback.\nThe sessions also revealed that some usability barriers were caused not by functionality or information architecture, but by visual styles and layout decisions. By observing users’ reactions, I iterated on the visual design to make information easier to understand and interactions easier to complete." },
    ],
    takeaways: [
      { h: "Design is not only about solving problems, but also about reconciling different perspectives", points: [
        "Even after features and page structures are finalized, clients may still request visual changes. Responding based only on aesthetics or personal preference can lead to repeated discussions. Using maintenance costs, page objectives, and usability as decision-making criteria helps bring the conversation back to the underlying problem.",
        "Many requests for changes stem from implicit problems that have not yet been clearly articulated. Understanding the needs of different decision-makers, operations teams, and stakeholders helps establish common ground and move the design forward.",
      ] },
      { h: "Accessibility should not be a final checklist item, but a default consideration in component design", points: [
        "Accessibility on banking websites has often been concentrated in dedicated “Financial Friendly” sections. This project reinforced my belief that accessibility should not be limited to specific pages, but should be a default consideration across the entire website so more people can use digital services with ease.",
        "Incorporating AA contrast standards into the guidelines for foundational components such as buttons makes accessibility a baseline requirement for the whole website, rather than a requirement limited to one section.",
      ] },
    ],
  },

  "tea-island-tea-stories": {
    eyebrow: "Tea Island｜Graduation Project",
    title: "From Service Blueprinting to an Immersive Tea House Experience",
    industry: "Cultural Experiences｜Service Design and Gamification Systems",
    role: "UI/UX Designer / Lead Visual Designer",
    team: "1 PM & Developer、1 UI/UX & Lead Visual Designer、1 3D Designer、1 Developer",
    timeline: "Mar 2022–May 2023",
    extra: { k: "Project Type", v: "Tea Island｜Graduation project, later developed into an ongoing business" },
    did: [
      "Field research and service workflow analysis at tea houses——Visited tea houses, observed service workflows, and conducted interviews, translating research findings into design decisions.",
      "Developed the overall visual and interface system——Defined the 3D modeling and game visual style, and designed the product interface to create a consistent UI and game experience.",
      "Produced game visuals and exhibition videos——Created game visuals including characters, scene concepts, and animations, as well as exhibition marketing and project introduction videos.",
    ],
    metrics: [
      { value: "Silver", label: "2024 Indigo Award, Interactive Design" },
      { value: "Finalist", label: "2023 Red Dot Design Award, Design Concept" },
      { value: "Nominee", label: "2023 VGW Award, Interdisciplinary Category" },
    ],
    background:
      "Traditional tea houses have a rich cultural heritage, yet they face two forms of customer loss: younger generations perceive them as old-fashioned, while regular customers are held back by overly formal menus and slow service. Starting with field research and following the Double Diamond process, we reimagined the entire service workflow through the concept of “tea blending.” We designed a dual-track system that allows customers with different levels of tea knowledge or familiarity with game interactions to follow a path that suits their needs.",
    problem: [
      { h: "Tea culture lacks an approachable entry point for younger generations", p: "Traditional tea houses have a rich cultural heritage, but young people often perceive them as old-fashioned and unapproachable, with few casual ways to explore tea culture." },
      { h: "Tea product information raises the barrier to choice", p: "Product names and descriptions are often overly formal and literary, making them difficult for customers unfamiliar with tea culture to understand and increasing the barrier to choosing and ordering tea." },
      { h: "The ordering process relies on staff, limiting service efficiency", p: "Customers depend on one-on-one explanations and recommendations from staff. This can lead to waiting during peak hours and makes it difficult to balance personalized service with operational efficiency." },
    ],
    goal: [
      { h: "Integrate knowledge into a gamified ordering process", p: "Replace text-only explanations with a gamified harvesting process, allowing customers to learn about tea flavors and benefits in a relaxed and engaging way through exploration." },
      { h: "Rewrite the menu in the customer’s own language", p: "Use intuitive categories and concrete descriptions to lower the barrier to choice, allowing even first-time customers to make decisions independently." },
      { h: "Run two parallel tracks without sacrificing efficiency", p: "Provide separate paths for regulars and newcomers, ensuring that the service process does not slow down with the addition of gameplay." },
    ],
    question: "How can a dual-track system redefine the tea house service experience?",
    steps: [
      { title: "Visiting traditional tea houses and using a service blueprint to identify real pain points", body: "We experienced the complete service process at tea houses such as Zitinglu, interviewed staff and stakeholders, and mapped the tea house service blueprint. We used empathy maps to organize customers’ emotional changes before, during, and after ordering, then created a customer journey map to identify pain points in the actual experience. These findings became the foundation for the project." },
      { title: "Defining the visual direction and building a game world inspired by tea culture", body: "As the lead visual designer, I researched different 3D art styles and game aesthetics to explore a visual direction suited to both tea culture and the gaming experience. I ultimately chose low-poly as the foundation, striking a balance between cuteness and realism. Taking our small team’s production capabilities and the project timeline into account, I gradually established the overall visual style through concept sketches and 3D tests." },
      { title: "Designing a gamified tea-blending system to bring tea culture into the exploration process", body: "Based on the six major tea categories, I translated the characteristics of each category into six in-game exploration scenes. Information about tea and ingredients was integrated into the game, helping players imagine different flavor combinations. Through exploration, customers could learn about tea and make more informed blending choices, lowering the barrier to ordering." },
      { title: "Providing a faster tea-blending process for regulars and customers unfamiliar with games", body: "In addition to the gamified tea-blending experience, we retained a more direct option for regulars and customers unfamiliar with game controls. Using a standard POS terminal as a quick entry point, I redesigned the POS interface and content so customers could skip the game-based exploration and proceed directly to selecting and blending their tea.\nAt the same time, we carried over the visual style and elements from the game to ensure that both paths shared a consistent visual language. This maintained visual cohesion throughout the tea-blending service and avoided a disconnect between the two experiences." },
      { title: "Integrating virtual and physical experiences", body: "After the game, a personalized tea card named according to the player’s choices is generated and served with the drink. This allows the experience to continue beyond the drink itself: the tea card becomes something to collect and a reason to return, helping encourage repeat visits. After completing the project, we continued sharing service design and tea culture content on Instagram, extending the project’s reach beyond the graduation exhibition." },
    ],
    takeaways: [
      { h: "Gamification is not an add-on, but a redesign of the service framework", points: [
        "At first, it is easy to treat gamification as decoration added to an existing process. A more effective approach is to return to the service blueprint and let game mechanics take over the explanations traditionally handled by staff, while also engaging younger audiences. This means considering a broader age range rather than raising the barrier to participation just to make the game more entertaining.",
        "Design should address pain points while taking users’ habits into account. We need to recognize that users have different needs and provide options that suit each group.",
      ] },
      { h: "Visual style must serve both the brand and production realities", points: [
        "As the lead visual designer, I learned that visual decisions cannot be based on aesthetics alone; technical considerations matter too. Overly detailed 3D models can affect game performance. When the whole team works on modeling, differences in execution can also lead to an inconsistent visual style.",
      ] },
    ],
  },

  "xnfun-app": {
    eyebrow: "XnFun Shared Photo Album App",
    title: "Optimizing Existing Systems and Building Modular Features from 0 to 1",
    industry: "Cloud Storage｜Shared Photo Album App",
    role: "UI/UX Designer",
    team: "1 PM、3 UI/UX Designers",
    timeline: "Aug 2022–Mar 2023",
    extra: { k: "Release Status", v: "Live (The current version does not yet incorporate the design deliverables from this project)" },
    did: [
      "Audited interface differences across both platforms——Reviewed 14 key user flows on iOS and Android, compared four permission levels, and established consistent interaction standards.",
      "Led the Travel Album feature from 0 to 1——Interviewed four users, analyzed eight competitors, defined an information architecture centered on date and location, and designed core features including travel itineraries, memory keywords, attraction tags, and travel maps.",
      "Established an extensible design system——Consolidated color, icons, component states, and cross-platform interaction rules, and created IX Flows to enable design, engineering, and stakeholders to collaborate using a shared set of specifications.",
    ],
    metrics: [
      { value: "14", label: "UX Flow Mapping" },
      { value: "0–1", label: "Design System Development" },
      { value: "Modular Design", label: "Enabling Product Scalability" },
    ],
    background:
      "XnFun is a shared photo album app developed by USI (Universal Scientific Industrial) for use with the XnBay smart storage server. It provides photo backup, album sharing, comments, and activity notifications. As the product expanded from everyday photo storage to scenarios such as travel and documenting a child’s growth, long-standing differences between the iOS and Android interfaces, along with the lack of an extensible content and design architecture, began to limit its growth.\nAs part of a team of three UI/UX designers, I was primarily responsible for the Travel Album feature and worked with the team to establish cross-platform consistency and design guidelines. The Baby Album feature was primarily handled by another designer.",
    problem: [
      { h: "Inconsistent experiences across platforms", p: "iOS and Android had different interfaces and workflows for operations such as album naming and member management, increasing both usage and maintenance costs." },
      { h: "No effective way to organize large volumes of uploaded content", p: "As a cloud storage server, the product continuously accumulated user-uploaded photos and files. However, the existing system relied mainly on a timeline, making specific content difficult to find quickly." },
      { h: "The existing architecture could not support new use cases", p: "The original albums focused on everyday photos and lacked reusable feature modules and design guidelines. As a result, new features such as Travel and Baby required repeated design and maintenance work." },
    ],
    goal: [
      { h: "Unify cross-platform interaction logic", p: "Reorganize the iOS and Android interfaces and interaction rules to establish a consistent, extensible cross-platform experience." },
      { h: "Establish a more contextual way to organize content", p: "Rethink how photos and files are categorized for different usage scenarios, improving the efficiency of finding and browsing content." },
      { h: "Build an extensible product design system", p: "Systematize colors, icons, components, and interaction rules so that new features can reuse existing modules." },
    ],
    question: "How can extensible new features be built from 0 to 1 on an existing system?",
    steps: [
      { title: "Auditing cross-platform differences and establishing consistent interaction standards", body: "I reviewed 14 key workflows across iOS and Android, compared four permission levels, and documented interface and interaction differences between the platforms.\nThe redesign focused on error prevention, permissions, and cross-platform consistency: adding confirmation and undo mechanisms for irreversible actions, using button states and prompts to communicate permission restrictions, and aligning core interaction logic with the guidelines of both platforms." },
      { title: "Defining Travel Album requirements through user testing and competitor analysis", body: "I participated in guerrilla user testing and interviews with four users, and analyzed eight competitors to understand how people organize and revisit their travel memories. The research revealed that users primarily rely on time and location to understand and organize photos, and that travel photos are often revisited for organizing and sharing.\nThese insights informed the design direction, allowing the Travel Album to support both quick searches and browsing within the context of a trip." },
      { title: "Designing the Travel Itinerary information architecture from 0 to 1", body: "Using date and location as the primary information dimensions, I designed the Travel Itinerary feature from the ground up to reorganize photos from multi-day trips. Combined with memory keywords, travel notes, attraction tags, and a travel map, it offers different ways to revisit and browse content, supporting users’ needs for both searching and organizing." },
      { title: "Establishing a product design system to support future feature expansion", body: "I established shared standards for colors, icons, component states, and cross-platform interaction rules. I also documented IX Flows for scenarios involving dates, members, and scrolling, creating specifications shared by design, engineering, and the client.\nThe same set of modules and rules can be reused across all three album scenarios: Daily, Travel, and Baby." },
    ],
    takeaways: [
      { h: "When working with clients without a design background, communication matters more than jargon", points: [
        "Rather than relying on technical terms such as “UX” or “components,” showing product screens and competitor examples helps stakeholders from different professional backgrounds quickly understand the problem and proposed direction. It also makes it easier to align on interaction details when communicating with the IT team.",
      ] },
      { h: "Building a design system from 0 to 1 gives the product a foundation for future expansion", points: [
        "A design system does more than create a consistent interface. It turns scattered design decisions into reusable rules and modules, allowing future features to build on the existing system and continue to grow.",
      ] },
    ],
  },
};

/* zh is the base; with lang "en" the English text is laid over it (figures kept). */
export const mergeLang = (base: CaseStudy, en: CaseStudyEN | undefined, lang?: string): CaseStudy =>
  !en || lang !== "en" ? base : { ...base, ...en, steps: base.steps.map((s, i) => ({ ...s, ...en.steps[i] })) };

export const getCaseStudy = (slug?: string, lang?: string): CaseStudy | undefined => {
  const base = slug ? CASE_STUDIES[slug] : undefined;
  return base && mergeLang(base, slug ? CASE_STUDIES_EN[slug] : undefined, lang);
};

/* Password-protected case studies. Their text is NOT in this bundle: the page
   fetches it from /api/case (which checks the password cookie). Only the short
   public name used on prev/next cards lives here. */
export const LOCKED: Record<string, { name: string }> = {
  "ctbc-bank": { name: "中國信託個金官網改版" },
};
