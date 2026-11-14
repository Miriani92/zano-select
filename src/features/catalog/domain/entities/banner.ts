import type { LocalizedText } from '@/features/catalog/domain/entities/category';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Rail } from '@/features/catalog/domain/entities/rail';

// Where tapping a banner leads.
export type BannerTarget =
  { kind: 'rail'; rail: Rail } | { kind: 'category'; slug: string };

// The sale banner at the top of Home, one set per gender.
export interface Banner {
  id: string;
  gender: Gender;
  /** Small line above the title, e.g. "ქალის კოლექცია". */
  eyebrow: LocalizedText;
  title: LocalizedText;
  imageUrl: string | null;
  target: BannerTarget;
}
