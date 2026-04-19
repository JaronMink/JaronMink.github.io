(function () {
  function getTarget(toggle) {
    var selector = toggle.getAttribute("data-target");
    if (!selector || selector.charAt(0) !== "#") {
      return null;
    }

    return document.querySelector(selector);
  }

  function setExpanded(toggle, target, expanded) {
    target.classList.toggle("in", expanded);
    toggle.classList.toggle("collapsed", !expanded);
    toggle.setAttribute("aria-expanded", String(expanded));
    target.setAttribute("aria-expanded", String(expanded));
  }

  document.addEventListener("click", function (event) {
    if (!event.target || typeof event.target.closest !== "function") {
      return;
    }

    var toggle = event.target.closest(".navbar-toggle[data-target]");
    if (!toggle) {
      return;
    }

    var target = getTarget(toggle);
    if (!target) {
      return;
    }

    event.preventDefault();
    setExpanded(toggle, target, !target.classList.contains("in"));
  });
})();
