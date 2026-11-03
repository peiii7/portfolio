/* Home carousel (Figma 292:55642) — advanced by auto-rotate + arrows + drag.
   The page scrolls normally (no scroll hijack). A RAF lerp eases the rendered
   progress toward the target so motion is silky; cards fly forward in Z, swing
   in around Y (turntable), drift horizontally (flow) and respond to the mouse
   (parallax). Centre = selected project (colour + meta); top-right / bottom-left
   floats = next / prev (grayscale). Mobile falls back to stacked. */
(function () {
  var stage = document.getElementById("cv-stage");
  var wrap = document.getElementById("cv-wrap");
  if (!stage || !wrap) return;

  var DESIGN_W = 1440, DESIGN_H = 1040;
  var n = (typeof PROJECTS !== "undefined") ? PROJECTS.length : 0;

  var targetP = 0;        // target progress (can run past n-1; at() wraps)
  var curP = 0;           // lerped progress actually rendered
  var shownIdx = -1;      // project currently in the centre
  var narrow = false;
  var enterT = -1;        // timestamp the centre card started its entrance
  var moveDir = 1, enterDir = 1;
  var tmx = 0, tmy = 0, mx = 0, my = 0;   // mouse parallax (target / lerped)
  var auto = true, lastAuto = 0;
  var AUTO = 4200;        // ms between auto-advances

  var Z_CENTER = 70, Z_BACK = -240, Z_ENTER = -110;

  function view(p) { return (typeof projectView === "function") ? projectView(p) : p; }
  function at(i) { return PROJECTS[((i % n) + n) % n]; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function reduced() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

  function layout() {
    narrow = window.innerWidth <= 760;
    if (narrow) { stage.style.transform = ""; wrap.style.height = ""; return; }
    var w = wrap.clientWidth;
    var scale = Math.min(1, w / DESIGN_W);
    var offset = Math.max(0, (w - DESIGN_W * scale) / 2);
    stage.style.transform = "translateX(" + offset.toFixed(1) + "px) scale(" + scale + ")";
    wrap.style.height = (DESIGN_H * scale) + "px";
  }

  /* silky image swap in a slot */
  function setImg(slot, base, onSwap) {
    var img = slot.querySelector("img");
    var empty = slot.querySelector(".cv-empty");
    img.style.opacity = "0";
    img.style.transition = "none";
    img.style.transform = "scale(1.03)";
    setTimeout(function () {
      if (base.hero) { img.src = base.hero; img.style.display = ""; if (empty) empty.hidden = true; }
      else { img.removeAttribute("src"); img.style.display = "none"; if (empty) empty.hidden = false; }
      slot.setAttribute("href", base.hero ? ("work.html?slug=" + base.slug) : "#");
      if (onSwap) onSwap();
      requestAnimationFrame(function () {
        img.style.transition = "opacity .9s cubic-bezier(.22,.61,.36,1), transform 1.1s cubic-bezier(.22,.61,.36,1)";
        requestAnimationFrame(function () { img.style.opacity = "1"; img.style.transform = "scale(1)"; });
      });
    }, 220);
  }

  var center = document.getElementById("slot-center");
  var slotNext = document.getElementById("slot-next");
  var slotPrev = document.getElementById("slot-prev");
  var tag = document.getElementById("cc-tag"), title = document.getElementById("cc-title");

  function swapTo(i) {
    var c = at(i), cp = view(c);
    enterDir = moveDir;
    center.classList.add("is-swapping");
    setImg(center, c, function () {
      tag.textContent = cp.homeMeta || cp.categoryLabel || "";
      var line = cp.title || cp.cardTitle || "";
      var dash = line.indexOf("—");
      title.textContent = (dash >= 0 ? line.slice(dash + 1) : line).trim();
      enterT = performance.now();
      requestAnimationFrame(function () { center.classList.remove("is-swapping"); });
    });
    setImg(slotNext, at(i + 1));
    setImg(slotPrev, at(i - 1));
  }

  function paint() {
    var nearest = Math.round(curP);
    var fr = curP - nearest, a = Math.abs(fr);

    var e = enterT < 0 ? 1 : Math.min(1, (performance.now() - enterT) / 620);
    e = 1 - Math.pow(1 - e, 3);
    var cz = Z_ENTER * (1 - e) + Z_CENTER * e;
    var cs = (0.975 * (1 - e) + 1 * e) * (1 - a * 0.035);

    var cShift = "translate(" + (mx * 22).toFixed(1) + "px," + (my * 15).toFixed(1) + "px) rotateY(" + (mx * 4).toFixed(2) + "deg) rotateX(" + (-my * 4).toFixed(2) + "deg) ";
    var fShift = "translate(" + (mx * 11).toFixed(1) + "px," + (my * 7).toFixed(1) + "px) ";

    var cFlow = fr * -22, fFlow = fr * -80;
    var cRotY = enterDir * 26 * (1 - e) + mx * 4;
    center.style.transform = cShift + "translateX(" + cFlow.toFixed(1) + "px) translateZ(" + cz.toFixed(1) + "px) rotateY(" + cRotY.toFixed(2) + "deg) scale(" + cs.toFixed(4) + ")";

    var fs = 0.975 + a * 0.02, ringTurn = fr * 22;
    slotNext.style.transform = fShift + "translateX(" + fFlow.toFixed(1) + "px) translateZ(" + Z_BACK + "px) rotateY(" + (-13 - ringTurn + mx * 4).toFixed(2) + "deg) rotateX(" + (-my * 4).toFixed(2) + "deg) translateY(" + (-fr * 30).toFixed(1) + "px) scale(" + fs.toFixed(4) + ")";
    slotPrev.style.transform = fShift + "translateX(" + fFlow.toFixed(1) + "px) translateZ(" + Z_BACK + "px) rotateY(" + (13 - ringTurn + mx * 4).toFixed(2) + "deg) rotateX(" + (-my * 4).toFixed(2) + "deg) translateY(" + (fr * 30).toFixed(1) + "px) scale(" + fs.toFixed(4) + ")";

    if (nearest !== shownIdx) { shownIdx = nearest; swapTo(nearest); }
  }

  function tick(now) {
    // auto-advance
    if (auto && !reduced()) {
      if (!lastAuto) lastAuto = now;
      if (now - lastAuto >= AUTO) { targetP = Math.round(targetP) + 1; lastAuto = now; }
    } else { lastAuto = now; }

    if (targetP > curP + 0.001) moveDir = 1;
    else if (targetP < curP - 0.001) moveDir = -1;

    if (reduced()) { curP = targetP; mx = my = 0; }
    else {
      curP += (targetP - curP) * 0.08;
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
    }
    if (Math.abs(targetP - curP) < 0.0004) curP = targetP;
    paint();
    requestAnimationFrame(tick);
  }

  function step(d) { targetP = Math.round(targetP) + d; lastAuto = performance.now(); }

  function initNav() {
    var nx = document.getElementById("fc-next"), pv = document.getElementById("fc-prev");
    if (nx) nx.addEventListener("click", function (e) { e.preventDefault(); step(1); });
    if (pv) pv.addEventListener("click", function (e) { e.preventDefault(); step(-1); });
    slotNext.addEventListener("click", function (e) { e.preventDefault(); step(1); });
    slotPrev.addEventListener("click", function (e) { e.preventDefault(); step(-1); });
    center.addEventListener("click", function (e) { if (!at(Math.round(curP)).hero) e.preventDefault(); });
    // pause auto while the pointer is over the stage
    stage.addEventListener("mouseenter", function () { auto = false; });
    stage.addEventListener("mouseleave", function () { auto = true; });
  }

  function initDrag() {
    var x0 = null, moved = 0, base = 0;
    function down(x) { x0 = x; moved = 0; base = targetP; auto = false; }
    function move(x) {
      if (x0 === null) return;
      moved = x - x0;
      targetP = base - moved / 320;   // drag left → advance
    }
    function up() {
      if (x0 === null) return;
      x0 = null;
      targetP = Math.round(targetP);  // snap to nearest project
      lastAuto = performance.now();
      setTimeout(function () { auto = true; }, 600);
    }
    stage.addEventListener("mousedown", function (e) { down(e.clientX); });
    window.addEventListener("mousemove", function (e) { move(e.clientX); });
    window.addEventListener("mouseup", up);
    stage.addEventListener("touchstart", function (e) { down(e.touches[0].clientX); }, { passive: true });
    stage.addEventListener("touchmove", function (e) { move(e.touches[0].clientX); }, { passive: true });
    stage.addEventListener("touchend", up);
  }

  function initMouse() {
    window.addEventListener("mousemove", function (e) {
      if (narrow) return;
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  function initScrollHeader() {
    var hdr = document.querySelector("header.site-header");
    if (!hdr) return;
    var t = false;
    function u() { hdr.classList.toggle("scrolled", window.scrollY > 40); t = false; }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(u); } }, { passive: true });
    u();
  }

  function boot() {
    if (!n) return;
    layout();
    swapTo(0); shownIdx = 0;
    window.addEventListener("resize", layout);
    if (document.fonts) document.fonts.ready.then(layout);
    initNav(); initDrag(); initMouse(); initScrollHeader();
    requestAnimationFrame(tick);
  }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);

  document.addEventListener("langchange", function () { swapTo(shownIdx < 0 ? 0 : shownIdx); });
})();
