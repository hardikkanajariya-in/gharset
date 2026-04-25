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
  productIds: string[];
  productNames: string[];
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
