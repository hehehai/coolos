import { isReadable } from "@ctrl/tinycolor";
import ShowCard, { ShowCardProps } from "./ShowCard";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import toast from "react-hot-toast";
import { memo } from "react";

interface ExpansionStripProps extends Omit<ShowCardProps, 'children'> {
  colors: string[];
  point?: string;
}

const ExpansionStrip = memo((props: ExpansionStripProps) => {
  const { colors, point, ...otherProps } = props

  const copy = useCopyToClipboard();

  const handleCopyColor = (val: string) => {
    const success = copy(val);
    if (success) {
      toast("color copy success");
    }
  };

  return <ShowCard {...otherProps}>
    <div className="h-20 flex w-full">
      {colors.map((color, idx) => (
        <div
          key={idx}
          className="group flex items-center justify-center grow first:rounded-l-lg first:shadow-[inset_rgba(0,_0,_0,_0.08)_1px_1px,inset_rgba(0,0,0,0.08)_0_-1px] last:rounded-r-lg last:shadow-[inset_rgba(0,0,0,0.08)_-1px_1px,inset_rgba(0,0,0,0.08)_0_-1px] shadow-[inset_rgba(0,0,0,0.08)_0_1px,inset_rgba(0,0,0,0.08)_0_-1px] transition-all duration-300 ease-in-out hover:grow-[2] cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => handleCopyColor(color)}
        >
          <span
            className={cn('hidden group-hover:block', [isReadable(color, "#fff", { level: "AA", size: "small" }) ? 'text-white' : 'text-black'])}
          >
            {color.toUpperCase().replace('#', '')}
          </span>
        </div>
      ))}
    </div>
  </ShowCard>
})

ExpansionStrip.displayName = 'ExpansionStrip'

export default ExpansionStrip
