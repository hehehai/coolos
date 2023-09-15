import { FC } from "react"
import { Metadata } from "next"

import PageWrapper from "@/components/shared/page-wrapper"

const pageMeta = {
  title: "Gradient Palette",
  description: "Create a gradient palette between two colors.",
}

export const metadata: Metadata = {
  title: pageMeta.title + "Coolors",
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
