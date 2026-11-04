import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useHoverCursor } from "../components/HoverCursor";
import { useLang } from "../lang";
import { PG_WORKS } from "../data/playground";

const PG_NAME_ZH = ["裙子底下有...", "鳩地正法", "數位遊牧", "其實", "One Way"];
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
// per-project cursor accent (bg + readable text)
const PG_COLOR: Record<number, { bg: string; text: string }> = {
  0: { bg: "#e8507a", text: "#fff" }, // Under the Skirt
  1: { bg: "#c9792b", text: "#fff" }, // 鳩地正法
  2: { bg: "#2fa6a0", text: "#fff" }, // 數位遊牧
  3: { bg: "#3f3f46", text: "#fff" }, // 其實
  4: { bg: "#7b5bd6", text: "#fff" }, // One Way
};
// stickers → project index, with box geometry from Figma
const STICKERS = [
  { src: stSkirt, work: 0, left: 311, top: 435, w: 257, h: 249, rot: 0 },
  { src: stOwl, work: 1, left: 160, top: 180, w: 251, h: 251, rot: -11.09 },
  { src: stNewspaper, work: 3, left: 605, top: 86, w: 267, h: 178, rot: 13.95 },
  { src: stFigure, work: 2, left: 1078, top: 146, w: 139, h: 210, rot: 0 },
  { src: stController, work: 4, left: 910, top: 385, w: 268, h: 263, rot: 12.38 },
];

export default function Playground() {
  const [open, setOpen] = useState<number | null>(null);
  const setCursor = useHoverCursor();
  const { lang } = useLang();
  const stageRef = useRef<HTMLDivElement>(null);
  const labWrapRef = useRef<HTMLDivElement>(null);
  const labStageRef = useRef<HTMLDivElement>(null);
  const labSectionRef = useRef<HTMLDivElement>(null);
  const darkGridRef = useRef<HTMLDivElement>(null);
  const illustSectionRef = useRef<HTMLDivElement>(null);
  const illustGridRef = useRef<HTMLDivElement>(null);

  /* scroll-driven white → black: the FIRST screen stays white; the SECOND
     screen (illustration band) fades its own background white → black as it
     rises into view, crossfading its dark grid out so the global white grid
     takes over. */
  useEffect(() => {
    const illust = illustSectionRef.current, igrid = illustGridRef.current;
    if (!illust) return;
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = illust.getBoundingClientRect().top;
      // 0 while the illust band is below the fold, 1 once its top has risen 60% up
      const p = Math.max(0, Math.min(1, (vh - top) / (vh * 0.6)));
      const v = lerp(0xef, 0x08, p);
      illust.style.backgroundColor = `rgb(${v},${v},${v})`;
      if (igrid) igrid.style.opacity = String(1 - p);
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
    const fit = () => {
      const scale = Math.min(1, wrap.clientWidth / LAB_W);
      stage.style.transform = `scale(${scale})`;
      wrap.style.height = LAB_H * scale + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

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
  }, []);

  /* illustration cursor trail (ported from motion.js) */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const items = Array.from(stage.querySelectorAll<HTMLElement>(".illust-item"));
    if (!items.length) return;
    gsap.set(items, { xPercent: -50, yPercent: -50, opacity: 0 });
    let idx = 0, zTop = 1, lastX: number | null = null, lastY: number | null = null;
    const MIN_TRAVEL = 110;
    const onMove = (e: PointerEvent) => {
      const box = stage.getBoundingClientRect();
      const x = e.clientX - box.left, y = e.clientY - box.top;
      if (x < 0 || y < 0 || x > box.width || y > box.height) return;
      if (lastX !== null && Math.hypot(x - lastX, y - lastY!) < MIN_TRAVEL) return;
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
    window.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => { window.removeEventListener("pointermove", onMove); stage.removeEventListener("pointerleave", onLeave); };
  }, []);

  useEffect(() => { document.body.style.overflow = open !== null ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const work = open !== null ? PG_WORKS[open] : null;

  return (
    <main>
      {/* ---- Lab Core (scattered dithered stickers) ---- */}
      <section ref={labSectionRef} className="lab-core" style={{ position: "relative", padding: 0, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "#efefef" }}>
        {/* grid decoration — full grid at Figma columns (160/480/800/1120…), aligned to the global grid */}
        <div ref={darkGridRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(to right, rgba(8,8,8,0.08) 0 1px, transparent 1px 320px),repeating-linear-gradient(to bottom, rgba(8,8,8,0.08) 0 1px, transparent 1px 320px)", backgroundPosition: "calc(50% - 560px) 0, 0 160px" }} />
        {/* scroll hint */}
        <div className="pg-scroll-hint" aria-hidden><span>Scroll</span><span className="pg-scroll-arrow">↓</span></div>
        <div ref={labWrapRef} style={{ position: "relative", zIndex: 1, width: "100%", overflow: "hidden" }}>
          <div ref={labStageRef} style={{ position: "relative", width: LAB_W, height: LAB_H, transformOrigin: "top left", margin: "0 auto" }}>
            {/* watermark + subtitle */}
            <div style={{ position: "absolute", left: 401, top: 150, width: 638, textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 500, fontSize: 150, lineHeight: "normal", color: "rgba(8,8,8,0.3)", opacity: 0.6, margin: 0 }}>Playground</p>
              <p style={{ fontFamily: "'Noto Sans TC','Inter',sans-serif", fontWeight: 300, fontSize: 20, color: "#080808", margin: "16px 0 0" }}>Ideas and experiments born out of curiosity.</p>
            </div>
            {/* stickers */}
            {STICKERS.map((s, i) => (
              <button key={i} type="button" className="pg-sticker" data-work={s.work} data-rot={s.rot} aria-label={PG_WORKS[s.work].title}
                onMouseEnter={() => setCursor(lang === "zh" ? PG_NAME_ZH[s.work] : PG_WORKS[s.work].title, "light", PG_COLOR[s.work])} onMouseLeave={() => setCursor(null)}
                style={{ position: "absolute", left: s.left, top: s.top, width: s.w, height: s.h, padding: 0, border: 0, background: "none", zIndex: 2, willChange: "transform" }}>
                <img src={s.src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none" }} draggable={false} />
                {s.src === stSkirt && <img src={skirtEyes} alt="" aria-hidden style={{ position: "absolute", left: 158, top: 66, width: 73, height: 49, pointerEvents: "none" }} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- illustration band (second screen: fades white → black on scroll) ---- */}
      <section ref={illustSectionRef} className="illust-section" style={{ position: "relative", background: "#efefef" }}>
        {/* dark grid shown while the band is still white; fades as it blackens */}
        <div ref={illustGridRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(to right, rgba(8,8,8,0.08) 0 1px, transparent 1px 320px),repeating-linear-gradient(to bottom, rgba(8,8,8,0.08) 0 1px, transparent 1px 320px)", backgroundPosition: "calc(50% - 560px) 0, 0 160px" }} />
        <div className="illust-stage" ref={stageRef} style={{ position: "relative", zIndex: 1 }}>
          {ILLUSTS.map((src, i) => (<div className="illust-item" key={i}><img src={src} alt="Illustration" /></div>))}
          <p className="illust-lead">In my free time, I also enjoy <em>illustrating</em></p>
        </div>
      </section>

      {/* ---- detail modal ---- */}
      {work && (() => {
        // Chinese mode shows the zh copy when available
        const zh = lang === "zh" && work.zh;
        const eyebrow = zh ? work.zh!.eyebrow : work.eyebrow;
        const title = zh ? work.zh!.title : work.title;
        const overview = zh ? work.zh!.overview : work.overview;
        const block = zh ? work.zh!.block : work.block;
        return (
        <div className="pg-modal">
          <div className="pg-modal-backdrop" onClick={() => setOpen(null)} />
          <div className="pg-modal-shell" role="dialog" aria-modal="true">
            <article className="pgm-panel">
              <header className="pgm-head">
                <div className="pgm-titles">
                  <p className="pgm-eyebrow">{eyebrow}</p>
                  <h2 className="pgm-title">{title}</h2>
                </div>
                <button className="pgm-close" type="button" onClick={() => setOpen(null)} aria-label="Close"><img src={closeIcon} alt="" /></button>
              </header>
              <div className="pgm-main">
                <div className="pgm-hero">{renderHero(work.card, title)}</div>
                <div className="pgm-copy">
                  <div className="pgm-section">
                    <p className="pgm-overview-heading">{lang === "zh" ? "專案概覽" : "Overview"}</p>
                    <div className="pgm-overview">{overview.map((p, i) => <p key={i}>{p}</p>)}</div>
                  </div>
                  {block && (
                    <div className="pgm-block">
                      <p className="pgm-block-label">{block.label}</p>
                      <p className="pgm-block-text">{block.text}</p>
                    </div>
                  )}
                </div>
              </div>
              {/* showcase row — 3 supporting images (Figma 303:1040) */}
              <div className="pgm-gallery">
                {(work.gallery && work.gallery.length ? work.gallery.slice(0, 3) : [null, null, null]).map((src, i) => (
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
