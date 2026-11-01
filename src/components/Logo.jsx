import { Link } from 'react-router-dom';
import LockIcon from './LockIcon.jsx';

export default function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 font-serif text-[19px] font-medium ${light ? 'text-cream' : ''}`}>
      {light ? <LockIcon bg="var(--color-cream)" fg="var(--color-cocoa)" /> : <LockIcon />}
      Secure Web Chatroom
    </Link>
  );
}
