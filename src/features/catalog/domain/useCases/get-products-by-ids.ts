import type { Product } from '@/features/catalog/domain/entities/product';
import type { CatalogRepository } from '@/features/catalog/domain/repositories/catalog-repository';

// Products in the order of `ids` (e.g. the wishlist, newest first); gone or inactive ones are left out.
export function makeGetProductsByIds(repository: CatalogRepository) {
  return async function getProductsByIds(ids: string[]): Promise<Product[]> {
    const products = await repository.getProductsByIds(ids);
    const byId = new Map(products.map((product) => [product.id, product]));
    return ids
      .map((id) => byId.get(id))
      .filter((product): product is Product => product !== undefined);
  };
}
