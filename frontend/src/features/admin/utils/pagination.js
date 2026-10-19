export const PAGE_SIZE = 10;

/** The slice of `items` shown on `page` (1-based). */
export const paginate = (items, page) =>
  items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);



