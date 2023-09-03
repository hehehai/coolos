import { generateColor } from "@/components/shared/color-picker";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";
import { isReadable } from "@ctrl/tinycolor";
import { MoreHorizontal } from "lucide-react";
import { FC, useMemo } from "react";
import toast from "react-hot-toast";

interface NameColorCardProps {
  name: string;
  color: number[];
}

const NameColorCard: FC<NameColorCardProps> = ({ name, color }) => {
  const realColor = useMemo(() => {
    const [r, g, b] = color

    return generateColor({ r, g, b })
  }, [color])

  const textIsReadable = useMemo(() => {
    return isReadable(realColor, "#fff", { level: "AA", size: "large" });
  }, [realColor]);

  const copy = useCopyToClipboard();

  const handleCopyColor = (val: string) => {
    const success = copy(val);
    if (success) {
      toast.success("color copy success");
    }
  };

  return <div className="w-full">
    <div
      className="group h-32 flex items-center justify-center rounded-xl cursor-pointer"
      style={{ backgroundColor: realColor.toHexString() }}
      onClick={() => handleCopyColor(realColor.toHex().toUpperCase())}
    >
      <span
        className={cn("opacity-0 group-hover:opacity-100 transition-opacity", textIsReadable ? "text-white" : "text-black")}
      >
        {realColor.toHex().toUpperCase()}
      </span>
    </div>
    <div className="flex items-center justify-between p-1">
      <div className="text-sm text-slate-900">{name}</div>
      <div>
        <MoreHorizontal />
      </div>
    </div>
  </div>
}

NameColorCard.displayName = 'NameColorCard'

export default NameColorCard
