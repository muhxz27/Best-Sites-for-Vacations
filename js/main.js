(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduced) {
    items.forEach(function (el) {
      el.classList.add("is-in");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  items.forEach(function (el) {
    observer.observe(el);
  });

  // Drifts the colour washes a touch slower than the page so the corners feel like depth.
  var atmosphere = document.querySelector(".atmosphere");
  if (!atmosphere) return;

  var pending = false;
  function shift() {
    var y = Math.min(window.scrollY, 900) * 0.045;
    atmosphere.style.transform = "translate3d(0, " + y + "px, 0)";
    pending = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(shift);
    },
    { passive: true }
  );

  shift();
})();
