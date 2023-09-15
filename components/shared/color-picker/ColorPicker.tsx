"use client"

import { forwardRef, Ref, useMemo, useState } from "react"
import { toast } from "react-hot-toast"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useEyeDropper } from "@/hooks/useEyeDropper"
import { IconChevronDown, IconChevronUp, IconCopy } from "@/components/icons"
import { IconEyeDropper } from "@/components/icons/EyeDropper"
import { Color } from "@/components/shared/color-picker/color"
import useColorState from "@/components/shared/color-picker/hooks/useColorState"
import {
  ColorGenInput,
  CommonPickerPanelProps,
} from "@/components/shared/color-picker/interface"
import CMYK from "@/components/shared/color-picker/panels/CMYK"
import HSB from "@/components/shared/color-picker/panels/HSB"
import HSL from "@/components/shared/color-picker/panels/HSL"
import LAB from "@/components/shared/color-picker/panels/LAB"
import Name from "@/components/shared/color-picker/panels/Name"
import PickerPanel from "@/components/shared/color-picker/panels/Picker"
import RGB from "@/components/shared/color-picker/panels/RGB"
import {
  defaultColor,
  generateColor,
} from "@/components/shared/color-picker/util"

export enum PickerMethod {
  Picker = "Picker",
  HSB = "HSB",
  HSL = "HSL",
  RGB = "RGB",
  CMYK = "CMYK",
  LAB = "LAB",
  Name = "Name",
}

const pickerMethodList = [
  PickerMethod.Picker,
  PickerMethod.HSB,
  PickerMethod.HSL,
  PickerMethod.RGB,
  PickerMethod.CMYK,
  PickerMethod.LAB,
  PickerMethod.Name,
]

const pickerMethodPanel: Record<
  PickerMethod,
  React.ComponentType<CommonPickerPanelProps>
> = {
  [PickerMethod.Picker]: PickerPanel,
  [PickerMethod.HSB]: HSB,
  [PickerMethod.HSL]: HSL,
  [PickerMethod.RGB]: RGB,
  [PickerMethod.CMYK]: CMYK,
  [PickerMethod.LAB]: LAB,
  [PickerMethod.Name]: Name,
}

interface ColorPickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "onChange" | "defaultValue"
  > {
  ghost?: boolean
  value?: ColorGenInput
  defaultValue?: ColorGenInput
  onChange?: (color: Color) => void
}

const BaseColorPicker = (
  { ghost = false, value, defaultValue, onChange }: ColorPickerProps,
  ref: Ref<HTMLDivElement>
) => {
  const [color, setColor] = useColorState(defaultColor, {
    value,
    defaultValue,
  })
  const [visibleMethodMenu, setVisibleMethodMenu] = useState<boolean>(false)
  const [pickerMethod, setPickerMethod] = useState<PickerMethod>(
    PickerMethod.Picker
  )
  const { isSupport, onOpenDropper } = useEyeDropper()
  const copy = useCopyToClipboard()

  const PickerPanelComponent = useMemo(() => {
    return pickerMethodPanel[pickerMethod]
  }, [pickerMethod])

  const handleToggleMethodPickerMenu = () => {
    setVisibleMethodMenu((val) => !val)
  }

  const handleSelectPickerMethod = (val: PickerMethod) => {
    setPickerMethod(val)
    setVisibleMethodMenu(false)
  }

  const handleColorChange = (val: Color) => {
    setColor(val)
    onChange?.(val)
  }

  const handleOpenDropper = async () => {
    const color = await onOpenDropper()
    if (color) {
      handleColorChange(generateColor(color))
    }
  }

  const handleCopyColor = () => {
    const success = copy(color.toHex())
    if (success) {
      toast.success("color copy success")
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        ghost
          ? "h-full w-full bg-transparent"
          : "h-[320px] w-[300px] shrink-0 rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className={cn("relative h-[calc(100%-46px)] w-full")}>
        {visibleMethodMenu && (
          <div
            className={cn(
              "no-scrollbar absolute z-[10] h-full w-full space-y-1 overflow-auto bg-white p-[10px]"
            )}
          >
            {pickerMethodList.map((item) => (
              <div
                key={item}
                className={cn(
                  "cursor-pointer rounded-md px-[10px] py-[8px] text-sm text-slate-900 hover:bg-gray-100",
                  {
                    "bg-gray-100": pickerMethod === item,
                  }
                )}
                onClick={() => handleSelectPickerMethod(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
        <div className={"h-full w-full space-y-4 p-4"}>
          <PickerPanelComponent value={color} onChange={handleColorChange} />
        </div>
      </div>
      <div
        className={cn(
          "relative z-[11] flex h-[46px] items-center justify-between px-4 shadow-[0_-1px_rgba(0,0,0,0.075)]"
        )}
      >
        <div
          className={cn(
            "flex cursor-pointer items-center space-x-1 px-1 text-sm"
          )}
          onClick={handleToggleMethodPickerMenu}
        >
          <span>{pickerMethod}</span>
          {visibleMethodMenu ? <IconChevronDown /> : <IconChevronUp />}
        </div>
        <div className="flex items-center space-x-3">
          {isSupport && (
            <IconEyeDropper
              className="cursor-pointer text-gray-500 hover:text-slate-900"
              onClick={handleOpenDropper}
            />
          )}
          <IconCopy
            className="cursor-pointer text-gray-500 hover:text-slate-900"
            onClick={handleCopyColor}
          />
        </div>
      </div>
    </div>
  )
}

const ColorPicker = forwardRef(BaseColorPicker)

ColorPicker.displayName = "ColorPicker"

export default ColorPicker
