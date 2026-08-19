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

## Moving to your own domain

When escape2kokan.com is ready, go to Settings then Pages and add it as the Custom domain. GitHub will tell you which DNS records to create. Then tick Enforce HTTPS.

One thing to update afterwards: the `<link rel="canonical">` and `og:url` tags in each page, plus `sitemap.xml`, `robots.txt` and `llms.txt` all point at the github.io address. They need to point at the new domain or Google will keep indexing the old one.

## Connecting the lead form

`contact.html` currently lists phone and WhatsApp only. When you add a real form it must capture consent to receive WhatsApp marketing messages with a timestamp, and post to the automation webhook from the lead workflow plan. Consent recorded at the point of capture is what keeps the WhatsApp nurture sequence compliant.

---

**Contact:** WhatsApp Kedar on +91 77740 31242 or +91 74994 92354
