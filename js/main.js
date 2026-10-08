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
  const base = getProject(params.get("slug")) || PROJECTS[0];
  const p = projectView(base);
  const gallery = base.gallery || [];
  const nF = p.features ? p.features.length : 0;
  const nR = p.research ? p.research.length : 0;
  const fI = gallery.slice(0, nF), rI = gallery.slice(nF, nF + nR), sI = gallery.slice(nF + nR);

  const heroImg = base.hero ? `<div class="hero-image" data-reveal><img src="${base.hero}" alt="${p.title}"></div>` : "";
  const feats = (p.features || []).map((f, i) => `
    <div class="feature-block" data-reveal>
      <div class="feature-text"><div class="num">${t("project.feature")} 0${i + 1}</div><h4>${f.title}</h4><p>${breaks(f.body)}</p></div>
      ${fI[i] ? `<div class="feature-img"><img src="${fI[i]}" alt="${f.title}" loading="lazy"></div>` : ""}
    </div>`).join("");
  const res = (p.research || []).map((r, i) => `
    <div class="research-block" data-reveal><h4>${r.title}</h4><p>${breaks(r.body)}</p>
      ${rI[i] ? `<div class="research-img"><img src="${rI[i]}" alt="${r.title}" loading="lazy"></div>` : ""}
    </div>`).join("");
  const show = sI.length ? `<div class="showcase" data-reveal><span class="section-label">${t("project.showcase")}</span><div class="showcase-grid">${sI.map(s => `<img src="${s}" alt="showcase" loading="lazy">`).join("")}</div></div>` : "";

  document.title = `${(p.cardTitle || p.title)} · Peichi Design`;

  root.innerHTML = `
    <div class="wrap">
      <div class="project-meta-bar" data-reveal>
        <div class="item"><span class="k">${t("project.industry")}</span><span class="v">${p.categoryLabel}</span></div>
        ${p.client ? `<div class="item"><span class="k">${t("project.client")}</span><span class="v">${p.client}</span></div>` : ""}
        <div class="item"><span class="k">${t("project.role")}</span><span class="v">${p.role}</span></div>
        <div class="item"><span class="k">${t("project.timeline")}</span><span class="v">${p.timeline}</span></div>
      </div>
      <h1 class="project-title" data-reveal>${p.title}</h1>
      <p class="project-intro" data-reveal>${breaks(p.intro)}</p>
      ${heroImg}
      <div class="overview-head" data-reveal><span class="section-label">${t("project.overview")}</span></div>
      <div class="two-col">
        <div data-reveal><span class="k">${t("project.challenge")}</span><h3>${p.challengeTitle}</h3><p>${breaks(p.challengeBody)}</p></div>
        <div data-reveal><span class="k">${t("project.solution")}</span><h3>${p.solutionTitle}</h3><p>${breaks(p.solutionBody)}</p></div>
      </div>
      ${feats}
      <div class="research-head" data-reveal><span class="section-label">${t("project.research")}</span></div>
      ${res}
      ${show}
      <div class="back-row"><a class="more-link" href="work.html">${t("project.back")}</a></div>
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
