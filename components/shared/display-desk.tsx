'use client';

import { Color } from "@/components/shared/color-picker";
import { cn } from "@/lib/utils";
import { memo, useMemo, useState } from "react";
import { IconMaximize } from "@/components/icons/Maximize";
import ColorFullScreen from "@/components/shared/color-fullscreen";
import { useLockedBody } from 'usehooks-ts'
import { isReadable } from "@ctrl/tinycolor";

const DisplayDesk = memo(({ color, className, children }: { color: Color, className?: string, children: React.ReactNode }) => {
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
    className={cn("relative", className)}
    style={{ backgroundColor: color.toHex8String() }}
  >
    {children}
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
