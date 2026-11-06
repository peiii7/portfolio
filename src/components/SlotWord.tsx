import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Slot-machine word: the words sit in a vertical reel that rolls up to the next
   one every `interval` ms. The first word is repeated at the end so the loop is
   seamless; the box width eases to the current word so the line never jumps.
   With prefers-reduced-motion the word just swaps. */
export default function SlotWord({ words, interval = 2400, italic = false }: { words: string[]; interval?: number; italic?: boolean }) {
  const [i, setI] = useState(0);          // 0..words.length (last = copy of first)
  const [anim, setAnim] = useState(true);  // false for the instant snap back to 0
  const [widths, setWidths] = useState<number[]>([]);
  const measureRef = useRef<HTMLSpanElement>(null);
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // measure each word once fonts are ready
  useLayoutEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (el) setWidths([...el.children].map((c) => (c as HTMLElement).offsetWidth));
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [words]);

  useEffect(() => {
    const t = setInterval(() => { setAnim(true); setI((n) => n + 1); }, interval);
    return () => clearInterval(t);
  }, [interval]);

  // after rolling onto the duplicate first word, jump back to the real one without animating
  useEffect(() => {
    if (i < words.length) return;
    const t = setTimeout(() => { setAnim(false); setI(0); }, 700);
    return () => clearTimeout(t);
  }, [i, words.length]);

  const reel = [...words, words[0]];
  const cur = i % words.length;
  const ease = "cubic-bezier(0.34, 1.32, 0.5, 1)"; // slight overshoot, like a reel settling
  const motion = anim && !reduce;

  return (
    <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom" }}>
      {/* hidden measurer */}
      <span ref={measureRef} aria-hidden style={{ position: "absolute", visibility: "hidden", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>
        {words.map((w) => <span key={w} style={{ display: "inline-block", fontStyle: italic ? "italic" : "normal" }}>{w}</span>)}
      </span>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", userSelect: "none" }}>{words[cur]}</span>
      <span aria-hidden style={{
        display: "inline-block", height: "1.2em", lineHeight: "1.2em", overflow: "hidden", verticalAlign: "bottom", userSelect: "none",
        width: widths.length ? widths[cur] : undefined,
        transition: motion ? `width 0.6s ${ease}` : "none",
        // soft fade at the reel edges
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 18%, #000 82%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0, #000 18%, #000 82%, transparent 100%)",
      }}>
        <span style={{
          display: "flex", flexDirection: "column",
          transform: `translateY(${-i * 1.2}em)`,
          transition: motion ? `transform 0.7s ${ease}` : "none",
        }}>
          {reel.map((w, k) => <span key={k} style={{ display: "block", whiteSpace: "nowrap", fontStyle: italic ? "italic" : "normal" }}>{w}</span>)}
        </span>
      </span>
    </span>
  );
}
