import { FC } from "react"
import { Metadata } from "next"

const pageMeta = {
  title: "Generator Color Palette",
  description: "Generate perfect color combinations for your designs.",
}

export const metadata: Metadata = {
  title: pageMeta.title + " - Coolos",
}

const PickerPageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export default PickerPageLayout
