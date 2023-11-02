"use client"

import { useEffect, useRef } from "react"
import { QueryPaletteDto } from "@/db/dto/palette.dto"
import { Palette } from "@prisma/client"
import useSWRInfinite from "swr/infinite"

import { getFetchAction } from "@/lib/fetch-action"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { SvgSpinners90RingWithBg } from "@/components/icons/Loading"

import PaletteCard from "./PaletteCard"

const getKey =
  ({ pageSize, keyword, sortBy }: QueryPaletteDto) =>
  (pageIndex: number, previousPageData: Palette[]) => {
    if (previousPageData && !previousPageData.length) return null // 已经到最后一页
    const params = new URLSearchParams()
    if (pageSize) {
      params.set("pageSize", pageSize.toString())
    }
    if (keyword) {
      params.set("keyword", keyword)
    }
    if (sortBy) {
      params.set("sortBy", sortBy)
    }
    params.set("page", pageIndex.toString())
    return `/api/palette?${params.toString()}` // SWR key
  }

interface LoadMoreProps {
  fetchParams: QueryPaletteDto
}

const LoadMore = ({ fetchParams }: LoadMoreProps) => {
  const bottomTriggerRef = useRef(null)
  const inView = useIntersectionObserver(bottomTriggerRef)

  const { data, setSize, error } = useSWRInfinite<Palette[]>(
    getKey(fetchParams),
    getFetchAction({ method: "GET" })
  )

  useEffect(() => {
    if (inView) {
      setSize((prev) => prev + 1)
    }
  }, [inView, setSize])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      {data?.map((blocks) =>
        blocks.map((palette) => (
          <PaletteCard
            palette={{ ...palette }}
            key={palette.id}
            paletteClassname="h-[138px]"
          />
        ))
      )}
      <div
        ref={bottomTriggerRef}
        className="col-span-5 lg:col-span-3 2xl:col-span-4"
      >
        <div className="flex h-80 w-full items-center justify-center text-4xl">
          <SvgSpinners90RingWithBg className="animate-spin" />
        </div>
      </div>
    </>
  )
}

export default LoadMore
