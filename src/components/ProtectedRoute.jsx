import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Pages inside this route need a logged-in user.
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <p className="p-14 text-muted">Loading…</p>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
