import type { SupabaseClient } from '@supabase/supabase-js';

import {
  BANNER_COLUMNS,
  CATEGORY_COLUMNS,
  CATALOG_BUCKET,
  PRODUCT_COLUMNS,
  PRODUCT_DETAIL_COLUMNS,
  type BannerDto,
  type CategoryDto,
  type ProductDetailDto,
  type ProductDto,
} from '@/features/catalog/data/dto/catalog-dto';
import {
  toBanner,
  toCategory,
  toProduct,
  toProductDetail,
  type ImageUrlResolver,
} from '@/features/catalog/data/dto/catalog-mappers';
import type { Banner } from '@/features/catalog/domain/entities/banner';
import type {
  BrandCount,
  CatalogSort,
} from '@/features/catalog/domain/entities/catalog-query';
import { CatalogError } from '@/features/catalog/domain/entities/catalog-error';
import type { CatalogRepository } from '@/features/catalog/domain/repositories/catalog-repository';

// Postgres error for a value that isn't a valid uuid.
const INVALID_TEXT_REPRESENTATION = '22P02';

// Column order per sort; ties fall back to newest first.
const SORT_ORDER: Record<
  CatalogSort,
  { column: string; ascending: boolean }[]
> = {
  newest: [{ column: 'created_at', ascending: false }],
  discount: [
    { column: 'discount_pct', ascending: false },
    { column: 'created_at', ascending: false },
  ],
  priceAsc: [
    { column: 'price', ascending: true },
    { column: 'created_at', ascending: false },
  ],
  priceDesc: [
    { column: 'price', ascending: false },
    { column: 'created_at', ascending: false },
  ],
};

// Row-level security already hides inactive products and banners that aren't running.
export function createSupabaseCatalogRepository(
  client: SupabaseClient,
): CatalogRepository {
  const imageUrl: ImageUrlResolver = (path) =>
    client.storage.from(CATALOG_BUCKET).getPublicUrl(path).data.publicUrl;

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

    async getProducts(catalogQuery, limit) {
      let query = client
        .from('products')
        .select(PRODUCT_COLUMNS)
        .eq('gender', catalogQuery.gender);
      // An empty list means "any", so it adds no filter.
      if (catalogQuery.categoryIds.length > 0)
        query = query.in('category_id', catalogQuery.categoryIds);
      if (catalogQuery.brands.length > 0)
        query = query.in('brand', catalogQuery.brands);
      for (const { column, ascending } of SORT_ORDER[catalogQuery.sort])
        query = query.order(column, { ascending });

      const { data, error } = await query.limit(limit);
      if (error) throw new CatalogError(error.message);
      return (data as ProductDto[]).map((dto) => toProduct(dto, imageUrl));
    },

    async countProducts(gender, filters) {
      let query = client
        .from('products')
        .select('id', { count: 'exact', head: true })
        .eq('gender', gender);
      if (filters.categoryIds.length > 0)
        query = query.in('category_id', filters.categoryIds);
      if (filters.brands.length > 0) query = query.in('brand', filters.brands);

      const { count, error } = await query;
      if (error) throw new CatalogError(error.message);
      return count ?? 0;
    },

    // Counted here: PostgREST has no GROUP BY without a database view.
    async getBrands(gender) {
      const { data, error } = await client
        .from('products')
        .select('brand')
        .eq('gender', gender);
      if (error) throw new CatalogError(error.message);

      const counts = new Map<string, number>();
      for (const { brand } of data as { brand: string }[])
        counts.set(brand, (counts.get(brand) ?? 0) + 1);
      return [...counts]
        .map(([brand, count]): BrandCount => ({ brand, count }))
        .sort((a, b) => a.brand.localeCompare(b.brand));
    },

    async getProductsByIds(ids) {
      if (ids.length === 0) return [];
      const { data, error } = await client
        .from('products')
        .select(PRODUCT_COLUMNS)
        .in('id', ids);
      if (error) throw new CatalogError(error.message);
      return (data as ProductDto[]).map((dto) => toProduct(dto, imageUrl));
    },

    async getProduct(id) {
      const { data, error } = await client
        .from('products')
        .select(PRODUCT_DETAIL_COLUMNS)
        .eq('id', id)
        .order('sort_order', { referencedTable: 'product_sizes' })
        .maybeSingle();
      // A malformed id (e.g. from an old link) can't match any product.
      if (error?.code === INVALID_TEXT_REPRESENTATION) return null;
      if (error) throw new CatalogError(error.message);
      return data ? toProductDetail(data as ProductDetailDto, imageUrl) : null;
    },
  };
}
