# GharSet — Next.js COD Catalog MVP

A mobile-first, compact, professional catalog website for **GharSet: Smart organizers for every Indian home.**

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Google Sheets as product/order CMS
- Google Drive as product image storage
- WhatsApp COD ordering

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

The project runs with sample data by default because `USE_SAMPLE_DATA=true` in `.env.example`.

## Configure live Google Sheets/Drive

1. Create a Google Cloud project.
2. Enable Google Sheets API and Google Drive API.
3. Create a Service Account.
4. Copy the service account email and private key into `.env.local`.
5. Create two spreadsheets:
   - `GharSet Products CMS`
   - `GharSet Orders`
6. Share both spreadsheets with the service account email as Editor.
7. Add the tabs and headers from `docs/google-sheets-schema.md`.
8. Put spreadsheet IDs in `.env.local`.
9. Set `USE_SAMPLE_DATA=false`.

## Production deployment

Recommended first deployment: Vercel.

```bash
npm run build
```

Add the same environment variables in your Vercel project settings.

## What is included

- Home page
- Shop page with product filters
- Category pages
- Product details pages
- Combo kits page
- Under ₹299/₹499/₹999 pages
- Free suggestion page with Sheets lead capture + WhatsApp fallback
- Track order page reading Google Sheets safely
- Contact, About, COD, Shipping, Return, Privacy and Terms pages
- Google Drive image proxy route
- Sitemap and robots

## Important notes

- This is a COD-first catalog, not a full cart/checkout system.
- Orders are manually confirmed over WhatsApp, then entered in the Orders sheet.
- The tracking page only exposes safe order fields after matching Order ID + phone last 4 digits.
- Do not commit `.env.local`.
