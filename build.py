#!/usr/bin/env python3
# ============================================================
# 靜態網站產生器 — 讀 content.json，輸出 /zh 和 /en 兩種語言版本。
# 使用方式： python3 build.py
# （這是我在幫你更新內容時執行的指令，你平常不需要用到。）
# ============================================================
import json
import os
from html import escape as _escape

ROOT = os.path.dirname(os.path.abspath(__file__))
LANGS = ["zh", "en"]

with open(os.path.join(ROOT, "content.json"), encoding="utf-8") as f:
    DATA = json.load(f)

SITE = DATA["SITE"]
SOCIAL = DATA["SOCIAL"]
HOME = DATA["HOME"]
PROJECTS = DATA["PROJECTS"]
ABOUT = DATA["ABOUT"]
PLAYGROUND = DATA["PLAYGROUND"]
ILLUST_IMAGES = DATA["ILLUST_IMAGES"]
SHAPES_CAROUSEL = DATA["SHAPES_CAROUSEL"]
PLAYGROUND_WORKS = DATA["PLAYGROUND_WORKS"]
PLAYGROUND_ILLUSTS = DATA["PLAYGROUND_ILLUSTS"]
RESUME_FILE = SOCIAL["resume"]


def _asset_version():
    """Short hash of the CSS/JS so their URLs change whenever they do.
    Without it browsers keep serving a cached stylesheet after an upload and
    the site renders with old styles — which is exactly what happened during
    development, and would hit real visitors after every deploy."""
    import hashlib
    h = hashlib.sha1()
    for rel in ("css/site.css", "js/motion.js", "js/lang.js"):
        path = os.path.join(ROOT, rel)
        if os.path.exists(path):
            with open(path, "rb") as fh:
                h.update(fh.read())
    return h.hexdigest()[:8]


ASSET_VERSION = _asset_version()


def esc(s):
    """Escape for safe HTML text content; content.json values may contain
    a few intentional inline tags (<i>, <br>) for About's 'shapes me' copy,
    so callers that need raw HTML pass raw=True instead of calling esc()."""
    return _escape("" if s is None else str(s), quote=True)


def other_lang(lang):
    return "en" if lang == "zh" else "zh"


# ---------------- shared header / footer ----------------
def header(lang, active, depth=0, alt_path="index.html"):
    s = SITE[lang]
    prefix = "../" * depth
    home = prefix + f"{lang}/index.html"
    # "Work" is intentionally not in the nav — the home page already is the
    # work index. The /work/ listing still exists and is what the case-study
    # back button returns to.
    nav_items = [
        ("playground", prefix + f"{lang}/playground/index.html"),
        ("about", prefix + f"{lang}/about/index.html"),
    ]
    active_attr = ' class="active"'
    nav_html = "\n      ".join(
        f'<a href="{href}"{active_attr if active == key else ""}>{esc(s["nav"][key])}</a>'
        for key, href in nav_items
    )
    return f"""<header class="site-header" data-header>
  <a class="logo" href="{home}">
    <img class="logo-default" src="{prefix}assets/pei-logo-default.svg" alt="Peichi">
    <img class="logo-black" src="{prefix}assets/pei-logo-black.svg" alt="Peichi">
  </a>
  <input type="checkbox" id="nav-toggle" class="nav-toggle-checkbox">
  <label for="nav-toggle" class="nav-toggle-btn" aria-label="Menu">
    <span></span><span></span><span></span>
  </label>
  <div class="header-nav">
    <nav>
      {nav_html}
      <a href="{prefix}{RESUME_FILE}" target="_blank" rel="noopener">{esc(s["nav"]["cv"])}</a>
    </nav>
    <div class="lang-toggle-track">
      <a href="{prefix}zh/{alt_path}" class="{'active' if lang == 'zh' else ''}">中</a>
      <a href="{prefix}en/{alt_path}" class="{'active' if lang == 'en' else ''}">EN</a>
    </div>
  </div>
</header>"""


def footer(lang, depth=0):
    s = SITE[lang]
    prefix = "../" * depth
    return f"""<footer class="site-footer">
  <div class="footer-top" data-reveal>
    <div class="footer-left">
      <p class="footer-eyebrow">{esc(s["footer"]["eyebrow"])}</p>
      <h2 class="footer-heading">{esc(s["footer"]["heading"])}</h2>
    </div>
    <div class="footer-links">
      <a href="{SOCIAL["linkedin"]}" target="_blank" rel="noopener">{esc(s["footer"]["linkedin"])}<img src="{prefix}assets/arrow-up-right.svg" alt=""></a>
      <a href="{SOCIAL["medium"]}" target="_blank" rel="noopener">{esc(s["footer"]["medium"])}<img src="{prefix}assets/arrow-up-right.svg" alt=""></a>
      <a href="{SOCIAL["email"]}">{esc(s["footer"]["email"])}<img src="{prefix}assets/arrow-up-right.svg" alt=""></a>
    </div>
  </div>
</footer>"""


def shell(lang, title, description, active, depth, alt_path, content, body_class="", after_wrapper=""):
    prefix = "../" * depth
    html_lang = "zh-Hant" if lang == "zh" else "en"
    return f"""<!DOCTYPE html>
<html lang="{html_lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}">
<link rel="stylesheet" href="{prefix}css/site.css?v={ASSET_VERSION}">
</head>
<body class="{body_class}">
{header(lang, active, depth, alt_path)}
<div id="smooth-wrapper">
<div id="smooth-content">
<div class="page-shell">
<div class="grid-bg" aria-hidden="true"></div>
{content}
{footer(lang, depth)}
</div>
</div>
</div>
{after_wrapper}
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js"></script>
<script src="{prefix}js/lang.js?v={ASSET_VERSION}"></script>
<script src="{prefix}js/motion.js?v={ASSET_VERSION}" defer></script>
</body>
</html>
"""


# ============================================================
# 首頁
# ============================================================
def home_page(lang):
    h = HOME[lang]
    featured = sorted(PROJECTS, key=lambda p: p["order"])[:4]
    marquee_text = (" &nbsp; ".join([h["marquee"]] * 6))

    cards = []
    for i, p in enumerate(featured):
        thumb = (f'<img src="../{p["hero"]}" alt="{esc(p["title"][lang])}" loading="lazy">' if p["hero"]
                 else f'<span>{"視覺素材製作中" if lang == "zh" else "Visuals coming soon"}</span>')
        cards.append(f"""
      <a class="work-card" href="work/{p['slug']}/index.html" data-fan-item data-index="{i}">
        <div class="thumb{'' if p['hero'] else ' placeholder'}">
          {thumb}
        </div>
        <div class="work-card-caption">
          <span class="category">{esc(p['categoryLabel'][lang])}</span>
          <span class="title">{esc(p['cardSubtitle'][lang])}</span>
        </div>
      </a>""")

    role_spans = "".join(f"<span>{esc(r)}</span>" for r in h["heroRoles"])
    content = f"""<main>
  <section class="hero-section wrap">
    <div class="hero-title-row" data-reveal>
      <h1>{esc(h['heroLine1'])}</h1>
      <h1 class="hero-slot" data-hero-slot><span class="hero-slot-inner">{role_spans}</span></h1>
    </div>
    <p class="hero-desc" data-reveal>{esc(h['heroDesc'])}</p>
  </section>
  <section class="featured-works">
    <div class="marquee-wrap"><div class="marquee-track" data-marquee>{marquee_text} &nbsp; {marquee_text}</div></div>
    <div class="featured-works-fan" data-fan-carousel>{"".join(cards)}
    </div>
  </section>
</main>"""

    return shell(lang, "Peichi Lin — Product Designer", "Peichi Lin — Product Designer portfolio.",
                 "work", 1, "index.html", content)


# ============================================================
# Work 列表頁
# ============================================================
def work_list_page(lang):
    s = SITE[lang]
    cards = []
    for p in sorted(PROJECTS, key=lambda p: p["order"]):
        thumb = (f'<img src="../../{p["hero"]}" alt="{esc(p["title"][lang])}" loading="lazy">' if p["hero"]
                 else f'<span>{"視覺素材製作中" if lang == "zh" else "Visuals coming soon"}</span>')
        cards.append(f"""
      <a class="work-card" href="{p['slug']}/index.html">
        <div class="thumb{'' if p['hero'] else ' placeholder'}">
          {thumb}
        </div>
        <span class="category">{esc(p['categoryLabel'][lang])}</span>
        <span class="title">{esc(p['cardSubtitle'][lang])}</span>
      </a>""")

    content = f"""<main>
  <section class="hero-section wrap">
    <div class="hero-title-row" data-reveal><h1>{s['nav']['work']}</h1></div>
  </section>
  <section class="work-list">
    <div class="work-list-grid">{"".join(cards)}
    </div>
  </section>
</main>"""
    return shell(lang, "Work · Peichi Design", "Selected work by Peichi Lin.", "work", 2, "work/index.html", content)


# ============================================================
# Case Study 模板
# ============================================================
def meta_item(label, value):
    return f'<div class="cs-meta-item"><span class="cs-meta-label">{esc(label)}</span><span class="cs-meta-value">{esc(value)}</span></div>'


def case_study_page(lang, p, prev_p, next_p):
    s = SITE[lang]
    L = {
        "zh": {"type": "產業類型", "role": "我的職位", "team": "團隊組成", "timeline": "專案時長",
               "contribution": "貢獻", "whatIDid": "我做了什麼", "results": "專案成效",
               "overview": "關於專案", "problem": "Problem", "goal": "Goal", "takeaway": "反思"},
        "en": {"type": "Industry", "role": "My Role", "team": "Team", "timeline": "Duration",
               "contribution": "Contribution", "whatIDid": "What I Did", "results": "Results",
               "overview": "About the Project", "problem": "Problem", "goal": "Goal", "takeaway": "Reflection"},
    }[lang]

    hero_block = (
        f'<div class="cs-hero" data-reveal><img src="../../../{p["hero"]}" alt="{esc(p["title"][lang])}" data-speed="0.98"></div>'
        if p["hero"] else
        f'<div class="cs-hero cs-hero--placeholder" data-reveal><span>{"視覺素材製作中" if lang == "zh" else "Visuals coming soon"}</span></div>'
    )

    # Figma 32:38869 renders each responsibility as a bold lead-in, a line
    # break, then the detail. The source strings join those with an em-dash
    # pair, so split on it rather than printing one flat run of text.
    def contribution_item(text):
        for sep in ("——", "—"):
            if sep in text:
                head, _, tail = text.partition(sep)
                return f"<li><strong>{esc(head.strip())}</strong><span>{esc(tail.strip())}</span></li>"
        return f"<li><span>{esc(text)}</span></li>"

    contribution_list = "".join(contribution_item(t) for t in p["contribution"][lang])
    impact_list = "".join(
        f'<div class="cs-impact-item"><span class="cs-impact-value">{esc(i["value"])}</span>'
        f'<span class="cs-impact-label">{esc(i["label"][lang])}</span></div>'
        for i in p["impact"]
    )
    problem_list = "".join(f'<li><strong>{esc(i["title"])}</strong><p>{esc(i["body"])}</p></li>' for i in p["problems"][lang])
    goal_list = "".join(f'<li><strong>{esc(i["title"])}</strong><p>{esc(i["body"])}</p></li>' for i in p["goals"][lang])

    outcomes_html = []
    for o in p["outcomes"]:
        imgs = (o.get("images") or [None, None])[:2]
        if len(imgs) < 2:
            imgs = imgs + [None] * (2 - len(imgs))
        img_html = "".join(
            f'<div class="cs-outcome-img"><img src="../../../{src}" alt="" loading="lazy"></div>' if src
            else '<div class="cs-outcome-img cs-outcome-img--placeholder"></div>'
            for src in imgs
        )
        outcomes_html.append(f"""<div class="cs-outcome" data-reveal>
      <span class="cs-outcome-label">{esc(o['label'][lang])}</span>
      <h3>{esc(o['title'][lang])}</h3>
      <p>{esc(o['body'][lang])}</p>
      <div class="cs-outcome-imgs">{img_html}</div>
    </div>""")

    takeaways_html = "".join(f"""<div class="cs-takeaway-item">
      <h4>{esc(t['title'][lang])}</h4>
      <p>{esc(t['body'][lang])}</p>
    </div>""" for t in p["takeaways"])

    prev_html = (f'<a class="cs-nav-item" href="../{prev_p["slug"]}/index.html"><span>{s["prevProject"]}</span>'
                 f'<strong>{esc(prev_p["title"][lang])}</strong></a>') if prev_p else '<span class="cs-nav-item cs-nav-item--empty"></span>'
    next_html = (f'<a class="cs-nav-item cs-nav-item--next" href="../{next_p["slug"]}/index.html"><span>{s["nextProject"]}</span>'
                 f'<strong>{esc(next_p["title"][lang])}</strong></a>') if next_p else '<span class="cs-nav-item cs-nav-item--empty"></span>'

    # Meta row (Figma 17:36483): four equal columns with English labels in
    # both languages. "金融保險｜官方網站改版" is shown stacked, as in the design.
    def meta_col(label, value):
        lines = "".join(f"<span>{esc(v.strip())}</span>" for v in str(value).split("｜"))
        return (f'<div class="cs-meta-col"><p class="cs-meta-label">{esc(label)}</p>'
                f'<div class="cs-meta-value">{lines}</div></div>')

    meta_row = (
        meta_col("Project Type", p["categoryLabel"][lang])
        + meta_col("Role", p["role"][lang])
        + meta_col("Team", p["team"][lang])
        + meta_col("Timeline", p["timeline"][lang])
    )

    # Left anchor rail (Figma 15:34039). Section ids must match this order.
    anchor_ids = ["brief", "contribution", "background", "outcomes", "reflection"]
    anchor_active = ' class="is-active"'
    anchor_links = "".join(
        f'<a href="#{aid}" data-anchor-link{anchor_active if i == 0 else ""}>{esc(label)}</a>'
        for i, (aid, label) in enumerate(zip(anchor_ids, s["anchors"]))
    )

    # Rendered OUTSIDE #smooth-wrapper (see shell's after_wrapper) so it can be
    # genuinely position:fixed — inside ScrollSmoother's transformed content,
    # fixed anchors to that transform instead of the viewport and drifts.
    anchor_rail = f"""<aside class="cs-anchor" data-anchor-rail>
  <a class="cs-back" href="../index.html" aria-label="{esc(s['backToWork'])}">
    <img src="../../../assets/arrow-back.svg" alt="">
  </a>
  <nav class="cs-anchor-menu">{anchor_links}</nav>
</aside>"""

    content = f"""<main>
  <div class="wrap cs-layout">
    <div class="cs-content">
    <section id="brief" class="cs-brief" data-anchor-section>
      <div class="cs-brief-head" data-reveal>
        <p class="cs-eyebrow">{esc(p['title'][lang])}｜{esc(p['launch'][lang])}</p>
        <h1 class="cs-headline">{esc(p['cardSubtitle'][lang])}</h1>
      </div>
      <div class="cs-meta-row" data-reveal>{meta_row}</div>
    </section>

    {hero_block}

    <section id="contribution" class="cs-contribution" data-anchor-section data-reveal>
      <div class="cs-contribution-col">
        <p class="cs-minor-label">What I Did</p>
        <ul class="cs-bullets">{contribution_list}</ul>
      </div>
      <div class="cs-contribution-col">
        <p class="cs-minor-label">Impact</p>
        <div class="cs-impact-grid">{impact_list}</div>
      </div>
    </section>

    <section id="background" class="cs-split" data-anchor-section data-reveal>
      <h2 class="cs-display">Project<br><span>Overview</span></h2>
      <p class="cs-overview-body">{esc(p['overviewBody'][lang])}</p>
    </section>

    <section class="cs-section cs-problem-goal" data-reveal>
      <div>
        <h4>{L['problem']}</h4>
        <ul class="cs-list">{problem_list}</ul>
      </div>
      <div>
        <h4>{L['goal']}</h4>
        <ul class="cs-list">{goal_list}</ul>
      </div>
    </section>

    <h2 class="cs-question" data-reveal>{esc(p['overviewQuestion'][lang])}</h2>

    <section id="outcomes" class="cs-outcomes" data-anchor-section>{"".join(outcomes_html)}</section>

    <section id="reflection" class="cs-split cs-takeaway" data-anchor-section data-reveal>
      <h2 class="cs-display">Take away</h2>
      <div class="cs-takeaway-list">{takeaways_html}</div>
    </section>
    </div>
  </div>

  <nav class="cs-nav">
    {prev_html}
    {next_html}
  </nav>
</main>"""

    return shell(lang, f"{p['title'][lang]} · Peichi Design", p["cardSubtitle"][lang],
                 "work", 3, f"work/{p['slug']}/index.html", content, after_wrapper=anchor_rail)


# ============================================================
# About
# ============================================================
def about_page(lang):
    a = ABOUT[lang]
    exp_list = "".join(
        f'<div class="about-row" data-reveal><span>{esc(e["role"])}</span><span class="about-row-time">{esc(e["time"])}</span></div>'
        for e in a["experience"]
    )
    award_list = "".join(
        f'<div class="about-row" data-reveal><span>{esc(e["title"])}</span><span class="about-row-time">{esc(e["time"])}</span></div>'
        for e in a["awards"]
    )
    lang_grid = "".join(
        f'<div class="lang-col"><p class="lang-name">{esc(l["name"])}</p><p class="lang-level">{esc(l["level"])}</p></div>'
        for l in a["languages"]
    )
    bio_html = "".join(f"<p class=\"about-bio\">{esc(p)}</p>" for p in a["bio"])

    # "what shapes me": each italic word is followed inline by its own image
    # carousel. Placed inline (not absolutely positioned like the Figma frame)
    # so an image always stays beside its word no matter how the copy wraps.
    shapes_html = ""
    for seg in a["shapesMeSegments"]:
        if "em" in seg:
            group = SHAPES_CAROUSEL.get(seg["carousel"], [])
            active_cls = ' class="is-active"'
            frames = "".join(
                f'<img src="../../{src}" alt=""{active_cls if i == 0 else ""}>'
                for i, src in enumerate(group)
            )
            shapes_html += f'<em class="shapes-em">{esc(seg["em"])}</em>'
            if frames:
                shapes_html += f'<span class="shapes-carousel" data-carousel>{frames}</span>'
        else:
            shapes_html += esc(seg["text"])

    content = f"""<main>
  <section class="about-hero wrap" data-reveal>
    <div class="about-hero-text">
      <p class="about-greeting">{esc(a['greetingPlain'])}<em>{esc(a['greetingName'])}</em></p>
      {bio_html}
    </div>
    <div class="about-photo"><img src="../../{a['photo']}" alt="Peichi Lin" data-speed="0.98"></div>
  </section>

  <section class="about-history wrap">
    <div class="about-history-row" data-reveal>
      <span class="about-history-label">{esc(a['experienceLabel'])}</span>
      <div class="about-history-list">{exp_list}</div>
    </div>
    <div class="skills-cluster" aria-hidden="true">
      <img class="skills-box" src="../../assets/skill-dice-box.png" alt="">
      <img class="skills-icon si-1" src="../../assets/skill-icon-1.png" alt="">
      <img class="skills-icon si-2" src="../../assets/skill-icon-2.png" alt="">
      <img class="skills-icon si-3" src="../../assets/skill-icon-3.png" alt="">
      <img class="skills-icon si-4" src="../../assets/skill-icon-4.png" alt="">
      <img class="skills-icon si-5" src="../../assets/skill-icon-5.png" alt="">
      <img class="skills-icon si-6" src="../../assets/skill-icon-6.png" alt="">
      <img class="skills-icon si-7" src="../../assets/skill-icon-7.png" alt="">
    </div>
    <div class="about-history-row" data-reveal>
      <span class="about-history-label">{esc(a['awardLabel'])}</span>
      <div class="about-history-list">{award_list}</div>
    </div>
  </section>

  <section class="about-lang wrap" data-reveal>
    <div class="lang-grid">{lang_grid}</div>
    <p class="lang-caption"><em>{esc(a['languageLabel'])}</em> {esc(a['languageSub'])}</p>
  </section>

  <section class="shapes-me" data-reveal data-light-section>
    <p class="shapes-me-text">{shapes_html}</p>
  </section>

  <section class="coffee-chat" data-reveal data-light-section>
    <a class="coffee-chat-link" href="{SOCIAL.get('coffeeChat', SOCIAL['linkedin'])}" target="_blank" rel="noopener">
      <p>{a['coffeeChat'][0]}<br>{a['coffeeChat'][1]} <img class="matcha-icon" src="../../assets/matcha-cup.png" alt="matcha"><br><span class="coffee-chat-sub">{a['coffeeChat'][2]}</span></p>
    </a>
  </section>
</main>"""

    return shell(lang, "About · Peichi Design", "About Peichi Lin.", "about", 2, "about/index.html",
                 content, body_class="has-light-sections")


# ============================================================
# Playground
# ============================================================
def playground_page(lang):
    pg = PLAYGROUND[lang]
    s = SITE[lang]

    # Circular carousel: cards are upright (their Figma tilt was undone when the
    # assets were prepared) so motion.js can place and spin them on an arc.
    fan = "".join(
        f'<button class="fan-item" type="button" data-work-index="{i}" '
        f'aria-label="{esc(w["title"][lang])}">'
        f'<img src="../../{w["card"]}" alt="{esc(w["title"][lang])}"></button>'
        for i, w in enumerate(PLAYGROUND_WORKS)
    )

    # Detail modal (Figma 48:1155). Every block below the overview is optional,
    # so a work with only an intro simply renders fewer sections.
    panels = []
    for i, w in enumerate(PLAYGROUND_WORKS):
        overview = "".join(f"<p>{esc(t)}</p>" for t in w["overview"][lang])
        blocks = "".join(
            f'<div class="pgm-block"><p class="pgm-block-label">{esc(b["label"][lang])}</p>'
            f'<p class="pgm-block-text">{esc(b["text"][lang])}</p></div>'
            for b in w.get("blocks", [])
        )
        gallery = "".join(
            f'<div class="pgm-tile"><img src="../../{g}" alt="" loading="lazy"></div>'
            for g in w.get("gallery", [])
        )
        gallery_html = f'<div class="pgm-gallery">{gallery}</div>' if gallery else ""
        hero = w.get("hero")
        hero_html = (f'<div class="pgm-hero"><img src="../../{hero}" alt="{esc(w["title"][lang])}"></div>'
                     if hero else '<div class="pgm-hero pgm-hero--empty"></div>')
        panels.append(f"""<article class="pgm-panel" data-work-panel="{i}" hidden>
        <header class="pgm-head">
          <div class="pgm-titles">
            <p class="pgm-eyebrow">{esc(w['eyebrow'][lang])}</p>
            <h2 class="pgm-title">{esc(w['title'][lang])}</h2>
          </div>
          <button class="pgm-close" type="button" data-modal-close aria-label="{esc(s['closeLabel'])}">
            <img src="../../assets/icon-close.svg" alt="">
          </button>
        </header>
        <div class="pgm-body">
          <div class="pgm-main">
            {hero_html}
            <div class="pgm-copy">
              <p class="pgm-overview-heading">Project Overview</p>
              <div class="pgm-overview">{overview}</div>
              {blocks}
            </div>
          </div>
          {gallery_html}
        </div>
      </article>""")

    # Rendered OUTSIDE #smooth-wrapper (see shell's after_wrapper): a
    # position:fixed element inside ScrollSmoother's transformed content is
    # positioned against that transform, not the viewport, so the panel sized
    # itself to the whole page and ran hundreds of px past the bottom.
    modal = f"""<div class="pg-modal" data-work-modal hidden>
  <div class="pg-modal-backdrop" data-modal-close></div>
  <div class="pg-modal-shell" role="dialog" aria-modal="true">
    {"".join(panels)}
  </div>
</div>"""
    # Illustrations are not laid out statically — they are the pool for a
    # cursor trail (motion.js), revealed one after another as the pointer
    # sweeps the band. Hidden until then.
    illusts = "".join(
        f'<div class="illust-item"><img src="../../{src}" alt="Illustration" loading="lazy"></div>'
        for src in PLAYGROUND_ILLUSTS
    )
    marquee = " &nbsp; ".join(["Playground"] * 4)

    content = f"""<main>
  <section class="lab-core" data-light-section>
    <div class="lab-core-marquee" data-marquee>{marquee} &nbsp; {marquee}</div>
    <div class="fan-wrap" data-carousel-ring>{fan}</div>
    <h1>{esc(pg['subtitle'])}</h1>
    <p>{esc(pg['description'])}</p>
  </section>
  <section class="illust-section">
    <div class="illust-stage">
      {illusts}
      <p class="illust-lead" data-reveal>{esc(pg['illustLead'])} <em>{esc(pg['illustEmph'])}</em></p>
    </div>
  </section>
</main>"""

    return shell(lang, "Playground · Peichi Design", pg["description"], "playground", 2,
                 "playground/index.html", content, after_wrapper=modal)


# ============================================================
# 寫檔
# ============================================================
def write(rel_path, html):
    full = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(html)


def main():
    for lang in LANGS:
        write(f"{lang}/index.html", home_page(lang))
        write(f"{lang}/work/index.html", work_list_page(lang))
        write(f"{lang}/about/index.html", about_page(lang))
        write(f"{lang}/playground/index.html", playground_page(lang))

        sorted_projects = sorted(PROJECTS, key=lambda p: p["order"])
        for i, p in enumerate(sorted_projects):
            # The list wraps, so Previous/Next are never empty: the first
            # project's Previous is the last one, and the last one's Next is
            # the first. (Python's negative indexing already wraps backwards;
            # the modulo is what wraps forwards.)
            n = len(sorted_projects)
            prev_p = sorted_projects[i - 1]
            next_p = sorted_projects[(i + 1) % n]
            write(f"{lang}/work/{p['slug']}/index.html", case_study_page(lang, p, prev_p, next_p))

    # root redirect: respects a saved language preference, else browser language
    write("index.html", """<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<script>
var saved = localStorage.getItem("peichi-lang");
var lang = saved || (navigator.language && navigator.language.toLowerCase().indexOf("zh") === 0 ? "zh" : "en");
location.replace(lang + "/index.html");
</script>
<meta http-equiv="refresh" content="0; url=zh/index.html">
</head><body><a href="zh/index.html">Peichi Lin — Product Designer</a></body></html>
""")

    print("Build complete: zh/ and en/ generated.")


if __name__ == "__main__":
    main()
