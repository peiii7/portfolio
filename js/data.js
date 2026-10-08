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
    slug: "green-english",
    cardTitle: "Green English",
    category: "uiux",
    categoryLabel: "Education",
    client: "Green English (Taiwan)",
    role: "UIUX / Website Development",
    timeline: "2024/12-2025/2",
    hero: IMG + "UYob1HlDnS7Fk7q0zHIup77Ygw.jpg",
    gallery: [
      IMG + "2jxFXvigy19yvH9ghBedCP1II.jpg",
      IMG + "bdHcz30BTDaSvkvpmyDA9ewiZY.jpg",
      IMG + "eyyo1CRZN8FeUTNba3A8EIydvz0.png",
      IMG + "kRrxFXzAMuKw8SCIWRKNEfpaY.jpg",
      IMG + "3lC2XY5fWNwB2tgiQUn9EZnw.jpg",
      IMG + "I3BozFGO4Wa30zbS60KfKyuT38.jpg",
      IMG + "wWyJnIE3pSUu1TCnkm54VM0E.jpg",
      IMG + "elDt7VkVYM4ufn2FjzRYkx9ryc.jpg",
      IMG + "rUC0pgGVhNh29MyqMXat1rZEg.jpg",
      IMG + "eWgT5zofEGatVIf0aa6tT0evhs.jpg"
    ],
    title: "Green English-Key to the word",
    intro: "Green English, a trusted education brand for nearly 20 years in Chiayi. I refined the brand vision and designed a WordPress website with CMS functionality, enabling easy updates. The site connects students, parents, and the institute, providing curriculum details, activity updates, and a gallery for past events.",
    challengeTitle: "Defining a Unique Identity for a Small Educational Brand",
    challengeBody: "1.Expanding Outreach & Enhancing Marketing\n2.Differentiating from Exam-Focused Competitors\n3.Organizing Past Events",
    solutionTitle: "A Warm, Brand-Focused Web Identity",
    solutionBody: "The website was designed with warmth and approachability, reflecting its community-based, growth-centered approach. Using rounded corners and calming colors, the site creates an inviting atmosphere. WordPress CMS enables easy content management, allowing the client to keep the community informed and engaged while positioning the brand as a trusted educational partner.",
    features: [
      { title: "Brand Oriented Web Design", body: "Using the brand's signature green to reinforce its identity. A user-friendly layout ensures easy navigation, helping expand reach beyond local referrals while maintaining an approachable and trustworthy appearance." },
      { title: "Highlighting Growth-Centered Approach", body: "Created a brand identity and website design that emphasize children's development, differentiating Green English from exam-focused competitors." },
      { title: "Logo Redesign & Print Materials", body: "Revamped the brand logo and applied the refreshed identity to various print materials, ensuring a unified and professional visual presence across all platforms." }
    ],
    research: [
      { title: "Competitive Research & Analysis", body: "Conducted a thorough analysis of competitors, including both traditional and online educational institutions, to evaluate their website design styles, structures, and user flows. Based on this research, I developed a comprehensive sitemap, ensuring our website aligns with best practices while maintaining a unique identity for Green English." },
      { title: "Visual Style Definition & Brand Identity Research", body: "I developed four distinct logo concepts, each representing a different aspect of Green English's identity. The client chose the design that best captured their nurturing, community-focused approach." },
      { title: "Initial Wireframe Refinement & Later Feasibility", body: "I extended brand colors into the wireframe to create a lively feel but found the heavy tones visually overwhelming. Development constraints in WordPress further limited design flexibility, leading me to refine the layout for better balance and usability." }
    ]
  },
  {
    slug: "darwin-lab",
    cardTitle: "Darwin Lab",
    category: "interdisciplinary",
    categoryLabel: "Web3",
    client: "Darwin Lab (China)",
    role: "UIUX / Interaction",
    timeline: "2024/11-2025/1",
    hero: IMG + "QYk0dBOIT8oU6YDevRhtFzFNz0.jpg",
    gallery: [
      IMG + "g7Cu2IaFQOKqk6Z8orWOvzypFOg.jpg",
      IMG + "vqnC0xejmq3U4aCxG4jcqFzOg.jpg",
      IMG + "odJpYmcbI7YdurQmmoO62OUzLNE.jpg",
      IMG + "Ngu1EzBG0JgY2PSxD3lUxXK2yM.jpg",
      IMG + "A1lg2xTSMMsNHzBoGOYCLWcRtmU.jpg",
      IMG + "DL7CBtxluXBBl6O0F3dayy4.jpg",
      IMG + "avrvrSiQe3qakVJZCqf6ytdCYQ.jpg",
      IMG + "LJmIzFzG8tN7RhB4RNztJElDac.jpg",
      IMG + "XTN5XZuUNQlSXUP20sQkbpkTE.jpg"
    ],
    title: "Darwin Lab-Bridging Real-World Value With Blockchain",
    intro: "DarwinLabs is an innovative Web3 financial intermediation platform that offers investment options with different risk preferences through bond structures, enabling investors to choose the right investment product based on their risk tolerance. I assisted in branding, UIUX for official website, and interaction prototype. Collaborating with another designer, we focused on creating a seamless digital experience that bridges traditional finance with the digital future.",
    challengeTitle: "HMW balancing tradition and innovation in Web3 ?",
    challengeBody: "The challenge was to create a unique visual identity that sets the website apart from other blockchain products while conveying stability and trust. We also needed to seamlessly integrate the REAL Card app into the site, adapting it to Web3 without disrupting the original user experience.",
    solutionTitle: "Harmonizing Minimalism and Web3 Innovation",
    solutionBody: "Minimalist design with clear color schemes and typography to evoke trust and stability. To seamlessly integrate Web3 elements, we introduced subtle animations that enhance the immersive experience without adding excessive complexity for development, creating a balanced and user-friendly platform.",
    features: [
      { title: "Visualized Information", body: "Collaborate with AI to simplify complex information into clear messages, and visualize some of the information to provide users with a more intuitive and understandable website content and structure." },
      { title: "3D & Glassmorphism Images Design", body: "Striking a balance between traditional finance and Web3 aesthetics, we infused 3D elements into a flat design approach to enhance depth and futurism. The glassmorphism effect adds sophistication while maintaining clarity and usability." },
      { title: "Integrating Web3 Wallet into the Official Website", body: "After finalizing the website design, we iterated on the originally separate wallet product, seamlessly incorporating its features into the platform. This integration ensures a cohesive user experience while maintaining the professionalism of the corporate site." }
    ],
    research: [
      { title: "Explore related products and style analysis", body: "I analyzed 15+ Web3 brands and categorized their visual styles to identify design trends. This research guided our approach, balancing innovation, usability, and brand differentiation." },
      { title: "Different styles of UI Design", body: "I explored various design approaches, including the widely adopted cyberpunk aesthetic in Web3. To push the boundaries of futurism, I collaborated with AI to generate 3D elements, enhancing the visual depth and creating a more immersive, forward-looking experience." }
    ]
  },
  {
    slug: "cities-mapping-digital-nomads",
    cardTitle: "Cities Mapping-Digital Nomads",
    category: "interdisciplinary",
    categoryLabel: "Data Journalist",
    client: "Urban journalist network",
    role: "Research / Web Development",
    timeline: "2024/4-2024/5",
    hero: IMG + "Pn5gBOXaYtFSO4ljjnIStmigs.jpg",
    gallery: [
      IMG + "W4eqSjrU0uERewhKZRvI7CJGGQ.png",
      IMG + "ZDJsWvvjlyHPx61IRyP0oIVAc.png",
      IMG + "CJUxtZiXdmTnk0dvsSCZ3f5JhM.png",
      IMG + "cQHxsvUboV9fmUHoM5buSeHU7Dg.png",
      IMG + "fx0vhAUXPVXcfX7fOdghY94Gd6s.png",
      IMG + "DHhCyOmMP948lkouiQh79v9IS2A.png",
      IMG + "sqsMdk5nO5tPyLgwIENDB60Xw.png",
      IMG + "FA3OMDPKG9LtI70yVabrXsKY64Y.jpg",
      IMG + "I8nwfDMMdklX1eXG0R0Hia4kqhE.png"
    ],
    title: "Digital Nomads: Global Lifestyle Rise and Local Impact",
    intro: "This project is part of a data visualization course in collaboration with UJN, focusing on uncovering narratives within existing data. By blending data with journalism, it explores the growing presence of digital nomads and their impact on local communities, presenting findings in a compelling, report-style format.",
    challengeTitle: "Clarifying and Visualizing the Digital Nomad Impact",
    challengeBody: "1.Clarify the ambiguous term \"digital nomad\" and its varying definitions.\n2.Focus on key aspects: coworking spaces and micro apartments for a travel lifestyle.\n3.Simplify wireframe design and consolidate complex ideas.\n4.Create a clear, engaging narrative to visualize the impact of digital nomads on local communities.",
    solutionTitle: "Scrolly Telling Journey with Illustrated Interface",
    solutionBody: "We use a scrolly telling approach combined with an illustrated interface design to turn the website into an immersive journey. As users scroll, they follow the digital nomad's story, exploring key themes and insights along the way. The design aims to create an engaging, visual experience that guides users through the narrative, making the story both interactive and visually compelling.",
    features: [
      { title: "Scrolly-Telling Narrative", body: "I structured the website as a journey, allowing users to explore the digital nomad story through seamless scrolling interactions." },
      { title: "Illustrated Interface", body: "I developed a unique visual style to enhance storytelling, making complex data more engaging and accessible." },
      { title: "Seamless Data Integration", body: "I utilized Datawrapper to create various data charts, ensuring that statistical insights are presented clearly and effectively to support the narrative." }
    ],
    research: [
      { title: "Story Discovery and Paper Review", body: "We explored existing datasets to identify meaningful patterns and narratives related to digital nomads. To enhance the credibility of the findings, I conducted referencing academic papers, reports, and case studies that provide context and validation for the story." },
      { title: "Data Collection, Analysis & Visualization", body: "We gathered and organized relevant data from multiple sources, ensuring its accuracy and reliability. By structuring the data into verifiable evidence, I was able to create clear, data-backed insights. Additionally, I used visualization tools like Datawrapper, D3.js and illustrations to present complex information in an accessible and engaging format." },
      { title: "Sketch & Earlier Wireframe", body: "To define the visual style, I focused on balancing playfulness with clear data visualization. The initial wireframe had an overly colorful palette, which proved distracting and diluted the connection between the news content and data. To refine this, I simplified the color scheme, ensuring that visuals supported rather than overwhelmed the storytelling. The final design maintains an engaging illustrated style while keeping the focus on the seamless integration of information and data-driven insights." }
    ]
  },
  {
    slug: "tea-island-tea-stories",
    cardTitle: "Tea island, Tea stories",
    category: "interdisciplinary",
    categoryLabel: "Cultural Experience",
    client: null,
    role: "Product Designer / Animator",
    timeline: "2022/5~2023/5",
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
    title: "Tea island, Tea stories-Revitalizing Taiwanese tea culture, redefining tea house experiences.",
    intro: "“Tea island, tea stories” is a gamified ordering system designed to help tea house customers to discover the tea that suit their taste. During the game, user will act as an adventurer who was appointed a special mission by the great elder of the village. Every decision that the player made in the game will affect how the tea, which is the goal of the game and also the tea that user will get in the reality, will being composed.",
    challengeTitle: "Engaging Youth and Enhancing Service Flow",
    challengeBody: "1.Making tea culture appealing to younger generations\n2.Improving service efficiency",
    solutionTitle: "Redesigning the Tea House Experience with Gamified Ordering System",
    solutionBody: "We started with \"Tiaocha\", a new approach to reimagine the service process from the ground up. Designing a dual system caters to different customer needs, enhancing service flow and creating a more personalized, efficient tea house experience.",
    features: [
      { title: "Digital Integration & Gamified Ordering Experience", body: "Integrate the information of tea into the game, so that customers can understand in the process of exploration, and bring more imagination in ordering" },
      { title: "Normal Ordering System", body: "For customers who are familiar with tea or don't want to play games, we offer a more intuitive and fast ordering system to satisfy different types of customers." },
      { title: "Virtual and Physical Integration", body: "In order to emphasize personalization, in-game named tea cards will be included with the delivery to increase the connection between the tea and the player, and at the same time attract customers who like to collect to come back again." }
    ],
    research: [
      { title: "Portrait the service blueprint and customer journal map", body: "We actually went to the traditional teahouses to experience the service process, interviewed the stakeholders, and mapped out the service blueprint and customer journal map to uncover the pain points." },
      { title: "Define Personas", body: "Based on our observation, we have defined the main Personas. 1.The more experienced and older customers who already own enough knowledge of tea. 2.The younger generation who do not know much about tea but are curious to experience the tea culture." },
      { title: "Defining the Visual Identity / Art Style", body: "As the lead artist, I conducted extensive research on 3D artwork and game aesthetics to craft a distinctive yet feasible style. The goal was to ensure strong brand recognition while keeping production efficient. By refining concept sketches, we developed a cohesive 3D scene that balanced visual appeal with practical execution within the project timeline." }
    ]
  },
  {
    slug: "xnfun-app",
    cardTitle: "XnFun App",
    category: "uiux",
    categoryLabel: "Cloud Storage / Digital Media",
    client: "USI Global (Taiwan)",
    role: "UIUX Designer",
    timeline: "2022/10-2023/5",
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
    title: "XnFun - Recalling memories, sharing daily life",
    intro: "The XnFun App is a shared photo album app for the XnBay smart storage server, enabling photo backup and album sharing. I helped optimize the interface, enhance social features, and focus on designing and building the \"Travel Album\" and \"Baby Album\" functions.",
    challengeTitle: "Tackling System Gaps and Enhancing User Engagement",
    challengeBody: "1.System Inconsistencies\n2.Lack of Intuitive Navigation\n3.Client Vision\n\nHMW refine the existing logic and design while seamlessly integrating new features that align with user needs and the client's vision?",
    solutionTitle: "Redefining the Experience Through User-Centered Design",
    solutionBody: "Modular Design: Improved scalability and flexibility.\nInterface Optimization: Enhanced navigation and usability.\nNew Features: Balanced user needs with the client's vision.",
    features: [
      { title: "Optimized Interface & Social Features", body: "We refined the UI for a more intuitive experience while introducing social features. Interactive elements were added to create a more immersive browsing experience, encouraging engagement and seamless photo sharing." },
      { title: "Travel Album for Seamless Memory Keeping", body: "Based on the existing album structure, the Travel Album introduces a more tailored experience for documenting trips. Users can customize their albums with location-based sorting, timeline organization, and thematic categorization, ensuring a highly personalized way to relive and share their travel memories." },
      { title: "Modular Design for Scalable Album Creation", body: "The Baby Album was built using a modular design approach, enhancing flexibility for future features while reducing development time and user learning costs." }
    ],
    research: [
      { title: "Mapping Functions & Identifying Pain Points", body: "We conducted a comprehensive product audit to analyze the existing interface and functionality. By creating a functional map, we systematically organized features, clarified user flows, and uncovered inefficiencies. This process helped pinpoint usability pain points and informed key areas for improvement." },
      { title: "Competitive Analysis & User Interviews for Feature Planning", body: "We conducted a competitive analysis to evaluate industry benchmarks and identify opportunities for innovation. Alongside this, user interviews provided insights into real needs and pain points. These findings shaped our feature planning, ensuring that new functionalities align with user expectations while offering a competitive edge." },
      { title: "Merging Competitive Insights with Previous Visual", body: "Using the insights, I designed the wireframe to align with the product's visual style and interaction logic, ensuring a seamless and intuitive user experience that enhances trip documentation and sharing." }
    ]
  },
  {
    slug: "clinic-diary",
    cardTitle: "Clinic Diary",
    category: "graphic",
    categoryLabel: "Healthcare",
    client: "Resonance Psychiatric Clinic (Taiwan)",
    role: "Visual Designer",
    timeline: "2022/4-2022/5",
    hero: IMG + "fKoRJOYbjGjQbvEm2tAOaukHz0.jpg",
    gallery: [
      IMG + "kjZTCB7CGqfkuiysiciOca8TTyE.jpg",
      IMG + "psu79u4rb0us3JhYaBamEEzvDpQ.jpg",
      IMG + "vQ3otlV7k9tEXaXtXDYNk7ugaE0.jpg",
      IMG + "ryZLx7IreVGlQf5j9FbO5UqkspQ.jpg",
      IMG + "70tUDSl5vjBth5WqUTdv5uRle8.jpg",
      IMG + "NroEudRFYX0NkJAcClqdTxqErI8.jpg",
      IMG + "HqbjNelREi6qxEcBI7nPVZlAOQ.jpg"
    ],
    title: "Clinic Diary-Soothing companions, recording every day with you!",
    intro: "The project is designed for patients as part of the web diary for Resonance Psychiatric Clinic. Through the web, patients can record their conditions and set medication reminders. Psychologists can view patients' records on the web version, enabling them to better understand patients' conditions during consultations. The goal of this project is to enhancing the service experience for both physicians and patients during consultations and treatment.",
    challengeTitle: "Breaking the Cold Medical Imprint",
    challengeBody: "The challenge is to transform the cold, clinical image of healthcare into a therapeutic app that encourages continuous use. By enabling users to record their progress, the app aims to improve treatment outcomes and enhance the experience for both patients and physicians.",
    solutionTitle: "Healing, Lively, and Companionable Design",
    solutionBody: "We use a warm, lively design with soothing illustrations to create a comforting and supportive experience, enhancing both healing and companionship for patients.",
    features: [
      { title: "Friendly Engaging Design", body: "Soothing illustrations and a warm interface create a comforting experience, breaking the cold, clinical feel of traditional medical apps." },
      { title: "Personalized Health Tracking", body: "Patients can easily record their conditions and set medication reminders, promoting consistent self-care and treatment adherence." },
      { title: "Seamless Physician-Patient Connection", body: "Psychologists can access patient records via the web, enabling more informed consultations and improving overall care quality." }
    ],
    research: [
      { title: "Strengthening brand messaging to expand the brand spirit", body: "Using the visual representation of the brand's five core principles to design characters, fostering empathy with users through healing creatures, and enhancing the brand impression at the same time." },
      { title: "Design style conveying healing, liveliness, and companionship", body: "Personification facilitates interaction, enhancing communication with users and allowing for widespread application." }
    ]
  }
];

function getProject(slug){
  return PROJECTS.find(p => p.slug === slug);
}

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
