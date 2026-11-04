/* Global hover cursor — reuses the Originkit UserCursor visual (arrow glyph +
   label pill + spring physics), but tracks the window and only appears while a
   project is hovered, so it never blocks clicks/drags. Projects call
   useHoverCursor()(name) on enter and (null) on leave. */
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import MagicCursor from "./originkit/spin-cursor";

type Theme = "dark" | "light"; // bg the cursor sits on → "dark" = white cursor, "light" = dark cursor
// optional per-project color: overrides the pill/arrow with a custom accent
type Color = { bg: string; text: string };
const Ctx = createContext<(name: string | null, theme?: Theme, color?: Color) => void>(() => {});
export const useHoverCursor = () => useContext(Ctx);
// suppress the custom cursor (show the native cursor, e.g. grab on a draggable)
const SuppressCtx = createContext<(v: boolean) => void>(() => {});
export const useCursorSuppress = () => useContext(SuppressCtx);

const SIZE = 34;

export function HoverCursorProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [color, setColor] = useState<Color | null>(null);
  const [suppressed, setSuppressed] = useState(false);
  const suppress = useCallback((v: boolean) => setSuppressed(v), []);
  const setCursor = useCallback((n: string | null, t: Theme = "dark", c: Color | null = null) => { setName(n); if (n) { setTheme(t); setColor(c); } }, []);
  const arrowFill = color ? color.bg : theme === "light" ? "#111" : "#fff";
  const pillBg = color ? color.bg : theme === "light" ? "#111" : "#fff";
  const pillText = color ? color.text : theme === "light" ? "#fff" : "#000";
  const coarse = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  // case-study pages use the normal cursor (no custom spin cursor)
  const nativeCursor = useLocation().pathname.startsWith("/work/");

  const mx = useMotionValue(-9999), my = useMotionValue(-9999);
  const ax = useSpring(mx, { stiffness: 380, damping: 32, mass: 0.6 });
  const ay = useSpring(my, { stiffness: 380, damping: 32, mass: 0.6 });
  const lx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.7 });
  const ly = useSpring(my, { stiffness: 220, damping: 26, mass: 0.7 });
  const labelX = useTransform(lx, (v) => v + SIZE * 0.9);
  const labelY = useTransform(ly, (v) => v + SIZE * 0.2 + 6);

  useEffect(() => {
    if (coarse) return;
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [coarse, mx, my]);

  // hide the native cursor while a project is hovered
  useEffect(() => {
    document.body.style.cursor = name && !coarse ? "none" : "";
    return () => { document.body.style.cursor = ""; };
  }, [name, coarse]);

  const visible = name !== null && !coarse;

  return (
    <Ctx.Provider value={setCursor}>
     <SuppressCtx.Provider value={suppress}>
      {children}
      {!coarse && !nativeCursor && !suppressed && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998, opacity: visible ? 0 : 1, transition: "opacity .12s ease" }}>
          <MagicCursor label={false} enableStretch fillColor="#BEF3FE" enableGlow glowColor="#BEF3FE" glowIntensity={100} cursorSize={32} />
        </div>
      )}
      {!coarse && !suppressed && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: visible ? 1 : 0, transition: "opacity .14s ease" }}>
          <motion.div style={{ position: "absolute", top: 0, left: 0, x: labelX, y: labelY, background: pillBg, borderRadius: 999, padding: `${SIZE * 0.18}px ${SIZE * 0.42}px`, boxShadow: "0 4px 12px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.1)", color: pillText, fontSize: Math.max(10, SIZE * 0.42), fontWeight: 600, whiteSpace: "nowrap", fontFamily: "system-ui,-apple-system,sans-serif" }}>{name}</motion.div>
          <motion.div style={{ position: "absolute", top: 0, left: 0, x: ax, y: ay, width: SIZE, height: SIZE, transformOrigin: "0% 0%" }}>
            <svg width={SIZE} height={SIZE} viewBox="0 0 28 28" fill="none" style={{ display: "block", overflow: "visible" }}>
              <path d="M5 3 L23 14 L14 16 L11 24 Z" fill={arrowFill} stroke="rgba(0,0,0,0.25)" strokeWidth={0.6} strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      )}
     </SuppressCtx.Provider>
    </Ctx.Provider>
  );
}
