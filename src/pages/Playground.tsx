import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useHoverCursor } from "../components/HoverCursor";
import { useLang } from "../lang";
import { useIsMobile } from "../useIsMobile";
import { PG_WORKS } from "../data/playground";

// short names for the hover pill (modal shows the full title)
const PG_NAME_ZH = ["裙子底下有…", "鳩地正法", "數位遊牧", "其實…", "One Way"];
const PG_NAME_EN = ["Under the Skirt", "Fowl Justice", "Digital Nomads", "In Fact", "One Way"];
import closeIcon from "/assets/icon-close.svg";
// Lab Core dithered stickers (Figma 15:31197)
import stOwl from "/assets/pg-owl-dithered.png";
import stController from "/assets/pg-controller-dithered.png";
import stNewspaper from "/assets/pg-newspaper-dithered.png";
import stSkirt from "/assets/pg-skirt-dithered.png";
import stFigure from "/assets/pg-figure-dithered.png";
import skirtEyes from "/assets/pg-skirt-eyes.svg";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

const SNAP = 16; // grid cell the stickers snap to after an inertia throw

// modal hero can be a video (.mp4), a YouTube link, or an image
const ytId = (s: string) => { const m = s.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([\w-]{11})/); return m ? m[1] : null; };
function renderHero(src: string, title: string) {
  if (/\.(mp4|webm|mov)($|\?)/i.test(src)) return <video src={src} autoPlay muted loop playsInline />;
  const id = ytId(src);
  if (id) return <iframe src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
  return <img src={src} alt={title} />;
}

const illustMods = import.meta.glob("/assets/illust-*.png", { eager: true, import: "default" });
const ILLUSTS = Object.keys(illustMods).sort().map((k) => illustMods[k] as string);

const LAB_W = 1440, LAB_H = 688;
// phones: a 390-wide canvas of its own so the stickers stay big (≈0.55× desktop size, not 0.27×)
const LAB_M_W = 390, LAB_M_H = 560;
// per-project cursor accent (bg + readable text)
const PG_COLOR: Record<number, { bg: string; text: string }> = {
  0: { bg: "#e8507a", text: "#fff" }, // Under the Skirt
  1: { bg: "#c9792b", text: "#fff" }, // 鳩地正法
  2: { bg: "#2fa6a0", text: "#fff" }, // 數位遊牧
  3: { bg: "#3f3f46", text: "#fff" }, // 其實
  4: { bg: "#7b5bd6", text: "#fff" }, // One Way
};
// stickers → project index, with box geometry from Figma (`mob` = phone canvas box)
const STICKERS = [
  { src: stSkirt, work: 0, left: 311, top: 435, w: 257, h: 249, rot: 0, mob: { left: 30, top: 375, w: 155, h: 150 } },
  { src: stOwl, work: 1, left: 160, top: 180, w: 251, h: 251, rot: -11.09, mob: { left: 8, top: 70, w: 140, h: 140 } },
  { src: stNewspaper, work: 3, left: 605, top: 86, w: 267, h: 178, rot: 13.95, mob: { left: 150, top: 40, w: 150, h: 100 } },
  { src: stFigure, work: 2, left: 1078, top: 146, w: 139, h: 210, rot: 0, mob: { left: 296, top: 90, w: 82, h: 124 } },
  { src: stController, work: 4, left: 910, top: 385, w: 268, h: 263, rot: 12.38, mob: { left: 205, top: 365, w: 158, h: 155 } },
];

// idle float per sticker: different speed / start / tilt so they never bob in sync
const FLOAT = [
  { dur: 3.6, delay: -0.4, rot: 1.6 },
  { dur: 4.2, delay: -1.9, rot: -1.4 },
  { dur: 3.9, delay: -2.8, rot: 1.2 },
  { dur: 4.6, delay: -1.1, rot: -1.8 },
  { dur: 3.3, delay: -2.2, rot: 1.5 },
];

export default function Playground() {
  const [open, setOpen] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  // close = fade out first, then unmount (matches the 0.3s CSS fade in index.css)
  const closeModal = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => { setOpen(null); setClosing(false); }, 300);
  };
  const setCursor = useHoverCursor();
  const { lang } = useLang();
  const m = useIsMobile(700);
  const stageRef = useRef<HTMLDivElement>(null);
  const labWrapRef = useRef<HTMLDivElement>(null);
  const labStageRef = useRef<HTMLDivElement>(null);
  const labSectionRef = useRef<HTMLDivElement>(null);
  const darkGridRef = useRef<HTMLDivElement>(null);
  const illustSectionRef = useRef<HTMLDivElement>(null);
  const illustGridRef = useRef<HTMLDivElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);

  /* scroll-driven first → second screen: the second screen's black area rises
     as a round dome over the light first screen, and its curved top flattens
     into a straight edge as it reaches its place. */
  useEffect(() => {
    const illust = illustSectionRef.current, igrid = illustGridRef.current, dome = domeRef.current;
    if (!illust || !dome) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = illust.getBoundingClientRect().top;
      // the dome stays fully round while it rises to the middle of the screen,
      // then flattens as its top travels from 50% → 25% of the screen height
      // (or to the highest point it can reach when the page ends sooner, e.g. phones)
      const lowestTop = top + window.scrollY - (document.documentElement.scrollHeight - vh);
      const end = Math.max(vh * 0.25, lowestTop + 8);
      const start = Math.max(vh * 0.5, end + 120);
      const p = Math.max(0, Math.min(1, (start - top) / (start - end)));
      const e = p * p * (3 - 2 * p);      // ease-in-out (smoothstep)
      // dome = top corners rounded with an ellipse half the width wide;
      // its height shrinks to 0 → flat edge
      const h = Math.min(illust.offsetWidth * 0.32, illust.offsetHeight * 0.7) * (1 - e);
      dome.style.borderRadius = `50% 50% 0 0 / ${h.toFixed(1)}px ${h.toFixed(1)}px 0 0`;
      if (igrid) igrid.style.opacity = String(1 - Math.max(0, Math.min(1, (vh - top) / (vh * 0.5))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  /* scale the 1440 lab-core canvas */
  useEffect(() => {
    const wrap = labWrapRef.current, stage = labStageRef.current;
    if (!wrap || !stage) return;
    const W = m ? LAB_M_W : LAB_W, H = m ? LAB_M_H : LAB_H;
    const fit = () => {
      // phones: grow with the width but cap at 1.4×, then centre with translateX
      // (the stage is scaled from its top-left, so `margin: auto` can't centre it)
      const scale = m ? Math.min(1.4, wrap.clientWidth / W) : Math.min(1, wrap.clientWidth / W);
      const offset = m ? (wrap.clientWidth - W * scale) / 2 : 0;
      stage.style.transform = m ? `translateX(${offset}px) scale(${scale})` : `scale(${scale})`;
      wrap.style.height = H * scale + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [m]);

  /* draggable stickers + grab cursor; click (no drag) opens the modal */
  useEffect(() => {
    const stage = labStageRef.current, wrap = labWrapRef.current;
    if (!stage || !wrap) return;
    const els = Array.from(stage.querySelectorAll<HTMLElement>(".pg-sticker"));
    const drags = els.map((el) => {
      gsap.set(el, { rotation: Number(el.dataset.rot || 0), transformOrigin: "50% 50%" });
      return Draggable.create(el, {
        type: "x,y", bounds: wrap, edgeResistance: 0.6, cursor: "grab", activeCursor: "grabbing",
        inertia: true,
        snap: {
          x: (v) => Math.round(v / SNAP) * SNAP,
          y: (v) => Math.round(v / SNAP) * SNAP,
        },
        onClick() { setOpen(Number(el.dataset.work)); },
      })[0];
    });
    return () => drags.forEach((d) => d?.kill());
  }, [m]);

  /* illustration cursor trail (ported from motion.js); phones have no hover, so each tap drops one instead */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!m && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const items = Array.from(stage.querySelectorAll<HTMLElement>(".illust-item"));
    if (!items.length) return;
    gsap.set(items, { xPercent: -50, yPercent: -50, opacity: 0 });
    let idx = 0, zTop = 1, lastX: number | null = null, lastY: number | null = null;
    const MIN_TRAVEL = 110;
    const onMove = (e: PointerEvent | MouseEvent, tap = false) => {
      const box = stage.getBoundingClientRect();
      const x = e.clientX - box.left, y = e.clientY - box.top;
      if (x < 0 || y < 0 || x > box.width || y > box.height) return;
      if (!tap && lastX !== null && Math.hypot(x - lastX, y - lastY!) < MIN_TRAVEL) return;
      lastX = x; lastY = y;
      const el = items[idx % items.length]; idx++;
      gsap.killTweensOf(el);
      gsap.set(el, { left: x, top: y, zIndex: ++zTop, y: 0, opacity: 1, scale: 0.86, rotation: gsap.utils.random(-14, 14) });
      const im = el.querySelector("img") as HTMLImageElement | null;
      const itemH = el.offsetHeight || (im && im.naturalWidth ? el.offsetWidth * im.naturalHeight / im.naturalWidth : el.offsetWidth);
      const fall = Math.max(0, box.height - itemH / 2 - 8 - y);
      const dur = gsap.utils.clamp(0.55, 1.5, Math.sqrt(fall) * 0.055);
      gsap.to(el, { scale: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(el, { y: fall, duration: dur, ease: "bounce.out" });
      gsap.to(el, { rotation: "+=" + gsap.utils.random(-22, 22), duration: dur, ease: "power1.out" });
      gsap.to(el, { opacity: 0, duration: 0.6, delay: dur + 0.45, ease: "power2.out" });
    };
    const onLeave = () => { lastX = lastY = null; gsap.to(items, { opacity: 0, duration: 0.4, ease: "power2.out" }); };
    // click (not pointerdown) so a swipe to scroll the page never drops an illustration
    const onTap = (e: MouseEvent) => onMove(e, true);
    if (m) stage.addEventListener("click", onTap);
    else { window.addEventListener("pointermove", onMove); stage.addEventListener("pointerleave", onLeave); }
    return () => {
      stage.removeEventListener("click", onTap);
      window.removeEventListener("pointermove", onMove); stage.removeEventListener("pointerleave", onLeave);
      gsap.set(items, { clearProps: "all" });
    };
  }, [m]);

  useEffect(() => { document.body.style.overflow = open !== null ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const work = open !== null ? PG_WORKS[open] : null;

  return (
    <main>
      {/* ---- Lab Core (scattered dithered stickers) ---- */}
      <section ref={labSectionRef} className="lab-core" style={{ position: "relative", padding: 0, display: "flex", flexDirection: "column", justifyContent: "center", background: "#efefef" }}>
        {/* grid decoration — full grid at Figma columns (160/480/800/1120…), aligned to the global grid */}
        <div ref={darkGridRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(to right, rgba(8,8,8,0.08) 0 1px, transparent 1px 320px),repeating-linear-gradient(to bottom, rgba(8,8,8,0.08) 0 1px, transparent 1px 320px)", backgroundPosition: "calc(50% - 560px) 0, 0 160px" }} />
        {/* scroll hint */}
        <div className="pg-scroll-hint" aria-hidden><span>Scroll</span><span className="pg-scroll-arrow">↓</span></div>
        <div ref={labWrapRef} style={{ position: "relative", zIndex: 1, width: "100%", overflow: "hidden" }}>
          <div ref={labStageRef} style={{ position: "relative", width: m ? LAB_M_W : LAB_W, height: m ? LAB_M_H : LAB_H, transformOrigin: "top left", margin: m ? 0 : "0 auto" }}>
            {/* watermark + subtitle */}
            <div style={m ? { position: "absolute", left: 0, top: 222, width: LAB_M_W, textAlign: "center" } : { position: "absolute", left: 401, top: 150, width: 638, textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 500, fontSize: m ? 72 : 150, lineHeight: "normal", color: "rgba(8,8,8,0.3)", opacity: 0.6, margin: 0 }}>Playground</p>
              <p style={{ fontFamily: "'Noto Sans TC','Inter',sans-serif", fontWeight: 300, fontSize: m ? 14 : 20, color: "#080808", margin: m ? "6px 0 0" : "16px 0 0" }}>{lang === "zh" ? "一些過往作品、跨領域嘗試、小實驗" : "Ideas and experiments born out of curiosity."}</p>
            </div>
            {/* stickers */}
            {STICKERS.map((s, i) => { const b = m ? s.mob : s; return (
              <button key={i} type="button" className="pg-sticker" data-work={s.work} data-rot={s.rot} aria-label={PG_NAME_EN[s.work]}
                onMouseEnter={() => setCursor(lang === "zh" ? PG_NAME_ZH[s.work] : PG_NAME_EN[s.work], "light", PG_COLOR[s.work])} onMouseLeave={() => setCursor(null)}
                style={{ position: "absolute", left: b.left, top: b.top, width: b.w, height: b.h, padding: 0, border: 0, background: "none", zIndex: 2, willChange: "transform" }}>
                {/* idle float lives on this wrapper (the button's own transform belongs to the drag; the img keeps the hover wobble) */}
                <span className="pg-float" style={{ "--float-dur": `${FLOAT[i].dur}s`, "--float-delay": `${FLOAT[i].delay}s`, "--float-rot": `${FLOAT[i].rot}deg` } as React.CSSProperties}>
                  <img src={s.src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none" }} draggable={false} />
                  {s.src === stSkirt && <img src={skirtEyes} alt="" aria-hidden style={{ position: "absolute", left: "61.48%", top: "26.51%", width: "28.4%", height: "19.68%", pointerEvents: "none" }} />}
                </span>
              </button>
            ); })}
          </div>
        </div>
      </section>

      {/* ---- illustration band (second screen: fades white → black on scroll) ---- */}
      <section ref={illustSectionRef} className="illust-section" style={{ position: "relative", background: "#efefef" }}>
        {/* dark grid shown while the band is still white; fades as it blackens */}
        <div ref={illustGridRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(to right, rgba(8,8,8,0.08) 0 1px, transparent 1px 320px),repeating-linear-gradient(to bottom, rgba(8,8,8,0.08) 0 1px, transparent 1px 320px)", backgroundPosition: "calc(50% - 560px) 0, 0 160px" }} />
        {/* the black area: starts as a dome, flattens on scroll (see the effect above) */}
        {/* white grid = the site-wide grid (Layout); attached to the viewport so its lines line up with it */}
        <div ref={domeRef} aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, willChange: "border-radius",
          backgroundColor: "#080808",
          backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.055) 0 1px, transparent 1px 320px),repeating-linear-gradient(to bottom, rgba(255,255,255,0.055) 0 1px, transparent 1px 320px)",
          backgroundPosition: "calc(50% - 560px) 0, 0 160px",
          backgroundAttachment: "fixed, fixed",
        }} />
        <div className="illust-stage" ref={stageRef} style={{ position: "relative", zIndex: 1 }}>
          {ILLUSTS.map((src, i) => (<div className="illust-item" key={i}><img src={src} alt="Illustration" /></div>))}
          <p className="illust-lead">In my free time, I also enjoy <em>illustrating</em></p>
          {m && <p className="illust-hint">{lang === "zh" ? "點擊畫面查看插畫" : "Tap anywhere to see illustrations"}</p>}
        </div>
      </section>

      {/* ---- detail modal ---- */}
      {work && (() => {
        // Chinese mode shows the zh copy when available
        const zh = lang === "zh" && work.zh;
        const eyebrow = zh ? work.zh!.eyebrow : work.eyebrow;
        const title = zh ? work.zh!.title : work.title;
        const overview = zh ? work.zh!.overview : work.overview;
        const blocks = (zh ? work.zh!.blocks : work.blocks) ?? [];
        return (
        <div className={`pg-modal${closing ? " is-closing" : ""}`}>
          <div className="pg-modal-backdrop" onClick={closeModal} />
          <div className="pg-modal-shell" role="dialog" aria-modal="true">
            <article className="pgm-panel">
              <header className="pgm-head">
                <div className="pgm-titles">
                  <p className="pgm-eyebrow">{eyebrow}</p>
                  <h2 className="pgm-title">{title}</h2>
                </div>
                <button className="pgm-close" type="button" onClick={closeModal} aria-label="Close"><img src={closeIcon} alt="" /></button>
              </header>
              <div className="pgm-main">
                <div className="pgm-hero">{renderHero(work.card, title)}</div>
                <div className="pgm-copy">
                  <div className="pgm-section">
                    <p className="pgm-overview-heading">{lang === "zh" ? "專案概覽" : "Overview"}</p>
                    <div className="pgm-overview">{overview.map((p, i) => <p key={i}>{p}</p>)}</div>
                  </div>
                  {blocks.map((b) => (
                    <div className="pgm-block" key={b.label}>
                      <p className="pgm-block-label">{b.label}</p>
                      <p className="pgm-block-text">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* showcase grid — 3 per row (Figma 303:1040) */}
              <div className="pgm-gallery">
                {(work.gallery && work.gallery.length ? work.gallery : [null, null, null]).map((src, i) => (
                  <div className="pgm-shot" key={i}>
                    {src ? <img src={src} alt="" /> : <span>Image coming soon</span>}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
        );
      })()}
    </main>
  );
}
