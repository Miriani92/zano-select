import type { Banner } from '@/features/catalog/domain/entities/banner';
import type { Category } from '@/features/catalog/domain/entities/category';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Product } from '@/features/catalog/domain/entities/product';
import type { Rail } from '@/features/catalog/domain/entities/rail';
import type { CatalogRepository } from '@/features/catalog/domain/repositories/catalog-repository';

/** How many products a Home rail shows before "See all". */
export const HOME_RAIL_LIMIT = 10;

export interface HomeFeed {
  banners: Banner[];
  categories: Category[];
  rails: Record<Rail, Product[]>;
}

// Everything Home shows for one gender, loaded in parallel.
export function makeGetHomeFeed(repository: CatalogRepository) {
  return async function getHomeFeed(gender: Gender): Promise<HomeFeed> {
    const [banners, categories, discounts, newest] = await Promise.all([
      repository.getBanners(gender),
      repository.getCategories(),
      repository.getRailProducts('discounts', gender, HOME_RAIL_LIMIT),
      repository.getRailProducts('newest', gender, HOME_RAIL_LIMIT),
    ]);
    return { banners, categories, rails: { discounts, newest } };
  };
}
