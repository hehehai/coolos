import { isReadable } from "@ctrl/tinycolor";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import toast from "react-hot-toast";
import { memo } from "react";

interface ExpansionStripProps extends React.ComponentPropsWithoutRef<'div'> {
  colors: string[];
}

const ExpansionStrip = memo((props: ExpansionStripProps) => {
  const { colors, ...otherProps } = props

  const copy = useCopyToClipboard();

  const handleCopyColor = (val: string) => {
    const success = copy(val);
    if (success) {
      toast.success("color copy success");
    }
  };

  return <div {...otherProps} className={cn("h-full w-full flex", otherProps.className)}>
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
})

ExpansionStrip.displayName = 'ExpansionStrip'

export default ExpansionStrip
