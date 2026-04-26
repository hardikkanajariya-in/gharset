export type CartLineInput = {
  productId: string;
  quantity: number;
};

export type CheckoutCustomer = {
  name: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  city: string;
  state?: string;
  pincode: string;
  landmark?: string;
  note?: string;
};

export type CheckoutPayload = {
  customer: CheckoutCustomer;
  items: CartLineInput[];
  couponCode?: string;
};
