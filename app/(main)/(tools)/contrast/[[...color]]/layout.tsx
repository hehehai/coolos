import { FC } from "react"
import { Metadata } from "next"

import PageWrapper from "@/components/shared/PageWrapper"

const pageMeta = {
  title: "Color Contrast Checker",
  description: "Calculate the contrast ratio of text and background colors.",
}

export const metadata: Metadata = {
  title: pageMeta.title + " - Coolos",
}

const ContrastPageLayout: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PageWrapper title={pageMeta.title} description={pageMeta.description}>
      {children}
    </PageWrapper>
  )
}

export default ContrastPageLayout
