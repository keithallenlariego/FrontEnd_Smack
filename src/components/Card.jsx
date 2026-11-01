export default function Card({ as: Tag = 'div', className = '', ...props }) {
  return <Tag className={`rounded-[22px] border-[1.5px] border-line bg-surface ${className}`} {...props} />;
}
