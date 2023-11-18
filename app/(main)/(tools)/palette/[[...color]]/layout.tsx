import { FC } from "react"
import { Metadata } from "next"

import { toolIntro } from "@/config/site"

export const metadata: Metadata = {
  title: toolIntro["palette-generator"].name,
  description: toolIntro["palette-generator"].description,
}

const PickerPageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export default PickerPageLayout
