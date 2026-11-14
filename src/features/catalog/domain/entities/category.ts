// Text stored in both app languages; the screen picks the one to show.
export interface LocalizedText {
  ka: string;
  en: string;
}

// A product category shown as a chip on Home (Clothing, Shoes, Bags, Accessories).
export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  imageUrl: string | null;
}
