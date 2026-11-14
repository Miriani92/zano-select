import type {
  BannerDto,
  CategoryDto,
  ProductDto,
} from '@/features/catalog/data/dto/catalog-dto';
import type {
  Banner,
  BannerTarget,
} from '@/features/catalog/domain/entities/banner';
import type { Category } from '@/features/catalog/domain/entities/category';
import type { Product } from '@/features/catalog/domain/entities/product';
import { isRail } from '@/features/catalog/domain/entities/rail';

/** Turns a path inside the `catalog` Storage bucket into a public URL. */
export type ImageUrlResolver = (path: string) => string;

export function toCategory(
  dto: CategoryDto,
  imageUrl: ImageUrlResolver,
): Category {
  return {
    id: dto.id,
    slug: dto.slug,
    name: { ka: dto.name_ka, en: dto.name_en },
    imageUrl: dto.image_path ? imageUrl(dto.image_path) : null,
  };
}

/** Parses "rail:discounts" / "category:shoes"; null when unknown. */
export function toBannerTarget(target: string): BannerTarget | null {
  const [kind, value] = target.split(':');
  if (!value) return null;
  if (kind === 'rail' && isRail(value)) return { kind: 'rail', rail: value };
  if (kind === 'category') return { kind: 'category', slug: value };
  return null;
}

/** Null when the banner's target can't be understood, so it isn't shown. */
export function toBanner(
  dto: BannerDto,
  imageUrl: ImageUrlResolver,
): Banner | null {
  const target = toBannerTarget(dto.target);
  if (!target) return null;
  return {
    id: dto.id,
    gender: dto.gender,
    eyebrow: { ka: dto.eyebrow_ka, en: dto.eyebrow_en },
    title: { ka: dto.title_ka, en: dto.title_en },
    imageUrl: dto.image_path ? imageUrl(dto.image_path) : null,
    target,
  };
}

export function toProduct(
  dto: ProductDto,
  imageUrl: ImageUrlResolver,
): Product {
  return {
    id: dto.id,
    categoryId: dto.category_id,
    gender: dto.gender,
    brand: dto.brand,
    name: { ka: dto.name_ka, en: dto.name_en },
    price: Number(dto.price),
    originalPrice:
      dto.original_price === null ? null : Number(dto.original_price),
    discountPct: dto.discount_pct,
    imageUrls: dto.image_paths.map(imageUrl),
  };
}
