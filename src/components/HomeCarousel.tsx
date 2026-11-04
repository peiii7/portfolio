import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useHoverCursor } from "./HoverCursor";
import { useLang } from "../lang";

const CURSOR_NAME: Record<string, { en: string; zh: string }> = {
  "fubon-life": { en: "Fubon Life Website Redesign", zh: "富邦人壽官網改版" },
  "ctbc-bank": { en: "CTBC Website Redesign", zh: "中國信託官網改版" },
  "tea-island-tea-stories": { en: "Tea Island, Tea Stories", zh: "茶嶼茶語" },
  "xnfun-app": { en: "XnFun", zh: "XnFun" },
};

/* Figma 286:921 — scattered-bento home carousel rebuilt as a diagonal "bulge"
   slider. Cards travel along the bottom-left → top-right axis of the Figma
   composition; the centre card is colour + meta, the others grayscale (dithered)
   floats. A RAF lerp eases progress; scroll/drag SPEED bulges the moving cards
   toward the viewer (translateZ grows with velocity), reproducing the Scroll
   Bulge feel on this layout. Advanced by auto-rotate + arrows + drag. */

export interface HomeSlide {
  image: string;
  slug: string;
  tag: string;
  title: string;
}

const DESIGN_W = 1440, DESIGN_H = 1040;
// card box (centre card size); floats are the same box scaled down
const CARD_W = 680, CARD_H = 480;
// diagonal track: centre point of each anchor in design coords
const CENTER = { x: 716, y: 562 };            // 376+340, 322+240
const STEP = { x: 583.5, y: -222.5 };         // half of (next − prev)
const AUTO = 4600;

export default function HomeCarousel({ slides, headline, sub, watermark = "Selected Works" }: { slides: HomeSlide[]; headline: string; sub: string; watermark?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLAnchorElement[]>([]);
  const metaRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLDivElement[]>([]);

  const state = useRef({
    targetP: 0, curP: 0, prevP: 0, vel: 0,
    auto: true, lastAuto: 0, dragging: false, down: false, moved: false, x0: 0, base: 0, raf: 0,
    tmx: 0, tmy: 0, mx: 0, my: 0,
  });

  const n = slides.length;
  const navigate = useNavigate();
  const setCursor = useHoverCursor();
  const { lang } = useLang();
  const langRef = useRef(lang);
  langRef.current = lang;

  useEffect(() => {
    const stage = stageRef.current!, wrap = wrapRef.current!;
    // hover name = the centred card's, shown while the pointer is over any card
    // (per-card hit-test so gaps between cards revert to the normal cursor)
    let hoverCount = 0, nameIdx = -1;
    const centerIdx = () => ((Math.round(state.current.curP) % n) + n) % n;
    const centerName = () => CURSOR_NAME[slides[centerIdx()]?.slug]?.[langRef.current] || null;
    const s = state.current;
    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    const wrapRel = (r: number) => { r = ((r % n) + n) % n; return r > n / 2 ? r - n : r; };

    function layout() {
      const w = wrap.clientWidth;
      const scale = Math.min(1, w / DESIGN_W);
      const offset = Math.max(0, (w - DESIGN_W * scale) / 2);
      stage.style.transform = `translateX(${offset.toFixed(1)}px) scale(${scale})`;
      wrap.style.height = DESIGN_H * scale + "px";
    }

    function paint() {
      const bulge = Math.min(1, Math.abs(s.vel) * 2.4);   // velocity → bulge depth
      for (let i = 0; i < n; i++) {
        const r = wrapRel(i - s.curP);
        const ar = Math.abs(r);
        const x = CENTER.x + r * STEP.x;
        const y = CENTER.y + r * STEP.y;
        const scale = clamp(1 - ar * 0.177, 0.5, 1);
        const depthZ = -Math.min(ar, 2) * 150;
        const bulgeZ = (1 - Math.min(ar, 1)) * bulge * 160;   // moving cards pop forward
        const ry = -r * 8 + s.mx * 3;
        const rx = -s.my * 3;
        const px = s.mx * (1 - Math.min(ar, 1)) * 18;
        const py = s.my * (1 - Math.min(ar, 1)) * 12;
        const z = depthZ + bulgeZ;
        const card = cardRefs.current[i];
        card.style.transform =
          `translate(${(x - CARD_W / 2 + px).toFixed(1)}px,${(y - CARD_H / 2 + py).toFixed(1)}px) ` +
          `translateZ(${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.zIndex = String(Math.round(200 - ar * 20));
        card.style.opacity = (ar <= 1.4 ? 1 : clamp(1 - (ar - 1.4) / 0.5, 0, 1)).toFixed(3);
        // grayscale + dither only off-centre
        const g = clamp(ar, 0, 1);
        const img = imgRefs.current[i];
        if (img) {
          img.style.filter = `grayscale(${g}) brightness(${(1 + (1 - g) * 0).toFixed(2)}) contrast(${(1 + g * 0.05).toFixed(2)})`;
          const dots = img.querySelector(".cv-dots") as HTMLElement | null;
          if (dots) dots.style.opacity = (g * 0.5).toFixed(2);
        }
        const meta = metaRefs.current[i];
        if (meta) meta.style.opacity = clamp(1 - ar / 0.45, 0, 1).toFixed(3);
      }
    }

    function tick(now: number) {
      if (s.auto && !reduced() && !s.dragging) {
        if (!s.lastAuto) s.lastAuto = now;
        if (now - s.lastAuto >= AUTO) { s.targetP = Math.round(s.targetP) + 1; s.lastAuto = now; }
      } else s.lastAuto = now;

      s.prevP = s.curP;
      if (reduced()) { s.curP = s.targetP; s.mx = s.my = 0; }
      else {
        s.curP += (s.targetP - s.curP) * 0.08;
        s.mx += (s.tmx - s.mx) * 0.06;
        s.my += (s.tmy - s.my) * 0.06;
      }
      s.vel = s.curP - s.prevP;
      if (Math.abs(s.targetP - s.curP) < 0.0004) s.curP = s.targetP;
      paint();
      if (hoverCount > 0) { const ci = centerIdx(); if (ci !== nameIdx) { nameIdx = ci; setCursor(centerName()); } }
      s.raf = requestAnimationFrame(tick);
    }

    const step = (d: number) => { s.targetP = Math.round(s.targetP) + d; s.lastAuto = performance.now(); };

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 760) return;
      s.tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      s.tmy = (e.clientY / window.innerHeight - 0.5) * 2;
      // hover = pointer within the CENTER card's whole box (its 2D projection,
      // which encloses the tilted card — so every part of it counts)
      const el = cardRefs.current[centerIdx()];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (inside && hoverCount === 0) { hoverCount = 1; nameIdx = -1; s.auto = false; }
      else if (!inside && hoverCount > 0) { hoverCount = 0; nameIdx = -1; s.auto = true; setCursor(null); }
    };
    const onDocLeave = () => { if (hoverCount) { hoverCount = 0; nameIdx = -1; s.auto = true; setCursor(null); } };
    const down = (x: number) => { s.down = true; s.moved = false; s.x0 = x; s.base = s.targetP; s.auto = false; };
    const move = (x: number) => { if (!s.down) return; if (!s.moved && Math.abs(x - s.x0) > 6) s.moved = true; if (s.moved) s.targetP = s.base - (x - s.x0) / 320; };
    const up = (x?: number, y?: number) => {
      if (!s.down) return; s.down = false;
      if (s.moved) { s.dragging = true; s.targetP = Math.round(s.targetP); s.lastAuto = performance.now(); setTimeout(() => (s.auto = true), 700); return; }
      // click (no drag): open the centred project when the click lands on the centre card
      s.dragging = false; s.lastAuto = performance.now(); setTimeout(() => (s.auto = true), 700);
      if (x != null && y != null) {
        const el = cardRefs.current[centerIdx()];
        if (el) { const r = el.getBoundingClientRect(); if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) navigate(`/work/${slides[centerIdx()]?.slug}`); }
      }
    };

    const mdown = (e: MouseEvent) => down(e.clientX);
    const mmove = (e: MouseEvent) => move(e.clientX);
    const mup = (e: MouseEvent) => up(e.clientX, e.clientY);
    const tstart = (e: TouchEvent) => down(e.touches[0].clientX);
    const tmove = (e: TouchEvent) => move(e.touches[0].clientX);
    const tend = (e: TouchEvent) => { const t = e.changedTouches[0]; up(t?.clientX, t?.clientY); };

    layout();
    window.addEventListener("resize", layout);
    (document as any).fonts?.ready.then(layout);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    stage.addEventListener("mousedown", mdown);
    window.addEventListener("mousemove", mmove);
    window.addEventListener("mouseup", mup);
    stage.addEventListener("touchstart", tstart, { passive: true });
    stage.addEventListener("touchmove", tmove, { passive: true });
    stage.addEventListener("touchend", tend);
    document.addEventListener("mouseleave", onDocLeave);

    // expose arrow steppers
    (stage as any).__step = step;
    s.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("resize", layout);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", mmove);
      window.removeEventListener("mouseup", mup);
      document.removeEventListener("mouseleave", onDocLeave);
    };
  }, [n]);

  const step = (d: number) => (stageRef.current as any)?.__step?.(d);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", overflow: "hidden", perspective: 1600, perspectiveOrigin: "50% 44%" }}>
      <div ref={stageRef} style={{ position: "relative", width: DESIGN_W, height: DESIGN_H, transformOrigin: "top left", transformStyle: "preserve-3d", cursor: "grab" }}>
        {/* headline (Figma 107,152) */}
        <div style={{ position: "absolute", left: 107, top: 152, zIndex: 250, pointerEvents: "none" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond','Noto Sans TC',serif", fontWeight: 400, fontSize: 56, lineHeight: "normal", color: "#fff", margin: "0 0 9px", whiteSpace: "nowrap" }}>{headline}</h1>
          <p style={{ fontFamily: "'Noto Sans TC','Inter',sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.4, color: "rgba(255,255,255,0.7)", maxWidth: 659, margin: 0 }}>{sub}</p>
        </div>
        {/* watermark */}
        <div style={{ position: "absolute", left: 566, top: 792, transform: "translateY(-50%) translateZ(-400px) scale(1.25)", transformOrigin: "50% 50%", fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 500, fontSize: 150, lineHeight: "normal", color: "rgba(255,255,255,0.3)", opacity: 0.38, whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>{watermark}</div>

        {slides.map((sl, i) => (
          <a
            key={sl.slug}
            href={`/work/${sl.slug}`}
            onClick={(e) => {
              e.preventDefault();
              // mouse clicks are handled by the stage (reliable over the 3D cards);
              // keep keyboard activation working here
              if (e.detail === 0 && !state.current.dragging) navigate(`/work/${sl.slug}`);
            }}
            ref={(el) => el && (cardRefs.current[i] = el)}
            style={{ position: "absolute", left: 0, top: 0, width: CARD_W, height: CARD_H, borderRadius: 24, overflow: "hidden", textDecoration: "none", transformStyle: "preserve-3d", willChange: "transform,opacity", boxShadow: "0 44px 110px -34px rgba(0,0,0,0.82)", cursor: "none" }}
          >
            <div ref={(el) => el && (imgRefs.current[i] = el)} style={{ position: "absolute", inset: 0, background: "#202020" }}>
              <img src={sl.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
              <div className="cv-dots" style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "soft-light", backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 32%, transparent 33%)", backgroundSize: "3px 3px", opacity: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 4.5%, rgba(0,0,0,0) 30%)" }} />
            </div>
            <div ref={(el) => el && (metaRefs.current[i] = el)} style={{ position: "absolute", left: 32, right: 32, bottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "'Inter','Noto Sans TC',sans-serif", fontSize: 16, color: "#fff" }}>{sl.tag}</span>
              <span style={{ fontFamily: "'Inter','Noto Sans TC',sans-serif", fontSize: 24, color: "#f0f0f0", lineHeight: 1.25 }}>{sl.title}</span>
            </div>
          </a>
        ))}

        {/* arrows (Figma 286:921 — below the sub text, left-aligned) */}
        <div style={{ position: "absolute", left: 107, top: 300, display: "flex", gap: 16, zIndex: 300 }}>
          <button onClick={() => step(-1)} aria-label="Previous" className="arrow-btn" style={arrowStyle}>←</button>
          <button onClick={() => step(1)} aria-label="Next" className="arrow-btn" style={arrowStyle}>→</button>
        </div>
      </div>
    </div>
  );
}

const arrowStyle: React.CSSProperties = {
  width: 36, height: 36, borderRadius: 30, background: "#363636", border: "none", color: "#fff",
  cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
};
