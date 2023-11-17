"use client"

import { useCallback, useMemo, useState } from "react"
import { UpsetPaletteDto, upsetPaletteDtoSchema } from "@/db/dto/palette.dto"
import { zodResolver } from "@hookform/resolvers/zod"
import { Palette } from "@prisma/client"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"
import { z } from "zod"

import { getFetchAction } from "@/lib/fetch-action"
import { Color, generateColor } from "@/components/shared/color-picker"
import ColorPicker from "@/components/shared/color-picker/ColorPicker"
import HexInput from "@/components/shared/color-picker/components/HexInput"
import PaletteGroup from "@/components/shared/PaletteGroup"
import { Badge } from "@/components/ui/badge"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export const updatePaletteDtoSchema = upsetPaletteDtoSchema.merge(
  z.object({
    colors: z
      .any()
      .array()
      .min(2, { message: "Minimum 2 colors" })
      .max(12, { message: "Maximum 12 colors" }),
  })
)
export type UpdatePaletteDto = z.infer<typeof updatePaletteDtoSchema>

interface UpdateFormDialogProps {
  palette: Palette
  children: React.ReactNode
  onSuccess?: (data?: Palette) => void
}

export const UpdateFormDialog = ({
  palette,
  children,
  onSuccess,
}: UpdateFormDialogProps) => {
  const [open, setOpen] = useState(false)

  const [copyPalette, setCopyPalette] = useState(
    palette.colors.map((c) => generateColor(c))
  )

  const [activeIdx, setActiveIdx] = useState(0)
  const activeColor = useMemo(() => {
    return copyPalette[activeIdx]
  }, [activeIdx, copyPalette])

  const handleChangeActiveColor = useCallback(
    (color: Color) => {
      setCopyPalette((prev) => {
        prev[activeIdx] = color
        return [...prev]
      })
    },
    [activeIdx]
  )

  const form = useForm<UpdatePaletteDto>({
    resolver: zodResolver(updatePaletteDtoSchema),
    defaultValues: {
      id: palette.id,
      name: palette.name.trim(),
      description: palette.description ?? "",
      colors: copyPalette,
      public: palette.public,
      tags: palette.tags ?? [],
    },
  })

  const { trigger, isMutating } = useSWRMutation(
    `/api/panel/palette/${palette.id}`,
    getFetchAction<UpsetPaletteDto>(),
    {
      onError: (err) => {
        toast.error(err.message)
      },
      onSuccess: (data) => {
        setOpen(false)
        toast.success("Palette updated")
        onSuccess?.(data?.data)
      },
    }
  )

  const onSubmit = async (values: UpsetPaletteDto) => {
    return await trigger({
      ...values,
      colors: copyPalette.map((c) => c.toHex()),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Palette</DialogTitle>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      spellCheck={false}
                      {...field}
                      value={field.value.toString()}
                      onChange={(event) => {
                        field.onChange(
                          event.target.value.split(",").map((t) => t.trim())
                        )
                      }}
                    />
                  </FormControl>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {field.value
                      .filter((t) => t.trim())
                      .map((tag: string, idx: number) => (
                        <Badge key={idx} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <HexInput
                  value={activeColor}
                  onChange={handleChangeActiveColor}
                  popContent={
                    <ColorPicker
                      ghost
                      value={activeColor}
                      onChange={handleChangeActiveColor}
                    />
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div>
              <PaletteGroup
                palette={copyPalette}
                active={activeColor}
                onChange={(_, idx) => setActiveIdx(idx)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button type="submit" disabled={isMutating}>
                {isMutating && (
                  <span className="i-lucide-loader-2 mr-2 animate-spin" />
                )}
                Submit
              </Button>
              <FormField
                control={form.control}
                name="public"
                render={({ field }) => (
                  <FormItem
                    className="flex items-center"
                    direction="horizontal"
                  >
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Public</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateFormDialog
