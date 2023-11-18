import { FC } from "react"
import { Metadata } from "next"

import { toolIntro } from "@/config/site"
import PageWrapper from "@/components/shared/PageWrapper"

export const metadata: Metadata = {
  title: toolIntro["explore-palette"].name,
  description: toolIntro["explore-palette"].description,
}

const PageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageWrapper
      title={toolIntro["explore-palette"].name}
      description={toolIntro["explore-palette"].description}
    >
      {children}
    </PageWrapper>
  )
}

export default PageLayout
