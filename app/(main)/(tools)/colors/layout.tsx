import { FC } from "react"
import { Metadata } from "next"

import { toolIntro } from "@/config/site"
import PageWrapper from "@/components/shared/PageWrapper"

export const metadata: Metadata = {
  title: toolIntro["color-names"].name,
  description: toolIntro["color-names"].description,
}

const ColorsPageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageWrapper
      title={toolIntro["color-names"].name}
      description={toolIntro["color-names"].description}
    >
      {children}
    </PageWrapper>
  )
}

export default ColorsPageLayout
