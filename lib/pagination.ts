export type Pagination = ReturnType<typeof pagination>

export function pagination(page: number, pageSize: number, total: number) {
  const maxPage = Math.ceil(total / pageSize) - 1
  const prevPage = page - 1 < 0 ? 0 : page - 1
  const nextPage = page + 1 > maxPage ? maxPage : page + 1

  return {
    total,
    page,
    pageSize,
    maxPage,
    prevPage,
    nextPage,
    hasPrevious: page > 0,
    hasNext: page < maxPage,
  }
}
