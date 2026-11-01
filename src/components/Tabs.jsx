import { Link } from 'react-router-dom';

export default function Tabs({ items, active }) {
  return (
    <nav className="flex gap-[30px] border-b border-line">
      {items.map(({ label, to }) => (
        <Link
          key={label}
          to={to}
          className={`-mb-px border-b-2 px-0.5 pb-3 pt-2.5 ${label === active ? 'border-cocoa font-semibold' : 'border-transparent font-medium text-muted'}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
