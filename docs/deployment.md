# Deployment Checklist

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site requires Google Sheets and Drive credentials because real Sheets data is the only supported data source.

## Google setup

1. Enable Google Sheets API and Google Drive API in Google Cloud.
2. Create a service account.
3. Share the product and order spreadsheets with the service account email.
4. Add the service account email/private key and spreadsheet IDs to `.env.local`.
5. Confirm Google Sheets IDs and service account credentials are configured.

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

1. Customer adds products to cart and submits checkout details.
2. The site creates an order row in the Orders sheet.
3. WhatsApp opens with the order/customer details prefilled.
4. Confirm availability, address and COD support manually.
5. Customer checks `/track-order` with order ID + phone last 4 digits.
