import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';
import Chip from '../../components/Chip.jsx';
import Avatar from '../../components/Avatar.jsx';
import Eyebrow from '../../components/Eyebrow.jsx';
import Message from '../../components/Message.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import useFetch from '../../hooks/useFetch.js';
import { roomApi, messageApi } from '../../api/endpoints.js';
import { getToken, wsUrl } from '../../api/client.js';
import { colorFor, letterOf, timeOf } from '../../utils/format.js';

// Shown to the room owner where the AI moderator hid a message.
function HiddenNotice({ message, roomId }) {
  return (
    <div className="flex items-center justify-between gap-3.5 rounded-[14px] bg-clay/15 px-[18px] py-3.5">
      <div>
        <p className="text-sm font-semibold">A message from {message.senderName} was hidden by the AI moderator</p>
        <p className="text-[13px] text-muted">Only you can see this because you own the room</p>
      </div>
      <Button variant="secondary" size="sm" to={`/rooms/${roomId}/moderation`}>Review</Button>
    </div>
  );
}

export default function ChatRoom() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const room = useFetch(() => roomApi.get(roomId), [roomId]);
  const members = useFetch(() => roomApi.members(roomId).catch(() => []), [roomId, room.data?.role]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [notice, setNotice] = useState('');
  const bottomRef = useRef(null);

  const role = room.data?.role;
  const isMember = Boolean(role);
  const isOwner = role === 'OWNER';

  const loadHistory = useCallback(() => messageApi.history(roomId).then(setMessages).catch(() => {}), [roomId]);

  // Add a new message, or replace it if we already have it (for example when the owner restores it).
  const addMessage = useCallback((message) => {
    setMessages((current) =>
      current.some((m) => m.id === message.id) ? current.map((m) => (m.id === message.id ? message : m)) : [...current, message]
    );
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
  }, []);

  useEffect(() => {
    if (isMember) loadHistory();
  }, [isMember, loadHistory]);

  // Live updates: the server pushes new messages over a WebSocket.
  useEffect(() => {
    if (!isMember) return;
    const client = new Client({
      brokerURL: wsUrl,
      connectHeaders: { Authorization: `Bearer ${getToken()}` },
      reconnectDelay: 3000,
    });
    client.onConnect = () => {
      client.subscribe(`/topic/rooms/${roomId}`, (frame) => addMessage(JSON.parse(frame.body)));
      if (isOwner) client.subscribe(`/topic/rooms/${roomId}/moderation`, () => loadHistory());
    };
    client.activate();
    return () => {
      client.deactivate();
    };
  }, [roomId, isMember, isOwner, addMessage, loadHistory]);

  async function handleSend(event) {
    event.preventDefault();
    if (!text.trim()) return;
    try {
      const saved = await messageApi.send(roomId, text);
      setText('');
      setNotice(saved.note ?? '');
      addMessage(saved);
    } catch (err) {
      setNotice(err.message);
    }
  }

  async function handleJoin() {
    try {
      await roomApi.join(roomId);
      room.reload();
    } catch (err) {
      setNotice(err.message);
    }
  }

  async function handleLeave() {
    await roomApi.leave(roomId);
    navigate('/dashboard');
  }

  if (room.error?.status === 403) return <Navigate to="/access-denied" replace />;
  if (room.error) return <p className="p-14 text-muted">{room.error.message}</p>;
  if (!room.data) return <p className="p-14 text-muted">Loading…</p>;

  const isPrivate = room.data.visibility === 'PRIVATE';

  // A public room you have not joined yet
  if (!isMember) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Card className="flex w-[480px] flex-col items-center gap-4 p-10 text-center">
          <h1 className="text-[32px] leading-10"># {room.data.name}</h1>
          <p className="text-muted">{room.data.description ?? 'Join this public room to read and send messages.'}</p>
          <ErrorText>{notice}</ErrorText>
          <Button onClick={handleJoin}>Join room</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line px-8 py-[22px]">
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-medium"># {room.data.name}</h1>
            <Chip tone={isPrivate ? 'dark' : 'sage'}>{isPrivate ? 'Private' : 'Public'}</Chip>
          </div>
          {isOwner && <Button variant="secondary" size="sm" to={`/rooms/${roomId}/settings`}>Room settings</Button>}
        </header>

        <div className="flex flex-1 flex-col gap-6 px-8 py-7">
          <Eyebrow>Messages</Eyebrow>
          {messages.length === 0 && <p className="text-muted">No messages yet. Say hello.</p>}
          {messages.map((m) => {
            if (m.status === 'HIDDEN') {
              return isOwner
                ? <HiddenNotice key={m.id} message={m} roomId={roomId} />
                : <p key={m.id} className="text-sm text-muted">Your message was hidden and is waiting for the room owner to review it.</p>;
            }
            return (
              <Message key={m.id} large name={m.senderName} letter={letterOf(m.senderName)} color={colorFor(m.senderId)} time={timeOf(m.sentAt)} text={m.content} />
            );
          })}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-2 px-8 pb-6 pt-[18px]">
          <ErrorText>{notice}</ErrorText>
          <div className="flex items-center gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Message # ${room.data.name}`}
              className="flex-1 rounded-[14px] border-[1.5px] border-line bg-surface px-[18px] py-[15px] text-[15px] placeholder:text-muted"
            />
            <Button size="sm" type="submit">Send</Button>
          </div>
        </form>
      </div>

      <aside className="flex w-[290px] shrink-0 flex-col gap-4 border-l border-line bg-surface px-6 pb-6 pt-[26px]">
        <Eyebrow>Members · {members.data?.length ?? 0}</Eyebrow>
        {(members.data ?? []).map((m) => (
          <div key={m.userId} className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-sm">
              <Avatar letter={letterOf(m.displayName)} color={colorFor(m.userId)} />
              {m.displayName}{m.userId === user.id && ' (you)'}
            </span>
            <Chip tone={m.role === 'OWNER' ? 'dark' : 'oat'}>{m.role}</Chip>
          </div>
        ))}
        {!isOwner && <button onClick={handleLeave} className="mt-auto text-left text-sm font-semibold underline">Leave room</button>}
      </aside>
    </div>
  );
}
