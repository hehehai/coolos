"use client"

import { UserVO } from "@/db/dto/user.dto"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<UserVO>[] = [
  {
    id: "user",
    header: "User",
    cell({ row }) {
      const user = row.original
      const username = user.username ?? ""
      const avatarFallbackChars = username.slice(0, 2).toUpperCase()

      return (
        <div className="flex min-w-0 gap-x-4">
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
      row.lastSignInAt ? format(row.lastSignInAt, "yyyy-MM-dd HH:mm:ss") : "-",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <span className="i-lucide-more-vertical text-lg"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
