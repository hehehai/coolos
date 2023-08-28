export interface ShowCardProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
}

const ShowCard = (props: ShowCardProps) => {
  const { title, description, extra, children, ...otherProps } = props

  return <div {...otherProps}>
    <div className="mb-2">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">{title}</div>
        {extra && <div>{extra}</div>}
      </div>
      {description && <div className="text-sm text-gray-500 mt-2">{description}</div>}
    </div>
    <div className="w-full">{children}</div>
  </div>
}

ShowCard.displayName = 'ShowCard'

export default ShowCard
