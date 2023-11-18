import { FC } from "react"
import { Metadata } from "next"

import { toolIntro } from "@/config/site"
import PageWrapper from "@/components/shared/PageWrapper"

export const metadata: Metadata = {
  title: toolIntro["gradient-palette"].name,
  description: toolIntro["gradient-palette"].description,
}

const ContrastPageLayout: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PageWrapper
      title={toolIntro["gradient-palette"].name}
      description={toolIntro["gradient-palette"].description}
    >
      {children}
    </PageWrapper>
  )
}

export default ContrastPageLayout
