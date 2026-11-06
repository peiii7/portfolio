import gsap from "gsap";

/* Home card → case study transition (ref: card image grows to full screen).
   1. The clicked card's current picture (image, or the video's current frame)
      is copied into a fixed layer exactly over the card.
   2. That layer grows to fill the screen (corners flatten), while the home
      page underneath drifts up and fades.
   3. Once full screen, `go()` switches to the case study behind it, and the
      layer fades away to reveal the new page from the top. */

let running = false;

export function expandCardToPage(card: HTMLElement, go: () => void) {
  if (running) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { go(); return; }
  running = true;
  let navigated = false;
  const goOnce = () => { if (!navigated) { navigated = true; go(); } };

  const r = card.getBoundingClientRect();
  const radius = parseFloat(getComputedStyle(card).borderRadius) || 0;
  const layer = document.createElement("div");
  Object.assign(layer.style, {
    position: "fixed", left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px",
    borderRadius: radius * (r.width / card.offsetWidth || 1) + "px", overflow: "hidden", zIndex: "9000",
    background: "#141416", pointerEvents: "none", willChange: "left,top,width,height,border-radius",
  } as CSSStyleDeclaration);

  // copy what the card is showing right now — a still image, or the video's current frame
  const video = card.querySelector("video");
  const img = card.querySelector("img");
  const fill = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;";
  if (video && video.readyState >= 2) {
    const c = document.createElement("canvas");
    c.width = video.videoWidth; c.height = video.videoHeight;
    c.getContext("2d")?.drawImage(video, 0, 0);
    c.style.cssText = fill;
    layer.appendChild(c);
  } else if (img || video) {
    const copy = document.createElement("img");
    copy.src = img ? img.currentSrc || img.src : video!.poster || "";
    copy.style.cssText = fill;
    layer.appendChild(copy);
  }
  document.body.appendChild(layer);

  // old page: drift up and fade while the picture grows
  const main = document.querySelector("main");
  if (main) gsap.to(main, { y: -60, opacity: 0, duration: 0.8, ease: "power3.inOut" });

  gsap.to(layer, {
    left: 0, top: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0,
    duration: 0.9, ease: "power3.inOut",
    onComplete: () => {
      goOnce();                               // new page renders behind the full-screen picture
      gsap.to(layer, {
        opacity: 0, duration: 0.6, delay: 0.15, ease: "power2.out",
        onComplete: () => { layer.remove(); running = false; },
      });
    },
  });

  // safety net: background tabs pause animation frames — never leave the layer stuck
  window.setTimeout(() => {
    if (!document.body.contains(layer)) return;
    goOnce(); layer.remove(); running = false;
  }, 2500);
}
