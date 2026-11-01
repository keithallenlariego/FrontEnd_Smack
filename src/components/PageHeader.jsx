import Eyebrow from './Eyebrow.jsx';

// Eyebrow + big serif title + optional subtitle. Children (usually buttons) go on the right.
export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="flex items-end justify-between gap-5">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="my-2.5 text-[44px] leading-[52px] tracking-[-0.5px]">{title}</h1>
        {subtitle && <p className="text-muted">{subtitle}</p>}
      </div>
      {children && <div className="flex gap-3">{children}</div>}
    </header>
  );
}
