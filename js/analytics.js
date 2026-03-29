(function () {
  function isPublicationLink(element) {
    if (!element || element.tagName !== "A") {
      return false;
    }

    var href = element.getAttribute("href") || "";

    return /arxiv\.org\/abs\//i.test(href) ||
      /\/assets\/pdf\/papers\//i.test(href) ||
      /\.pdf(?:$|[?#])/i.test(href);
  }

  function isTrackableClick(event) {
    return event.button === 0 || event.button === undefined;
  }

  function shouldIgnoreClick(event) {
    return event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  }

  function buildParams(element) {
    var params = {
      page_path: window.location.pathname,
      link_text: (element.textContent || "").replace(/\s+/g, " ").trim()
    };
    var href = element.getAttribute("href");

    if (href) {
      params.link_url = element.href || href;
    }

    for (var i = 0; i < element.attributes.length; i += 1) {
      var attribute = element.attributes[i];

      if (attribute.name.indexOf("data-analytics-param-") !== 0) {
        continue;
      }

      var paramName = attribute.name.replace("data-analytics-param-", "").replace(/-/g, "_");
      params[paramName] = attribute.value;
    }

    return params;
  }

  function trackEvent(eventName, params) {
    if (typeof window.gtag !== "function") {
      return;
    }

    params.transport_type = "beacon";
    window.gtag("event", eventName, params);
  }

  document.addEventListener("click", function (event) {
    if (!isTrackableClick(event) || shouldIgnoreClick(event)) {
      return;
    }

    if (!event.target || typeof event.target.closest !== "function") {
      return;
    }

    var trackable = event.target.closest("[data-analytics-event]");

    if (!trackable) {
      var anchor = event.target.closest("a[href]");

      if (!isPublicationLink(anchor)) {
        return;
      }

      trackEvent("publication_click", {
        page_path: window.location.pathname,
        link_text: (anchor.textContent || "").replace(/\s+/g, " ").trim(),
        link_url: anchor.href,
        publication_title: (anchor.textContent || "").replace(/\s+/g, " ").trim(),
        context: "auto_detected_publication_link"
      });
      return;
    }

    trackEvent(trackable.getAttribute("data-analytics-event"), buildParams(trackable));
  });
}());
