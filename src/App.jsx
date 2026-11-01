import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import Home from './pages/home/Home.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import Dashboard from './pages/app/Dashboard.jsx';
import CreateRoom from './pages/app/CreateRoom.jsx';
import ChatRoom from './pages/app/ChatRoom.jsx';
import RoomSettings from './pages/app/RoomSettings.jsx';
import Moderation from './pages/app/Moderation.jsx';
import AccessDenied from './pages/app/AccessDenied.jsx';
import Profile from './pages/app/Profile.jsx';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Pages inside the app (with the sidebar). You must be logged in. */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rooms/new" element={<CreateRoom />} />
            <Route path="/rooms/:roomId" element={<ChatRoom />} />
            <Route path="/rooms/:roomId/settings" element={<RoomSettings />} />
            <Route path="/rooms/:roomId/moderation" element={<Moderation />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
