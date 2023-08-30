import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { FC } from "react";
import Balancer from 'react-wrap-balancer'

const pageMeta = {
  title: 'Color Picker',
  description: 'Get useful color information like conversion, combinations, blindness simulation and more'
}

export const metadata: Metadata = {
  title: pageMeta.title + 'Coolors'
}

const PickerPageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={cn(`bg-white relative pb-20`)}>
    <div className="text-center py-28">
      <div className="text-5xl font-bold text-slate-800 mb-8">
        {pageMeta.title}
      </div>
      <div className="max-w-3xl mx-auto text-xl text-gray-500 leading-relaxed">
        <Balancer>{pageMeta.description}</Balancer>
      </div>
    </div>
    {children}
  </div>
}

export default PickerPageLayout
