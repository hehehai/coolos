"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"

import { getFetchAction } from "@/lib/fetch-action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const DeleteConfirmDialog = ({
  id,
  children,
  onSuccess,
}: {
  id: string
  children: React.ReactNode
  onSuccess?: () => void
}) => {
  const [open, setOpen] = useState(false)

  const { trigger, isMutating } = useSWRMutation(
    `/api/panel/user/${id}`,
    getFetchAction<void>({ method: "DELETE" }),
    {
      onError: (err) => {
        toast.error(err.message)
      },
      onSuccess: (data) => {
        setOpen(false)
        toast.success("User deleted")
        onSuccess?.()
      },
    }
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm to delete the account?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            disabled={isMutating}
            onClick={() => trigger()}
          >
            {isMutating && (
              <span className="i-lucide-loader-2 mr-2 animate-spin" />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
