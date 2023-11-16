"use client"

import { useCallback, useMemo, useState } from "react"
import { QueryUserVO, UserVO } from "@/db/dto/user.dto"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { format } from "date-fns"
import toast from "react-hot-toast"
import useSWR, { useSWRConfig } from "swr"

import { getFetchAction } from "@/lib/fetch-action"
import { objectToQueryString } from "@/lib/utils"
import { Spinners } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DeleteConfirmDialog } from "./DeleteConfirmDialog"
import UpsetUserFormDialog from "./UpsetFormDialog"

export function DataTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const fetchKey = useMemo(() => {
    const query: Record<string, string | number> = {
      page: pageIndex,
      pageSize,
      query: globalFilter,
    }

    if (sorting.length) {
      query.orderBy = sorting
        .map((s) => `${s.desc ? "-" : "+"}${s.id}`)
        .join(",")
    }

    return `/api/panel/user?${objectToQueryString(query)}`
  }, [globalFilter, pageIndex, pageSize, sorting])

  const { mutate } = useSWRConfig()
  const {
    data,
    isLoading: dataLoading,
    mutate: mutateData,
  } = useSWR<QueryUserVO>(fetchKey, getFetchAction({ method: "GET" }), {
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const handleEditSuccess = useCallback(
    (data?: UserVO) => {
      if (!data) {
        mutate(fetchKey)
      } else {
        mutateData((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            data: prev.data.map((user) => {
              if (user.id === data.id) {
                return data
              }
              return user
            }),
          }
        })
      }
    },
    [fetchKey, mutate, mutateData]
  )

  const columns: ColumnDef<UserVO>[] = useMemo(
    () => [
      {
        id: "user",
        header: "User",
        size: 440,
        cell({ row }) {
          const user = row.original
          const username = user.username ?? ""
          const avatarFallbackChars = username.slice(0, 2).toUpperCase()

          return (
            <div className="flex gap-x-4">
              <Avatar>
                {user.avatar && (
                  <AvatarImage src={user.avatar} alt={`@${username}`} />
                )}
                <AvatarFallback>{avatarFallbackChars}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-5 text-gray-900">
                  {username}
                </p>
                <p className="mt-0.5 truncate text-xs leading-4 text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "createAt",
        id: "created_at",
        accessorFn: (row) => format(row.createAt, "yyyy-MM-dd HH:mm"),
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Joined
              <span className="i-lucide-arrow-up ml-2 h-4 w-4"></span>
            </Button>
          )
        },
      },
      {
        accessorKey: "lastSignInAt",
        header: "Last Sign In",
        accessorFn: (row) =>
          row.lastSignInAt
            ? format(row.lastSignInAt, "yyyy-MM-dd HH:mm:ss")
            : "-",
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open actions</span>
                  <span className="i-lucide-more-vertical text-lg"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <UpsetUserFormDialog
                  user={user}
                  onSuccess={(data) => handleEditSuccess(data)}
                >
                  <DropdownMenuItem
                    className="space-x-2"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span className="i-lucide-clipboard-edit"></span>
                    <span>Edit User</span>
                  </DropdownMenuItem>
                </UpsetUserFormDialog>
                <DeleteConfirmDialog
                  id={user.id}
                  onSuccess={() => handleEditSuccess()}
                >
                  <DropdownMenuItem
                    className="space-x-2 text-red-600"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span className="i-lucide-trash-2"></span>
                    <span>Delete User</span>
                  </DropdownMenuItem>
                </DeleteConfirmDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [handleEditSuccess]
  )

  const defaultData = useMemo(() => [], [])

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    columns,
    data: data?.data ?? defaultData,
    pageCount: data?.maxPage ?? 1,
    manualPagination: true,
    manualSorting: true,
    enableMultiSort: false,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    state: {
      pagination,
      globalFilter,
      sorting,
      columnVisibility,
    },
  })

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Search"
          className="max-w-[320px]"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <UpsetUserFormDialog onSuccess={handleEditSuccess}>
            <Button className="space-x-2">
              <span className="i-lucide-user-plus-2 text-lg"></span>
              <span>Create user</span>
            </Button>
          </UpsetUserFormDialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {dataLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  <Spinners className="inline-flex animate-spin text-2xl"></Spinners>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width:
                          cell.column.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="flex items-center gap-1 text-sm">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
