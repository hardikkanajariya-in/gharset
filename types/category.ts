export type Category = {
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  imageDriveId?: string;
  visible: boolean;
  sortOrder: number;
};
