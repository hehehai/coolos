import { notFound } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { isAdmin } from "@/lib/user"
import { Button } from "@/components/ui/button"

import { columns } from "./columns"
import { DataTable } from "./data-table"

const PanelUsersPage = async () => {
  const user = await currentUser()

  if (!isAdmin(user?.publicMetadata.role)) {
    return notFound()
  }

  return (
    <div className="h-full w-full bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Users</div>
        <div>
          <Button className="space-x-2">
            <span className="i-lucide-user-plus-2 text-lg"></span>
            <span>Create user</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-white p-4">
        <DataTable columns={columns}></DataTable>
      </div>
    </div>
  )
}

export default PanelUsersPage
