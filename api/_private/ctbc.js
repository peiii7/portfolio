/* CTBC case study — kept OUT of the public site bundle.
   Served only by /api/case after the password (SITE_PASSWORD) is entered.
   The leading "_" keeps Vercel from turning this folder into a public endpoint. */
export const CTBC = {
  zh: {
    slug: "ctbc-bank",
    eyebrow: "中國信託個金官網改版",
    title: "AI 時代的官網體驗，從視覺定調到全站無障礙設計系統",
    industry: "金融銀行｜官方網站改版",
    role: "UI 設計師",
    team: "1 Design Lead、1 Design Mentor、1 PM、3 UX、3 UI",
    timeline: "2026.02–08",
    did: [
      "與設計團隊共同定調全站視覺方向——與其他 UI 設計師共同進行視覺提案，與客戶前後收斂 5 次以上，並延伸至 AI 搜尋等關鍵頁面。",
      "從 0 到 1 建立全站設計系統——從首頁 guideline 延伸發展，建起符合 WCAG AA 的無障礙設計系統與元件。",
      "依 AEM 維運方式規劃模組版型——內容由 23 個產品部門各自上稿，我以客戶端能自行更新為前提，將版型收斂為可重組的模組，並帶領 junior 設計師建立模組化版型的觀念，讓團隊產出能依循同一套規則。",
    ],
    metrics: [
      { value: "84", label: "SUS" },
      { value: "40", label: "AEM 版型收斂" },
      { value: "AA", label: "WCAG 全站無障礙" },
    ],
    background:
      "中國信託是台灣大型民營銀行，正推動數位轉型與 AI 應用，但品牌仍偏向傳統穩健，且網站內容由多個部門維運，資訊量大且架構複雜。另一方面，使用者也逐漸習慣先透過搜尋引擎、AI 或社群取得資訊，再進入官網確認細節。\n本次改版聚焦於提升資訊尋找效率、建立一致的使用體驗與可擴充的網站架構，並符合 WCAG AA 無障礙標準。我與 UI 設計團隊共同建立全站視覺方向，負責 AI 搜尋等關鍵頁面，並建立設計系統與 AEM 模組，支援跨部門的長期維運。",
    problem: [
      { h: "中年穩健的品牌形象，難以觸及年輕客群", p: "官網視覺無法呈現品牌感受，且未與集團其他數位平台形成一致調性，難以傳遞客戶在數位與 AI 上的進展。" },
      { h: "資訊架構複雜，使用者尋路困難", p: "內容依產品與部門權責分類，不符使用情境；站內搜尋成效不彰，需來回點擊才找得到。" },
      { h: "技術與權責限制，導致體驗不一致", p: "各頁面由不同部門自行以 AEM 上稿、Minisite 外連無統一規範，又缺乏可依循的設計系統。" },
    ],
    goal: [
      { h: "形塑年輕、聰明、特色鮮明的形象", p: "以跳脫金融業的設計嘗試與呼應潮流的科技感，扭轉既有的「中年穩重」印象。" },
      { h: "提升資訊查找效率，推進使用者旅程", p: "以使用情境取代部門權責重組內容，讓人更快找到需要的產品；並強化互動與轉換引導，帶動流量、客戶滿意度與服務申辦率。" },
      { h: "建立可在 AEM 維運且通過無障礙的設計模組", p: "元件以行動銀行現有樣式為參考依據，維持跨平台一致的數位體驗，並以符合無障礙的設計系統作為 AEM 模組的基礎，降低多部門共同維運成本。" },
    ],
    question: "當使用者已經在站外找到答案，官網要如何重新變得新穎、好找且可擴充？",
    steps: [
      { n: "01", title: "把抽象的品牌期待，收斂成可執行的視覺語彙", body: "官網作為驗證的終點，必須在幾秒內讓人認知所在網站。我們 UI 團隊針對現代風格銀行網站與 AI 產品風格呈現進行競品分析，從中提取出色彩流動、視覺層次、動態運作三個視覺要素，並依此提出兩個方向。", figs: [{ en: "/case/ctbc/o1-1-en.webm", zh: "/case/ctbc/o1-1-zh.webm" }, "/case/ctbc/o1-2.png"] },
      { n: "02", title: "在 Figma 中製作動態與高擬真原型，加速雙方對焦", body: "受 AI Flow 的開發限制，這階段聚焦在視覺與互動的優化，我以帶呼吸感的有機漸層光體、圖示旋轉等微動效，視覺化「AI 正在運算」的過程，並用 Figma Animate 製作動效快速呈現，再以 Figma Sites 串接整段為高擬真原型，並串接首頁到 L2 的可操作原型，對焦雙方想像，並提供大小網同步交付。", figs: ["/case/ctbc/o2-1.webm", "/case/ctbc/o2-2.webm"] },
      { n: "03", title: "從 0 到 1 建立設計系統，依據 AEM 系統邏輯進行模組設計", body: "初期沿用首頁設計規範建立元件與色彩規則；後期依據客戶提供新版色彩系統，設定對應 token 提升未來調整效率，並更新元件，確保全站通過無障礙 AA 規範。模組則依 AEM 的上稿邏輯切分，並確保同一套模組在大小網都成立，全站收斂為 40＋ 個版型與 45＋ 個模組，提供 23 個部門自行更新內容，提升維運效率。", figs: ["/case/ctbc/o3-1.jpg", "/case/ctbc/o3-2.jpg"] },
      { n: "04", plain: true, title: "專案範圍與交付", body: "由於本案止於驗證階段，未進入開發，因此團隊收斂已交付的內容，包含歷次視覺方向提案原稿、首頁與 AI 搜尋等關鍵頁面概念設計、設計系統、模組化版型規範，以及全站無障礙 WCAG AA 設計規範。" },
    ],
    takeaways: [
      { h: "AI 既是設計的題目，也是工作的方法", points: [
        "要讓使用者信任 AI 的結果，靜態視覺有時是不夠的。這次的設計與產品調研讓我體會到，透過動態與互動將 AI 思考、運算的過程視覺化，不只能展現「智能感」，也能讓使用者理解系統正在處理什麼。過去只能靠描述的動態概念，現在也能借助 AI 工具快速轉化成可看、可操作的產出，加速想法落地。",
        "AI 帶來的是效率，但從 0 到 1 的創意與判斷仍然需要人。這次協作也讓我逐漸摸索出自己的分工方式，從反覆嘗試到能判斷哪些工作適合交給 AI，將重複性的工作從流程中移除，把時間留給真正需要思考與決策的部分。",
      ] },
      { h: "卡住專案的往往不是設計，而是溝通與決策", points: [
        "這個專案讓我體會到，讓流程停滯的往往不是設計本身，而是溝通與決策。客戶組織龐大，不同層級都有各自的意見，同一份提案可能收到不同方向的回饋，當雙方沒有建立明確的決策窗口與收斂機制，方向就容易不斷重來。回頭看，如果能在一開始就確認真正具決策權的窗口，並建立明確的溝通與決策機制，整體合作會更有效率。",
      ] },
    ],
  },

  en: {
    eyebrow: "CTBC Bank｜Retail Banking Website Redesign",
    title: "Repositioning the Website Experience in the AI Era, From Visual Direction to a Site-Wide Accessible System",
    industry: "Banking & Finance｜Corporate Website Redesign",
    role: "UI Designer",
    team: "1 Project Manager、1 Design Lead、1 Design Mentor、3 UX Designers、3 UI Designers",
    timeline: "Feb–Aug 2026",
    did: [
      "Co-defined the site-wide visual direction with the design team——Worked with other UI designers on visual proposals and refined the direction with the client through more than five rounds of feedback. Extended the approved direction to key pages, including AI search.",
      "Built the site-wide design system from the ground up——Expanded the homepage guidelines into a comprehensive, accessible design system and component library that meets WCAG AA standards.",
      "Designed modular templates around AEM’s content management workflow——With content maintained by 23 product departments, I structured page templates into reusable modules that departments could update and recombine independently. I also guided junior designers in adopting a modular design approach, helping the team work consistently within a shared set of rules.",
    ],
    metrics: [
      { value: "84", label: "SUS score" },
      { value: "40", label: "AEM page templates" },
      { value: "AA", label: "WCAG Accessibility" },
    ],
    background:
      "CTBC is one of Taiwan’s largest privately owned banks. While investing in digital transformation and AI applications, its brand image remained relatively traditional. The website was maintained by multiple departments, resulting in a large volume of content and a complex information architecture. At the same time, users were increasingly turning to search engines, AI tools, and social media for answers before visiting official websites to verify details.\nThe redesign focused on improving information discovery, establishing a consistent user experience, and creating a scalable website structure that meets WCAG AA accessibility standards. I worked with the UI design team to define the site-wide visual direction, took responsibility for key pages such as AI search, and developed the design system and AEM modules to support long-term maintenance across departments.",
    problem: [
      { h: "A conservative, middle-aged brand image struggled to connect with younger audiences", p: "The website’s visual design did not clearly communicate the brand identity or align with the group’s other digital platforms. It also failed to reflect the bank’s progress in digital services and AI." },
      { h: "A complex information architecture made navigation difficult", p: "Content was organized around products and internal departmental ownership rather than users’ needs and scenarios. On-site search was also ineffective, forcing users to navigate through multiple pages to find information." },
      { h: "Technical constraints and fragmented ownership led to an inconsistent experience", p: "Different departments independently published content through AEM, while externally linked minisites lacked shared design standards. There was also no unified design system to guide implementation." },
    ],
    goal: [
      { h: "Create a younger, smarter, and more distinctive brand image", p: "Move beyond conventional banking aesthetics with contemporary, technology-driven visual design to refresh the bank’s traditionally conservative image." },
      { h: "Improve information discovery and guide users through their journeys", p: "Reorganize content around users’ needs rather than internal departmental structures. Strengthen interaction and calls to action to support website traffic, customer satisfaction, and service applications." },
      { h: "Build accessible, AEM-ready design modules", p: "Use the existing mobile banking interface as a reference to maintain consistency across digital platforms. Establish an accessible design system as the foundation for AEM modules, reducing the maintenance burden across departments." },
    ],
    question: "When users find answers elsewhere before visiting a website, how can the site become fresh, easy to navigate, and scalable?",
    steps: [
      { title: "Turning abstract brand expectations into a practical visual language", body: "As the final destination where users verify information, the website needs to communicate its identity within seconds. Our UI team conducted competitive research on contemporary banking websites and AI product interfaces. From this research, we identified three visual principles — flowing colors, visual depth, and motion — and developed two proposed design directions based on them." },
      { title: "Creating motion and high-fidelity prototypes in Figma to align expectations", body: "Due to development constraints around the AI flow, this stage focused on refining the visual design and interactions. I used organic gradient light forms with a breathing effect, along with subtle motion such as rotating icons, to visualize the process of AI computation.\nI created the animations in Figma Animate for quick presentation, then connected them in Figma Sites to build a high-fidelity, interactive prototype covering the homepage through Level 2 pages. This allowed the team and client to experience the proposed interactions directly instead of relying on verbal descriptions. Desktop and mobile versions were delivered together." },
      { title: "Building the design system from scratch and structuring modules around AEM", body: "Initially, I developed components and color rules based on the homepage guidelines. Later, when the client provided an updated color system, I established corresponding design tokens to make future adjustments more efficient and updated the components to ensure site-wide compliance with WCAG AA standards.\nThe modules were structured around AEM’s content publishing workflow and designed to work across both desktop and mobile. The site was consolidated into 40+ templates and 45+ modules, enabling 23 product departments to update their own content more efficiently." },
      { title: "Project Scope & Deliverables", body: "The project concluded at the validation stage and did not proceed to development. The team consolidated the completed deliverables, including the original files from each round of visual proposals, concept designs for key pages such as the homepage and AI search, the design system, modular template guidelines, and site-wide WCAG AA accessibility specifications." },
    ],
    takeaways: [
      { h: "AI was both the subject of the design and a tool in my workflow", points: [
        "Static visuals are not always enough to help users trust AI-generated results. Through this project and product research, I learned that visualizing AI’s thinking and processing through motion and interaction can do more than create a sense of intelligence — it can also help users understand what the system is doing. Concepts that once existed only as verbal descriptions can now be turned into visible, interactive prototypes much faster with AI tools, accelerating the process of bringing ideas to life.",
        "AI improves efficiency, but human creativity and judgment are still essential when developing ideas from the ground up. Through this collaboration, I gradually learned how to divide tasks effectively and identify which work is suitable for AI. By removing repetitive tasks from my workflow, I could devote more time to the parts that require deeper thinking and decision-making.",
      ] },
      { h: "What holds a project back is often communication and decision-making, not design", points: [
        "This project taught me that delays often stem from communication and decision-making rather than the design work itself. With a large client organization, stakeholders at different levels may have conflicting opinions, and a single proposal can receive feedback that pulls in different directions. Without a clear decision-maker and an agreed process for resolving feedback, the design direction can repeatedly change. Looking back, identifying the key decision-maker and establishing a clear communication and decision-making process at the beginning would have made the collaboration much more efficient.",
      ] },
    ],
  },
};
