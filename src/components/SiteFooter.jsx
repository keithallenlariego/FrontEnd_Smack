import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Button from './Button.jsx';

// `to` is optional: entries without it are plain text for now.
const columns = [
  { title: 'Product', links: [{ label: 'Home', to: '/' }, { label: 'How it works' }, { label: 'Features' }, { label: 'Roles' }] },
  { title: 'Account', links: [{ label: 'Log in', to: '/login' }, { label: 'Sign up', to: '/signup' }, { label: 'Dashboard', to: '/dashboard' }] },
  { title: 'Project', links: [{ label: 'CSIT321' }, { label: 'Team Juan' }, { label: 'Documentation' }] },
];

export default function SiteFooter() {
  return (
    <footer className="bg-cocoa px-16 pb-9 pt-16 text-cream">
      <div className="flex justify-between">
        <div>
          <Logo light />
          <p className="mt-3.5 max-w-[300px] font-serif text-[22px] italic leading-[30px] text-oat">Warm, quiet, and yours.</p>
        </div>
        <div className="flex gap-[72px]">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3 text-sm">
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-oat">{column.title}</h4>
              {column.links.map(({ label, to }) => (to ? <Link key={label} to={to}>{label}</Link> : <span key={label}>{label}</span>))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex items-center justify-between border-t border-cream/20 pt-9">
        <p className="max-w-[820px] text-xs leading-[18px] text-oat">
          © 2026 Secure Web Chatroom · Designed and built by Keith Allen A. Lariego (Team Juan) · CSIT321, Cebu Institute of Technology – University
        </p>
        <Button variant="light" size="sm" to="/signup">Sign up</Button>
      </div>
    </footer>
  );
}
