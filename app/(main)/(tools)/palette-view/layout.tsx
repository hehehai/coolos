import { FC } from "react"
import { Metadata } from "next"

import PageWrapper from "@/components/shared/PageWrapper"

const pageMeta = {
  title: "Color Palette view",
  description: "View the specific color values of the swatch",
}

export const metadata: Metadata = {
  title: pageMeta.title + " - Coolos",
}

const PageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageWrapper title={pageMeta.title} description={pageMeta.description}>
      {children}
    </PageWrapper>
  )
}

export default PageLayout
