/* branched navigation: hamburger on small screens, click-to-open submenus */
(function () {
  var toggle = document.querySelector(".navtoggle");
  var nav = document.getElementById("mainnav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  var tops = nav.querySelectorAll(".has-sub > .navtop");
  tops.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = btn.getAttribute("aria-expanded") === "true";
      tops.forEach(function (b) { if (b !== btn) b.setAttribute("aria-expanded", "false"); });
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
    // keyboard: escape closes and returns focus
    btn.parentNode.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
  });

  document.addEventListener("click", function (e) {
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    tops.forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
})();
