/* auto sliding gallery: scroll-snap track, dots, arrows, pause on interaction */
(function () {
  document.querySelectorAll(".carousel").forEach(function (car) {
    var track = car.querySelector(".track");
    var slides = Array.prototype.slice.call(track.children);
    if (slides.length < 2) return;

    var dotWrap = car.querySelector(".dots");
    var toggle = car.querySelector(".playpause");
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var timer = null, playing = !reduce, idle = null;

    slides.forEach(function (s, n) {
      var d = document.createElement("button");
      d.type = "button";
      d.setAttribute("aria-label", "Go to photo " + (n + 1));
      d.addEventListener("click", function () { pause(); goTo(n); });
      dotWrap.appendChild(d);
    });
    var dots = Array.prototype.slice.call(dotWrap.children);

    function current() {
      var best = 0, min = Infinity, c = track.scrollLeft + track.clientWidth / 2;
      slides.forEach(function (s, n) {
        var d = Math.abs(s.offsetLeft + s.clientWidth / 2 - c);
        if (d < min) { min = d; best = n; }
      });
      return best;
    }
    function mark() {
      var n = current();
      dots.forEach(function (d, i) { d.setAttribute("aria-current", i === n ? "true" : "false"); });
    }
    function goTo(n) {
      n = (n + slides.length) % slides.length;
      track.scrollTo({ left: slides[n].offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
    function next() { goTo(current() + 1); }

    function play() {
      if (timer || reduce) return;
      playing = true;
      timer = setInterval(next, 4200);
      if (toggle) toggle.textContent = "Pause slideshow";
    }
    function pause() {
      clearInterval(timer); timer = null; playing = false;
      if (toggle) toggle.textContent = "Play slideshow";
    }
    function pauseThenResume() {
      if (!playing) return;
      clearInterval(timer); timer = null;
      clearTimeout(idle);
      idle = setTimeout(function () { if (playing === false) return; timer = setInterval(next, 4200); }, 7000);
    }

    car.querySelector(".prev").addEventListener("click", function () { pauseThenResume(); goTo(current() - 1); });
    car.querySelector(".next").addEventListener("click", function () { pauseThenResume(); goTo(current() + 1); });
    if (toggle) toggle.addEventListener("click", function () { playing ? pause() : play(); });

    track.addEventListener("scroll", function () { clearTimeout(track._t); track._t = setTimeout(mark, 90); });
    track.addEventListener("touchstart", pauseThenResume, { passive: true });
    car.addEventListener("mouseenter", function () { if (playing) { clearInterval(timer); timer = null; } });
    car.addEventListener("mouseleave", function () { if (playing && !timer && !reduce) timer = setInterval(next, 4200); });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { clearInterval(timer); timer = null; }
      else if (playing && !reduce && !timer) timer = setInterval(next, 4200);
    });

    mark();
    play();
  });
})();
