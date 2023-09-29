import { cn } from "@/lib/utils"

const PlusFloat = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-white text-2xl text-slate-900 hover:bg-gray-100",
        className
      )}
    >
      <span className="i-lucide-plus"></span>
    </div>
  )
}

export default PlusFloat
