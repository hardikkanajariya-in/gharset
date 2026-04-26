# GharSet Google Sheets Schema

Create two spreadsheets.

## Spreadsheet 1: `GharSet Products CMS`

### Tab: `Products`

Header row:

```csv
product_id,slug,name,short_description,category,subcategory,price,mrp,delivery_charge,supplier_price,margin,image_1_drive_id,image_2_drive_id,image_3_drive_id,image_alt,material,dimensions,best_for,features,whats_in_box,stock_status,featured,visible,sort_order,tags
```

Rules:

- `slug` must be unique.
- `features` can be separated with `|`, comma, or new lines.
- `tags` can be separated with comma or `|`.
- `stock_status` values: `in_stock`, `out_of_stock`, `limited`.
- `delivery_charge`: use `0` for free delivery or a number such as `49`.
- `featured`: `yes` or `no`.
- `visible`: `yes` or `no`.
- Image columns should contain Google Drive file IDs, not full URLs.

### Tab: `Categories`

```csv
category_id,name,slug,description,image_drive_id,visible,sort_order
```

### Tab: `Bundles`

```csv
bundle_id,slug,name,short_description,product_ids,price,mrp,image_drive_id,visible,featured,sort_order
```

`product_ids` should be comma-separated product IDs, for example:

```txt
GS-KIT-001,GS-KIT-002,GS-KIT-003
```

### Tab: `Settings`

```csv
key,value
whatsapp_number,91XXXXXXXXXX
cod_enabled,yes
announcement_text,COD available on selected products · WhatsApp order support
default_delivery_note,Delivery usually takes 4–7 working days after confirmation.
admin_username,admin
admin_password,change-this-password
```

### Tab: `Coupons`

```csv
code,description,type,value,min_order_amount,max_discount,active,expires_at,usage_note
```

Rules:

- `type`: `fixed` or `percent`.
- `value`: discount amount for fixed coupons, percentage for percent coupons.
- `expires_at`: optional date like `2026-05-31`.
- Coupons are validated server-side before the checkout order is created.

### Tab: `Offers`

```csv
offer_id,title,description,badge,href,active,sort_order
```

Used for homepage offer banners. `href` can point to `/combo-kits`, `/under-499`, `/category/kitchen-organizers`, etc.

### Tab: `ImageLibrary`

```csv
file_id,name,mime_type,created_at
```

Used by `/admin`. The admin image uploader writes Google Drive file IDs here, then the product image manager writes selected IDs back to `Products.image_1_drive_id`, `image_2_drive_id`, and `image_3_drive_id`.

## Spreadsheet 2: `GharSet Orders`

### Tab: `Orders`

```csv
order_id,order_date,customer_name,phone,address,product_ids,product_names,order_amount,supplier_cost,profit,payment_method,status,tracking_note,expected_delivery,last_updated,internal_note,city,state,pincode,landmark,quantities,subtotal,delivery_charge,coupon_code,discount,alternate_phone
```

Status suggestions:

- New Order
- Customer Confirmed
- Placed with Supplier
- Processing
- Shipped
- Out for Delivery
- Delivered
- Cancelled
- Returned/RTO

### Tab: `Leads`

```csv
lead_id,created_at,name,phone,area,budget,message,source,status
```

Used by the Free Suggestion form.
