import { cn } from "@/lib/utils"
import { Color } from "@/components/shared/color-picker"

import PaletteBlockValue from "./PaletteBlockValue"

interface PaletteBlockProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "color" | "onChange"> {
  block: {
    id: string
    color: Color
  }
  onChange: (color: Color) => void
}

const PaletteBlock = ({ block, onChange, ...props }: PaletteBlockProps) => {
  return (
    <div
      {...props}
      style={{
        backgroundColor: block.color.toHexString(),
      }}
      className={cn(
        "relative flex h-full flex-col items-center justify-center space-y-3",
        props.className
      )}
    >
      <div>Add</div>
      <div>Remove</div>
      <div>Save</div>
      <div>Drag</div>
      <div>Copy</div>
      <PaletteBlockValue color={block.color} onChange={onChange} />
      <div>Second info</div>
    </div>
  )
}

PaletteBlock.displayName = "PaletteBlock"

export default PaletteBlock
