import { FC } from "react"
import { Metadata } from "next"

import PageWrapper from "@/components/shared/page-wrapper"

const pageMeta = {
  title: "Color Picker",
  description:
    "Get useful color information like conversion, combinations, blindness simulation and more",
}

export const metadata: Metadata = {
  title: pageMeta.title + " - Coolos",
}

const PickerPageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageWrapper title={pageMeta.title} description={pageMeta.description}>
      {children}
    </PageWrapper>
  )
}

export default PickerPageLayout
