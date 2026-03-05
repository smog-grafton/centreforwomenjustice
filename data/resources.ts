export type ResourceCategory = "publications" | "newsletters" | "annual-reports" | "know-your-rights";

export type Resource = {
  id: string;
  category: ResourceCategory;
  title: string;
  tag: string;
  author: string;
  coverImage: string;
  href: string;
  year?: number;
  summary?: string;
  downloadUrl?: string | null;
};

/** Resource listing is loaded from the API (lib/resources-api). Empty for type compatibility. */
export const resources: Resource[] = [];
