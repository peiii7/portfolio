import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCaseStudy, CASE_STUDIES } from "../data/caseStudies";
import { getProject, PROJECTS } from "../data/projects";
import { useLang } from "../lang";
import { useIsMobile } from "../useIsMobile";
import { useHoverCursor } from "../components/HoverCursor";

const SERIF = "'Cormorant Garamond','Noto Sans TC',serif";
const SANS = "'Inter','Noto Sans TC',system-ui,sans-serif";
const DIM = "#8A8A90";
const LINE = "rgba(244,244,245,0.08)";

// left-nav anchors → section ids (Figma 15:34039)
const SECTIONS = [
  { id: "brief", zh: "基本介紹", en: "Intro" },
  { id: "contribution", zh: "貢獻", en: "Contribution" },
  { id: "overview", zh: "專案背景", en: "Background" },
  { id: "outcomes", zh: "設計成果", en: "Outcomes" },
  { id: "takeaway", zh: "反思", en: "Reflection" },
];

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

// a fig/hero can be a plain path or a { en, zh } pair; resolve by language
const pickMedia = (v: string | { en: string; zh: string } | undefined, lang: string): string =>
  !v ? "" : typeof v === "string" ? v : lang === "en" ? v.en : v.zh;
const isVideo = (s: string) => /\.(mp4|webm|mov)($|\?)/i.test(s);

function Fig({ value, ratio = 1.5 }: { value?: string; ratio?: number }) {
  const v = value || "";
  const box: React.CSSProperties = { borderRadius: 16, overflow: "hidden", background: "#141416", aspectRatio: String(ratio) };
  const media: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
  if (/\.(mp4|webm|mov)($|\?)/i.test(v)) return <div style={box}><video src={v} autoPlay muted loop playsInline style={media} /></div>;
  if (/\.(jpe?g|png|webp|svg|gif|avif)($|\?)/i.test(v)) return <div style={box}><img src={v} alt="" style={media} /></div>;
  return (
    <div style={{ ...box, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <span style={{ color: "rgba(244,244,245,0.3)", fontSize: 13, textAlign: "center", lineHeight: 1.6 }}>{v || "Image coming soon"}</span>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const { lang } = useLang();
  const m = useIsMobile(900);
  const navigate = useNavigate();
  const setCursor = useHoverCursor();
  const cs = getCaseStudy(slug);
  const proj = getProject(slug);
  const [active, setActive] = useState("brief");

  // clear any stale hover-cursor name when the case study mounts/changes
  useEffect(() => { setCursor(null); }, [slug, setCursor]);

  // scroll-spy: highlight the anchor of the section crossing the viewport mid
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!cs) return <main style={{ padding: "160px 48px", maxWidth: 1120, margin: "0 auto" }}>Not found</main>;

  const order = PROJECTS.map((p) => p.slug);
  const idx = order.indexOf(cs.slug);
  const prev = CASE_STUDIES[order[(idx - 1 + order.length) % order.length]];
  const next = CASE_STUDIES[order[(idx + 1) % order.length]];
  const prevHero = getProject(prev.slug)?.hero;
  const nextHero = getProject(next.slug)?.hero;
  const shortName = (c: typeof prev) => (c.eyebrow ? c.eyebrow.split("｜")[0].trim() : c.title);

  const eyebrow = cs.eyebrow || "";
  const metaCols = [
    { k: "Project Type", v: cs.industry.replace(/｜/g, "\n") },
    { k: "Role", v: cs.role },
    { k: "Team", v: cs.team.replace(/、/g, "\n") },
    { k: "Timeline", v: cs.timeline },
  ];

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={{ maxWidth: 1440, margin: "0 auto", padding: m ? "110px 24px 0" : "132px clamp(32px,5vw,80px) 0", fontFamily: SANS }}>
      <div style={{ display: "flex", gap: m ? 0 : 64, alignItems: "flex-start" }}>
        {/* ---- left sticky anchor nav ---- */}
        {!m && (
          <aside style={{ position: "sticky", top: 132, flex: "0 0 150px", width: 150, display: "flex", flexDirection: "column", gap: 28 }}>
            <button
              type="button" aria-label="Back" onClick={() => navigate("/")}
              style={{ width: 44, height: 44, borderRadius: "50%", border: "none", background: "#1c1c1f", color: "#f4f4f5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}
            >←</button>
            <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {SECTIONS.map((s) => {
                const on = active === s.id;
                return (
                  <a key={s.id} href={`#${s.id}`} onClick={goTo(s.id)}
                    style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", fontSize: 16, lineHeight: 1.5, color: on ? "#f4f4f5" : DIM, fontWeight: on ? 600 : 400, transition: "color .25s ease" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: on ? "#f4f4f5" : DIM, flex: "none" }} />
                    {lang === "en" ? s.en : s.zh}
                  </a>
                );
              })}
            </nav>
          </aside>
        )}

        {/* ---- content ---- */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: 1151 }}>
          {/* 基本介紹 */}
          <section id="brief" style={{ scrollMarginTop: 120 }}>
            <Reveal>
              {eyebrow && <p style={{ fontSize: 15, color: DIM, margin: "0 0 20px" }}>{eyebrow}</p>}
              <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(2rem,3.9vw,3.1rem)", lineHeight: 1.2, letterSpacing: "-0.01em", margin: "0 0 44px" }}>{cs.title}</h1>
            </Reveal>
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4,1fr)", gap: m ? "28px 20px" : 32, margin: "0 0 44px" }}>
                {metaCols.map((c) => (
                  <div key={c.k}>
                    <span style={{ display: "block", fontSize: 15, color: DIM, marginBottom: 12 }}>{c.k}</span>
                    <span style={{ fontSize: 16, color: "#F4F4F5", lineHeight: 1.55, whiteSpace: "pre-line" }}>{c.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              {(() => {
                const heroSrc = pickMedia(cs.hero, lang) || (proj?.hero && !proj.hero.endsWith(".svg") ? proj.hero : "");
                const cover: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
                return (
                  <div style={{ borderRadius: 20, overflow: "hidden", background: "#141416", aspectRatio: m ? "1.4" : "2.2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {!heroSrc ? <span style={{ color: "rgba(244,244,245,0.25)", fontSize: 14 }}>Image coming soon</span>
                      : isVideo(heroSrc) ? <video src={heroSrc} autoPlay muted loop playsInline style={cover} />
                      : <img src={heroSrc} alt="" style={cover} />}
                  </div>
                );
              })()}
            </Reveal>
          </section>

          {/* 貢獻 */}
          <section id="contribution" style={{ scrollMarginTop: 120, margin: "88px 0 0" }}>
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 36 : 48, alignItems: "start" }}>
                <div>
                  <span style={labelStyle}>{lang === "en" ? "What I Did" : "我做了什麼"}</span>
                  <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 20 }}>
                    {cs.did.map((d, i) => {
                      const [h, ...rest] = d.split("——");
                      const body = rest.join("——");
                      return (
                        <li key={i} style={{ paddingLeft: 18, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: DIM }}>•</span>
                          {body
                            ? <><strong style={{ display: "block", fontSize: 15, color: "#F4F4F5", marginBottom: 6 }}>{h}</strong><span style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(244,244,245,0.72)" }}>{body}</span></>
                            : <span style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(244,244,245,0.82)" }}>{d}</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <span style={labelStyle}>Impact</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "28px 56px", marginTop: 20 }}>
                    {cs.metrics.map((mt, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(2.4rem,4vw,3.4rem)", lineHeight: 1, color: "#F4F4F5" }}>{mt.value}</div>
                        <div style={{ marginTop: 12, fontSize: 14, color: DIM, lineHeight: 1.5 }}>{mt.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* 專案背景 */}
          <section id="overview" style={{ scrollMarginTop: 120, margin: "96px 0 0" }}>
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "248px 1fr", gap: m ? 20 : 48, alignItems: "start", marginBottom: 80 }}>
                <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.9rem,2.6vw,2.4rem)", lineHeight: 1.1, color: DIM, margin: 0 }}>Project<br />Overview</h2>
                <p style={{ fontSize: "clamp(15px,1.15vw,17px)", lineHeight: 1.85, color: "#F4F4F5", margin: 0, maxWidth: 780 }}>{cs.background}</p>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 36 : 48, marginBottom: 80 }}>
                <div>
                  <span style={labelStyle}>Problem</span>
                  <PGList items={cs.problem} />
                </div>
                <div>
                  <span style={labelStyle}>Goal</span>
                  <PGList items={cs.goal} />
                </div>
              </div>
            </Reveal>
            <Reveal>
              <h2 style={{ fontFamily: SANS, fontWeight: 400, fontSize: "clamp(1.7rem,3vw,2.5rem)", lineHeight: 1.3, color: DIM, margin: "0 0 8px" }}>{cs.question}</h2>
            </Reveal>
          </section>

          {/* 設計成果 */}
          <section id="outcomes" style={{ scrollMarginTop: 120, margin: "96px 0 0" }}>
            {cs.steps.map((s) => (
              <Reveal key={s.n}>
                <div style={{ margin: "0 0 72px" }}>
                  <div style={{ fontSize: 15, color: DIM, marginBottom: 14 }}>Outcome {s.n}</div>
                  <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(1.4rem,2.3vw,2rem)", lineHeight: 1.3, margin: "0 0 18px" }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(244,244,245,0.82)", margin: "0 0 28px" }}>{s.body}</p>
                  {(() => {
                    const figs = (s.figs && s.figs.length ? s.figs : [""]).map((f) => pickMedia(f, lang));
                    const single = figs.length === 1;
                    return (
                      <div style={{ display: single ? "block" : "grid", gridTemplateColumns: single || m ? undefined : "1fr 1fr", gap: 20 }}>
                        {figs.map((f, j) => <Fig key={j} value={f} ratio={single ? 1.9 : 1.5} />)}
                      </div>
                    );
                  })()}
                </div>
              </Reveal>
            ))}
          </section>

          {/* 反思 */}
          <section id="takeaway" style={{ scrollMarginTop: 120, margin: "24px 0 0" }}>
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "248px 1fr", gap: m ? 24 : 48, alignItems: "start" }}>
                <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.9rem,2.6vw,2.4rem)", lineHeight: 1.1, color: DIM, margin: 0 }}>Take away</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                  {cs.takeaways.map((t, i) => (
                    <div key={i}>
                      <h4 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(1.05rem,1.5vw,1.25rem)", color: "#F4F4F5", margin: "0 0 14px", lineHeight: 1.4 }}>{t.h}</h4>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                        {t.points.map((p, j) => (
                          <li key={j} style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(244,244,245,0.78)", paddingLeft: 18, position: "relative" }}>
                            <span style={{ position: "absolute", left: 0, color: DIM }}>•</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </div>

      {/* pager — full-bleed Previous / Next over the target project's image */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", marginTop: 96 }}>
        <Link to={`/work/${prev.slug}`} className="pgr-card" style={prevHero ? { backgroundImage: `url(${prevHero})` } : undefined}
          onMouseEnter={() => setCursor(shortName(prev), "dark")} onMouseLeave={() => setCursor(null)}>
          <span className="hover-blue" style={pagerTtl}>Previous</span>
        </Link>
        <Link to={`/work/${next.slug}`} className="pgr-card" style={nextHero ? { backgroundImage: `url(${nextHero})` } : undefined}
          onMouseEnter={() => setCursor(shortName(next), "dark")} onMouseLeave={() => setCursor(null)}>
          <span className="hover-blue" style={pagerTtl}>Next</span>
        </Link>
      </div>
    </main>
  );
}

function PGList({ items }: { items: { h: string; p: string }[] }) {
  return (
    <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 20 }}>
      {items.map((it, i) => (
        <li key={i} style={{ paddingLeft: 18, position: "relative" }}>
          <span style={{ position: "absolute", left: 0, color: DIM }}>•</span>
          <strong style={{ display: "block", fontSize: 15, color: "#F4F4F5", marginBottom: 6 }}>{it.h}</strong>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(244,244,245,0.72)" }}>{it.p}</p>
        </li>
      ))}
    </ul>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: 16, color: DIM };
const pagerTtl: React.CSSProperties = { fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.4rem,2.6vw,2.2rem)", color: "#F4F4F5" };
