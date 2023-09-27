"use client"

import { useMemo } from "react"

import {
  colorContrastCheck,
  generateColor,
} from "@/components/shared/color-picker"
import HexInput from "@/components/shared/color-picker/components/HexInput"
import useColorState from "@/components/shared/color-picker/hooks/useColorState"
import ContrastDetail from "@/components/shared/ContrastDetail"

const ContrastCheckerFloat = () => {
  const [textColor, setTextColor] = useColorState(generateColor("#000"))
  const [bgColor, setBgColor] = useColorState(generateColor("#fff"))

  const contrast = useMemo(() => {
    return colorContrastCheck(textColor, bgColor)
  }, [textColor, bgColor])

  return (
    <div className="absolute right-1/2 top-20 w-full translate-x-1/2 px-8">
      <div className="mb-3 flex items-center gap-4">
        <div className="grow">
          <HexInput value={textColor} onChange={(val) => setTextColor(val)} />
        </div>
        <div className="grow">
          <HexInput value={bgColor} onChange={(val) => setBgColor(val)} />
        </div>
      </div>
      {contrast && <ContrastDetail contrast={contrast} />}
    </div>
  )
}

export default ContrastCheckerFloat
