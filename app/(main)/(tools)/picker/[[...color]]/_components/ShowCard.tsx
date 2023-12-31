import { memo } from "react"

export interface ShowCardProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string
  description?: React.ReactNode
  extra?: React.ReactNode
  children?: React.ReactNode
}

const ShowCard = memo((props: ShowCardProps) => {
  const { title, description, extra, children, ...otherProps } = props

  return (
    <div {...otherProps}>
      <div className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xl font-medium">{title}</div>
          {extra && <div>{extra}</div>}
        </div>
        {description && (
          <div className="text-sm text-gray-500">{description}</div>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
})

ShowCard.displayName = "ShowCard"

export default ShowCard
