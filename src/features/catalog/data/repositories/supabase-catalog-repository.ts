import type { SupabaseClient } from '@supabase/supabase-js';

import {
  BANNER_COLUMNS,
  CATEGORY_COLUMNS,
  PRODUCT_COLUMNS,
  type BannerDto,
  type CategoryDto,
  type ProductDto,
} from '@/features/catalog/data/dto/catalog-dto';
import {
  toBanner,
  toCategory,
  toProduct,
  type ImageUrlResolver,
} from '@/features/catalog/data/dto/catalog-mappers';
import type { Banner } from '@/features/catalog/domain/entities/banner';
import { CatalogError } from '@/features/catalog/domain/entities/catalog-error';
import type { CatalogRepository } from '@/features/catalog/domain/repositories/catalog-repository';

const BUCKET = 'catalog';

// Row-level security already hides inactive products and banners that aren't running.
export function createSupabaseCatalogRepository(
  client: SupabaseClient,
): CatalogRepository {
  const imageUrl: ImageUrlResolver = (path) =>
    client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  return {
    async getCategories() {
      const { data, error } = await client
        .from('categories')
        .select(CATEGORY_COLUMNS)
        .order('sort_order');
      if (error) throw new CatalogError(error.message);
      return (data as CategoryDto[]).map((dto) => toCategory(dto, imageUrl));
    },

    async getBanners(gender) {
      const { data, error } = await client
        .from('banners')
        .select(BANNER_COLUMNS)
        .eq('gender', gender)
        .order('sort_order');
      if (error) throw new CatalogError(error.message);
      return (data as BannerDto[])
        .map((dto) => toBanner(dto, imageUrl))
        .filter((banner): banner is Banner => banner !== null);
    },

    async getRailProducts(rail, gender, limit) {
      let query = client
        .from('products')
        .select(PRODUCT_COLUMNS)
        .eq('gender', gender);

      query =
        rail === 'discounts'
          ? query
              .gt('discount_pct', 0)
              .order('discount_pct', { ascending: false })
              .order('created_at', { ascending: false })
          : query.order('created_at', { ascending: false });

      const { data, error } = await query.limit(limit);
      if (error) throw new CatalogError(error.message);
      return (data as ProductDto[]).map((dto) => toProduct(dto, imageUrl));
    },
  };
}
