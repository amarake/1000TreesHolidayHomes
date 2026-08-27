/* 1000 Trees - form handling
   ---------------------------------------------------------------
   SETUP: paste your Google Apps Script Web App URL below.
   Instructions are in README.md under "Connecting the forms".
   Until you paste it, forms still work: they open WhatsApp with
   all the answers filled in, so no lead is ever lost.            */
var SHEET_URL = "";                 // <-- paste Apps Script URL here
var WA_NUMBER = "917774031242";     // Kedar's WhatsApp

function sendForm(formId, buildMessage, sheetName) {
  var f = document.getElementById(formId);
  if (!f) return;
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = {};
    new FormData(f).forEach(function (v, k) { d[k] = v; });
    d.sheet = sheetName;
    d.submittedAt = new Date().toISOString();
    d.page = location.pathname;

    var btn = f.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }

    var done = function () {
      window.open("https://wa.me/" + WA_NUMBER + "?text=" +
        encodeURIComponent(buildMessage(d)), "_blank");
      f.reset();
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
