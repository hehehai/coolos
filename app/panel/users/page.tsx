import { notFound } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { isAdmin } from "@/lib/user"

import { DataTable } from "./_components/DataTable"

const PanelUsersPage = async () => {
  const user = await currentUser()

  if (!isAdmin(user?.publicMetadata.role)) {
    return notFound()
  }

  return (
    <div className="h-full w-full bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Users</div>
      </div>

      <div className="mt-4 rounded-lg bg-white p-4">
        <DataTable />
      </div>
    </div>
  )
}

export default PanelUsersPage
