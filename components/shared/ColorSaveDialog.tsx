"use client"

import { UpsetColorDto, UpsetColorDtoSchema } from "@/db/dto/color.dto"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UnauthorizedError } from "@/lib/error"
import { getFetchAction } from "@/lib/fetch-action"
import { appEnv } from "@/lib/utils"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import ColorPicker from "./color-picker/ColorPicker"
import HexInput from "./color-picker/components/HexInput"

interface ColorSaveDialogProps extends React.PropsWithChildren {
  triggerClassName?: string
  defaultValues?: Partial<UpsetColorDto>
}

const ColorSaveDialog = ({
  triggerClassName,
  defaultValues,
  children,
}: ColorSaveDialogProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  const form = useForm<UpsetColorDto>({
    resolver: zodResolver(UpsetColorDtoSchema),
    values: {
      name: "",
      color: "",
      ...(defaultValues ?? {}),
    },
  })

  const handleOpen = (val: boolean) => {
    if (!isSignedIn) {
      router.push(appEnv.NEXT_PUBLIC_CLERK_SIGN_IN_URL)
    } else {
      setOpen(val)
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    "/api/color",
    getFetchAction<UpsetColorDto>(),
    {
      onError: (err) => {
        if (err instanceof UnauthorizedError) {
          router.replace(appEnv.NEXT_PUBLIC_CLERK_SIGN_IN_URL)
        } else {
          toast.error(err.message)
        }
      },
      onSuccess: () => {
        setOpen(false)
        toast.success("color like success")
      },
    }
  )

  const onSubmit = async (values: UpsetColorDto) => trigger(values)

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger className={triggerClassName} asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Color</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <HexInput
                      {...field}
                      onChange={(val) =>
                        form.setValue("color", val.toHexString())
                      }
                      popContent={
                        <ColorPicker
                          ghost
                          value={form.getValues().color}
                          onChange={(val) =>
                            form.setValue("color", val.toHexString())
                          }
                        />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isMutating}>
              {isMutating && (
                <span className="i-lucide-loader-2 mr-2 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ColorSaveDialog
