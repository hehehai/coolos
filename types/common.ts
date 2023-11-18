import { Pagination } from "@/lib/pagination"

export interface PaginationData<T> extends Pagination {
  data: T[]
}

export type SiteConfig = {
  name: string
  short_name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
  creator: {
    name: string
    twitter: string
    github: string
    website: string
    mail: string
  }
}
