import { FC, Suspense } from "react"
import Link from "next/link"

import { toolIntro } from "@/config/site"
import { cn } from "@/lib/utils"
import { LinkIcon } from "@/components/icons"

import ColorNameFloat from "./ColorNameFloat"
import ColorPickerFloat from "./ColorPickerFloat"
import ContrastCheckerFloat from "./ContrastCheckerFloat"
import GradientPaletteFloat from "./GradientPaletteFloat"
import HomeSubscribe from "./HomeSubscribe"

interface HomeGridCardProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string
  slug: string
  description: string
  link: string
  float?: React.ReactNode
}

const HomeGridCard: FC<HomeGridCardProps> = ({
  title,
  slug,
  description,
  link,
  className,
  float,
  ...otherProps
}) => {
  return (
    <div
      {...otherProps}
      className={cn(
        "relative rounded-2xl bg-[#FBFBFB] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.07)_inset]",
        className
      )}
    >
      <div className="relative flex h-full flex-col justify-between p-8">
        <div className="relative font-medium text-gray-400">{title}</div>
        <div>
          <div className="relative z-20 max-w-xs text-3xl font-medium text-slate-900">
            {slug}
          </div>
          <div className="relative z-20 mt-3 max-w-xs text-sm leading-normal text-gray-500">
            {description}
          </div>
          <Link
            href={link}
            className="group relative z-20 mt-8 inline-flex items-center space-x-1 text-sm"
          >
            <span>More about {title} </span>
            <LinkIcon className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <Suspense>{float}</Suspense>
    </div>
  )
}

const HomeGrid = () => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <HomeGridCard
            title={toolIntro["color-picker"].name}
            slug={toolIntro["color-picker"].slug}
            description={toolIntro["color-picker"].description}
            link="/picker"
            className="h-[360px]"
            float={<ColorPickerFloat />}
          />
        </div>
        <div className="col-span-4">
          <HomeGridCard
            title={toolIntro["color-names"].name}
            slug={toolIntro["color-names"].slug}
            description={toolIntro["color-names"].description}
            link="/colors"
            className="h-[360px] overflow-hidden"
            float={<ColorNameFloat />}
          />
        </div>
        <div className="col-span-4 row-span-3">
          <HomeGridCard
            title={toolIntro["contrast-checker"].name}
            slug={toolIntro["contrast-checker"].slug}
            description={toolIntro["contrast-checker"].description}
            link="/contrast"
            className="h-full"
            float={<ContrastCheckerFloat />}
          />
        </div>
        <div className="col-span-8 row-span-2">
          <HomeGridCard
            title={toolIntro["gradient-palette"].name}
            slug={toolIntro["gradient-palette"].slug}
            description={toolIntro["gradient-palette"].description}
            link="/gradient-palette"
            className="h-[360px]"
            float={<GradientPaletteFloat />}
          />
        </div>
        <div className="col-span-8">
          <div className="flex h-[100px] items-center rounded-2xl bg-[#FBFBFB] px-5 shadow-[0px_0px_3px_0px_rgba(0,0,0,0.07)_inset]">
            <HomeSubscribe />
          </div>
        </div>
      </div>
    </div>
  )
}

HomeGrid.displayName = "HomeGrid"

export default HomeGrid
