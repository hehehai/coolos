import { memo } from "react"

import { cn } from "@/lib/utils"

export interface FloatProps extends React.ComponentPropsWithoutRef<"div"> {
  color: string
  innerClass?: string
  alphaBackground?: boolean
}

const Float = memo(
  ({
    color,
    className,
    style,
    innerClass,
    alphaBackground = false,

    ...rest
  }: FloatProps) => {
    return (
      <div
        className={cn(
          "flex h-[20px] w-[20px] cursor-grab items-center justify-center rounded-full border-[5px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_10px_10px_-5px_rgba(0,0,0,0.05)] active:shadow-[0_0_0_1px_#0066ff,0_10px_10px_-5px_rgba(0,0,0,0.05)] focus:active:shadow-[0_0_0_1px_#0066ff,0_10px_10px_-5px_rgba(0,0,0,0.05)]",
          alphaBackground ? "bg-[length:8px_8px]" : "bg-transparent",
          className
        )}
        style={
          alphaBackground
            ? {
                backgroundImage:
                  "conic-gradient(rgba(0, 0, 0, 0.06) 0 25%,transparent 0 50%,rgba(0, 0, 0, 0.06) 0 75%,transparent 0)",
                ...style,
              }
            : style
        }
        {...rest}
      >
        <span
          className={cn(
            "pointer-events-none h-[10px] w-[10px] rounded-full shadow-[insert_0_0_0_1px_rgba(0,0,0,0.15)]",
            innerClass
          )}
          style={{ backgroundColor: color }}
        />
      </div>
    )
  }
)

Float.displayName = "Float"

export default Float
