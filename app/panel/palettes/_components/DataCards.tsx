"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { QueryPaletteDto } from "@/db/dto/palette.dto"
import { Palette } from "@prisma/client"
import { PaginationState } from "@tanstack/react-table"
import toast from "react-hot-toast"
import useSWR, { useSWRConfig } from "swr"

import { PaginationData } from "@/types/common"
import { getFetchAction } from "@/lib/fetch-action"
import { objectToQueryString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import PaletteCard from "@/app/(main)/(tools)/explore-palette/_components/PaletteCard"

import { DeleteConfirmDialog } from "./DeleteConfirmDialog"
import UpdateFormDialog from "./UpsetFormDialog"

const DataCards = () => {
  const router = useRouter()

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 16,
  })
  const [globalFilter, setGlobalFilter] = useState("")

  const fetchKey = useMemo(() => {
    const query: QueryPaletteDto = {
      page: pageIndex,
      pageSize,
      keyword: globalFilter,
      sortBy: "latest",
    }
    return `/api/panel/palette?${objectToQueryString(query)}`
  }, [globalFilter, pageIndex, pageSize])

  const { mutate } = useSWRConfig()
  const {
    data,
    isLoading: dataLoading,
    mutate: mutateData,
  } = useSWR<PaginationData<Palette>>(
    fetchKey,
    getFetchAction({ method: "GET" }),
    {
      keepPreviousData: true,
      onError: (err) => {
        toast.error(err.message)
      },
    }
  )

  const handleEditSuccess = useCallback(
    (data?: Palette) => {
      if (!data) {
        mutate(fetchKey)
      } else {
        mutateData((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            data: prev.data.map((item) => {
              if (item.id === data.id) {
                return data
              }
              return item
            }),
          }
        })
      }
    },
    [fetchKey, mutate, mutateData]
  )

  const createButton = useMemo(() => {
    return (
      <Button className="space-x-2" onClick={() => router.push("/palette")}>
        <span className="i-lucide-palette text-lg"></span>
        <span>Create Palette</span>
      </Button>
    )
  }, [])

  const cards = useMemo(() => {
    if (dataLoading) {
      return (
        <div className="grid grid-cols-5 gap-x-8 gap-y-6 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: pageSize }).map((_, index) => (
            <Skeleton key={index} className="h-[166px] rounded-lg" />
          ))}
        </div>
      )
    }

    if (!data?.data) {
      return (
        <div className="flex min-h-[320px] flex-col items-center justify-center space-y-3">
          <div>Not found palette, create one</div>
          {createButton}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-5 gap-x-8 gap-y-6 lg:grid-cols-3 2xl:grid-cols-4">
        {data?.data.map((palette) => (
          <PaletteCard
            palette={palette}
            key={palette.id}
            paletteClassname="h-[138px]"
            isEdit={true}
            editActions={
              <>
                <UpdateFormDialog
                  palette={palette}
                  onSuccess={(data) => handleEditSuccess(data)}
                >
                  <DropdownMenuItem
                    className="space-x-2"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span className="i-lucide-clipboard-edit"></span>
                    <span>Edit Palette</span>
                  </DropdownMenuItem>
                </UpdateFormDialog>
                <DeleteConfirmDialog
                  id={palette.id}
                  onSuccess={() => handleEditSuccess()}
                >
                  <DropdownMenuItem
                    className="space-x-2 text-red-600"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span className="i-lucide-trash-2"></span>
                    <span>Delete Palette</span>
                  </DropdownMenuItem>
                </DeleteConfirmDialog>
              </>
            }
          />
        ))}
      </div>
    )
  }, [data, dataLoading])

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <Input
          placeholder="Search"
          className="max-w-[320px]"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {createButton}
      </div>
      <div>
        {cards}
        <div className="flex items-center justify-end space-x-2 py-4">
          <span className="flex items-center gap-1 text-sm">
            <div>Page</div>
            <strong>
              {pageIndex + 1} of {data?.total}
            </strong>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({ ...prev, pageIndex: pageIndex - 1 }))
            }
            disabled={!data?.hasPrevious}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({ ...prev, pageIndex: pageIndex + 1 }))
            }
            disabled={!data?.hasNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataCards
