'use client';

import ColorPicker from "@/components/shared/color-picker/ColorPicker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import { defaultColor, generateColor } from "@/components/shared/color-picker";
import SectionCard from "./components/SectionCard";
import DisplayDesk from "./components/DisplayDesk";
import NavBar from "./components/NavBar";
import { navItems } from "./constants.schema";
import { useMemo } from "react";

const PickerPage = ({ params }: { params: { color?: string[] } }) => {
  // route color params
  const firstColor = useMemo(() => {
    if (!params.color?.length) return defaultColor
    const routeColor = generateColor(params.color[0])
    return routeColor.isValid ? routeColor : defaultColor
  }, [params.color])
  const [color, setColor] = useColorState(firstColor, {});

  return (
    <div>
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-5 mb-28">
        <DisplayDesk color={color} />
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
