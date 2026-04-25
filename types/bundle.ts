export type Bundle = {
  bundleId: string;
  slug: string;
  name: string;
  shortDescription: string;
  productIds: string[];
  price: number;
  mrp?: number;
  imageDriveId?: string;
  visible: boolean;
  featured: boolean;
  sortOrder: number;
};
