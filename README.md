# 1000 Trees, Dapoli — website

Static HTML. No build step, no dependencies. Upload the folder and it works.

## Replace before launch

Search the whole folder for these and swap in the real values:

| Placeholder | Where |
|---|---|
| `MahaRERA P00000000000` | footer of every page |
| `+91-00000-00000` | header, footer, contact |
| `wa.me/910000000000` | WhatsApp links |
| `hello@escape2kokan.com` | footer, contact |
| `https://www.escape2kokan.com` | canonicals, sitemap, schema |
| `17.7550` / `73.1850` | map coordinates in the JSON-LD |
| `<figure class="ph">` blocks | every image placeholder |

Fast way:
```bash
grep -rl "P00000000000" . | xargs sed -i 's/P00000000000/YOUR-RERA-NUMBER/g'
```

Replace an image placeholder by swapping the whole figure:
```html
<!-- before -->
<figure class="ph"><figcaption>Replace: approach road</figcaption></figure>
<!-- after -->
<img src="/assets/approach-road.jpg" alt="The approach road to 1000 Trees, Dapoli" width="1200" height="900" loading="lazy">
```

## Verify the facts

Drive times, distances and the Khed railway distance are approximate and should be checked before launch. Wrong numbers on a "how to reach" page cost you trust with exactly the buyer you want.

## Deploy

**Netlify or Vercel:** drag the folder onto the dashboard. Done.

**Cloudflare Pages:** connect a Git repo, no build command, output directory `/`.

**GitHub Pages:** push to a repo, enable Pages on the main branch root.

Any of these gives you HTTPS and a CDN free. Point the domain at it afterwards.

## After it is live

1. Google Search Console: verify the domain, submit `/sitemap.xml`
2. Add analytics (Plausible or GA4) in the `<head>` of each page
3. Test on a real phone on mobile data
4. Run PageSpeed Insights and fix anything above a second

## Files

- `assets/site.css` — the whole stylesheet
- `sitemap.xml`, `robots.txt`, `llms.txt` — SEO and AI crawler files
- `404.html` — set this as the not-found page in your host settings
