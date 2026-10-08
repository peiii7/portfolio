/* Remembers the visitor's language choice so the root redirect (/) honours it next time. */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".lang-toggle-track a").forEach(function (a) {
    a.addEventListener("click", function () {
      var lang = a.textContent.trim() === "中" ? "zh" : "en";
      try { localStorage.setItem("peichi-lang", lang); } catch (e) {}
    });
  });
});
