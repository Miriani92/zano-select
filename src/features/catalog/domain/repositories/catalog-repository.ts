import type { Banner } from '@/features/catalog/domain/entities/banner';
import type { Category } from '@/features/catalog/domain/entities/category';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Product } from '@/features/catalog/domain/entities/product';
import type { Rail } from '@/features/catalog/domain/entities/rail';

export interface CatalogRepository {
  /** All categories, in display order. */
  getCategories(): Promise<Category[]>;
  /** Banners running now for this gender, in display order. */
  getBanners(gender: Gender): Promise<Banner[]>;
  /** Active products of a rail: "discounts" biggest first, "newest" newest first. */
  getRailProducts(
    rail: Rail,
    gender: Gender,
    limit: number,
  ): Promise<Product[]>;
}
