import type { Gender } from '@/features/catalog/domain/entities/gender';

// Sort orders the Catalog tab offers.
export const CATALOG_SORTS = [
  'newest',
  'discount',
  'priceAsc',
  'priceDesc',
] as const;

export type CatalogSort = (typeof CATALOG_SORTS)[number];

/** What the shopper narrowed the Catalog down to. Empty lists mean "any". */
export interface CatalogFilters {
  categoryIds: string[];
  brands: string[];
}

export interface CatalogQuery extends CatalogFilters {
  gender: Gender;
  sort: CatalogSort;
}

export const NO_FILTERS: CatalogFilters = { categoryIds: [], brands: [] };

/** How many filters are on, for the badge on the Filter button. */
export function activeFilterCount(filters: CatalogFilters): number {
  return filters.categoryIds.length + filters.brands.length;
}

/** A brand with how many active products it has for one gender. */
export interface BrandCount {
  brand: string;
  count: number;
}
