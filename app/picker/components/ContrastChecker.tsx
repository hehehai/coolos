import { cn } from "@/lib/utils";
import ShowCard from "./ShowCard";
import { Color, colorContrastLevel, generateColor } from "@/components/shared/color-picker";
import { memo } from "react";

const CheckerDemo = memo((props: { color: string, className?: string }) => {
  return <div className={cn('w-full px-5 py-8 text-center space-y-4 rounded-lg border border-gray-200', props.className)} style={{ color: props.color }}>
    <p className="text-2xl">Quote n. 3</p>
    <p>Courage is not the absence of fear, but rather the judgement that something else is more important than fear.</p>
    <p className="font-medium">Ambrose Redmoon</p>
  </div>
})

CheckerDemo.displayName = "CheckerDemo";

const ContrastChecker = memo(({ color }: { color: Color }) => {
  const lightCheck = colorContrastLevel(generateColor('#ffffff'), color)
  const darkCheck = colorContrastLevel(generateColor('#000000'), color)

  return <div className="columns-2 gap-10">
    <ShowCard
      title="White background"
      extra={
        <div
          className={cn('px-1 rounded-sm text-sm', lightCheck.color, lightCheck.bg)}
        >
          {lightCheck.label} {lightCheck.level}
        </div>
      }
    >
      <CheckerDemo color={color.toHexString()} className="bg-white" />
    </ShowCard>
    <ShowCard
      title="Black background"
      extra={
        <div
          className={cn('px-1 rounded-sm text-sm', darkCheck.color, darkCheck.bg)}
        >
          {darkCheck.label} {darkCheck.level}
        </div>
      }
    >
      <CheckerDemo color={color.toHexString()} className="bg-black" />
    </ShowCard>
  </div>;
})

ContrastChecker.displayName = "ContrastChecker";

export default ContrastChecker;
