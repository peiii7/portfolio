import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useLang } from "../lang";
import { useIsMobile } from "../useIsMobile";
import { useHoverCursor, useCursorSuppress } from "../components/HoverCursor";

gsap.registerPlugin(SplitText, ScrollTrigger, Draggable, InertiaPlugin);

// hero assets (Figma 15:31124)
import cutout from "/assets/about-cutout.png";
import stampBeer from "/assets/about-stamp-beer.png";
import stampLake from "/assets/about-stamp-lake.png";
import diceBox from "/assets/toolkit-box-dithered.png";
import si1 from "/assets/skill-icon-1.png";
import si2 from "/assets/skill-icon-2.png";
import si3 from "/assets/skill-icon-3.png";
import si4 from "/assets/skill-icon-4.png";
import si5 from "/assets/skill-icon-5.png";
import si6 from "/assets/skill-icon-6.png";
import si7 from "/assets/skill-icon-7.png";
// shapes-me stamp carousels
import ada1 from "/assets/adatable01.png";
import ada2 from "/assets/adatable02.png";
import ada3 from "/assets/adatable03.png";
import ch1 from "/assets/challenger01.png";
import ch2 from "/assets/challenger02.png";
import ch3 from "/assets/challenger03.png";
import ch4 from "/assets/challenger04.png";
import tr1 from "/assets/traveler01.png";
import tr2 from "/assets/traveler02.png";
import tr3 from "/assets/traveler03.png";
import tr4 from "/assets/traveler04.png";
import matcha from "/assets/matcha-dithered.png";

const SERIF = "'Cormorant Garamond','Noto Sans TC',serif";
const SANS = "'Inter','Noto Sans TC',system-ui,sans-serif";
const DIM = "#767676";

const HERO_W = 1440, HERO_H = 706;

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1], delay }}>
    {children}
  </motion.div>
);

/* inline stamp carousel — CSS-only cycling so it never fights SplitText's DOM.
   `offset` shifts the whole carousel's cycle so the three don't flip in lockstep. */
function StampCarousel({ imgs, offset = 0 }: { imgs: string[]; offset?: number }) {
  return (
    <span className={`shapes-carousel sc-${imgs.length}`}>
      {imgs.map((src, i) => <img key={i} src={src} alt="" style={{ animationDelay: `${i - offset}s` }} />)}
    </span>
  );
}

const EXPERIENCE = {
  zh: [
    { t: "AJA Creative｜UI 設計師", d: "2025 – 現在" },
    { t: "Freelancer", d: "2023 – 現在" },
    { t: "遊石設計｜UI/UX 設計實習生", d: "2022 – 2023" },
    { t: "MIFLY 米菲多媒體｜文章撰寫與翻譯", d: "2021" },
  ],
  en: [
    { t: "AJA Creative｜UI Designer", d: "2025 – Now" },
    { t: "Freelancer", d: "2023 – Now" },
    { t: "UXI Design Co.｜UI/UX Design Intern", d: "2022 – 2023" },
    { t: "MIFLY Multimedia｜Article Writing & Translation", d: "2021" },
  ],
};
const AWARD = {
  zh: [
    { t: "Indigo Design Award — 銀獎", d: "2024" },
    { t: "Red Dot: Design Concept — 決選", d: "2023" },
    { t: "VGW Award — 提名", d: "2023" },
    { t: "教育部留學獎學金 — 得獎", d: "2023" },
  ],
  en: [
    { t: "Indigo Design Award — Silver", d: "2024" },
    { t: "Red Dot: Design Concept — Final List", d: "2023" },
    { t: "VGW Award — Nomination", d: "2023" },
    { t: "Ministry of Education (MOE) Scholarship — Winner", d: "2023" },
  ],
};
const LANGS = [
  { zh: "中文", en: "Mandarin", d: "Native", dz: "母語" },
  { zh: "英文", en: "English", d: "Fluent in professional and academic settings", dz: "能流暢應用於專業與學術情境" },
  { zh: "日文", en: "Japanese", d: "Comfortable with reading and listening", dz: "能順暢閱讀與聽取" },
  { zh: "德文", en: "German", d: "Familiar with basic phrases and expressions", dz: "熟悉基礎詞彙與日常用語" },
];

export default function About() {
  const { lang } = useLang();
  const en = lang === "en";
  const m = useIsMobile();
  const setCursor = useHoverCursor();
  const suppress = useCursorSuppress();
  const fade = (delay = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] as const, delay } });

  // scale the fixed 1440 hero canvas to the viewport (never "跑版")
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [showHey, setShowHey] = useState(true); // drag affordance bubble, hides after first drag
  const [showPlead, setShowPlead] = useState(false); // 🥺 reaction while/after dragging
  const pleadTimer = useRef<number>();

  // draggable photo, constrained to a small range on the right
  useEffect(() => {
    if (!photoRef.current) return;   // drag enabled on both desktop & mobile (photo has touchAction:none)
    const G = 16; // snap grid
    const d = Draggable.create(photoRef.current, {
      type: "x,y",
      bounds: { minX: -28, maxX: 48, minY: -26, maxY: 36 },
      edgeResistance: 0.85,
      cursor: "grab",
      activeCursor: "grabbing",
      inertia: true,
      onDragStart: () => { setShowHey(false); window.clearTimeout(pleadTimer.current); setShowPlead(true); },
      onDragEnd: () => { pleadTimer.current = window.setTimeout(() => setShowPlead(false), 1100); },
      snap: {
        x: (v) => Math.round(v / G) * G,
        y: (v) => Math.round(v / G) * G,
      },
    });
    return () => { d[0]?.kill(); if (photoRef.current) photoRef.current.style.transform = "rotate(0.19deg)"; };
  }, [m]);
  useEffect(() => {
    const wrap = wrapRef.current, stage = stageRef.current;
    if (!wrap || !stage) return;
    const fit = () => {
      if (m) { stage.style.transform = "none"; stage.style.height = "auto"; wrap.style.height = "auto"; return; }
      const scale = Math.min(1, wrap.clientWidth / HERO_W);
      // canvas grows with the intro copy (EN is longer than ZH)
      const t = textRef.current;
      const h = Math.max(HERO_H, t ? t.offsetTop + t.offsetHeight + 60 : 0);
      stage.style.height = h + "px";
      stage.style.transform = `scale(${scale})`;
      wrap.style.height = h * scale + "px";
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (textRef.current) ro.observe(textRef.current);
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, [m]);

  // Language section dark → light fade as shapes-me enters
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const shapes = document.getElementById("shapes-me");
    if (!shapes) return;
    // one-way latch: once it turns white it stays white
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLit(true); io.disconnect(); } }, { rootMargin: "0px 0px -20% 0px" });
    io.observe(shapes);
    return () => io.disconnect();
  }, []);

  return (
    <main style={{ fontFamily: SANS, paddingTop: 84 }}>
      {/* ---------- Hero (desktop: Figma 15:31124, scaled 1440 canvas; phones: stacked — copy, button, then photo) ---------- */}
      <div ref={wrapRef} style={{ position: "relative", width: "100%", overflow: "hidden", padding: m ? "16px 24px 8px" : 0, boxSizing: "border-box" }}>
        <div ref={stageRef} style={m ? { position: "relative" } : { position: "relative", width: HERO_W, height: HERO_H, transformOrigin: "top left", margin: "0 auto" }}>
          {/* text (section padding 60/120 per Figma 15:35303) */}
          <motion.div {...fade(0)} ref={textRef} style={m ? { position: "relative" } : { position: "absolute", left: 120, top: 60, width: 640 }}>
            <p style={{ fontSize: m ? 26 : 32, color: "#f0f0f0", margin: "0 0 20px" }}>{en ? "Hi there, it’s Peichi" : "嗨～我是 Peichi"}</p>
            <p style={{ fontSize: m ? 15 : 16, lineHeight: 1.75, color: "rgba(240,240,240,0.9)", margin: "0 0 20px" }}>
              {en
                ? "I'm a Product Designer focused on visual design, UI, and motion, with 3+ years of experience across finance, insurance, and other industries. I enjoy turning complex information architectures into clear and intuitive user experiences, while paying close attention to visual quality and interaction details."
                : "我是一名專注於視覺、UI 與動效設計的產品設計師，具備 3+ 年橫跨金融、保險與跨領域產品的實務經驗。我擅長將複雜的資訊架構轉化為清晰、直覺的使用體驗，同時兼顧視覺品質與互動細節。"}
            </p>
            {(en ? [{ h: "My Design Approach", p: "I like to start by understanding the problem and the context of use, then find the right balance between information architecture, interaction logic, and visual expression. Beyond interface design, I'm also interested in exploring the intersection of design and technology. I use AI tools to enhance my workflow and turn designs into code to build functional, interactive web experiences, bringing ideas from concept to reality." }, { h: "Exploration & Experimentation", p: "With a degree in Interaction Design, I also spent an exchange year at Fachhochschule Potsdam in Germany, studying Interface Design. My academic and hands-on experience has given me a deeper understanding of how design and code work together, as well as how to communicate and collaborate effectively across disciplines. I'm always curious to explore new tools, materials, and forms of interaction, from visual design to motion, and find new possibilities along the way." }] : [{ h: "My Design Approach", p: "我喜歡從理解問題與使用情境開始，在資訊架構、互動邏輯與視覺表現之間找到平衡。除了介面設計，我也樂於探索設計與技術的結合，善用 AI 工具輔助工作流程，並將設計轉化為程式碼，實際建構互動網頁，讓設計從概念走向落地。" }, { h: "Exploration & Experimentation", p: "我畢業於互動設計，曾赴德國 FHP 交換學習 Interface Design。過去的學習與實作經驗，讓我更理解設計與程式之間的關係，也培養了與跨領域夥伴協作、溝通的能力。我喜歡嘗試不同的媒材、工具與互動形式，從視覺設計到動效，持續探索設計的更多可能性。" }]).map((s) => (
              <div key={s.h} style={{ margin: "0 0 20px" }}>
                <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: m ? 20 : 24, lineHeight: 1.4, color: DIM, margin: "0 0 4px" }}>{s.h}</p>
                <p style={{ fontSize: m ? 15 : 16, lineHeight: 1.75, color: "rgba(240,240,240,0.9)", margin: 0 }}>{s.p}</p>
              </div>
            ))}
            {/* Contact button — marginTop collapses with the copy's 20px bottom margin → 24px gap */}
            <div style={{ marginTop: 24 }}>
              <a href="mailto:its.peichilin@gmail.com" className="arrow-btn"
              onMouseEnter={() => setCursor("Let's go!")} onMouseLeave={() => setCursor(null)}
              style={{ display: "inline-flex", background: "#363636", color: "#fff", fontSize: m ? 16 : 18, fontWeight: 500, padding: m ? "10px 18px" : "12px 20px", borderRadius: 30, textDecoration: "none" }}>Contact me !</a>
            </div>
          </motion.div>

          {/* photo box 440×586 at (880,60) — draggable within a small range; grab cursor on hover.
              Phones: centred under the copy at ~57% width (per the mobile mock), no drag. */}
          <motion.div {...fade(0.3)} style={m
            ? { position: "relative", width: "57%", maxWidth: 440, aspectRatio: "440 / 586", margin: "28px auto 0" }
            : { position: "absolute", left: 880, top: 60, width: 440, height: 586 }}>
            {/* decorative dithered stamps behind the photo (positions from the cutout mock, as % of the 440×586 box) */}
            <img src={stampLake} alt="" aria-hidden draggable={false}
              style={{ position: "absolute", left: "47.27%", top: "3.58%", width: "43.41%", height: "40.61%", pointerEvents: "none" }} />
            <img src={stampBeer} alt="" aria-hidden draggable={false}
              style={{ position: "absolute", left: 0, top: "53.07%", width: "33.86%", height: "31.91%", pointerEvents: "none" }} />
            <img ref={photoRef} src={cutout} alt="Peichi Lin" draggable={false}
              onMouseEnter={() => suppress(true)} onMouseLeave={() => suppress(false)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", transform: "rotate(0.19deg)", cursor: m ? "auto" : "grab", touchAction: "none" }} />
            {/* drag affordance — "Hey~" bubble, bobs gently, disappears once you drag */}
            <AnimatePresence>
              {showHey && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -9, 0] }}
                  exit={{ opacity: 0, scale: 0.6, y: 6, transition: { duration: 0.25 } }}
                  transition={{ opacity: { duration: 0.4, delay: 0.5 }, scale: { duration: 0.45, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
                  style={{ position: "absolute", left: "28%", top: 10, zIndex: 3, pointerEvents: "none", transformOrigin: "bottom center" }}
                >
                  <div style={{ position: "relative", background: "#F4F4F5", color: "#141416", fontFamily: SERIF, fontStyle: "italic", fontSize: 26, lineHeight: 1, padding: "12px 20px", borderRadius: 18, whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
                    Hey~
                    <span style={{ position: "absolute", left: 30, bottom: -8, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "10px solid #F4F4F5" }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* reaction while being dragged */}
            <AnimatePresence>
              {showPlead && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 6, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ position: "absolute", left: "28%", top: 10, zIndex: 3, pointerEvents: "none", transformOrigin: "bottom center" }}
                >
                  <div style={{ position: "relative", background: "#F4F4F5", fontSize: 24, lineHeight: 1, padding: "10px 16px", borderRadius: 18, whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
                    🥺
                    <span style={{ position: "absolute", left: 30, bottom: -8, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "10px solid #F4F4F5" }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ---------- Experience / Award ---------- */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "40px clamp(24px,6.9vw,100px) 60px", display: "flex", flexDirection: "column", gap: 60 }}>
        <ListBlock label="Experience" rows={en ? EXPERIENCE.en : EXPERIENCE.zh} m={m}>
          {/* tool-kit cluster (hover to fan out). Desktop: under the Experience heading.
              Phones: shrunk to 50% and set beside the heading on the right, so the list sits close under the title. */}
          <div style={m ? { width: 95, height: 112, marginTop: -28, flex: "none" } : { marginTop: 40, marginLeft: 150 }}>
            <div className="skills-cluster" style={m ? { transform: "scale(0.5)", transformOrigin: "top left" } : undefined}>
              <img className="skills-box" src={diceBox} alt="" />
              {[si1, si2, si3, si4, si5, si6, si7].map((src, i) => (
                <img key={i} className={`skills-icon si-${i + 1}`} src={src} alt="" />
              ))}
            </div>
          </div>
        </ListBlock>
        <ListBlock label="Award" rows={en ? AWARD.en : AWARD.zh} />
      </section>

      {/* ---------- Language (static) ---------- */}
      <section style={{ padding: "64px clamp(24px,6.9vw,100px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: m ? "1fr" : "280px 1fr", gap: m ? 32 : 80, alignItems: "start" }}>
          <p style={{ color: DIM, margin: 0 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 40 }}>Language</span>{" "}
            <span style={{ fontSize: 24 }}>is a window into culture</span>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "1fr 1fr", gap: m ? 20 : 36 }}>
            {LANGS.map((l) => (
              <div key={l.en} style={{ borderLeft: "1.5px solid rgba(255,255,255,0.3)", paddingLeft: 12, color: "#fff" }}>
                <p style={{ fontSize: 20, margin: "0 0 8px" }}>{en ? l.en : l.zh}</p>
                <p style={{ fontSize: 16, margin: 0, opacity: 0.8 }}>{en ? l.d : l.dz}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What shapes me — bg fades black → white, scroll-highlight text ---------- */}
      <section id="shapes-me" style={{ background: lit ? "#efefef" : "#080808", color: lit ? "#080808" : "#f0f0f0", transition: "background-color .7s ease, color .7s ease", padding: "60px clamp(24px,6.9vw,100px)", minHeight: 480, display: "flex", alignItems: "center", justifyContent: "center", overflowX: "clip" }}>
        <ScrollHighlightText>
          <p className="sh-p" style={{ fontFamily: SANS, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.7, margin: 0 }}>
            {words("One year in Germany made me an")}<Em>adaptable soul</Em><StampCarousel imgs={[ada1, ada2, ada3]} offset={0} /> {words("I am also a")}<Em>challenger</Em><StampCarousel imgs={[ch1, ch2, ch3, ch4]} offset={1.3} /> {words("who loves stepping out of the comfort zone. Outside of work, I am a")}<Em>traveller</Em><StampCarousel imgs={[tr1, tr2, tr3, tr4]} offset={2.6} /> {words("who enjoys adventures.")}<span className="sh-word" style={{ opacity: 0.18 }}>📷🎧✨</span>
          </p>
        </ScrollHighlightText>
      </section>

      {/* ---------- coffee chat (matcha dither) ---------- */}
      <section style={{ position: "relative", background: "#efefef", color: "#080808", textAlign: "center", padding: "40px clamp(24px,6.9vw,100px)", overflow: "hidden", height: 280, minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="matcha-dither"><img src={matcha} alt="" /></div>
        <a href="http://www.linkedin.com/in/peichi-lin-463328235" target="_blank" rel="noopener" className="matcha-link"
          onMouseEnter={() => setCursor("let's go", "light")} onMouseLeave={() => setCursor(null)}
          style={{ position: "relative", zIndex: 1, display: "inline-block", textDecoration: "none", color: "#080808", fontFamily: SERIF, cursor: "none" }}>
          <p style={{ fontSize: m ? 26 : 36, lineHeight: 1.45, margin: 0, whiteSpace: m ? "normal" : "nowrap" }}>Wanna know me more?<br />How about a matcha chat with me</p>
        </a>
      </section>
    </main>
  );
}

function ListBlock({ label, rows, children, m = false }: { label: string; rows: { t: string; d: string }[]; children?: React.ReactNode; m?: boolean }) {
  return (
    <Reveal>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: m && children ? 8 : 40, flexWrap: "wrap" }}>
        <div style={m && children ? { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start" } : undefined}>
          <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 36, color: DIM, margin: 0 }}>{label}</h2>
          {children}
        </div>
        <div style={{ width: 770, maxWidth: "100%", flex: "0 1 770px" }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.4)" }}>
              <span style={{ fontSize: 16, color: "#f0f0f0" }}>{r.t}</span>
              <span style={{ fontSize: 14, color: "#f0f0f0", whiteSpace: "nowrap", opacity: 0.8 }}>{r.d}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

const Em = ({ children }: { children: React.ReactNode }) => (
  <span className="sh-word" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "1.4em", opacity: 0.18 }}>{children}</span>
);

/* words() pre-splits a string into React-managed spans so GSAP can highlight
   them without SplitText mutating React's DOM (which crashes reconciliation). */
function words(str: string) {
  return str.split(" ").map((w, i) => <span className="sh-word" key={i} style={{ opacity: 0.18 }}>{w}{" "}</span>);
}

/* Scroll Text Highlight (GSAP ScrollTrigger): .sh-word spans dim → bright. */
function ScrollHighlightText({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ws = el.querySelectorAll(".sh-word");
    const tw = gsap.to(ws, {
      opacity: 1, ease: "none", stagger: 0.4,
      scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 62%", scrub: true },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, []);
  return <div ref={ref} style={{ maxWidth: 1100, width: "100%", margin: "0 auto" }}>{children}</div>;
}
