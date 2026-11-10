# Indus Schooling System website

Static site (HTML, CSS, JavaScript). No backend, no build step, no database: GitHub Pages cannot run one, and a school brochure site does not need one.

## Edit content
Open `config.js` and fill in phone, WhatsApp, email, address, campuses, events, gallery images, resources (timetable and fee PDFs). Empty values show a friendly empty state. Put images in an `images/` folder. Fee amounts and mission/vision/facilities text in `index.html` are draft copy: confirm with the school.

## Admission form
- Set `formEndpoint` to a Formspree URL (free plan) to receive emails directly, or
- set only `email` and the form opens the visitor’s email app.

## Run locally (Windows)
Open `index.html` in a browser, or run `npx serve` in this folder.

## Deploy to GitHub Pages
```
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
Then GitHub, Settings, Pages, Source: deploy from branch `main`, folder `/ (root)`. For a custom domain, add it under Pages and create the DNS records GitHub lists. After the domain is final, add `sitemap.xml`, `robots.txt` and a canonical link.

## Status and limitations
- Not yet tested in a browser or with Lighthouse; run both before handover.
- Logo is a text mark: replace with the official logo and brand green/gold.
- No student/parent portal, payment gateway or PostgreSQL (out of scope on static hosting).
- Form delivery is unverified until a real endpoint or email is configured.
