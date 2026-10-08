/* ============================================================
   Motion — scroll-driven behaviour for the 2026 redesign.
   GSAP + ScrollTrigger + ScrollSmoother + ScrambleTextPlugin (CDN).
   All motion is wrapped so prefers-reduced-motion gets a static page.
   ============================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = !!window.gsap;
  if (hasGSAP) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (window.ScrollSmoother) gsap.registerPlugin(ScrollSmoother);
    if (window.ScrambleTextPlugin) gsap.registerPlugin(ScrambleTextPlugin);
    gsap.defaults({ ease: "power3.out", duration: 0.8 });
  }

  /* ---------------- Silky scrolling ----------------
     ScrollSmoother eases the viewport toward the native scroll position
     instead of jumping to it. Touch keeps native scrolling (smoothTouch
     left off): momentum scrolling on phones already feels right, and
     overriding it tends to feel laggy rather than smoother.
     effects:true enables the data-speed / data-lag attributes used for
     the parallax micro-motion below. */
  var smoother = null;
  if (hasGSAP && window.ScrollSmoother && !reduce) {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.1,
      effects: true,
      normalizeScroll: false
    });
  }

  function currentScroll() {
    return smoother ? smoother.scrollTop() : (window.pageYOffset || document.documentElement.scrollTop || 0);
  }

  /* ---------------- Header: scroll morph + light/dark ----------------
     Direction-aware: scrolling down past 80px morphs into the pill;
     scrolling up at all — even one pixel, anywhere on the page — snaps
     it straight back to default. */
  var header = document.querySelector("[data-header]");
  if (header) {
    // Published so CSS can offset things from the real header height
    // (the Playground modal opens 24px below it).
    var publishHeaderHeight = function () {
      document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    };
    publishHeaderHeight();
    window.addEventListener("resize", publishHeaderHeight);

    if (hasGSAP && window.ScrollTrigger) {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: function (self) {
          if (self.scroll() <= 80) {
            header.classList.remove("is-scrolled");
          } else if (self.direction === 1) {
            header.classList.add("is-scrolled");
          } else {
            header.classList.remove("is-scrolled");
          }
        }
      });
    } else {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 80);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* Switch the header to Color=Black over light backgrounds. Measures each
       section's painted background brightness rather than relying on
       hand-tagged sections, so a new light section is picked up for free. */
    var LIGHT_THRESHOLD = 0.55;
    var HEADER_PROBE_Y = 40; // vertical centre of the header band

    function luminanceOf(el) {
      var bg = getComputedStyle(el).backgroundColor;
      var m = bg && bg.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      var parts = m[1].split(",").map(parseFloat);
      if (parts.length > 3 && parts[3] === 0) return null; // fully transparent
      var srgb = parts.slice(0, 3).map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    }

    var lightRegions = [];
    Array.prototype.forEach.call(
      document.querySelectorAll("main section, main > div, .site-footer, [data-light-section]"),
      function (el) {
        var lum = luminanceOf(el);
        if (lum !== null && lum >= LIGHT_THRESHOLD) lightRegions.push({ el: el, top: 0, bottom: 0 });
      }
    );

    if (lightRegions.length) {
      /* Cache each region's position in DOCUMENT space once per refresh, then
         compare against the scroll offset every frame. Calling
         getBoundingClientRect() per frame instead would force a layout on
         every tick — and under ScrollSmoother the rects also lag the native
         scroll position, so a scroll-event listener would flip the colour
         early, before the content visually arrives under the header. */
      var measureRegions = function () {
        var y = currentScroll();
        lightRegions.forEach(function (r) {
          var box = r.el.getBoundingClientRect();
          r.top = box.top + y;
          r.bottom = box.bottom + y;
        });
      };
      var syncHeaderColor = function () {
        var probe = currentScroll() + HEADER_PROBE_Y;
        var under = null;
        for (var i = 0; i < lightRegions.length; i++) {
          var r = lightRegions[i];
          if (r.top <= probe && r.bottom >= probe) { under = r.el; break; }
        }
        // Re-read the live luminance of the section actually under the header:
        // Playground's Lab Core animates from light to dark as you scroll into
        // the illustration band, so a value cached at load would leave the
        // header stuck in its dark-text state over a now-dark background.
        var onLight = false;
        if (under) {
          var lum = luminanceOf(under);
          onLight = lum === null ? true : lum >= LIGHT_THRESHOLD;
        }
        header.classList.toggle("on-light", onLight);
      };

      measureRegions();
      syncHeaderColor();

      if (hasGSAP) {
        gsap.ticker.add(syncHeaderColor);
      } else {
        window.addEventListener("scroll", syncHeaderColor, { passive: true });
      }
      window.addEventListener("resize", function () { measureRegions(); syncHeaderColor(); });
      if (window.ScrollTrigger) ScrollTrigger.addEventListener("refresh", function () { measureRegions(); syncHeaderColor(); });
    }
  }

  /* ---------------- Reveal-on-scroll ----------------
     GSAP-driven when available (batched so neighbours share one staggered
     entrance rather than each firing independently); the CSS/IO path stays
     as the no-GSAP fallback. */
  var revealTargets = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  } else if (hasGSAP && window.ScrollTrigger) {
    gsap.set(revealTargets, { opacity: 0, y: 28 });
    revealTargets.forEach(function (el) { el.classList.add("in-view"); }); // disarm the CSS transition
    ScrollTrigger.batch(revealTargets, {
      start: "top 88%",
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true });
      }
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- Micro-motion: staggered group entrances ----------------
     Small, quick offsets — enough to give the eye something to follow as a
     block arrives, without turning the page into a slideshow. */
  if (hasGSAP && window.ScrollTrigger && !reduce) {
    var microGroups = [
      { sel: ".cs-meta-item", y: 14, stagger: 0.05 },
      { sel: ".cs-impact-item", y: 18, stagger: 0.07 },
      { sel: ".cs-bullets li", y: 14, stagger: 0.06 },
      { sel: ".cs-list li", y: 14, stagger: 0.06 },
      { sel: ".cs-takeaway-item", y: 18, stagger: 0.08 },
      { sel: ".about-row", y: 14, stagger: 0.05 },
      { sel: ".lang-col", y: 16, stagger: 0.07 },
      { sel: ".illust-grid img", y: 20, stagger: 0.04 },
      { sel: ".site-footer .footer-links a", y: 12, stagger: 0.06 }
    ];
    microGroups.forEach(function (g) {
      var els = document.querySelectorAll(g.sel);
      if (!els.length) return;
      gsap.set(els, { opacity: 0, y: g.y });
      ScrollTrigger.batch(els, {
        start: "top 92%",
        onEnter: function (batch) {
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: g.stagger, overwrite: true });
        }
      });
    });

    /* Headline lift — a touch more travel than body copy so headings lead. */
    var headlines = document.querySelectorAll(".cs-question, .cs-outcome h3, .illust-lead, .site-footer .footer-heading");
    if (headlines.length) {
      gsap.set(headlines, { opacity: 0, y: 26 });
      ScrollTrigger.batch(headlines, {
        start: "top 90%",
        onEnter: function (batch) {
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true });
        }
      });
    }
  }

  /* ---------------- Hero role cycler (slot-machine) ---------------- */
  var heroSlot = document.querySelector("[data-hero-slot] .hero-slot-inner");
  if (heroSlot && heroSlot.children.length > 1 && hasGSAP && !reduce) {
    var realCount = heroSlot.children.length;
    // Clone the first word onto the end so the last -> first step keeps
    // travelling in the same direction into an identical-looking item,
    // then snap back to the top while off-screen. Without the clone the
    // reel visibly rewinds upward through every word to get home.
    heroSlot.appendChild(heroSlot.children[0].cloneNode(true));

    // Driven by one looping GSAP timeline rather than setInterval: a timer
    // keeps firing while GSAP's rAF ticker is paused in a background tab, so
    // the step counter runs ahead of the animation and the reel ends up
    // scrolled far past its last word (blank slot). A timeline shares the
    // ticker, so schedule and animation can't drift apart.
    // yPercent is relative to the reel's own height, so one word is
    // 100/total percent — this also stays correct when a resize changes the
    // font-size, which fixed pixel offsets would not.
    var stepPct = 100 / (realCount + 1);
    var reel = gsap.timeline({ repeat: -1 });
    for (var i = 1; i <= realCount; i++) {
      reel.to(heroSlot, { yPercent: -stepPct * i, duration: 0.7, ease: "power4.inOut" }, "+=1.7");
    }
    reel.set(heroSlot, { yPercent: 0 });
  }

  /* ---------------- Case study: left anchor rail ----------------
     Clicking scrolls to the section; the active item follows the scroll.
     Anchor jumps have to go through the smoother when it is running,
     otherwise the browser's native jump fights the smoothed transform and
     lands in the wrong place. */
  var anchorLinks = document.querySelectorAll("[data-anchor-link]");
  var anchorSections = document.querySelectorAll("[data-anchor-section]");
  if (anchorLinks.length && anchorSections.length) {
    var ANCHOR_OFFSET = 140;

    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        if (smoother) {
          smoother.scrollTo(target, true, "top " + ANCHOR_OFFSET + "px");
        } else {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.pageYOffset - ANCHOR_OFFSET,
            behavior: reduce ? "auto" : "smooth"
          });
        }
      });
    });

    var setActiveAnchor = function () {
      var probe = currentScroll() + ANCHOR_OFFSET + 10;
      var activeIdx = 0;
      anchorSections.forEach(function (sec, i) {
        var top = sec.getBoundingClientRect().top + currentScroll();
        if (top <= probe) activeIdx = i;
      });
      anchorLinks.forEach(function (link, i) {
        link.classList.toggle("is-active", i === activeIdx);
      });
    };
    setActiveAnchor();
    if (hasGSAP) {
      gsap.ticker.add(setActiveAnchor);
    } else {
      window.addEventListener("scroll", setActiveAnchor, { passive: true });
    }

    /* The rail is position:fixed, so on its own it would sit on top of the
       prev/next nav and the footer once the reflection section ends. Ride it
       up and out instead, so it reads as scrolling away with the content.
       Both offsets are read from the CSS `top` and offsetHeight rather than
       getBoundingClientRect, because the rect already includes whatever
       translate this tween has applied — measuring it would compound. */
    var rail = document.querySelector("[data-anchor-rail]");
    var tail = document.querySelector(".cs-nav") || document.querySelector(".site-footer");
    var railExtent = function () {
      return (parseFloat(getComputedStyle(rail).top) || 0) + rail.offsetHeight;
    };
    if (hasGSAP && rail && tail) {
      gsap.to(rail, {
        y: function () { return -(railExtent() + 24); },
        ease: "none",
        scrollTrigger: {
          trigger: tail,
          start: "top bottom",
          // Fully gone by the time the nav has risen to the rail's bottom edge,
          // which is the first moment the two could overlap.
          end: function () { return "top " + railExtent() + "px"; },
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    }
  }

  /* ---------------- About "what shapes me": inline image carousels ----------------
     Each italic word owns a stack of photos that cross-fade. Offsetting the
     start index per carousel keeps the three from flipping in lockstep. */
  var carousels = document.querySelectorAll("[data-carousel]");
  if (carousels.length && !reduce) {
    carousels.forEach(function (box, boxIndex) {
      var frames = box.querySelectorAll("img");
      if (frames.length < 2) return;
      var idx = 0;
      setTimeout(function () {
        setInterval(function () {
          frames[idx].classList.remove("is-active");
          idx = (idx + 1) % frames.length;
          frames[idx].classList.add("is-active");
        }, 1000);
      }, boxIndex * 300);
    });
  }

  /* ---------------- Nav link hover: scramble-text ---------------- */
  if (!reduce) {
    document.querySelectorAll(".site-header nav a").forEach(function (a) {
      var original = a.textContent;
      a.addEventListener("mouseenter", function () {
        if (hasGSAP && window.ScrambleTextPlugin) {
          gsap.to(a, { duration: 0.5, ease: "none", scrambleText: { text: original, chars: "upperCase", speed: 0.5, revealDelay: 0.05 } });
        }
      });
    });
  }

  /* ---------------- Hero: progressive blur once you scroll past it ---------------- */
  var heroSection = document.querySelector(".hero-section");
  if (heroSection && hasGSAP && window.ScrollTrigger && !reduce) {
    gsap.to(heroSection, {
      filter: "blur(14px)", opacity: 0.25, ease: "none",
      scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* ---------------- Featured works: stacked-fan carousel ----------------
     After codepen.io/supah/pen/xxJMbbg. The section pins to the viewport and
     the scroll walks one card at a time to the front; the cards themselves are
     all stacked on the same point and fanned out purely in CSS. */
  var worksSection = document.querySelector(".featured-works");
  var fan = document.querySelector("[data-fan-carousel]");
  var workCards = fan ? [].slice.call(fan.querySelectorAll("[data-fan-item]")) : [];

  if (fan && workCards.length) {
    var lastActive = -1;

    /* The ONLY thing written per card. Everything else — the arc, the
       rotation, the fade, the stacking order — is derived from this in CSS.
       See the .work-card block in site.css. */
    var placeFan = function (active) {
      if (active === lastActive) return;
      lastActive = active;
      workCards.forEach(function (card, i) {
        var offset = i - active;
        card.style.setProperty("--offset", offset);
        card.style.setProperty("--depth", Math.abs(offset));
        card.classList.toggle("is-active", offset === 0);
      });
    };
    placeFan(0);

    /* Clicking a card that is not at the front brings it forward instead of
       navigating — otherwise a card you can barely see is a live link, and
       people would open the wrong project. Only the front card follows its
       href. */
    workCards.forEach(function (card, i) {
      card.addEventListener("click", function (e) {
        if (i !== lastActive) {
          e.preventDefault();
          goToCard(i);
        }
      });
    });

    var goToCard = function (i) { placeFan(i); };

    if (hasGSAP && window.ScrollTrigger && !reduce) {
      /* The reference pen listens on `mousewheel` globally and sets
         body{overflow:hidden}, so the page itself cannot scroll. That is fine
         for a standalone demo but would trap the visitor on this section, so
         the fan is driven by the pinned section's own scroll progress
         instead: scrolling down walks the cards forward and then releases the
         page normally once the last one is in front. */
      var steps = workCards.length - 1;
      var fanState = { pos: 0 };

      gsap.to(fanState, {
        pos: steps,
        ease: "none",
        onUpdate: function () { placeFan(Math.round(fanState.pos)); },
        scrollTrigger: {
          trigger: worksSection,
          start: "top top",
          end: function () { return "+=" + window.innerHeight * steps * 0.8; },
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          snap: steps > 0 ? { snapTo: 1 / steps, duration: 0.3, ease: "power2.inOut" } : false
        }
      });

      // Clicking a card also needs to move the scroll, or the pinned trigger
      // would snap the fan straight back on the next tick.
      var fanST = ScrollTrigger.getAll().filter(function (t) {
        return t.trigger === worksSection && t.pin;
      })[0];
      goToCard = function (i) {
        if (!fanST || steps <= 0) { placeFan(i); return; }
        var y = fanST.start + (fanST.end - fanST.start) * (i / steps);
        if (smoother) smoother.scrollTo(y, true);
        else window.scrollTo({ top: y, behavior: "smooth" });
      };
    }
  }

  /* ---------------- Marquee (Featured Works / Playground) ---------------- */
  document.querySelectorAll("[data-marquee], .lab-core-marquee").forEach(function (track) {
    if (reduce || !hasGSAP) return;
    gsap.to(track, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
  });

  /* ---------------- Playground: circular card carousel ----------------
     Cards ride a large circle whose centre sits well below the section, so the
     visible top of the arc reads as a gentle fan. Scrolling rotates the ring
     and it settles so a card is squarely centred (fully visible) rather than
     stopping mid-way between two. */
  var fanWrap = document.querySelector("[data-carousel-ring]");
  var fanItems = fanWrap ? Array.prototype.slice.call(fanWrap.querySelectorAll(".fan-item")) : [];

  if (fanWrap && fanItems.length && hasGSAP) {
    // Cards are spaced evenly around a FULL circle, so rotating by one step
    // brings the next card to the top and the one leaving simply continues
    // round the back — a fixed narrow fan would just fling cards off the edge.
    var N = fanItems.length;

    /* The Figma arrangement (15:31197 "rotate works") is a hand-placed arc,
       NOT an even ring: the gaps are uneven (-45,-30,0,+30,+45) and the middle
       card is deliberately smaller than the outer ones. So instead of deriving
       positions from a circle, the five slots are transcribed from the design
       — as centre x/y and width in % of the band — and cards travel THROUGH
       these slots as you scroll. That reproduces the composition exactly at
       every step. */
    var SLOTS = [
      { x: 11.58, y: 76.65, w: 27.45, rot: -45 },
      { x: 27.83, y: 47.86, w: 26.50, rot: -30 },
      { x: 49.97, y: 35.90, w: 19.51, rot: 0 },
      { x: 72.14, y: 47.78, w: 26.62, rot: 30 },
      { x: 88.38, y: 76.55, w: 27.55, rot: 45 }
    ];
    var CENTRE_SLOT = 2;
    var ring = { offset: 0 };   // how far the cards are shifted along the slots

    // Continuous slot lookup; linearly extrapolates past either end so cards
    // can glide in and out of the arc rather than popping.
    var slotAt = function (t) {
      var lo = Math.floor(t);
      var f = t - lo;
      var get = function (i) {
        if (i >= 0 && i < SLOTS.length) return SLOTS[i];
        var edge = i < 0 ? 0 : SLOTS.length - 1;
        var inward = i < 0 ? 1 : SLOTS.length - 2;
        var steps = i < 0 ? -i : i - edge;
        var a = SLOTS[edge], b = SLOTS[inward];
        return {
          x: a.x + (a.x - b.x) * steps,
          y: a.y + (a.y - b.y) * steps,
          w: a.w,
          rot: a.rot + (a.rot - b.rot) * steps
        };
      };
      var A = get(lo), B = get(lo + 1);
      return {
        x: A.x + (B.x - A.x) * f,
        y: A.y + (B.y - A.y) * f,
        w: A.w + (B.w - A.w) * f,
        rot: A.rot + (B.rot - A.rot) * f
      };
    };

    var place = function () {
      var W = fanWrap.clientWidth;
      var H = fanWrap.clientHeight;

      fanItems.forEach(function (el, i) {
        var t = i + ring.offset;
        var s = slotAt(t);
        var w = s.w / 100 * W;
        // Cards fade as they run past either end of the arc.
        var over = t < -0.6 ? (-0.6 - t) : (t > SLOTS.length - 0.4 ? t - (SLOTS.length - 0.4) : 0);
        var vis = Math.max(0, 1 - over / 0.8);
        gsap.set(el, {
          width: w,
          x: s.x / 100 * W - w / 2,
          y: s.y / 100 * H - el.offsetHeight / 2,
          rotation: s.rot,
          opacity: vis,
          pointerEvents: vis > 0.4 ? "auto" : "none",
          zIndex: 100 - Math.round(Math.abs(t - CENTRE_SLOT) * 10)
        });
        el.classList.toggle("is-centred", Math.abs(t - CENTRE_SLOT) < 0.5);
      });
    };

    gsap.set(fanItems, { xPercent: 0, yPercent: 0 });
    place();
    window.addEventListener("resize", place);
    if (window.ScrollTrigger) ScrollTrigger.addEventListener("refresh", place);

    if (!reduce && window.ScrollTrigger) {
      /* PIN the section and spend the scroll on the carousel only: the page
         does not advance until the last project has passed through the centre
         slot. Offset runs so card 0 starts centred and card N-1 ends centred;
         at the midpoint the arc is exactly the Figma composition. */
      var startOffset = CENTRE_SLOT;
      var endOffset = CENTRE_SLOT - (N - 1);
      var labSection = fanWrap.closest(".lab-core") || fanWrap;
      ring.offset = startOffset;
      place();

      gsap.fromTo(ring,
        { offset: startOffset },
        {
          offset: endOffset,
          ease: "none",
          onUpdate: place,
          scrollTrigger: {
            trigger: labSection,
            start: "top top",
            // One viewport of scroll per project keeps the rotation unhurried.
            end: function () { return "+=" + (window.innerHeight * (N - 1) * 0.75); },
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (N - 1), duration: 0.35, ease: "power2.inOut" }
          }
        }
      );
    }
  }

  /* ---------------- Playground: work detail modal ---------------- */
  var workModal = document.querySelector("[data-work-modal]");
  if (workModal && fanItems.length) {
    var panels = workModal.querySelectorAll("[data-work-panel]");
    var shell = workModal.querySelector(".pg-modal-shell");
    var lastFocused = null;

    var openWork = function (index) {
      lastFocused = document.activeElement;
      panels.forEach(function (p) { p.hidden = String(p.dataset.workPanel) !== String(index); });
      workModal.hidden = false;
      document.body.style.overflow = "hidden";
      if (smoother) smoother.paused(true);
      if (shell) { shell.scrollTop = 0; }
      var closeBtn = workModal.querySelector("[data-work-panel]:not([hidden]) .pgm-close");
      if (closeBtn) closeBtn.focus();
    };

    var closeWork = function () {
      workModal.hidden = true;
      document.body.style.overflow = "";
      if (smoother) smoother.paused(false);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };

    fanItems.forEach(function (btn) {
      btn.addEventListener("click", function () { openWork(btn.dataset.workIndex); });
    });
    workModal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeWork);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !workModal.hidden) closeWork();
    });
  }

  /* ---------------- Playground: light -> dark backdrop on section change ----
     The Lab Core band is light and the illustration band is dark; cross-fade
     the page background between them as the boundary crosses the viewport so
     the switch reads as a transition rather than a hard cut. */
  var labCore = document.querySelector(".lab-core");
  var illustSection = document.querySelector(".illust-section");
  if (labCore && illustSection && hasGSAP && window.ScrollTrigger && !reduce) {
    var labText = labCore.querySelectorAll("h1, p:not(.lab-core-marquee)");
    var fadeTrigger = {
      trigger: illustSection,
      start: "top 85%",
      end: "top 35%",
      scrub: true
    };
    gsap.fromTo(labCore,
      { backgroundColor: "#efefef" },
      { backgroundColor: "#080808", ease: "none", scrollTrigger: fadeTrigger }
    );
    // The heading is dark-on-light; it has to invert with the backdrop or it
    // disappears into it halfway through the fade.
    gsap.fromTo(labText,
      { color: "#080808" },
      { color: "#f0f0f0", ease: "none", scrollTrigger: fadeTrigger }
    );
  }

  /* ---------------- Playground: illustration cursor trail ----------------
     Sweeping the band drops illustrations behind the pointer, cycling through
     the set. New items only spawn after the pointer has travelled a minimum
     distance, otherwise a single jiggle would burn through the whole pool. */
  var illustStage = document.querySelector(".illust-stage");
  var trailItems = illustStage ? Array.prototype.slice.call(illustStage.querySelectorAll(".illust-item")) : [];
  var finePointer = !window.matchMedia || window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (illustStage && trailItems.length && hasGSAP && !reduce && finePointer) {
    var trailIdx = 0, zTop = 1, lastX = null, lastY = null;
    var MIN_TRAVEL = 110;

    gsap.set(trailItems, { xPercent: -50, yPercent: -50, opacity: 0 });

    /* These are loading="lazy" AND start at opacity 0, so the browser never
       fetches them: the first time each one is revealed it would pop in blank,
       and its height reads as 0, which the floor calculation below needs.
       Warm them as the band approaches rather than at page load — together
       they are ~3.3MB, which is not worth spending on a visitor who never
       scrolls this far. */
    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: illustStage,
        start: "top 200%",
        once: true,
        onEnter: function () {
          trailItems.forEach(function (it) {
            var im = it.querySelector("img");
            if (im) im.loading = "eager";
          });
        }
      });
    }

    illustStage.addEventListener("pointermove", function (e) {
      var box = illustStage.getBoundingClientRect();
      var x = e.clientX - box.left;
      var y = e.clientY - box.top;
      if (lastX !== null && Math.hypot(x - lastX, y - lastY) < MIN_TRAVEL) return;
      lastX = x; lastY = y;

      var el = trailItems[trailIdx % trailItems.length];
      trailIdx++;
      gsap.killTweensOf(el);
      gsap.set(el, {
        left: x, top: y, zIndex: ++zTop,
        y: 0,                     // reset the fall from the previous cycle
        opacity: 1, scale: 0.86,
        rotation: gsap.utils.random(-14, 14)
      });

      /* Drop to the floor of the band and bounce. The distance is whatever is
         left below the pointer, and the duration follows free fall (t is
         proportional to the square root of the height) rather than being
         fixed — a constant duration makes a high spawn look dragged down
         instead of dropped, which is the whole difference between this and a
         plain slide. */
      // offsetHeight is 0 until the image has decoded, so derive it from the
      // natural aspect ratio, and fall back to a square as a last resort.
      var im = el.querySelector("img");
      var itemH = el.offsetHeight ||
        (im && im.naturalWidth ? el.offsetWidth * im.naturalHeight / im.naturalWidth : el.offsetWidth);
      var fall = Math.max(0, (box.height - itemH / 2 - 8) - y);
      var dur = gsap.utils.clamp(0.55, 1.5, Math.sqrt(fall) * 0.055);

      gsap.to(el, { scale: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(el, { y: fall, duration: dur, ease: "bounce.out" });
      // A little spin on the way down, settled by the time it lands.
      gsap.to(el, {
        rotation: "+=" + gsap.utils.random(-22, 22),
        duration: dur, ease: "power1.out"
      });
      // Hold on the floor for a beat before clearing, so a pile builds up.
      gsap.to(el, { opacity: 0, duration: 0.6, delay: dur + 0.45, ease: "power2.out" });
    });

    illustStage.addEventListener("pointerleave", function () {
      lastX = lastY = null;
      gsap.to(trailItems, { opacity: 0, duration: 0.4, ease: "power2.out" });
    });
  }

  /* ---------------- About: dark -> light backdrop into "what shapes me" ----
     The Language band is dark and the Germany band is light; fade the boundary
     as it crosses the viewport so it reads as a transition, not a hard cut. */
  var langSection = document.querySelector(".about-lang");
  var shapesSection = document.querySelector(".shapes-me");
  if (langSection && shapesSection && hasGSAP && window.ScrollTrigger && !reduce) {
    var aboutFade = { trigger: shapesSection, start: "top 90%", end: "top 40%", scrub: true };
    gsap.fromTo(langSection,
      { backgroundColor: "#080808" },
      { backgroundColor: "#efefef", ease: "none", scrollTrigger: aboutFade }
    );
    // Language copy is light-on-dark, so it has to invert with the backdrop.
    gsap.fromTo(langSection.querySelectorAll(".lang-name, .lang-level, .lang-caption"),
      { color: "#ffffff" },
      { color: "#080808", ease: "none", scrollTrigger: aboutFade }
    );
  }

  /* ---------------- Case study outcome images: soft parallax ---------------- */
  if (hasGSAP && window.ScrollTrigger && !reduce) {
    document.querySelectorAll(".cs-outcome-img img").forEach(function (img) {
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: "none",
        scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }

  /* Images (esp. lazy-loaded ones) finishing load after ScrollTrigger's
     initial measurement shift the page and stale out every trigger position. */
  if (window.ScrollTrigger) {
    var imgs = document.querySelectorAll("img");
    var pending = 0;
    imgs.forEach(function (img) {
      if (!img.complete) {
        pending++;
        img.addEventListener("load", function () { if (--pending === 0) ScrollTrigger.refresh(); }, { once: true });
        img.addEventListener("error", function () { if (--pending === 0) ScrollTrigger.refresh(); }, { once: true });
      }
    });
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  }
})();
