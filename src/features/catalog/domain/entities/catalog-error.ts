// Loading catalog data failed (no connection, server error). Screens show "retry".
export class CatalogError extends Error {
  constructor(message?: string) {
    super(message ?? 'Catalog request failed');
    this.name = 'CatalogError';
  }
}
