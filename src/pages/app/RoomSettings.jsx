import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import RoomTabs from '../../components/RoomTabs.jsx';
import Card from '../../components/Card.jsx';
import Chip from '../../components/Chip.jsx';
import Avatar from '../../components/Avatar.jsx';
import Eyebrow from '../../components/Eyebrow.jsx';
import Segmented from '../../components/Segmented.jsx';
import Button from '../../components/Button.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import useFetch from '../../hooks/useFetch.js';
import { roomApi } from '../../api/endpoints.js';
import { colorFor, letterOf } from '../../utils/format.js';

function MembersTable({ members, roomId, currentUserId, onChange, onError }) {
  // Run an action, then reload the list. Errors from the server show above the table.
  async function run(action) {
    try {
      await action();
      onChange();
    } catch (err) {
      onError(err.message);
    }
  }

  return (
    <Card className="flex-1 py-2">
      <div className="flex justify-between px-7 pb-3 pt-4">
        <Eyebrow>Member</Eyebrow>
        <div className="flex gap-[70px]"><Eyebrow>Role</Eyebrow><Eyebrow>Actions</Eyebrow></div>
      </div>
      {members.map((m) => {
        const isYou = m.userId === currentUserId;
        return (
          <div key={m.userId} className="flex items-center justify-between border-t border-line px-7 py-3.5">
            <span className="flex items-center gap-3 font-medium"><Avatar letter={letterOf(m.displayName)} color={colorFor(m.userId)} size={36} />{m.displayName}{isYou && ' (you)'}</span>
            <div className="flex items-center gap-[34px]">
              <Chip tone={m.role === 'OWNER' ? 'dark' : 'oat'}>{m.role}</Chip>
              {isYou ? (
                <span className="text-[13px] text-muted">Owner</span>
              ) : (
                <span className="flex gap-4 text-[13px] font-medium">
                  <button className="underline" onClick={() => run(() => roomApi.changeRole(roomId, m.userId, m.role === 'OWNER' ? 'MEMBER' : 'OWNER'))}>Change role</button>
                  <button className="text-clay underline" onClick={() => run(() => roomApi.removeMember(roomId, m.userId))}>Remove</button>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </Card>
  );
}

export default function RoomSettings() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const room = useFetch(() => roomApi.get(roomId), [roomId]);
  const members = useFetch(() => roomApi.members(roomId), [roomId]);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  if (room.error) return <p className="p-14 text-muted">{room.error.message}</p>;
  if (!room.data || !members.data) return <p className="p-14 text-muted">Loading…</p>;
  if (room.data.role !== 'OWNER') return <Navigate to={`/rooms/${roomId}`} replace />; // owner-only page

  async function changeVisibility(option) {
    const { name, description } = room.data;
    try {
      await roomApi.update(roomId, { name, description, visibility: option.toUpperCase() });
      room.reload();
    } catch (err) {
      setError(err.message);
    }
  }

  async function addMember(event) {
    event.preventDefault();
    setError('');
    try {
      await roomApi.addMember(roomId, username);
      setUsername('');
      members.reload();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteRoom() {
    if (!window.confirm('Delete this room, its members, and its messages? This cannot be undone.')) return;
    await roomApi.remove(roomId);
    navigate('/dashboard');
  }

  return (
    <div className="flex flex-col gap-7 px-14 py-11">
      <PageHeader eyebrow={`${room.data.name} / Settings`} title="Room settings" />
      <RoomTabs roomId={roomId} active="Members" />
      <ErrorText>{error}</ErrorText>

      <div className="flex items-start gap-6">
        <MembersTable members={members.data} roomId={roomId} currentUserId={user.id} onChange={members.reload} onError={setError} />

        <div className="flex w-[340px] flex-col gap-5">
          <Card className="flex flex-col gap-3.5 p-7">
            <h2 className="text-[22px] font-medium">Access</h2>
            <Segmented key={room.data.visibility} options={['Public', 'Private']} defaultValue={room.data.visibility === 'PRIVATE' ? 'Private' : 'Public'} onChange={changeVisibility} />
            <p className="text-sm leading-[21px] text-muted">
              In a private room only the people you let in can enter, read, or send messages. Everyone else is denied.
            </p>
          </Card>
          <Card as="form" onSubmit={addMember} className="flex flex-col gap-3.5 p-7">
            <h2 className="text-[22px] font-medium">Let someone in</h2>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Their username"
              required
              className="rounded-xl border-[1.5px] border-line bg-surface px-4 py-3 text-[15px] placeholder:text-muted"
            />
            <Button variant="secondary" size="sm" type="submit">Add to room</Button>
          </Card>
          <Card className="flex flex-col items-start gap-3.5 p-7">
            <h2 className="text-[22px] font-medium">Delete this room</h2>
            <p className="text-sm leading-[21px] text-muted">This removes the room, its members, and its messages. It cannot be undone.</p>
            <Button variant="secondary" size="sm" danger onClick={deleteRoom}>Delete room</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
