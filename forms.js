/* 1000 Trees - form handling, validation and submission
   ---------------------------------------------------------------
   SETUP: paste your Google Apps Script Web App URL below.
   Full instructions are in google-apps-script.js and README.md.
   Until it is set, forms still work: they open WhatsApp with every
   answer filled in, so no enquiry is ever lost.                   */
var SHEET_URL = "";                 // <-- paste Apps Script /exec URL here
var WA_NUMBER = "917774031242";

/* ---------- helpers ---------- */
function fieldOf(el) { return el.closest(".field"); }

function setError(el, msg) {
  var f = fieldOf(el); if (!f) return;
  f.classList.add("invalid");
  var e = f.querySelector(".err");
  if (!e) { e = document.createElement("p"); e.className = "err"; f.appendChild(e); }
  e.textContent = msg;
}
function clearError(el) {
  var f = fieldOf(el); if (f) f.classList.remove("invalid");
}
function parseDMY(s) {
  var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || "");
  if (!m) return null;
  var d = new Date(+m[3], +m[2] - 1, +m[1]);
  if (d.getDate() != +m[1] || d.getMonth() != +m[2] - 1) return null;
  return d;
}

/* ---------- validation ---------- */
function validate(form) {
  var ok = true, first = null;

  // every named control is compulsory
  var groups = {};
  form.querySelectorAll("input, select").forEach(function (el) {
    if (el.type === "radio") { (groups[el.name] = groups[el.name] || []).push(el); return; }
    clearError(el);
    var v = (el.value || "").trim();
    if (!v) { setError(el, "This field is required"); ok = false; first = first || el; return; }
    if (el.type === "tel" && !/^[0-9]{10}$/.test(v)) {
      setError(el, "Enter a 10 digit mobile number, digits only"); ok = false; first = first || el;
    }
    if (el.name === "adults" && (+v < 1 || +v > 30)) {
      setError(el, "Enter between 1 and 30 adults"); ok = false; first = first || el;
    }
    if (el.name === "kids" && (v === "" || +v < 0 || +v > 20)) {
      setError(el, "Enter 0 or more"); ok = false; first = first || el;
    }
    if ((el.name === "checkin" || el.name === "checkout") && !parseDMY(v)) {
      setError(el, "Use the format dd/mm/yyyy"); ok = false; first = first || el;
    }
  });

  // radio groups
  Object.keys(groups).forEach(function (name) {
    var set = groups[name];
    clearError(set[0]);
    if (!set.some(function (r) { return r.checked; })) {
      setError(set[0], "Please choose one option"); ok = false; first = first || set[0];
    }
  });

  // date logic
  var ci = form.querySelector("[name=checkin]"), co = form.querySelector("[name=checkout]");
  if (ci && co) {
    var a = parseDMY(ci.value), b = parseDMY(co.value);
    if (a && b) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      if (a < today) { setError(ci, "Check in date cannot be in the past"); ok = false; first = first || ci; }
      else if (b <= a) { setError(co, "Check out must be after the check in date"); ok = false; first = first || co; }
    }
  }

  var banner = form.querySelector(".formerr");
  if (!ok) {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "formerr";
      banner.innerHTML = "<p>Please complete the highlighted fields.</p>";
      form.insertBefore(banner, form.firstChild);
    }
    banner.hidden = false;
    if (first) { first.scrollIntoView({ behavior: "smooth", block: "center" }); try { first.focus(); } catch (e) {} }
  } else if (banner) { banner.hidden = true; }

  return ok;
}

/* ---------- submit ---------- */
function sendForm(formId, buildMessage, sheetName) {
  var f = document.getElementById(formId);
  if (!f) return;

  /* Turn off the browser's own bubbles only once our own validation is
     definitely running. If this script ever fails to load, the required
     attributes in the HTML still block an empty submit. */
  f.setAttribute("novalidate", "novalidate");

  // clear the error as soon as the person fixes it
  f.addEventListener("input", function (e) { clearError(e.target); });
  f.addEventListener("change", function (e) { clearError(e.target); });

  f.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate(f)) return;

    var d = {};
    new FormData(f).forEach(function (v, k) { d[k] = v; });
    d.sheet = sheetName;
    d.submittedAt = new Date().toISOString();
    d.page = location.pathname;

    var btn = f.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }

    var done = function () {
      window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildMessage(d)), "_blank");
      f.reset();
      f.querySelectorAll(".field").forEach(function (x) { x.classList.remove("invalid"); });
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Send"; }
      var ok = document.getElementById(formId + "-done");
      if (ok) { ok.hidden = false; ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    };

    if (SHEET_URL) {
      fetch(SHEET_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(d)
      }).then(done).catch(done);
    } else { done(); }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  sendForm("enquiry-form", function (d) {
    return "Hello Kedar, I would like information about 1000 Trees Holiday Homes.\n\n" +
      "Name: " + (d.name || "") + "\n" +
      "City: " + (d.city || "") + "\n" +
      "Looking at: " + (d.buying || "") + "\n" +
      "Decision timeline: " + (d.timeline || "") + "\n" +
      "WhatsApp: " + (d.country || "") + " " + (d.mobile || "");
  }, "Enquiries");

  sendForm("homestay-form", function (d) {
    return "Hello, I would like to request a homestay booking at 1000 Trees.\n\n" +
      "Name: " + (d.name || "") + "\n" +
      "WhatsApp: " + (d.country || "") + " " + (d.mobile || "") + "\n" +
      "Check in: " + (d.checkin || "") + "\n" +
      "Check out: " + (d.checkout || "") + "\n" +
      "Adults: " + (d.adults || "") + "\n" +
      "Children under 4: " + (d.kids || "0");
  }, "Homestay");
});
