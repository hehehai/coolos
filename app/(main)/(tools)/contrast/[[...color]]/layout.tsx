import { FC } from "react"
import { Metadata } from "next"

import { toolIntro } from "@/config/site"
import PageWrapper from "@/components/shared/PageWrapper"

export const metadata: Metadata = {
  title: toolIntro["contrast-checker"].name,
  description: toolIntro["contrast-checker"].description,
}

const ContrastPageLayout: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PageWrapper
      title={toolIntro["contrast-checker"].name}
      description={toolIntro["contrast-checker"].description}
    >
      {children}
    </PageWrapper>
  )
}

export default ContrastPageLayout
