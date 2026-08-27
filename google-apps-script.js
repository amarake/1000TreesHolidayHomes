/* =============================================================
   1000 Trees - save website form submissions to a Google Sheet
   =============================================================
   ONE TIME SETUP, about five minutes:

   1. Create a new Google Sheet. Name it "1000 Trees Leads".
   2. In that sheet choose Extensions > Apps Script.
   3. Delete whatever is there, paste this whole file, click Save.
   4. Click Deploy > New deployment.
        Type            : Web app
        Description     : 1000 Trees forms
        Execute as      : Me
        Who has access  : Anyone
      Click Deploy and authorise when Google asks.
   5. Copy the Web app URL it gives you. It ends in /exec
   6. Open forms.js on the website and paste that URL between the
      quotes on the line:   var SHEET_URL = "";
   7. Commit forms.js. Submissions now land in the sheet.

   Two tabs are created automatically: Enquiries and Homestay.
   ============================================================= */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var tab = data.sheet === "Homestay" ? "Homestay" : "Enquiries";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tab);

    var headers = tab === "Homestay"
      ? ["Submitted", "Name", "Country", "Mobile", "Check in", "Check out", "Adults", "Children under 4", "Page"]
      : ["Submitted", "Name", "City", "Planning to buy", "Will decide in", "Country", "Mobile", "Page"];

    if (!sheet) {
      sheet = ss.insertSheet(tab);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var row = tab === "Homestay"
      ? [new Date(), data.name, data.country, "'" + data.mobile, data.checkin, data.checkout, data.adults, data.kids, data.page]
      : [new Date(), data.name, data.city, data.buying, data.timeline, data.country, "'" + data.mobile, data.page];

    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("1000 Trees form endpoint is running.");
}
