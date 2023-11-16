import { Pagination } from "@/lib/pagination"

export interface PaginationData<T> extends Pagination {
  data: T[]
}
