'use client';

import { Color } from "@/components/shared/color-picker";
import { cn } from "@/lib/utils";
import { isReadable } from "@ctrl/tinycolor";
import { memo, useMemo, useState } from "react";
import names from "@/components/shared/color-picker/data/names.json";
import { IconMaximize } from "@/components/icons/Maximize";
import ColorFullScreen from "@/components/shared/color-fullscreen";
import { useLockedBody } from 'usehooks-ts'

const DisplayDesk = memo(({ color }: { color: Color }) => {
  const boardTextIsReadable = useMemo(() => {
    return isReadable(color, "#fff", { level: "AA", size: "large" });
  }, [color]);

  const [isColorFullScreen, setColorFullScreen] = useState(false);
  const [_, setLocked] = useLockedBody(false, 'root')

  const handleColorFullScreen = () => {
    setColorFullScreen((state) => {
      const nectState = !state
      setLocked(nectState)
      return nectState
    });
  };

  return <div
    className={
      "w-full h-[320px] rounded-2xl flex items-center justify-center relative shadow-[inset_rgba(0,0,0,0.05)_0_0_0_1px]"
    }
    style={{ backgroundColor: color.toHex8String() }}
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
    <div className="absolute right-4 top-4">
      <IconMaximize
        className={cn(
          "w-5 h-5 cursor-pointer hover:animate-zoom",
          boardTextIsReadable
            ? "text-white/50 hover:text-white"
            : "text-black/50 hover:text-black"
        )}
        onClick={() => handleColorFullScreen()}
      />
    </div>

    <ColorFullScreen show={isColorFullScreen} color={color.toHexString()} onClose={handleColorFullScreen} />
  </div>
})

DisplayDesk.displayName = 'DisplayDesk'

export default DisplayDesk
