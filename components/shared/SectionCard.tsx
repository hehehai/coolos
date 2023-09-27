import { memo } from "react"

interface SectionCardProps extends React.ComponentPropsWithoutRef<"section"> {
  title: string
  description?: React.ReactNode
  children?: React.ReactNode
}

const SectionCard = memo((props: SectionCardProps) => {
  const { title, description, children, ...otherProps } = props

  return (
    <section {...otherProps} className="mx-auto max-w-7xl">
      <div className="py-28 text-center">
        <h3 className="mb-8 text-4xl font-bold text-slate-800">{title}</h3>
        {description && (
          <div className="text-md leading-relaxed text-gray-500">
            {description}
          </div>
        )}
      </div>
      <div>{children}</div>
    </section>
  )
})

SectionCard.displayName = "SectionCard"

export default SectionCard
