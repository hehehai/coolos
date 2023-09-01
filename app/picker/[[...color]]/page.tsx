'use client';

import ColorPicker from "@/components/shared/color-picker/ColorPicker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import { defaultColor, generateColor } from "@/components/shared/color-picker";
import names from "@/components/shared/color-picker/data/names.json";
import SectionCard from "@/components/shared/section-card";
import DisplayDesk from "@/components/shared/display-desk";
import NavBar from "./components/NavBar";
import { navItems } from "./constants.schema";
import { useMemo } from "react";
import { isReadable } from "@ctrl/tinycolor";
import { cn } from "@/lib/utils";

const PickerPage = ({ params }: { params: { color?: string[] } }) => {
  // route color params
  const firstColor = useMemo(() => {
    if (!params.color?.length) return defaultColor
    const routeColor = generateColor(params.color[0])
    return routeColor.isValid ? routeColor : defaultColor
  }, [params.color])
  const [color, setColor] = useColorState(firstColor, {});
  const boardTextIsReadable = useMemo(() => {
    return isReadable(color, "#fff", { level: "AA", size: "large" });
  }, [color]);

  return (
    <div>
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-5 mb-28">
        <DisplayDesk
          className="w-full h-[320px] rounded-2xl flex items-center justify-center shadow-[inset_rgba(0,0,0,0.05)_0_0_0_1px]"
          color={color}
        >
          <div
            className={cn(
              "text-center",
              boardTextIsReadable ? "text-white" : "text-black"
            )}
          >
            <p
              className={cn(
                "mb-5 text-xl",
                boardTextIsReadable ? "text-white/50" : "text-black/50"
              )}
            >
              {color.toHex()}
            </p>
            <p className="text-4xl font-bold">
              {color.findClosestColor(names)}
            </p>
          </div>
        </DisplayDesk>
        <ColorPicker value={color} onChange={setColor}></ColorPicker>
      </div>

      <NavBar navItems={navItems} />
      <div className="mt-24 px-4 space-y-10">
        {Object.entries(navItems).map(([key, item]) => (
          <SectionCard
            key={key}
            id={key}
            title={item.label}
            description={item.description}
          >
            <item.Component color={color} />
          </SectionCard>
        ))}
      </div>
    </div>
  );
};

export default PickerPage;
