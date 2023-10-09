"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"
import { z } from "zod"

import { getFetchAction } from "@/lib/fetch-action"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Badge } from "../ui/badge"
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
import { Textarea } from "../ui/textarea"
import { Color, generateColor } from "./color-picker"
import ColorPicker from "./color-picker/ColorPicker"
import HexInput from "./color-picker/components/HexInput"
import PaletteGroup from "./PaletteGroup"

export const UpsetPaletteDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name is max 20 characters" }),
  description: z
    .string()
    .max(200, { message: "Description is max 200 characters" }),
  tags: z.string().array().max(5, { message: "Maximum 5 tags" }),
  colors: z
    .any()
    .array()
    .min(2, { message: "Minimum 2 colors" })
    .max(12, { message: "Maximum 12 colors" }),
})
export type UpsetPaletteDto = z.infer<typeof UpsetPaletteDtoSchema>

interface PaletteSaveDialogProps extends React.PropsWithChildren {
  triggerClassName?: string
  defaultValues?: Partial<Omit<UpsetPaletteDto, "colors">>
  palette: Color[]
}

const PaletteSaveDialog = ({
  triggerClassName,
  defaultValues,
  palette,
  children,
}: PaletteSaveDialogProps) => {
  const [open, setOpen] = useState(false)

  const [copyPalette, setCopyPalette] = useState(
    palette.map((c) => c.toHexString()).map((c) => generateColor(c))
  )

  useEffect(() => {
    setCopyPalette(
      palette.map((c) => c.toHexString()).map((c) => generateColor(c))
    )
  }, [palette])

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

  const form = useForm<UpsetPaletteDto>({
    resolver: zodResolver(UpsetPaletteDtoSchema),
    values: {
      name: "",
      description: "",
      tags: [],
      ...(defaultValues ?? {}),
      colors: copyPalette,
    },
  })

  const { trigger, isMutating } = useSWRMutation(
    "/api/palette",
    getFetchAction<UpsetPaletteDto>(),
    {
      onError: (err) => {
        console.log(err)
        toast.error(err.message)
      },
      onSuccess: () => {
        setOpen(false)
        form.reset()
        toast.success("palette save success")
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
      <DialogTrigger className={triggerClassName} asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Palette</DialogTitle>
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
                    {field.value.map((t, i) => (
                      <Badge key={i} variant="secondary">
                        {t}
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

export default PaletteSaveDialog
