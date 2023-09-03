"use client";

import { cn } from "@/lib/utils";
import { forwardRef, Ref, useMemo, useState } from "react";
import { IconChevronDown, IconChevronUp, IconCopy } from "@/components/icons";
import PickerPanel from "@/components/shared/color-picker/panels/Picker";
import { Color } from "@/components/shared/color-picker/color";
import {
  ColorGenInput,
  CommonPickerPanelProps,
} from "@/components/shared/color-picker/interface";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import {
  defaultColor,
  generateColor,
} from "@/components/shared/color-picker/util";
import HSB from "@/components/shared/color-picker/panels/HSB";
import HSL from "@/components/shared/color-picker/panels/HSL";
import RGB from "@/components/shared/color-picker/panels/RGB";
import CMYK from "@/components/shared/color-picker/panels/CMYK";
import LAB from "@/components/shared/color-picker/panels/LAB";
import Name from "@/components/shared/color-picker/panels/Name";
import { IconEyeDropper } from "@/components/icons/EyeDropper";
import { useEyeDropper } from "@/hooks/useEyeDropper";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { toast } from "react-hot-toast";

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
];

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
};

interface ColorPickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "onChange" | "defaultValue"
  > {
  ghost?: boolean;
  value?: ColorGenInput;
  defaultValue?: ColorGenInput;
  onChange?: (color: Color) => void;
}

const BaseColorPicker = (
  { ghost = false, value, defaultValue, onChange }: ColorPickerProps,
  ref: Ref<HTMLDivElement>
) => {
  const [color, setColor] = useColorState(defaultColor, {
    value,
    defaultValue,
  });
  const [visibleMethodMenu, setVisibleMethodMenu] = useState<boolean>(false);
  const [pickerMethod, setPickerMethod] = useState<PickerMethod>(
    PickerMethod.Picker
  );
  const { isSupport, onOpenDropper } = useEyeDropper();
  const copy = useCopyToClipboard();

  const PickerPanelComponent = useMemo(() => {
    return pickerMethodPanel[pickerMethod];
  }, [pickerMethod]);

  const handleToggleMethodPickerMenu = () => {
    setVisibleMethodMenu((val) => !val);
  };

  const handleSelectPickerMethod = (val: PickerMethod) => {
    setPickerMethod(val);
    setVisibleMethodMenu(false);
  };

  const handleColorChange = (val: Color) => {
    setColor(val);
    onChange?.(val);
  };

  const handleOpenDropper = async () => {
    const color = await onOpenDropper();
    if (color) {
      handleColorChange(generateColor(color));
    }
  };

  const handleCopyColor = () => {
    const success = copy(color.toHex());
    if (success) {
      toast.success("color copy success");
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        ghost ? 'w-full h-full bg-transparent' : 'w-[300px] h-[320px] shrink-0 bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.1)]'
      )}
    >
      <div className={cn("relative w-full h-[calc(100%-46px)]")}>
        {visibleMethodMenu && (
          <div
            className={cn(
              "absolute z-[10] p-[10px] bg-white w-full h-full space-y-1 overflow-auto no-scrollbar"
            )}
          >
            {pickerMethodList.map((item) => (
              <div
                key={item}
                className={cn(
                  "py-[8px] px-[10px] text-sm text-slate-900 rounded-md cursor-pointer hover:bg-gray-100",
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
        <div className={"w-full h-full p-4 space-y-4"}>
          <PickerPanelComponent value={color} onChange={handleColorChange} />
        </div>
      </div>
      <div
        className={cn(
          "h-[46px] px-4 flex items-center justify-between relative z-[11] shadow-[0_-1px_rgba(0,0,0,0.075)]"
        )}
      >
        <div
          className={cn(
            "flex items-center space-x-1 cursor-pointer text-sm px-1"
          )}
          onClick={handleToggleMethodPickerMenu}
        >
          <span>{pickerMethod}</span>
          {visibleMethodMenu ? <IconChevronDown /> : <IconChevronUp />}
        </div>
        <div className="flex items-center space-x-3">
          {isSupport && (
            <IconEyeDropper
              className="text-gray-500 hover:text-slate-900 cursor-pointer"
              onClick={handleOpenDropper}
            />
          )}
          <IconCopy
            className="text-gray-500 hover:text-slate-900 cursor-pointer"
            onClick={handleCopyColor}
          />
        </div>
      </div>
    </div>
  );
};

const ColorPicker = forwardRef(BaseColorPicker);

ColorPicker.displayName = "ColorPicker";

export default ColorPicker;
