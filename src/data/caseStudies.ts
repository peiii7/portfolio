/* Case-study long-form content (Figma 15:31025 template).
   Chinese first, straight from the Notion "專案紀錄" pages. English (`en`)
   is filled in later; components fall back to zh when en is empty. */

// Tea Island media (pulled from peichidesign.framer.website/work/tea-island-tea-stories)
import teaBlueprint from "/images/EaeL9ZIxpeBQB3rdhgeoglldCI.jpg";
import teaPersonas from "/images/5i5NClGJQNODUsE09RrnublxI.jpg";
import teaVisual from "/images/HxBZFKZhDnJnEWG72VCYYgCmso.jpg";
import teaGame1 from "/images/oWqsdRZp1XjEfR285hn2NxIGU.jpg";
import teaGame2 from "/images/NdwizdYBJm7o7n2P6wVuwcMc13E.jpg";
import teaPos from "/images/6JUrRP1XmafvZ17kv7HrqfSybMY.jpg";
import teaShow1 from "/images/YXlfBhNXKQkGi7XTpbMidrZzA.png";
import teaShow2 from "/images/u2ILkZQLoBsPqbTEAQazthgqKg.jpg";
import teaShow3 from "/images/NBOLC0WKwyAAq9Gr1becTb267SE.jpg";
import teaShow4 from "/images/ZP5evuPm18gMoRVfzhuK0GROCE.jpg";
import teaVideo from "/images/tea-video.mp4";
// XnFun media (peichidesign.framer.website/work/xnfun-app)
import xnMap from "/images/Nr8M0YCrzJFzpaNq4tQgbTrN8.jpg";
import xnBefore from "/images/53vv3yHapCpUoQxxeH6MvTFI.jpg";
import xnCompete from "/images/H3SRRAaLihJ7L2BLiV4BOIBdGKs.jpg";
import xnInterface from "/images/BXF0CBBHbIjtqRGd31BRMA1MXs.jpg";
import xnTravel from "/images/wlmW6GhT9We1eR0y3oomWgr0.jpg";
import xnShow1 from "/images/HsGblrcqPtNY08gwnZw4891Wjgs.jpg";
import xnModular from "/images/fmJooqdkivF5L3ptvDbjQLnW4.jpg";
import xnShow2 from "/images/Z7rG7G6Wrcz4GqraqoEhLDsnDo.jpg";

export interface Metric { value: string; label: string; }
export interface PG { h: string; p: string; }
export type Media = string | { en: string; zh: string };   // lang-aware when object
export interface Step { n: string; title: string; body: string; figs?: Media[]; }
export interface Takeaway { h: string; points: string[]; }

export interface CaseStudy {
  slug: string;
  title: string;
  eyebrow?: string;                    // short line above the title
  hero?: Media;                        // overrides proj.hero; can be a video / lang-aware
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
    hero: "/case/fubon/hero.mp4",
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
      { n: "01", title: "延伸品牌視覺語彙，提高品牌連結度", body: "設計是藉由細節堆疊出來，我從富邦 Logo 拆出「圓、方、交疊」三個特徵，將它們轉化為頁面上的圖騰與畫面元素，全站共用同一套形狀語言。插畫也延伸同一套邏輯：以富邦人壽 App 既有的插畫系統為基礎，為官網重新繪製一組商品情境插畫，保留原本的繪製邏輯與角色語彙，調整色彩層次與細節密度，讓它能承載官網較大的版面與較長的閱讀情境。", figs: ["/case/fubon/o1.mov"] },
      { n: "02", title: "模組化元件設計，建立集團一致的企業視覺", body: "依循品牌規範與設計系統，依功能需求延伸新元件，建立元件類型、適用情境與使用規範，經客戶團隊討論後整併至設計系統；同時進行版型盤點，從不同頁面需求中收斂共通的模組與樣式，建立可複用的設計規則，讓後續需求能依循既有規範延伸，降低維運成本。", figs: ["/case/fubon/o2.webm"] },
      { n: "03", title: "無障礙頁面設計，建立符合 WCAG AA 的專屬版型", body: "依 WCAG 與客戶既有的無障礙規範，針對樂齡與身心障礙用戶的使用需求，規劃金融友善服務專區的專屬版型，並依內容與使用情境調整既有元件的尺寸、間距與互動狀態，同時將 AA 級對比標準納入版型規劃，確保資訊具備良好的可讀性與操作性。", figs: ["/case/fubon/o3.jpg"] },
      { n: "04", title: "參與 12 場易用性測試，驗證設計概念", body: "易用性測試中，多數受測者認為新版官網是符合需求的、容易使用的、容易理解的，概念驗證獲得一致的正向回饋。過程中也發現，部分使用阻礙並非來自功能或資訊架構，而是受到視覺樣式、版面配置影響，因此同步觀察使用者反應並迭代視覺設計，降低理解與操作阻力。", figs: [{ en: "/case/fubon/o4-1-en.png", zh: "/case/fubon/o4-1-zh.png" }, "/case/fubon/o4-2.mp4"] },
    ],
    takeaways: [
      { h: "設計不只是在解決問題，也是在協調不同立場", points: [
        "功能與頁面定案之後，客戶仍會針對視覺提出調整需求。若僅以美感或個人偏好回應，討論容易陷入反覆來回；改以維運成本、頁面目的與易用性作為判斷依據，才能讓對話回到問題本身。",
        "多數調整需求的背後，是尚未被說清楚的隱性問題。釐清客戶內部不同決策層級、維運單位與利害關係人的需求，才能在不同立場之間找到推進設計的共識。",
      ] },
      { h: "無障礙不應是最後的檢核項目，而是元件設計時的預設條件", points: [
        "過去銀行網站的無障礙設計多集中於「金融友善專區」，但這次專案讓我更認同無障礙不應只是特定頁面的功能，而應成為整個網站的設計預設。",
        "將 AA 對比標準納入按鈕等基礎元件的設計規範，讓無障礙從單一專區的要求，延伸為全站設計時的基本考量。",
      ] },
    ],
  },

  "ctbc-bank": {
    slug: "ctbc-bank",
    eyebrow: "中國信託官網改版",
    title: "重新定位 AI 時代的官網體驗：從視覺定調到全站無障礙設計系統",
    industry: "金融銀行｜官方網站改版",
    role: "UI 設計師",
    team: "PM ×1、設計 Lead ×1、設計 Mentor ×1、UX ×3、UI ×3",
    timeline: "2026.02–08",
    did: [
      "與設計團隊共同定調全站視覺方向——與其他 UI 共同進行視覺提案，與客戶前後收斂 5 次以上，並延伸至 AI 搜尋等關鍵頁面。",
      "從 0 到 1 建立全站設計系統——從首頁 guideline 延伸發展，建起符合 WCAG AA 的無障礙設計系統與元件。",
      "依 AEM 維運方式規劃模組版型——內容由 23 個產品部門各自上稿，以客戶能自行更新為前提，將版型收斂為可重組的模組，並帶領 junior 設計師建立模組化觀念。",
    ],
    metrics: [
      { value: "62→84", label: "SUS 分數（電腦版），跨過 68 及格線進入優良區間（團隊成果）" },
      { value: "40・45", label: "版型・模組，供 23 個產品部門共用" },
    ],
    background:
      "中國信託是台灣大型民營銀行，正推動數位轉型與 AI 應用，但品牌仍偏向傳統穩健，且網站內容由多個部門維運，資訊量大且架構複雜。使用者也逐漸習慣先透過搜尋、AI 或社群取得資訊，再進入官網確認細節。本次改版聚焦提升資訊尋找效率、建立一致體驗與可擴充架構，並符合 WCAG AA。我與 UI 團隊共同建立全站視覺方向，負責 AI 搜尋等關鍵頁面，並建立設計系統與 AEM 模組。",
    problem: [
      { h: "中年穩健的品牌形象，難以觸及年輕客群", p: "官網視覺無法呈現品牌感受，也未與集團其他數位平台形成一致調性，難以傳遞客戶在數位與 AI 上的進展。" },
      { h: "資訊架構複雜，使用者尋路困難", p: "內容依產品與部門權責分類，不符使用情境；站內搜尋成效不彰，需來回點擊才找得到。" },
      { h: "技術與權責限制，導致體驗不一致", p: "各頁面由不同部門自行以 AEM 上稿、Minisite 外連無統一規範，又缺乏可依循的設計系統。" },
    ],
    goal: [
      { h: "形塑年輕、聰明、特色鮮明的形象", p: "以跳脫金融業的設計嘗試與呼應潮流的科技感，扭轉既有的「中年穩重」印象。" },
      { h: "提升資訊查找效率，推進使用者旅程", p: "以使用情境取代部門權責重組內容，讓人更快找到需要的產品；並強化互動與轉換引導。" },
      { h: "建立可在 AEM 維運且通過無障礙的設計模組", p: "元件以行動銀行現有樣式為參考，維持跨平台一致，並以符合無障礙的設計系統作為 AEM 模組的基礎。" },
    ],
    question: "當使用者已經在站外找到答案，官網要如何重新變得新穎、好找且可擴充？",
    steps: [
      { n: "01", title: "把抽象的品牌期待，收斂成可執行的視覺語彙", body: "官網作為驗證的終點，必須在幾秒內讓人認知所在網站。我們 UI 團隊針對現代風格銀行網站與 AI 產品風格進行競品分析，從中提取出色彩流動、視覺層次、動態運作三個視覺要素，並依此提出兩個方向。", figs: [{ en: "/case/ctbc/o1-1-en.webm", zh: "/case/ctbc/o1-1-zh.webm" }, "/case/ctbc/o1-2.png"] },
      { n: "02", title: "在 Figma 中製作動態與高擬真原型，加速雙方對焦", body: "受 AI Flow 的開發限制，這階段聚焦在視覺與互動的優化。我以帶呼吸感的有機漸層光體、圖示旋轉等微動效，視覺化「AI 正在運算」的過程，並用 Figma Animate 製作動效快速呈現，再以 Figma Sites 串接整段為高擬真原型，串接首頁到 L2 的可操作原型，對焦雙方想像並提供大小網同步交付。", figs: ["/case/ctbc/o2-1.webm", "/case/ctbc/o2-2.webm"] },
      { n: "03", title: "從 0 到 1 建立設計系統，依 AEM 系統邏輯進行模組設計", body: "初期沿用首頁設計規範建立元件與色彩規則；後期依客戶新版色彩系統設定對應 token 提升調整效率，並更新元件確保全站通過無障礙 AA。模組依 AEM 上稿邏輯切分，並確保同一套模組在大小網都成立，全站收斂為 40＋ 版型與 45＋ 模組，供 23 個部門自行更新內容。", figs: ["/case/ctbc/o3-1.jpg", "/case/ctbc/o3-2.jpg"] },
      { n: "04", title: "專案範圍與交付", body: "由於本案止於驗證階段，未進入開發，因此團隊收斂已交付的內容，包含歷次視覺方向提案原稿、首頁與 AI 搜尋等關鍵頁面概念設計、設計系統、模組化版型規範，以及全站無障礙 WCAG AA 設計規範。" },
    ],
    takeaways: [
      { h: "AI 既是設計的題目，也是工作的方法", points: [
        "要讓使用者信任 AI 的結果，靜態視覺有時是不夠的。透過動態與互動將 AI 思考、運算的過程視覺化，不只能展現「智能感」，也能讓使用者理解系統正在處理什麼。",
        "AI 帶來的是效率，但從 0 到 1 的創意與判斷仍然需要人。這次協作讓我逐漸摸索出自己的分工方式，把重複性工作交給 AI，將時間留給真正需要思考與決策的部分。",
      ] },
      { h: "卡住專案的往往不是設計，而是溝通與決策", points: [
        "讓流程停滯的往往不是設計本身，而是溝通與決策。客戶組織龐大，不同層級都有各自意見，同一份提案可能收到不同方向的回饋。",
        "如果能在一開始就確認真正具決策權的窗口，並建立明確的溝通與收斂機制，整體合作會更有效率。",
      ] },
    ],
  },

  "tea-island-tea-stories": {
    slug: "tea-island-tea-stories",
    eyebrow: "茶嶼茶語｜畢業專題",
    title: "從服務藍圖釐清需求，打造沉浸式茶館服務設計",
    industry: "文化體驗｜服務設計與遊戲化系統",
    role: "UI/UX 設計師／主視覺",
    team: "PM 1（兼開發）、UI/UX 與主視覺 1、3D 設計 1、開發 2",
    timeline: "2022.03–2023.05",
    extra: { k: "專案性質", v: "茶嶼茶語 Tea Island｜畢業專題，後續延伸經營" },
    did: [
      "茶館實地研究與服務流程分析——實地探訪茶館、觀察服務流程並進行訪談，將研究結果轉化為設計依據。",
      "建立整體視覺與介面系統——定義 3D 模型與遊戲視覺風格，並負責產品介面設計，建立一致的 UI 與遊戲視覺體驗。",
      "遊戲視覺內容與展覽影像製作——負責角色、場景概念、動畫等遊戲視覺製作，並製作展覽行銷影片與專案介紹影片。",
    ],
    metrics: [
      { value: "Silver", label: "2024 Indigo Award 互動設計組 銀獎" },
      { value: "Final List", label: "2023 Red Dot 設計概念組 入圍" },
      { value: "Nomination", label: "2023 VGW Award 跨領域組 提名" },
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
      { n: "01", title: "走訪傳統茶館，用服務藍圖找出真實的斷點", body: "我們實地體驗紫藤廬等茶館的完整服務流程，訪談店員與利害關係人，繪製茶館服務藍圖，並以同理心地圖整理顧客在點茶前中後的情緒起伏，繪製出顧客旅程圖，發覺真實體驗的痛點，以此為專案發展基礎。", figs: [teaBlueprint, teaPersonas] },
      { n: "02", title: "定調視覺風格，建立茶文化的遊戲世界", body: "作為主視覺，我研究不同的 3D 藝術與遊戲美學，探索適合茶文化與遊戲體驗的視覺方向。最終以 Low Poly 為基礎，在可愛與真實之間取得平衡，同時考量小團隊的製作能力與專案時程，透過概念草圖與 3D 測試逐步確立整體視覺風格。", figs: [teaVisual] },
      { n: "03", title: "設計遊戲化調茶系統，讓茶文化融入探索過程", body: "依據六大茶類，將茶的特色轉化為遊戲中的六個探索場景，將茶與配料的資訊融入遊戲中，提供玩家對調茶風味的想像，在探索過程中了解茶的知識，協助顧客選擇調茶，降低點茶門檻。", figs: [teaVideo, teaGame1, teaGame2] },
      { n: "04", title: "為熟客與不熟悉遊戲的顧客提供更快速的調茶流程", body: "除了遊戲化調茶體驗，也為熟客與不熟悉遊戲操作的顧客保留更直接的方式。以一般 POS 機作為快速調茶入口，重新設計 POS 介面與內容，讓顧客可以跳過遊戲探索直接完成選擇；同時延續遊戲中的視覺風格與元素，讓兩條路徑維持一致的視覺語言。", figs: [teaPos] },
      { n: "05", title: "整合虛擬與實體的體驗", body: "遊戲結束後依玩家的選擇生成專屬命名茶卡，隨茶飲一同送上。體驗因此不會隨著喝完而結束，茶卡本身會成為收藏與再訪的理由，提升回客率。專案完成後，我們也透過 Instagram 延伸經營服務設計與茶文化內容，讓影響力不止於畢業展。", figs: [teaShow1, teaShow2, teaShow3, teaShow4] },
    ],
    takeaways: [
      { h: "遊戲化不是加法，而是重新設計服務的骨架", points: [
        "一開始很容易把遊戲化當成貼在既有流程上的裝飾。真正有效的做法是回到服務藍圖，讓遊戲機制去承擔原本由店員承擔的說明工作。",
        "設計要解決的是痛點，並考量用戶習慣，因此應承認使用者的差異確實存在，然後給出各自適合的選擇。",
      ] },
      { h: "視覺風格要同時服務品牌與製作現實", points: [
        "身為主視覺，我學到風格決策不能只看美感，也需要兼顧技術上的考量——太精緻的 3D 模型在遊戲中反而會影響效能，且全組一起建模時也容易出現風格落差。",
      ] },
    ],
  },

  "xnfun-app": {
    slug: "xnfun-app",
    eyebrow: "XnFun 共享相簿 App",
    title: "優化既有系統，從 0 到 1 打造模組化新功能",
    industry: "雲端儲存｜共享相簿 App",
    role: "UI/UX 設計師",
    team: "PM ×1、UI/UX ×3",
    timeline: "2022.08–2023.03",
    extra: { k: "上架時間", v: "已上線（現行版本尚未套用本次設計交付內容）" },
    did: [
      "盤點雙平台介面差異——走查 iOS／Android 14 項關鍵操作流程，對比 4 種權限層級，建立一致的互動基準。",
      "主責「旅遊相簿」從 0 到 1——訪談 4 位使用者、分析 8 項競品，定義以日期與地點為核心的資訊架構，設計旅遊日程、回憶關鍵字、景點標籤與旅遊地圖等核心功能。",
      "建立可延伸的設計系統——統整色彩、Icon、元件狀態與跨平台互動規則，並建立 IX Flow，讓設計、工程與業主以同一套規格協作。",
    ],
    metrics: [
      { value: "iOS／Android", label: "統一核心互動規則" },
      { value: "日期 × 地點", label: "Travel Album 資訊架構" },
      { value: "3 情境", label: "Daily／Travel／Baby 共用模組" },
    ],
    background:
      "XnFun 是環鴻科技（USI）旗下搭配 XnBay 智慧儲存伺服器使用的共享相簿 App，提供照片備份、相簿分享、留言與動態通知。隨著產品從日常照片延伸至旅遊與寶貝成長等情境，既有 iOS／Android 介面長期累積的差異，以及缺乏可延伸的內容與設計架構，開始限制產品的擴展。我在 3 位 UI/UX 設計師的團隊中主責「旅遊相簿」，並與團隊共同處理跨平台一致性與設計規範。",
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
      { n: "01", title: "盤點雙平台差異，建立一致的互動基準", body: "走查 iOS／Android 14 項關鍵流程，對比 4 種權限層級，整理平台間的介面與操作差異。重新設計聚焦防錯、權限與跨平台一致性：為不可逆操作加入確認與復原機制，以按鈕狀態與提示呈現權限限制，並依循兩平台規範統一核心互動邏輯。", figs: [xnMap, xnBefore] },
      { n: "02", title: "透過使用者測試與競品分析，定義旅遊相簿的需求", body: "我參與游擊測試訪談 4 位使用者，並分析 8 項競品，了解使用者如何整理與回顧旅遊回憶。研究發現，使用者主要依靠「時間」與「地點」理解與整理照片，而旅遊照片也常被重新瀏覽。這些洞察讓旅遊相簿同時支援「快速搜尋」與「以旅程脈絡瀏覽內容」。", figs: [xnCompete, xnInterface] },
      { n: "03", title: "從 0 到 1 設計「旅遊日程」資訊架構", body: "以「日期 × 地點」作為主要資訊維度，從 0 到 1 設計「旅遊日程」，重新組織多日行程的照片；搭配回憶關鍵字、旅遊備註、景點標籤與旅遊地圖功能，提供不同方式的回顧與瀏覽，以應對使用者在搜尋與整理時的不同情境。", figs: [xnTravel, xnShow1] },
      { n: "04", title: "建立產品設計系統，支援後續功能擴充", body: "從色彩、Icon、元件狀態到跨平台操作規則建立共用規範，並整理日期、成員、Scroll 等情境的 IX Flow，形成設計、工程與業主共用的規格。日常、旅遊、寶貝三種相簿皆可沿用同一套模組與規則。", figs: [xnModular, xnShow2] },
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

export const getCaseStudy = (slug?: string) => (slug ? CASE_STUDIES[slug] : undefined);
