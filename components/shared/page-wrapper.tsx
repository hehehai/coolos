import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import Balancer from "react-wrap-balancer";

interface PageWrapperProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
}

const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(({ title, description, children, ...otherProps }, ref) => {
  return <div ref={ref} {...otherProps} className={cn(`bg-white relative pb-20`, otherProps.className)}>
    <div className="text-center py-28">
      <div className="text-5xl font-bold text-slate-800 mb-8">
        {title}
      </div>
      {description && <div className="max-w-3xl mx-auto text-xl text-gray-500 leading-relaxed">
        <Balancer>{description}</Balancer>
      </div>}
    </div>
    {children}
  </div>
})

PageWrapper.displayName = 'PageWrapper'

export default PageWrapper;
