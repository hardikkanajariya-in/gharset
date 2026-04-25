# Deployment Checklist

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Default mode uses sample data, so the site should load without Google credentials.

## Google setup

1. Enable Google Sheets API and Google Drive API in Google Cloud.
2. Create a service account.
3. Share the product and order spreadsheets with the service account email.
4. Add the service account email/private key and spreadsheet IDs to `.env.local`.
5. Set `USE_SAMPLE_DATA=false`.

## Vercel

1. Import this repo/project in Vercel.
2. Add environment variables from `.env.example`.
3. Deploy.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Product images

- Upload compressed product images to Google Drive.
- Store only the Drive file ID in the Products sheet.
- The site serves images through `/api/drive-image/[fileId]`.

## Manual COD operations

1. Customer clicks WhatsApp order.
2. Confirm product, address and COD support manually.
3. Add order to Orders sheet.
4. Send order ID to customer.
5. Customer checks `/track-order` with order ID + phone last 4 digits.
