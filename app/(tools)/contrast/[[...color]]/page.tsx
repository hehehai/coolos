'use client';

import { colorContrastCheck, generateColor } from "@/components/shared/color-picker"
import ColorPicker from "@/components/shared/color-picker/ColorPicker";
import HexInput from "@/components/shared/color-picker/components/HexInput"
import useColorState from "@/components/shared/color-picker/hooks/useColorState"
import DisplayDesk from "@/components/shared/display-desk"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import ContrastDetail from "./_components/ContrastDetail";

const contrastScoreTip = [
  'Poor contrast for all text sizes.',
  'Poor contrast for small text (below 18pt) and good contrast for large text (above 18pt or bold above 14pt).',
  'Good contrast for all text sizes.',
  'Good contrast for small text (below 18pt) and great contrast for large text (above 18pt or bold above 14pt).',
  'Great contrast for all text sizes.'
]

const ContrastPage = ({ params }: { params: { colors?: string[] } }) => {
  // route color params
  const routeColor = useMemo(() => {
    const result = {
      bg: generateColor('#fff'),
      text: generateColor('#000')
    }

    if (!params.colors?.length) return result
    const colors = params.colors[0]
    const [textStr, bgStr] = colors.split("-")

    if (textStr) {
      const textColor = generateColor(textStr)
      if (textColor.isValid) {
        result.text = textColor
      }
    }
    if (bgStr) {
      const bgColor = generateColor(bgStr)
      if (bgColor.isValid) {
        result.bg = bgColor
      }
    }

    return result
  }, [params.colors])
  const [textColor, setTextColor] = useColorState(routeColor.text);
  const [bgColor, setBgColor] = useColorState(routeColor.bg);

  const contrast = useMemo(() => {
    return colorContrastCheck(textColor, bgColor)
  }, [textColor, bgColor])

  const deskText = useMemo(() => {
    return <div className={cn('w-full px-20 py-8 text-center space-y-5')} style={{ color: textColor.toHexString() }}>
      <p className="text-4xl">Quote n. 18</p>
      <p>Before I got married I had six theories about bringing up children; now I have six children and no theories.</p>
      <p className="font-medium">John Wilmot</p>
    </div>
  }, [textColor])

  return <div>
    <div className="max-w-7xl mx-auto flex items-center mb-28 h-[400px] rounded-2xl border border-zinc-200">
      <div className="w-1/2 h-full p-8 flex flex-col justify-between">
        <div className="flex items-center gap-10">
          <div className="grow">
            <div className="text-sm mb-2">Text color</div>
            <HexInput value={textColor} onChange={(val) => setTextColor(val)} popContent={
              <ColorPicker ghost value={textColor} onChange={(val) => setTextColor(val)} />
            } />
          </div>
          <div className="grow">
            <div className="text-sm mb-2">Background color</div>
            <HexInput value={bgColor} onChange={(val) => setBgColor(val)} popContent={
              <ColorPicker ghost value={bgColor} onChange={(val) => setBgColor(val)} />
            } />
          </div>
        </div>
        <div>
          <div className="text-sm mb-2">Contrast</div>
          {contrast && <ContrastDetail contrast={contrast} />}
        </div>
        {contrast && <div className="text-sm text-zinc-400 h-10">{contrastScoreTip[contrast?.score.level.length - 1]}</div>}
      </div>
      <DisplayDesk className="w-1/2 h-full flex items-center justify-center rounded-r-2xl border-l border-zinc-200" color={bgColor} fullChidlren={
        <div className="w-full h-full flex items-center justify-center">
          {deskText}
        </div>
      }>
        {deskText}
      </DisplayDesk>
    </div>

    <div className="max-w-7xl mx-auto">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        How does it work?
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        This tool follows the Web Content Accessibility Guidelines (WCAG), which are a series of recommendations for making the web more accessible.
        <br />
        Regarding colors, the standard defines two levels of contrast ratio: AA (minimum contrast) and AAA (enhanced contrast).
        <br />
        The level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (at least 18pt) or bold text.
        <br />
        The level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text or bold text.
        <br />
        <br />

        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4"
        >
          Learn more
        </a>
      </p>
    </div>
  </div>
}

export default ContrastPage
