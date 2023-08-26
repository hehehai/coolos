interface SectionCardProps extends React.ComponentPropsWithoutRef<'section'> {
  title: string;
  description?: JSX.Element | string;
  children?: JSX.Element | string;
}

const SectionCard = (props: SectionCardProps) => {
  const { title, description, children, ...otherProps } = props

  return <section
    {...otherProps}
    className="max-w-7xl mx-auto"
  >
    <div className="text-center py-28">
      <h3 className="text-4xl font-bold text-slate-800 mb-8">{title}</h3>
      {description && <div className="text-md text-gray-500 leading-relaxed">{description}</div>}
    </div>
    <div>
      {children}
    </div>
  </section>;
}

SectionCard.displayName = 'SectionCard';

export default SectionCard;
