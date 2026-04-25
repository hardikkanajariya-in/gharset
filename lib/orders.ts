import type { Order, SafeOrder } from "@/types/order";
import { appendSheetValues, readSheetValues, rowsToObjects, shouldUseSampleData } from "./google/sheets";
import { mapOrder } from "./mappers";
import { sampleOrders } from "./sample-data";
import { getLastFour } from "./utils";

export async function getOrders(): Promise<Order[]> {
  if (shouldUseSampleData()) return sampleOrders;
  const rows = await readSheetValues(process.env.ORDERS_SPREADSHEET_ID, process.env.ORDERS_RANGE || "Orders!A:Z");
  const mapped = rowsToObjects(rows).map(mapOrder);
  return mapped.length ? mapped : [];
}

export async function findOrder(orderId: string, phoneLast4: string): Promise<SafeOrder | null> {
  if (process.env.ORDER_TRACKING_ENABLED === "false") return null;

  const cleanOrderId = orderId.trim().toUpperCase();
  const cleanLast4 = getLastFour(phoneLast4);

  const order = (await getOrders()).find((item) => {
    return item.orderId.trim().toUpperCase() === cleanOrderId && getLastFour(item.phone) === cleanLast4;
  });

  return order ? toSafeOrder(order) : null;
}

export function toSafeOrder(order: Order): SafeOrder {
  return {
    orderId: order.orderId,
    orderDate: order.orderDate,
    productNames: order.productNames,
    orderAmount: order.orderAmount,
    paymentMethod: order.paymentMethod,
    status: order.status,
    trackingNote: order.trackingNote,
    expectedDelivery: order.expectedDelivery,
    lastUpdated: order.lastUpdated
  };
}

export async function createLead(input: {
  name: string;
  phone: string;
  area: string;
  budget: string;
  message: string;
  source?: string;
}) {
  const leadId = `GS-LD-${Date.now()}`;
  const createdAt = new Date().toISOString();

  if (shouldUseSampleData()) {
    return { leadId, sampleMode: true };
  }

  await appendSheetValues(process.env.ORDERS_SPREADSHEET_ID, process.env.LEADS_RANGE || "Leads!A:Z", [
    leadId,
    createdAt,
    input.name,
    input.phone,
    input.area,
    input.budget,
    input.message,
    input.source || "website",
    "New"
  ]);

  return { leadId, sampleMode: false };
}
