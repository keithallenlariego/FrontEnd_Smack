import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import Avatar from '../components/Avatar.jsx';
import Eyebrow from '../components/Eyebrow.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import useFetch from '../hooks/useFetch.js';
import { roomApi } from '../api/endpoints.js';
import { letterOf, colorFor } from '../utils/format.js';

const menu = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Create room', to: '/rooms/new' },
  { label: 'Profile & settings', to: '/profile' },
];

function NavItem({ to, children, dot = 'bg-sage' }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium ${isActive ? 'bg-surface' : ''}`}
    >
      {({ isActive }) => (
        <>
          <span className={`size-2 rounded-full ${isActive ? 'bg-clay' : dot}`} />
          {children}
        </>
      )}
    </NavLink>
  );
}

function NavGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <Eyebrow className="mb-1.5 pl-3.5">{label}</Eyebrow>
      {children}
    </div>
  );
}

// Sidebar + the page content on the right.
export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: rooms } = useFetch(roomApi.mine, [pathname]); // reload the room list when you move around

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 flex h-screen w-[270px] shrink-0 flex-col gap-7 bg-oat px-5 pb-6 pt-7">
        <Logo to="/dashboard" />

        <NavGroup label="Menu">
          {menu.map((item) => <NavItem key={item.to} to={item.to}>{item.label}</NavItem>)}
        </NavGroup>

        <NavGroup label="Your rooms">
          {(rooms ?? []).map((room) => (
            <NavItem key={room.id} to={`/rooms/${room.id}`} dot={room.visibility === 'PRIVATE' ? 'bg-cocoa' : 'bg-sage'}>{room.name}</NavItem>
          ))}
        </NavGroup>

        <div className="mt-auto flex items-center gap-3 rounded-2xl bg-surface px-3.5 py-3">
          <Avatar letter={letterOf(user.displayName)} color={colorFor(user.id)} size={36} />
          <div>
            <p className="text-sm font-semibold">{user.displayName}</p>
            <button onClick={handleLogout} className="text-xs text-muted underline">Log out</button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
