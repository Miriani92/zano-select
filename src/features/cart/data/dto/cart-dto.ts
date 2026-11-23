import {
  PRODUCT_COLUMNS,
  type ProductDto,
  type ProductSizeDto,
} from '@/features/catalog/data/dto/catalog-dto';
import {
  toProduct,
  type ImageUrlResolver,
} from '@/features/catalog/data/dto/catalog-mappers';
import type { CartLine } from '@/features/cart/domain/entities/cart-line';

/** '' in the table stands for "one size". */
export const ONE_SIZE = '';

// A cart_items row with its product and the product's size stock.
export interface CartItemDto {
  product_id: string;
  size_label: string;
  quantity: number;
  /** Null when the product is no longer visible (taken off sale). */
  products: (ProductDto & { product_sizes: ProductSizeDto[] }) | null;
}

export const CART_ITEM_COLUMNS = `product_id, size_label, quantity, products(${PRODUCT_COLUMNS}, product_sizes(label, in_stock))`;

export function toSizeLabel(size: string | null): string {
  return size ?? ONE_SIZE;
}

/** Null when the product is gone, so the line isn't shown. */
export function toCartLine(
  dto: CartItemDto,
  imageUrl: ImageUrlResolver,
): CartLine | null {
  if (!dto.products) return null;
  const oneSize = dto.size_label === ONE_SIZE;
  const available = oneSize
    ? true
    : (dto.products.product_sizes.find((s) => s.label === dto.size_label)
        ?.in_stock ?? false);
  return {
    product: toProduct(dto.products, imageUrl),
    size: oneSize ? null : dto.size_label,
    quantity: dto.quantity,
    available,
  };
}
