import { Metadata } from "next";
import { FC } from "react";
import PageWrapper from "@/components/shared/page-wrapper";

const pageMeta = {
  title: 'Color Contrast Checker',
  description: 'Calculate the contrast ratio of text and background colors.'
}

export const metadata: Metadata = {
  title: pageMeta.title + 'Coolors'
}

const PickerPageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <PageWrapper
    title={pageMeta.title}
    description={pageMeta.description}
  >
    {children}
  </PageWrapper>
}

export default PickerPageLayout
