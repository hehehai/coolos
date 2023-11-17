"use client"

import { useState } from "react"
import { UpsetColorDto, upsetColorDtoSchema } from "@/db/dto/color.dto"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"

import { getFetchAction } from "@/lib/fetch-action"
import ColorPicker from "@/components/shared/color-picker/ColorPicker"
import HexInput from "@/components/shared/color-picker/components/HexInput"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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

interface UpdateFormDialogProps {
  color: Color
  children: React.ReactNode
  onSuccess?: (data?: Color) => void
}

const ColorSaveDialog = ({
  color,
  children,
  onSuccess,
}: UpdateFormDialogProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<UpsetColorDto>({
    resolver: zodResolver(upsetColorDtoSchema),
    values: {
      id: color.id,
      name: color.name,
      color: color.color,
    },
  })

  const { trigger, isMutating } = useSWRMutation(
    `/api/panel/color/${color.id}`,
    getFetchAction<UpsetColorDto>(),
    {
      onError: (err) => {
        toast.error(err.message)
      },
      onSuccess: (data) => {
        setOpen(false)
        toast.success("color like success")
        onSuccess?.(data?.data)
      },
    }
  )

  const onSubmit = async (values: UpsetColorDto) => trigger(values)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
