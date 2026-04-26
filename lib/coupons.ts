import type { CartLineInput } from "@/types/cart";
import type { Coupon, CouponValidation } from "@/types/coupon";
import { mapCoupon } from "./mappers";
import { readOptionalSheetValues, rowsToObjects } from "./google/sheets";

export async function getCoupons(): Promise<Coupon[]> {
  const rows = await readOptionalSheetValues(
    process.env.PRODUCTS_SPREADSHEET_ID,
    process.env.COUPONS_RANGE || "Coupons!A:Z"
  );
  const mapped = rowsToObjects(rows).map(mapCoupon).filter((coupon) => coupon.code);
  return mapped.length ? mapped : [];
}

export async function validateCoupon({
  code,
  subtotal,
  items
}: {
  code?: string;
  subtotal: number;
  items: CartLineInput[];
}): Promise<CouponValidation> {
  const cleanCode = String(code || "").trim().toUpperCase();

  if (!cleanCode) {
    return {
      valid: true,
      message: "No coupon applied.",
      discount: 0,
      finalAmount: subtotal
    };
  }

  if (!items.length) {
    return {
      valid: false,
      code: cleanCode,
      message: "Add products before applying a coupon.",
      discount: 0,
      finalAmount: subtotal
    };
  }

  const coupon = (await getCoupons()).find((item) => item.code === cleanCode);

  if (!coupon || !coupon.active) {
    return invalid(cleanCode, "This coupon is not active.", subtotal);
  }

  if (coupon.expiresAt) {
    const expires = new Date(coupon.expiresAt);
    if (!Number.isNaN(expires.getTime()) && expires.getTime() < Date.now()) {
      return invalid(cleanCode, "This coupon has expired.", subtotal);
    }
  }

  if (subtotal < coupon.minOrderAmount) {
    return invalid(cleanCode, `Minimum order value is ₹${coupon.minOrderAmount}.`, subtotal);
  }

  const rawDiscount =
    coupon.type === "percent" ? Math.floor((subtotal * coupon.value) / 100) : coupon.value;
  const discount = Math.min(rawDiscount, coupon.maxDiscount || rawDiscount, subtotal);

  return {
    valid: true,
    code: coupon.code,
    message: coupon.usageNote || "Coupon applied.",
    discount,
    finalAmount: Math.max(0, subtotal - discount)
  };
}

function invalid(code: string, message: string, subtotal: number): CouponValidation {
  return {
    valid: false,
    code,
    message,
    discount: 0,
    finalAmount: subtotal
  };
}
