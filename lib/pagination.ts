export function paginateItems<T>({
  items,
  page,
  perPage
}: {
  items: T[];
  page: number;
  perPage: number;
}) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    totalItems,
    totalPages,
    currentPage,
    perPage,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages
  };
}