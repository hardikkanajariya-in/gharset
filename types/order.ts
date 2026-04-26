export type OrderStatus =
  | "New Order"
  | "Customer Confirmed"
  | "Placed with Supplier"
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned/RTO";

export type Order = {
  orderId: string;
  orderDate: string;
  customerName: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  productIds: string[];
  productNames: string[];
  quantities?: number[];
  subtotal?: number;
  couponCode?: string;
  discount?: number;
  orderAmount?: number;
  supplierCost?: number;
  profit?: number;
  paymentMethod: "COD" | string;
  status: OrderStatus | string;
  trackingNote?: string;
  expectedDelivery?: string;
  lastUpdated?: string;
  internalNote?: string;
};

export type SafeOrder = Pick<
  Order,
  "orderId" | "orderDate" | "productNames" | "orderAmount" | "paymentMethod" | "status" | "trackingNote" | "expectedDelivery" | "lastUpdated"
>;
