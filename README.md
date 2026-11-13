# Shree Ganga Enterprises — static website prototype

A no-framework HTML, CSS and vanilla JavaScript prototype. No npm, React, build step, or package installation is required.

## Run it
1. Extract the ZIP.
2. Open `index.html` in a modern browser.

For local development, VS Code's Live Server extension is optional. You can also serve the folder with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Files
- `index.html` — page structure and provisional content
- `styles.css` — design system, responsive layouts, CSS product illustrations
- `script.js` — product search/filter, product detail dialog, navigation, quote form prototype

## Prototype functionality
- Responsive mobile navigation
- Product search (Ctrl/Cmd + K focuses search)
- Product category filters
- Product detail dialog
- Product-to-quote form handoff
- Quote form validation and local enquiry-summary download
- Industry section enquiry prefill

## Before production
- Replace provisional text, company details, logo and CSS product illustrations with client-approved assets.
- Verify actual product range, specifications, business history, quality claims and industries served.
- Configure the enquiry form to send to an approved business email/CRM endpoint.
- Add official phone, WhatsApp and email details.
- Test keyboard accessibility, browser/device compatibility, image performance, SEO and deployment.
- Replace the illustrative `established` marker in the hero with a verified claim or remove it. It is marked with an asterisk and noted as unverified in the page copy.
