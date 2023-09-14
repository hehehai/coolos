import { LinkIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import ColorPickerFloat from "./ColorPickerFloat";
import ColorNameFloat from "./ColorNameFloat";
import ContrastCheckerFloat from "./ContrastCheckerFloat";
import GradientPaletteFloat from "./GradientPaletteFloat";

interface HomeGridCardProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  slug: string;
  description: string;
  link: string;
  float?: React.ReactNode;
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
        "relative bg-[#FBFBFB] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.07)_inset] rounded-2xl",
        className
      )}
    >
      <div className="relative h-full flex flex-col justify-between p-8">
        <div className="relative z-20 text-gray-400 font-medium">{title}</div>
        <div>
          <div className="relative z-20 text-3xl text-slate-900 font-medium max-w-xs">
            {slug}
          </div>
          <div className="relative z-20 mt-3 text-gray-500 text-sm leading-normal max-w-xs">
            {description}
          </div>
          <Link
            href={link}
            className="relative z-20 group mt-8 text-sm inline-flex items-center space-x-1"
          >
            <span>More ablout {title} </span>
            <LinkIcon className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      {float}
    </div>
  );
};

const HomeGrid = () => {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <HomeGridCard
            title="Color Picker"
            slug="Get useful color information"
            description="like conversion, combinations, blindness simulation and more."
            link="/picker"
            className="h-[360px]"
            float={<ColorPickerFloat />}
          />
        </div>
        <div className="col-span-4">
          <HomeGridCard
            title="Color Names"
            slug="Find distinctions"
            description="Browse our library of more than 500 color names."
            link="/colors"
            className="h-[360px] overflow-hidden"
            float={<ColorNameFloat />}
          />
        </div>
        <div className="col-span-4 row-span-3">
          <HomeGridCard
            title="Contrast Checker"
            slug="Easier to convey"
            description="Calculate the contrast ratio of text and background colors."
            link="/contrast"
            className="h-full"
            float={<ContrastCheckerFloat />}
          />
        </div>
        <div className="col-span-8 row-span-2">
          <HomeGridCard
            title="Gradient Palette"
            slug="Create a gradient palette between two colors"
            description="Custom ladder length, fine-tuned transition algorithm to generate a harmonious swatch."
            link="/gradient-palette"
            className="h-[360px]"
            float={<GradientPaletteFloat />}
          />
        </div>
        <div className="col-span-8">
          <div className="h-[100px] flex items-center px-5 bg-[#FBFBFB] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.07)_inset] rounded-2xl">
            Subscribe
          </div>
        </div>
      </div>
    </div>
  );
};

HomeGrid.displayName = "HomeGrid";

export default HomeGrid;
