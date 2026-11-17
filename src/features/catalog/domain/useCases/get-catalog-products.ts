import type {
  BrandCount,
  CatalogFilters,
  CatalogQuery,
} from '@/features/catalog/domain/entities/catalog-query';
import type { Category } from '@/features/catalog/domain/entities/category';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Product } from '@/features/catalog/domain/entities/product';
import type { CatalogRepository } from '@/features/catalog/domain/repositories/catalog-repository';

/** The Catalog grid shows up to this many products (no paging yet). */
export const CATALOG_LIMIT = 60;

export function makeGetCatalogProducts(repository: CatalogRepository) {
  return function getCatalogProducts(query: CatalogQuery): Promise<Product[]> {
    return repository.getProducts(query, CATALOG_LIMIT);
  };
}

/** For the filter sheet's "Show (N)" button. */
export function makeCountCatalogProducts(repository: CatalogRepository) {
  return function countCatalogProducts(
    gender: Gender,
    filters: CatalogFilters,
  ): Promise<number> {
    return repository.countProducts(gender, filters);
  };
}

export interface CatalogFilterOptions {
  categories: Category[];
  brands: BrandCount[];
}

/** Category chips and the filter sheet's choices, for one gender. */
export function makeGetCatalogFilterOptions(repository: CatalogRepository) {
  return async function getCatalogFilterOptions(
    gender: Gender,
  ): Promise<CatalogFilterOptions> {
    const [categories, brands] = await Promise.all([
      repository.getCategories(),
      repository.getBrands(gender),
    ]);
    return { categories, brands };
  };
}
