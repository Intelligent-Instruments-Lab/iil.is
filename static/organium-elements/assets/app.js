(function () {
  const grid = document.getElementById("grid");
  const input = document.getElementById("q");
  const countEl = document.getElementById("count");
  const totalEl = document.getElementById("total");
  const empty = document.getElementById("empty");

  // Inject build date into footer
  if (typeof ELEMENTS_DATE !== "undefined") {
    var dateEl = document.getElementById("buildDate");
    if (dateEl) dateEl.innerHTML =
      '<span class="dot" aria-hidden="true"></span> Organium archive &bull; ' + ELEMENTS_DATE;
  }

  const PLACEHOLDER_SVG =
    '<svg viewBox="0 0 24 24" fill="none">' +
    '<path d="M4 7.5C4 6.12 5.12 5 6.5 5h11C19.88 5 21 6.12 21 7.5v9c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 19 4 17.88 4 16.5v-9Z" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M7 9h10M7 12h7M7 15h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
    "</svg>";

  function renderCards() {
    grid.innerHTML = ELEMENTS.map(function (el) {
      var href = encodeURI(el.page);
      var media = el.img
        ? '<img loading="lazy" src="' + el.img + '" alt="" class="card__thumb" />'
        : '<div class="card__thumb card__thumb--placeholder" aria-hidden="true">' +
          PLACEHOLDER_SVG +
          "</div>";

      return (
        '<a class="card" href="' + href + '" data-name="' + el.name.toLowerCase() + '" data-type="' + (el.type || '') + '">' +
        '<div class="card__media">' + media + "</div>" +
        '<div class="card__body">' +
        '<div class="card__title">' + el.name + "</div>" +
        '<div class="card__meta">' + (el.type || 'Element') + '</div>' +
        "</div>" +
        "</a>"
      );
    }).join("");
  }

  // Initial render
  totalEl.textContent = String(ELEMENTS.length);
  countEl.textContent = String(ELEMENTS.length);
  renderCards();

  // ── Type filter ──────────────────────────────────────────────────────────
  var activeType = "";

  // Collect unique types from data
  var typeSet = {};
  ELEMENTS.forEach(function (el) {
    if (!el.type) return;
    el.type.split(",").forEach(function (t) {
      var tag = t.trim();
      if (tag) typeSet[tag] = true;
    });
  });
  var types = Object.keys(typeSet).sort();

  // Build filter buttons
  var filterRow = document.getElementById("filterRow");
  if (types.length) {
    var allBtn = document.createElement("button");
    allBtn.className = "type-btn active";
    allBtn.textContent = "All";
    allBtn.setAttribute("data-type", "");
    filterRow.appendChild(allBtn);

    types.forEach(function (t) {
      var btn = document.createElement("button");
      btn.className = "type-btn";
      btn.textContent = t;
      btn.setAttribute("data-type", t);
      filterRow.appendChild(btn);
    });

    filterRow.addEventListener("click", function (e) {
      var btn = e.target.closest(".type-btn");
      if (!btn) return;
      activeType = btn.getAttribute("data-type");
      filterRow.querySelectorAll(".type-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      applyFilter();
    });
  }

  // Search + type filter
  function applyFilter() {
    var q = (input.value || "").trim().toLowerCase();
    var cards = grid.querySelectorAll(".card");
    var shown = 0;
    for (var i = 0; i < cards.length; i++) {
      var name = cards[i].getAttribute("data-name") || "";
      var type = cards[i].getAttribute("data-type") || "";
      var nameOk = !q || name.includes(q);
      var typeOk = !activeType || type.split(",").map(function(t){ return t.trim(); }).indexOf(activeType) !== -1;
      var ok = nameOk && typeOk;
      cards[i].style.display = ok ? "" : "none";
      if (ok) shown++;
    }
    countEl.textContent = String(shown);
    empty.style.display = shown === 0 ? "block" : "none";
  }

  input.addEventListener("input", applyFilter);

  // ── View toggle ──────────────────────────────────────────────────────────
  var btnList  = document.getElementById("viewList");
  var btnThumb = document.getElementById("viewThumb");

  function setView(mode) {
    if (mode === "thumb") {
      grid.classList.add("grid--thumb");
      btnThumb.classList.add("active");
      btnList.classList.remove("active");
    } else {
      grid.classList.remove("grid--thumb");
      btnList.classList.add("active");
      btnThumb.classList.remove("active");
    }
    try { localStorage.setItem("organium-view", mode); } catch (e) {}
  }

  btnList.addEventListener("click",  function () { setView("list"); });
  btnThumb.addEventListener("click", function () { setView("thumb"); });

  // Restore saved preference, default to thumb
  try {
    var saved = localStorage.getItem("organium-view");
    setView(saved === "list" ? "list" : "thumb");
  } catch (e) { setView("thumb"); }

  // Cmd/Ctrl+K to focus search
  window.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      input.focus();
    }
  });
})();
