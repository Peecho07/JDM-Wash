(function () {
  document.documentElement.classList.remove("no-js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // Vehicle size switcher on the plans page: swaps every [data-prices] amount
  document.querySelectorAll("[data-size-switch]").forEach(function (group) {
    var buttons = group.querySelectorAll("button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = Number(btn.dataset.index);
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        document.querySelectorAll("[data-prices]").forEach(function (el) {
          var list = el.dataset.prices.split("|");
          var val = list[Math.min(idx, list.length - 1)];
          if (reduce) { el.textContent = val; return; }
          el.style.opacity = "0";
          setTimeout(function () { el.textContent = val; el.style.opacity = "1"; }, 150);
        });
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.closest(".faq-item").classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  // Booking page: prefill the service picked on Packages or Plans (?service=...)
  var wanted = new URLSearchParams(window.location.search).get("service");
  var select = document.getElementById("service");
  if (wanted && select) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === wanted) { select.selectedIndex = i; break; }
    }
  }

  // Booking form: Netlify Forms when deployed there. On static hosts (GitHub Pages)
  // that can't take a POST, hand the request to the visitor's email app instead.
  var form = document.querySelector("form[data-booking]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var done = function () { form.closest(".form").classList.add("is-sent"); };
      var viaEmail = function () {
        var lines = [];
        fd.forEach(function (v, k) {
          if (k !== "form-name" && k !== "bot-field" && String(v).trim()) lines.push(k + ": " + v);
        });
        window.location.href = "mailto:support@jdmwashllc.com?subject=" + encodeURIComponent("Booking request") +
          "&body=" + encodeURIComponent(lines.join("\n"));
        done();
      };
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(fd).toString() })
        .then(function (res) { res.ok ? done() : viaEmail(); })
        .catch(viaEmail);
    });
  }

  // Entrance motion: fade up on scroll, children of [data-stagger] 100ms apart
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    group.querySelectorAll(":scope > .reveal").forEach(function (el, n) {
      el.style.setProperty("--delay", 100 + n * 100 + "ms");
    });
  });
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Hero gauge sweeps to 4400 PSI once the page has loaded
  requestAnimationFrame(function () { document.documentElement.classList.add("is-ready"); });

  // Demo: discourage saving images
  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("draggable", "false");
    img.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  });

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
