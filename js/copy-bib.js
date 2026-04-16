(function () {
  function toAscii(input) {
    if (!input) return "";
    var out = input;
    if (typeof out.normalize === "function") {
      out = out.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    return out;
  }

  function slugWords(input, limit) {
    var parts = toAscii(input)
      .replace(/[^A-Za-z0-9\s]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return parts
      .slice(0, limit)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join("");
  }

  function buildCitationKey(authors, title, year) {
    var firstAuthor = (authors || "").split(/\s+and\s+/i)[0] || "";
    var surname = firstAuthor.trim().split(/\s+/).pop() || "Author";
    var surnameKey = slugWords(surname, 1) || "Author";
    var titleKey = slugWords(title, 2) || "Work";
    return surnameKey + (year || "") + titleKey;
  }

  function escapeLatex(text) {
    var value = (text || "").replace(/\s+/g, " ").trim();
    var normalized = typeof value.normalize === "function" ? value.normalize("NFD") : value;
    var combiningAccentMap = {
      "\u0300": "\\`",
      "\u0301": "\\'",
      "\u0302": "\\^",
      "\u0303": "\\~",
      "\u0304": "\\=",
      "\u0306": "\\u",
      "\u0307": "\\.",
      "\u0308": '\\"',
      "\u030A": "\\r",
      "\u030B": "\\H",
      "\u030C": "\\v",
      "\u0327": "\\c",
      "\u0328": "\\k"
    };
    var nonDecomposingMap = {
      "\u00df": "\\ss{}",
      "\u00c6": "\\AE{}",
      "\u00e6": "\\ae{}",
      "\u00d8": "\\O{}",
      "\u00f8": "\\o{}",
      "\u0152": "\\OE{}",
      "\u0153": "\\oe{}",
      "\u0141": "\\L{}",
      "\u0142": "\\l{}",
      "\u0110": "\\DJ{}",
      "\u0111": "\\dj{}",
      "\u00de": "\\TH{}",
      "\u00fe": "\\th{}"
    };

    function escapePlainChar(ch) {
      var escaped = {
        "\\": "\\textbackslash{}",
        "{": "\\{",
        "}": "\\}",
        "&": "\\&",
        "%": "\\%",
        "$": "\\$",
        "#": "\\#",
        "_": "\\_",
        "^": "\\textasciicircum{}",
        "~": "\\textasciitilde{}"
      };

      if (escaped[ch]) return escaped[ch];
      if (nonDecomposingMap[ch]) return nonDecomposingMap[ch];
      return ch;
    }

    function renderCluster(base, marks) {
      var safeBase = nonDecomposingMap[base] || base;
      if (!marks || marks.length === 0) {
        return safeBase.length === 1 ? escapePlainChar(safeBase) : safeBase;
      }

      if (/^[A-Za-z]$/.test(safeBase) && marks.length === 1 && combiningAccentMap[marks[0]]) {
        return combiningAccentMap[marks[0]] + "{" + safeBase + "}";
      }

      return safeBase + marks.map(function (mark) {
        return combiningAccentMap[mark] || mark;
      }).join("");
    }

    var out = "";
    var baseChar = "";
    var markChars = [];

    for (var i = 0; i < normalized.length; i += 1) {
      var ch = normalized[i];
      var isMark = /[\u0300-\u036f]/.test(ch);

      if (!isMark) {
        if (baseChar) out += renderCluster(baseChar, markChars);
        baseChar = ch;
        markChars = [];
      } else if (baseChar) {
        markChars.push(ch);
      } else {
        out += ch;
      }
    }

    if (baseChar) out += renderCluster(baseChar, markChars);
    return out;
  }

  function simplifyConferenceName(venue) {
    var base = (venue || "").trim().replace(/\s*,\s*\d{4}\s*$/, "");
    base = base.replace(/^\d+(st|nd|rd|th)\s+/i, "");
    base = base.replace(/^Annual\s+/i, "");
    return base;
  }

  function buildBibFromButton(button) {
    var titleRaw = button.getAttribute("data-title") || "";
    var authorsRaw = button.getAttribute("data-authors") || "";
    var venue = button.getAttribute("data-booktitle") || "";
    var conferenceName = simplifyConferenceName(venue);
    var isPreprint = /pre-?print/i.test(venue);
    var yearRaw = button.getAttribute("data-year") || "";
    var citationKey = buildCitationKey(authorsRaw, titleRaw, yearRaw);
    var title = escapeLatex(titleRaw);
    var authors = escapeLatex(authorsRaw);
    var year = escapeLatex(yearRaw);
    var booktitle = escapeLatex(conferenceName);
    var lb = "{";
    var rb = "}";
    var dbl = lb + lb;
    var dbr = rb + rb;

    if (isPreprint) {
      return "@misc{" + citationKey + ",\n" +
        "  title=" + dbl + title + dbr + ",\n" +
        "  author=" + dbl + authors + dbr + ",\n" +
        "  year=" + dbl + year + dbr + ",\n" +
        "  note=" + dbl + "arXiv preprint" + dbr + ",\n" +
        "}";
    }

    return "@inproceedings{" + citationKey + ",\n" +
      "  title=" + dbl + title + dbr + ",\n" +
      "  author=" + dbl + authors + dbr + ",\n" +
      "  booktitle=" + dbl + booktitle + dbr + ",\n" +
      "  year=" + dbl + year + dbr + ",\n" +
      "}";
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        resolve();
      } catch (error) {
        reject(error);
      }

      document.body.removeChild(textarea);
    });
  }

  function flashCopied(button) {
    var original = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(function () {
      button.textContent = original;
    }, 1200);
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".js-copy-bib");
    if (!button) return;

    event.preventDefault();

    copyText(buildBibFromButton(button))
      .then(function () {
        flashCopied(button);
      })
      .catch(function () {});
  });
})();
