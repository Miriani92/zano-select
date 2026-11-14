/** "₾189" for whole lari, "₾18.50" otherwise. */
export function formatPrice(amount: number): string {
  return `₾${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}
