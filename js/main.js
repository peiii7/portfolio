/* Page rendering & interactivity. Bilingual via i18n.js
   (t(), projectView(), aboutView()). */

function setActiveNav() {
  const page = document.body.getAttribute("data-page");
  document.querySelectorAll("nav.main-nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-page") === page);
  });
}

function breaks(str) { return str ? str.split("\n").join("<br>") : ""; }

/* ---------- Work cards ---------- */
function workCardHTML(p) {
  const v = projectView(p);
  const thumb = p.hero
    ? `<div class="thumb"><img src="${p.hero}" alt="${v.cardTitle || v.title}" loading="lazy"></div>`
    : `<div class="thumb placeholder">Image coming soon</div>`;
  return `
    <a class="work-card" href="project.html?slug=${p.slug}" data-reveal>
      ${thumb}
      <div class="meta">
        <span class="category">${v.categoryLabel}</span>
        <span class="title">${v.cardTitle || v.title}</span>
      </div>
    </a>`;
}

function renderHomeWorks() {
  const el = document.getElementById("home-work-grid");
  if (!el) return;
  el.innerHTML = PROJECTS.slice(0, 4).map(workCardHTML).join("");
}

let currentFilter = "all";
function renderWorkGrid() {
  const el = document.getElementById("work-grid");
  if (!el) return;
  const list = currentFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === currentFilter);
  el.innerHTML = list.map(workCardHTML).join("");
}
function initWorkFilters() {
  const bar = document.getElementById("work-filter");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    currentFilter = btn.getAttribute("data-filter");
    bar.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b === btn));
    renderWorkGrid();
    initReveal();
  });
}

/* ---------- Project detail ---------- */
function renderProjectDetail() {
  const root = document.getElementById("project-root");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const base = getProject(slug) || PROJECTS[0];
  const p = projectView(base);
  const meta = (typeof projectMeta === "function") ? projectMeta(base.slug) : null;
  const gallery = base.gallery || [];

  function fig(src, alt) {
    return src
      ? `<div class="cs-fig"><img src="${src}" alt="${alt || ""}" loading="lazy"></div>`
      : `<div class="cs-fig"><div class="cs-img-empty">${t("project.feature")} — image coming soon</div></div>`;
  }

  // hero
  const heroImg = `<div class="cs-hero-img" data-reveal>${base.hero
    ? `<img src="${base.hero}" alt="${p.title}">`
    : `<div class="cs-img-empty">Image coming soon</div>`}</div>`;

  // metrics bar
  const metricsHtml = (meta && meta.metrics && meta.metrics.length)
    ? `<div class="cs-metrics" data-reveal>
        <div class="cs-metrics-note">${breaks(p.solutionTitle)}</div>
        <div class="cs-metrics-nums">${meta.metrics.map(m => `<div class="cs-metric"><span class="v">${m.v}</span><span class="k">${m.k}</span></div>`).join("")}</div>
      </div>`
    : "";

  // numbered steps from features; distribute gallery images across them
  const feats = p.features || [];
  const imgs = gallery.slice();
  const perStep = feats.length ? Math.max(1, Math.floor(imgs.length / feats.length)) : 0;
  const steps = feats.map((f, i) => {
    const slice = imgs.slice(i * perStep, (i === feats.length - 1) ? imgs.length : (i + 1) * perStep);
    const figs = slice.length
      ? slice.map(s => fig(s, f.title)).join("")
      : fig(null, f.title);
    const one = slice.length <= 1 ? " one" : "";
    return `<div class="cs-step" data-reveal>
      <div class="num">0${i + 1}</div>
      <h3>${f.title}</h3>
      <p>${breaks(f.body)}</p>
      <div class="cs-step-imgs${one}">${figs}</div>
    </div>`;
  }).join("");

  // take away from research
  const takeaway = (p.research && p.research.length)
    ? `<h2 class="cs-sec-title" data-reveal>${t("project.takeaway")}</h2>
       <div class="cs-take" data-reveal>${p.research.map(r => `<div class="item"><h4>${r.title}</h4><p>${breaks(r.body)}</p></div>`).join("")}</div>`
    : "";

  // prev / next
  const list = PROJECTS;
  const curIdx = Math.max(0, list.findIndex(x => x.slug === base.slug));
  const prev = projectView(list[(curIdx - 1 + list.length) % list.length]);
  const next = projectView(list[(curIdx + 1) % list.length]);
  const prevBase = list[(curIdx - 1 + list.length) % list.length];
  const nextBase = list[(curIdx + 1) % list.length];

  document.title = `${(p.cardTitle || p.title)} · Peichi Design`;

  root.innerHTML = `
    <div class="cs">
      <h1 class="cs-title" data-reveal>${p.title}</h1>
      <div class="cs-metacols" data-reveal>
        <div><span class="k">${t("project.industry")}</span><span class="v">${p.homeMeta || p.categoryLabel}</span></div>
        <div><span class="k">${t("project.role")}</span><span class="v">${p.role}</span></div>
        <div><span class="k">${t("project.timeline")}</span><span class="v">${p.timeline}</span></div>
        <div><span class="k">${t("project.client")}</span><span class="v">${p.client || "—"}</span></div>
      </div>
      ${heroImg}
      ${metricsHtml}

      <h2 class="cs-sec-title" data-reveal>${t("project.overview")}</h2>
      <p class="cs-intro" data-reveal>${breaks(p.intro)}</p>
      <div class="cs-pg" data-reveal>
        <div><span class="k">${t("project.problem")}</span><p>${breaks(p.challengeBody)}</p></div>
        <div><span class="k">${t("project.goal")}</span><p>${breaks(meta && meta.goalBody ? meta.goalBody : p.solutionBody)}</p></div>
      </div>

      <h2 class="cs-question" data-reveal>${p.challengeTitle}</h2>
      ${steps}

      ${takeaway}

      <div class="cs-pager">
        <a class="cs-prev" href="project.html?slug=${prevBase.slug}"><span class="lab">${t("project.prev")}</span><span class="ttl">${prev.cardTitle || prev.title}</span></a>
        <a class="cs-next" href="project.html?slug=${nextBase.slug}"><span class="lab">${t("project.next")}</span><span class="ttl">${next.cardTitle || next.title}</span></a>
      </div>
    </div>`;
}

/* ---------- About ---------- */
function renderAbout() {
  const expEl = document.getElementById("about-experience-list");
  if (!expEl) return;
  const A = aboutView();

  const photo = document.getElementById("about-photo");
  if (photo) photo.src = ABOUT_DATA.photo;

  expEl.innerHTML = A.experience.map(i => `<div class="row-item" data-reveal><div><h3>${i.role}</h3><p>${i.desc}</p></div><span class="row-time">${i.time}</span></div>`).join("");
  document.getElementById("about-education-list").innerHTML = A.education.map(i => `<div class="row-item" data-reveal><div><h3>${i.school}</h3><p>${i.detail}</p></div><span class="row-time">${i.time}</span></div>`).join("");
  const skillEl = document.getElementById("about-skill-grid");
  skillEl.setAttribute("data-reveal-stagger", "");
  skillEl.innerHTML = A.skills.map(s => `<div class="skill-tag"><div class="name">${s.name}</div><div class="level">${s.level}</div></div>`).join("");
  document.getElementById("about-award-list").innerHTML = A.awards.map(a => `<div class="award-item" data-reveal><span class="year">${a.year}</span><div>${a.items.map(l => `<p>${l}</p>`).join("")}</div></div>`).join("");
  const langEl = document.getElementById("about-lang-grid");
  langEl.setAttribute("data-reveal-stagger", "");
  langEl.innerHTML = A.languages.map(l => `<div class="lang-item"><h3>${l.name}</h3><p>${l.level}</p></div>`).join("");
}

/* ---------- Illust (legacy) ---------- */
function renderIllust() {
  const el = document.getElementById("illust-grid");
  if (!el) return;
  el.innerHTML = ILLUST_IMAGES.map(src => `<img src="${src}" alt="Illustration" loading="lazy" data-reveal>`).join("");
}

/* ---------- Playground ---------- */
let pgFilter = "illustration";
function playgroundContentHTML() {
  if (pgFilter === "illustration") {
    return `<div class="illust-grid">${ILLUST_IMAGES.map(src => `<img src="${src}" alt="Illustration" loading="lazy" data-reveal>`).join("")}</div>`;
  }
  const heading = pgFilter === "ai" ? t("pg.aiSoon") : t("pg.graphicSoon");
  const line = pgFilter === "ai" ? t("pg.aiLine") : t("pg.graphicLine");
  return `<div class="pg-empty" data-reveal><span class="pg-emoji">🚧</span><h3>${heading}</h3><p>${line}</p></div>`;
}
function renderPlayground() {
  const el = document.getElementById("playground-content");
  if (!el) return;
  el.innerHTML = playgroundContentHTML();
  initReveal();
}
function initPlaygroundTabs() {
  const bar = document.querySelector(".pg-filter");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    pgFilter = btn.getAttribute("data-pg");
    bar.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b === btn));
    renderPlayground();
  });
}

/* ---------- Scroll reveal ---------- */
let revealObserver = null;
function getRevealObserver() {
  if (revealObserver) return revealObserver;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return null;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("in-view"); entry.target.classList.remove("out-view"); }
      else { entry.target.classList.remove("in-view"); entry.target.classList.add("out-view"); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  return revealObserver;
}
function initReveal() {
  const obs = getRevealObserver();
  const targets = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
  if (!obs) { targets.forEach(el => el.classList.add("in-view")); return; }
  targets.forEach(el => {
    if (el.dataset.revealBound === "1") return;
    el.dataset.revealBound = "1";
    obs.observe(el);
  });
}

function renderAll() {
  setActiveNav();
  renderHomeWorks();
  renderWorkGrid();
  renderProjectDetail();
  renderAbout();
  renderIllust();
  renderPlayground();
  initReveal();
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  initWorkFilters();
  initPlaygroundTabs();
});

document.addEventListener("langchange", renderAll);
