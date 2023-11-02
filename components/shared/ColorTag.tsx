import { cn } from "@/lib/utils"

interface ColorTagProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: string
  active?: boolean
}

const ColorTag = ({
  color,
  active,
  children,
  ...otherProps
}: ColorTagProps) => {
  return (
    <div
      {...otherProps}
      className={cn(
        "flex cursor-pointer items-center space-x-2 rounded-lg bg-zinc-100 px-4 py-2 hover:bg-zinc-200",
        { "text-blue-600 bg-blue-100": active },
        otherProps.className
      )}
    >
      {color && (
        <div
          className="h-3 w-3 rounded-full shadow-[inset_rgba(0,0,0,0.08)_0_0_0_1px]"
          style={{ backgroundColor: color }}
        />
      )}
      <div className="text-sm">{children}</div>
    </div>
  )
}

export default ColorTag
