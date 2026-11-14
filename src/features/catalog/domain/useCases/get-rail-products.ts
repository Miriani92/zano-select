import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Product } from '@/features/catalog/domain/entities/product';
import type { Rail } from '@/features/catalog/domain/entities/rail';
import type { CatalogRepository } from '@/features/catalog/domain/repositories/catalog-repository';

/** "See all" shows up to this many products (no paging yet). */
export const SEE_ALL_LIMIT = 60;

export function makeGetRailProducts(repository: CatalogRepository) {
  return function getRailProducts(
    rail: Rail,
    gender: Gender,
  ): Promise<Product[]> {
    return repository.getRailProducts(rail, gender, SEE_ALL_LIMIT);
  };
}
