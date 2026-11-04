import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
  { zh: "中文", en: "Mandarin", d: "Native" },
  { zh: "英文", en: "English", d: "Fluent in professional and academic settings" },
  { zh: "日文", en: "Japanese", d: "Comfortable with reading and listening" },
  { zh: "德文", en: "German", d: "Familiar with basic phrases and expressions" },
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

  // draggable photo, constrained to a small range on the right
  useEffect(() => {
    if (!photoRef.current) return;
    const G = 16; // snap grid
    const d = Draggable.create(photoRef.current, {
      type: "x,y",
      bounds: { minX: -28, maxX: 48, minY: -26, maxY: 36 },
      edgeResistance: 0.85,
      cursor: "grab",
      activeCursor: "grabbing",
      inertia: true,
      snap: {
        x: (v) => Math.round(v / G) * G,
        y: (v) => Math.round(v / G) * G,
      },
    });
    return () => d[0]?.kill();
  }, []);
  useEffect(() => {
    const wrap = wrapRef.current, stage = stageRef.current;
    if (!wrap || !stage) return;
    const fit = () => {
      const scale = Math.min(1, wrap.clientWidth / HERO_W);
      stage.style.transform = `scale(${scale})`;
      wrap.style.height = HERO_H * scale + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

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
      {/* ---------- Hero (Figma 15:31124, scaled 1440 canvas) ---------- */}
      <div ref={wrapRef} style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <div ref={stageRef} style={{ position: "relative", width: HERO_W, height: HERO_H, transformOrigin: "top left", margin: "0 auto" }}>
          {/* text (section padding 60/120 per Figma 15:35303) */}
          <motion.div {...fade(0)} style={{ position: "absolute", left: 120, top: 108, width: 640 }}>
            <p style={{ fontSize: 32, color: "#f0f0f0", margin: "0 0 20px" }}>{en ? "Hi, I'm Peichi" : "嗨～我是沛琪"}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(240,240,240,0.9)", margin: "0 0 10px" }}>
              {en
                ? "I'm a Product Designer specializing in visual, UI, and motion design, with 3+ years of experience across finance, insurance, and cross-disciplinary products. I studied Interaction Design and spent an exchange year in Interface Design at FHP, Germany — an experience that taught me to think beyond the frame and approach problems from different angles."
                : "我是一名專注於視覺、UI 與動效設計的產品設計師，具備 3+ 年橫跨金融、保險與跨領域產品的實務經驗。我主修互動設計，曾前往德國 FHP 介面設計系交換，這段跨文化的經驗讓我在設計時更懂得跳脫框架，從不同角度思考問題。"}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(240,240,240,0.9)", margin: "0 0 28px" }}>
              {en
                ? "I love experimenting with new media and tools, letting each project carry its own sense of experimentation and story, while turning complex information architecture into clear, modular systems — finding balance between freedom and structure."
                : "我喜歡不斷嘗試新的媒材與工具，讓每個作品都帶點實驗性與故事感，同時也擅長把複雜的資訊架構，轉化為清晰、模組化的系統，在自由與規則之間找到平衡。"}
            </p>
            <a href="mailto:its.peichilin@gmail.com" className="arrow-btn"
              onMouseEnter={() => setCursor("Let's go!")} onMouseLeave={() => setCursor(null)}
              style={{ display: "inline-flex", background: "#363636", color: "#fff", fontSize: 18, fontWeight: 500, padding: "12px 20px", borderRadius: 30, textDecoration: "none" }}>Contact me !</a>
          </motion.div>

          {/* tool-kit cluster — below the intro text (hover to fan out) */}
          <motion.div {...fade(0.15)} className="skills-cluster" style={{ position: "absolute", left: 376, top: 394 }}>
            <img className="skills-box" src={diceBox} alt="" />
            <img className="skills-icon si-1" src={si1} alt="" />
            <img className="skills-icon si-2" src={si2} alt="" />
            <img className="skills-icon si-3" src={si3} alt="" />
            <img className="skills-icon si-4" src={si4} alt="" />
            <img className="skills-icon si-5" src={si5} alt="" />
            <img className="skills-icon si-6" src={si6} alt="" />
            <img className="skills-icon si-7" src={si7} alt="" />
          </motion.div>

          {/* photo box 440×586 at (880,60) — draggable within a small range; grab cursor on hover */}
          <motion.div {...fade(0.3)} style={{ position: "absolute", left: 880, top: 60, width: 440, height: 586 }}>
            <img ref={photoRef} src={cutout} alt="Peichi Lin" draggable={false}
              onMouseEnter={() => suppress(true)} onMouseLeave={() => suppress(false)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", transform: "rotate(0.19deg)", cursor: "grab", touchAction: "none" }} />
          </motion.div>
        </div>
      </div>

      {/* ---------- Experience / Award ---------- */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "40px clamp(24px,6.9vw,100px) 60px", display: "flex", flexDirection: "column", gap: 60 }}>
        <ListBlock label="Experience" rows={en ? EXPERIENCE.en : EXPERIENCE.zh} />
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
                <p style={{ fontSize: 16, margin: 0, opacity: 0.8 }}>{l.d}</p>
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

function ListBlock({ label, rows }: { label: string; rows: { t: string; d: string }[] }) {
  return (
    <Reveal>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
        <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 36, color: DIM, margin: 0 }}>{label}</h2>
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
