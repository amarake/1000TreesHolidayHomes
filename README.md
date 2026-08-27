# 1000 Trees Holiday Homes, Dapoli

Website for the 1000 Trees Holiday Homes NA plotting and bungalow project at Dapoli, Ratnagiri district, Maharashtra.

Live at **https://amarake.github.io/1000TreesHolidayHomes/**

Plain HTML and CSS. No build step, no framework, no dependencies. Edit a file, commit, and the change is live in about a minute.

---

## The 10 pages

| File | What it is | Main search terms it targets |
|---|---|---|
| `index.html` | Home | 1000 trees dapoli, holiday homes dapoli |
| `project.html` | The project: plots, rates, amenities, legal, location | plots in dapoli, NA plots dapoli |
| `dapoli.html` | About Dapoli | dapoli, about dapoli konkan |
| `places-to-visit.html` | Beaches, forts, Harnai auction | places to visit in dapoli |
| `how-to-reach.html` | Routes from Mumbai and Pune | mumbai to dapoli distance |
| `where-to-stay.html` | Hotels and homestays | dapoli homestay, hotels in dapoli |
| `investment.html` | Rates, growth, what is included | dapoli plot investment |
| `retirement-home.html` | Holiday home now, retirement later | retirement home konkan |
| `work-from-home.html` | Working remotely from Dapoli | work from home konkan |
| `contact.html` | Book a site visit | branded |

**The traffic strategy:** the project pages will get very little search traffic on their own. The three Dapoli guides will. "Places to visit in Dapoli", "how to reach Dapoli from Mumbai" and "Dapoli homestays" are searched every month by exactly the Mumbai and Pune audience you advertise to. Those pages pull people in and link down to the project. Keep them updated first.

## Supporting files

| File | Purpose |
|---|---|
| `site.css` | The entire stylesheet for all 10 pages |
| `*.jpg` | 10 photographs, already resized and compressed |
| `sitemap.xml` | Submit this to Google Search Console |
| `robots.txt` | Allows Google plus the AI crawlers (GPTBot, ClaudeBot, PerplexityBot) |
| `llms.txt` | A plain summary of the project for AI answer engines |
| `.nojekyll` | Stops GitHub processing the files. Do not delete it |

---

## Before you promote this anywhere

**1. The RERA number.** Every page footer currently reads "MahaRERA registration number to be added". A 74 plot NA plotted development very likely requires MahaRERA registration, and the number must be displayed publicly. Get it from Kedar, confirm it on the MahaRERA portal, then replace the placeholder in all 10 files.

**2. Verify the distances.** The 230 km from Mumbai, 215 km from Pune and 40 km from Khed station are approximate. Wrong numbers on a "how to reach" page cost you trust with the exact buyer you want.

**3. Add the map.** `project.html` has a marked placeholder in the Location section. In Google Maps open the project pin, choose Share, then Embed a map, copy the iframe and paste it in place of the block that says "Map goes here".

**4. Check the rate.** The indicative rate of around Rs 800 per sq ft appears on `project.html` and `investment.html`. Update both together whenever it changes.

---

## How to edit

**In the browser, no software needed.** Open the file in GitHub, click the pencil icon, make the change, scroll down, click Commit changes. Live in about a minute.

**Changing text across all pages,** for example the RERA number or phone number: you have to edit each of the 10 HTML files. Use the repo search to find every occurrence first.

**Replacing a photo:** upload your new image with exactly the same filename as the one you are replacing, and every page using it updates at once. Resize to about 1400px wide and under 400 KB first, or the site will get slow on mobile data.

**Adding a photo:** upload the image, then add this where you want it:

```html
<img src="your-photo.jpg" alt="Describe what is in the photo, mentioning Dapoli" width="1400" height="1050" loading="lazy">
```

Always write real alt text. It helps blind visitors, and it helps you rank in Google Images for terms like "Kolthare beach".

---

## Design notes

Colours come from the site itself: basalt green-black for text, wet paddy green for headings, jambha laterite red for anything clickable, limewash off-white for backgrounds. The laterite red is used **only** for buttons and links, never for decoration. Keeping that rule is what makes the calls to action obvious.

Fonts are Zilla Slab for headings, Karla for body text, IBM Plex Mono for the small labels and numbers. All three load from Google Fonts.

Every container paints its own background colour with `!important`. This looks redundant but is deliberate: some in-app browsers such as WhatsApp and Instagram override the page background, which made earlier versions unreadable on phones in dark mode.

## Adding a page

Copy an existing page whose layout you like, rename it, then change the `<title>`, the meta description, the canonical link, the `<h1>` and the content. Add it to the header nav and the footer in all 10 files, and add a line for it in `sitemap.xml`.

---

## After it is live

1. Google Search Console: verify the site and submit `sitemap.xml`
2. Create a Google Business Profile for the site office, using the same name and phone as the site footer
3. Add analytics, either Plausible or GA4, in the `<head>` of each page
4. Test on a real phone on mobile data, not office wifi
5. Run PageSpeed Insights and fix anything that scores badly

---

## Connecting the forms to a Google Sheet

The site is static, so it cannot write to a Sheet on its own. `google-apps-script.js` in this repo solves that. Open it and follow the setup comment at the top: create a Sheet, paste the script into Extensions then Apps Script, deploy it as a Web app, and paste the URL it gives you into the top of `forms.js`.

Until you do that the forms still work. On submit they open WhatsApp with every answer already typed out, so Kedar gets the lead immediately and nothing is lost. Connecting the Sheet just adds a permanent record alongside it.

**WhatsApp OTP verification is not included.** Verifying a number by OTP needs the WhatsApp Business Platform through a provider such as AiSensy, Wati or Interakt. That is the same setup described in the lead workflow plan. Until then, the number is captured as typed.

## Pages added in this version

| File | What it is |
|---|---|
| `layout.html` | Project layout image, replaces the Drive PDF links |
| `homestay.html` | Homestay booking request form |
| `gallery-1000-trees.html` | Hub linking the five 1000 Trees albums |
| `gallery-resort-dapoli.html` | Hub linking the five Resort Dapoli albums |
| `forms.js` | Form handling for both forms |
| `google-apps-script.js` | Server side script for saving to a Sheet |

## Assets still needed

Drop these into the repo with these exact filenames and they appear automatically. Nothing breaks while they are missing.

| Filename | Where it shows |
|---|---|
| `logo.png` | Top left of every page, next to the name. About 120px tall |
| `project-layout.jpg` | The whole of `layout.html` |

Also needed, as Google Photos album links to paste into the two gallery pages:

- 1000 Trees Drone Shots
- Games and Recreational Activities at Resort Dapoli
- Shri Ganesh Mandir at Resort Dapoli
- Butterfly Garden at Resort Dapoli

Those four currently show as greyed out cards marked "Album link needed".

## About the Google Photos albums

Google removed the ability to embed a Photos album inside another website, so the gallery pages link out to each album rather than showing the images inline. The only way to have photos display on your own pages is to download them and upload them to the repo. That is also better for search, because Google can then index your images. Worth doing for the ten or fifteen strongest shots.

## Adding photos to the Places to Visit page

Each of the ten places already has an image slot waiting. Upload a photo with the
matching filename below and it appears automatically. Until then nothing shows and
the page looks completely normal, so you can add them one at a time.

| Filename | Place |
|---|---|
| `kolthare-beach.jpg` | Kolthare beach |
| `murud-beach.jpg` | Murud beach |
| `karde-beach.jpg` | Karde beach |
| `ladghar-beach.jpg` | Ladghar beach |
| `anjarle.jpg` | Anjarle and Kadyavarcha Ganpati |
| `harnai-fish-auction.jpg` | Harnai fish auction |
| `suvarnadurg.jpg` | Suvarnadurg and the Harnai forts |
| `unhavare.jpg` | Unhavare hot springs |
| `panhalekaji.jpg` | Panhalekaji caves |
| `burondi.jpg` | Burondi Parshuram statue |

Resize each to about 1400 pixels wide and under 400 KB before uploading. They are
displayed at 16:10, so landscape shots work best.

**Where to get them, in order of preference.** Your own photos, or Kedar's, since
he is near all of these anyway. Original photos also help you rank in Google Images,
which stock never will. Second choice is Wikimedia Commons, which is properly
licensed but requires you to credit the photographer visibly on the page. Do not
take images from Google image search: almost all of them are copyrighted, and a
property website is an obvious target for a takedown notice.

The alt text is already written for every slot and includes the place name and
Dapoli, which is what helps these images surface in search.

## Moving to your own domain

When escape2kokan.com is ready, go to Settings then Pages and add it as the Custom domain. GitHub will tell you which DNS records to create. Then tick Enforce HTTPS.

One thing to update afterwards: the `<link rel="canonical">` and `og:url` tags in each page, plus `sitemap.xml`, `robots.txt` and `llms.txt` all point at the github.io address. They need to point at the new domain or Google will keep indexing the old one.

## Connecting the lead form

`contact.html` currently lists phone and WhatsApp only. When you add a real form it must capture consent to receive WhatsApp marketing messages with a timestamp, and post to the automation webhook from the lead workflow plan. Consent recorded at the point of capture is what keeps the WhatsApp nurture sequence compliant.

---

**Contact:** WhatsApp Kedar on +91 77740 31242 or +91 74994 92354
