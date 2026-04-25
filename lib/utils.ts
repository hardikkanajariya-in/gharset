export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(value?: number | string) {
  const amount = typeof value === "string" ? Number(value) : value;
  if (!amount || Number.isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function normalizeYesNo(value: unknown, fallback = false) {
  if (typeof value !== "string") return fallback;
  return ["yes", "true", "1", "y", "active"].includes(value.trim().toLowerCase());
}

export function toNumber(value: unknown, fallback = 0) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return fallback;
  const normalized = value.replace(/[₹,\s]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function splitList(value: unknown) {
  if (!value || typeof value !== "string") return [];
  return value
    .split(/\||,|\n/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getLastFour(value: string) {
  return value.replace(/\D/g, "").slice(-4);
}

export function safeDate(value?: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function buildSearchText(values: Array<string | number | undefined>) {
  return values.filter(Boolean).join(" ").toLowerCase();
}
