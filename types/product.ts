export type StockStatus = "in_stock" | "out_of_stock" | "limited";

export type Product = {
  productId: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  price: number;
  mrp?: number;
  deliveryCharge?: number;
  supplierPrice?: number;
  margin?: number;
  imageDriveIds: string[];
  imageAlt: string;
  material?: string;
  dimensions?: string;
  bestFor?: string;
  features: string[];
  whatsInBox?: string;
  stockStatus: StockStatus;
  featured: boolean;
  visible: boolean;
  sortOrder: number;
  tags: string[];
};
