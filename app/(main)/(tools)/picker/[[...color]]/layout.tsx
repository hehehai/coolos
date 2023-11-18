import { FC } from "react"
import { Metadata } from "next"

import { toolIntro } from "@/config/site"
import PageWrapper from "@/components/shared/PageWrapper"

export const metadata: Metadata = {
  title: toolIntro["color-picker"].name,
  description: toolIntro["color-picker"].description,
}

const PickerPageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageWrapper
      title={toolIntro["color-picker"].name}
      description={toolIntro["color-picker"].description}
    >
      {children}
    </PageWrapper>
  )
}

export default PickerPageLayout
