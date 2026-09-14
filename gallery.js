/* lightbox for the photo galleries */
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll("a.shot"));
  if (!items.length) return;
  var i = 0;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  box.innerHTML =
    '<button class="lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-prev" aria-label="Previous photo">&#8249;</button>' +
    '<figure class="lb-stage"><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(box);

  var img = box.querySelector("img"),
      cap = box.querySelector("figcaption");

  function show(n) {
    i = (n + items.length) % items.length;
    var a = items[i];
    img.src = a.getAttribute("href");
    img.alt = a.querySelector("img").alt;
    cap.textContent = a.querySelector("img").alt + "  ·  " + (i + 1) + " of " + items.length;
  }
  function open(n) { show(n); box.classList.add("on"); document.body.style.overflow = "hidden"; }
  function close() { box.classList.remove("on"); document.body.style.overflow = ""; }

  items.forEach(function (a, n) {
    a.addEventListener("click", function (e) { e.preventDefault(); open(n); });
  });
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); show(i - 1); });
  box.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); show(i + 1); });
  box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("lb-stage")) close(); });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("on")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(i + 1);
    if (e.key === "ArrowLeft") show(i - 1);
  });
  // swipe on touch
  var x0 = null;
  box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  }, { passive: true });
})();
