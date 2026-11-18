import type { Banner } from '@/features/catalog/domain/entities/banner';
import type {
  BrandCount,
  CatalogFilters,
  CatalogQuery,
} from '@/features/catalog/domain/entities/catalog-query';
import type { Category } from '@/features/catalog/domain/entities/category';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Product } from '@/features/catalog/domain/entities/product';
import type { ProductDetail } from '@/features/catalog/domain/entities/product-detail';
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
  /** Active products matching the query, in its sort order. */
  getProducts(query: CatalogQuery, limit: number): Promise<Product[]>;
  /** How many active products of this gender match the filters. */
  countProducts(gender: Gender, filters: CatalogFilters): Promise<number>;
  /** Brands with active products for this gender, A–Z. */
  getBrands(gender: Gender): Promise<BrandCount[]>;
  /** One active product with its sizes; null when it's gone or inactive. */
  getProduct(id: string): Promise<ProductDetail | null>;
}
