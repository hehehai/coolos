import { FC } from "react"
import { Metadata } from "next"

import PageWrapper from "@/components/shared/PageWrapper"

const pageMeta = {
  title: "Trending Color Palettes",
  description:
    "Get inspired by thousands of beautiful color schemes and make something cool!",
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
