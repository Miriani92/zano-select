import type { ProductDetail } from '@/features/catalog/domain/entities/product-detail';
import type { CatalogRepository } from '@/features/catalog/domain/repositories/catalog-repository';

/** Null means the product is no longer available. */
export function makeGetProductDetail(repository: CatalogRepository) {
  return function getProductDetail(id: string): Promise<ProductDetail | null> {
    return repository.getProduct(id);
  };
}
