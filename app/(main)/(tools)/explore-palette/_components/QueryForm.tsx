"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { QueryPaletteDto, sortByOptions } from "@/db/dto/palette.dto"

import { createUrl, firstCharUpper } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const QueryForm = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChangeQuery = (values: Partial<QueryPaletteDto>) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(values).forEach(([key, val]) => {
      if (val) {
        params.set(key, val)
      } else {
        params.delete(key)
      }
    })
    const optionUrl = createUrl(pathname, params)
    router.replace(optionUrl, { scroll: false })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const values = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as QueryPaletteDto

    handleChangeQuery(values)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-12 flex max-w-3xl items-center space-x-4"
    >
      <Input
        name="keyword"
        placeholder="Search by topic, color name, hex"
        defaultValue={searchParams.get("keyword") ?? ""}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          handleChangeQuery({ keyword: e.target.value })
        }
      />
      <Select
        name="sortBy"
        defaultValue={searchParams.get("sortBy") ?? sortByOptions[0]}
        onValueChange={(sortBy) =>
          handleChangeQuery({ sortBy: sortBy as QueryPaletteDto["sortBy"] })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          {sortByOptions.map((item) => (
            <SelectItem key={item} value={item}>
              {firstCharUpper(item)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  )
}

export default QueryForm
