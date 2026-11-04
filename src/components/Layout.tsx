import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLang, usePick } from "../lang";
import { useIsMobile } from "../useIsMobile";
import cvEn from "/assets/Peichi_Lin_Resume_2026_EN.pdf";
import cvZh from "/assets/Peichi_Lin_Resume_2026_ZH.pdf";

const SERIF = "'Cormorant Garamond','Noto Sans TC',serif";
const SANS = "'Inter','Noto Sans TC',system-ui,sans-serif";

function Header() {
  const { lang, setLang } = useLang();
  const m = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  useEffect(() => {
    const lum = (bg: string): number | null => {
      const m = bg && bg.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(",").map(parseFloat);
      if (p.length > 3 && p[3] === 0) return null;
      const s = p.slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
    };
    const header = document.querySelector("header");
    const check = () => {
      setScrolled(window.scrollY > 40);
      let light = false;
      const els = document.elementsFromPoint(window.innerWidth / 2, 28);
      for (const el of els) {
        if (header && header.contains(el)) continue;
        const l = lum(getComputedStyle(el as Element).backgroundColor);
        if (l !== null) { light = l >= 0.55; break; }
      }
      setOnLight(light);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    // light sections animate their bg (shapes-me, lab-core); poll a little
    const iv = setInterval(check, 300);
    return () => { window.removeEventListener("scroll", check); clearInterval(iv); };
  }, []);
  const fg = onLight ? "#09090b" : "#fff";

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          maxWidth: scrolled ? 1086 : 1440, margin: "0 auto",
          padding: m ? (scrolled ? "8px 20px" : "14px 20px") : (scrolled ? "8px 48px" : "16px clamp(24px,6.9vw,100px)"),
          marginTop: scrolled ? 12 : 0,
          background: scrolled ? "rgba(255,255,255,0.14)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderRadius: scrolled ? 100 : 0,
          transition: "max-width .35s ease, padding .35s ease, background .35s ease, border-radius .35s ease",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 30, letterSpacing: "0.04em", color: fg, transition: "color .3s ease" }}>PEI</span>
        </Link>
        <nav style={{ display: "flex", gap: m ? 16 : 40, alignItems: "center", marginLeft: "auto", fontSize: m ? 14 : 16 }}>
          <Link to="/playground" className="hover-blue" style={{ ...navLink, color: fg, fontSize: "inherit" }}>Playground</Link>
          <Link to="/about" className="hover-blue" style={{ ...navLink, color: fg, fontSize: "inherit" }}>About</Link>
          <a href={lang === "zh" ? cvZh : cvEn} target="_blank" rel="noopener" className="hover-blue" style={{ ...navLink, color: fg, fontSize: "inherit" }}>CV</a>
        </nav>
        {!scrolled && (
          <div style={{ marginLeft: 20, display: "inline-flex", background: "#09090b", borderRadius: 16, padding: 4, width: 84 }}>
            {(["zh", "en"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{ flex: "1 0 0", fontFamily: SANS, fontSize: 12, fontWeight: 700, padding: "5px 0", borderRadius: 13, border: "none", cursor: "pointer", background: lang === l ? "#f4f4f5" : "transparent", color: lang === l ? "#09090b" : "#fff" }}>
                {l === "zh" ? "中" : "EN"}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ background: "#080808", display: "flex", flexDirection: m ? "column" : "row", justifyContent: "space-between", alignItems: "flex-start", gap: m ? 32 : 40, maxWidth: 1760, margin: "0 auto", padding: m ? "64px 24px" : "100px clamp(24px,2.8vw,40px)", flexWrap: "wrap" }}>
      <div>
        <p style={{ fontSize: 20, color: "#fff", margin: "0 0 20px" }}>Feel free to reach out</p>
        <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: m ? 38 : 56, lineHeight: 1.2, margin: 0, color: "#fff" }}>Let's create together!</h2>
      </div>
      <div style={{ display: "flex", flexDirection: m ? "row" : "column", gap: m ? 20 : 16, textAlign: m ? "left" : "right", flexWrap: "wrap" }}>
        <a href="http://www.linkedin.com/in/peichi-lin-463328235" target="_blank" rel="noopener" className="hover-blue" style={footLink}>LinkedIn ↗</a>
        <a href="https://medium.com/@its.peichilin" target="_blank" rel="noopener" className="hover-blue" style={footLink}>Medium ↗</a>
        <a href="mailto:its.peichilin@gmail.com" className="hover-blue" style={footLink}>Email ↗</a>
      </div>
    </footer>
  );
}

const navLink: React.CSSProperties = { color: "#fff", fontSize: 16, textDecoration: "none", fontFamily: SANS };
const footLink: React.CSSProperties = { color: "#fff", fontWeight: 500, fontSize: 18, textDecoration: "none", fontFamily: SANS };

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div style={{ background: "#080808", color: "#F4F4F5", minHeight: "100vh", fontFamily: SANS, position: "relative" }}>
      {/* grid decoration (Figma) — 320px grid, aligned to the 1440 content
          columns and extended to fill any width */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(255,255,255,0.055) 0 1px, transparent 1px 320px)," +
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.055) 0 1px, transparent 1px 320px)",
        backgroundPosition: "calc(50% - 560px) 0, 0 160px",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
