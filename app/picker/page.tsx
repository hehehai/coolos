'use client';

import { cn } from "@/lib/utils";
import ColorPicker from "@/components/shared/color-picker/ColorPicker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import { defaultColor } from "@/components/shared/color-picker";
import SectionCard from "./components/SectionCard";
import DisplayDesk from "./components/DisplayDesk";
import NavBar from "./components/NavBar";
import { navItems } from "./constants.schema";

const PickerPage = () => {
  const [color, setColor] = useColorState(defaultColor, {});

  return (
    <div className={cn(`bg-white relative pb-20`)}>
      <div className="text-center py-28">
        <div className="text-5xl font-bold text-slate-800 mb-8">
          Color Picker
        </div>
        <div className="text-xl text-gray-500 leading-relaxed">
          Get useful color information like conversion,
          <br />
          combinations, blindness simulation and more.
        </div>
      </div>

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
