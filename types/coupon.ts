export type CouponType = "fixed" | "percent";

export type Coupon = {
  code: string;
  description?: string;
  type: CouponType;
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  active: boolean;
  expiresAt?: string;
  usageNote?: string;
};

export type CouponValidation = {
  valid: boolean;
  code?: string;
  message: string;
  discount: number;
  finalAmount: number;
};
