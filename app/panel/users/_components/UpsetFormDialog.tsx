"use client"

import { useState } from "react"
import {
  CreateUserDto,
  createUserDtoSchema,
  UpdateUserDto,
  updateUserDtoSchema,
  UserVO,
} from "@/db/dto/user.dto"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"

import { getFetchAction } from "@/lib/fetch-action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface UpsetUserFormDialogProps {
  user?: UserVO
  children: React.ReactNode
  onSuccess?: (data?: UserVO) => void
}

type UpsetDto = CreateUserDto | UpdateUserDto

export const UpsetUserFormDialog = ({
  user,
  children,
  onSuccess,
}: UpsetUserFormDialogProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<UpsetDto>({
    resolver: zodResolver(user ? updateUserDtoSchema : createUserDtoSchema),
    defaultValues: user
      ? {
          id: user.id,
          email: user.email ?? "",
          username: user.username ?? "",
          password: "",
        }
      : {
          email: "",
          username: "",
          password: "",
        },
  })

  const { trigger, isMutating } = useSWRMutation(
    "/api/panel/user",
    getFetchAction<UpsetDto>(),
    {
      onError: (err) => {
        toast.error(err.message)
      },
      onSuccess: (data) => {
        setOpen(false)
        toast.success(user ? "User updated" : "User created")
        onSuccess?.(data?.data)
      },
    }
  )

  const onSubmit = async () => {
    const values = form.getValues()
    trigger(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? "Edit" : "Create"} User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      disabled={!!user}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isMutating}
            onClick={() => {
              form.handleSubmit(onSubmit)()
            }}
          >
            {isMutating && (
              <span className="i-lucide-loader-2 mr-2 animate-spin" />
            )}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpsetUserFormDialog
