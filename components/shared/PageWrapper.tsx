import { ComponentPropsWithoutRef, forwardRef } from "react"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

interface PageWrapperProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
}

const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ title, description, children, ...otherProps }, ref) => {
    return (
      <div
        ref={ref}
        {...otherProps}
        className={cn(`relative bg-white pb-20`, otherProps.className)}
      >
        <div className="py-28 text-center">
          <div className="mb-8 text-5xl font-bold text-slate-800">{title}</div>
          {description && (
            <div className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-500">
              <Balancer>{description}</Balancer>
            </div>
          )}
        </div>
        {children}
      </div>
    )
  }
)

PageWrapper.displayName = "PageWrapper"

export default PageWrapper
