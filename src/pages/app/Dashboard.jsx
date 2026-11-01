import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';
import Chip from '../../components/Chip.jsx';
import Eyebrow from '../../components/Eyebrow.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import useFetch from '../../hooks/useFetch.js';
import { roomApi, userApi } from '../../api/endpoints.js';

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
}

function RoomCard({ room }) {
  const isPrivate = room.visibility === 'PRIVATE';
  return (
    <Card as={Link} to={`/rooms/${room.id}`} className="flex flex-col gap-3 px-6 py-[22px]">
      <div className="flex items-center justify-between">
        <h3 className="text-[22px] font-medium">{room.name}</h3>
        <Chip tone={isPrivate ? 'dark' : 'sage'}>{isPrivate ? 'Private' : 'Public'}</Chip>
      </div>
      <p className="text-sm text-muted">{room.lastMessage ?? 'No messages yet'}</p>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-muted">{room.memberCount} members</span>
        <Chip>{room.role}</Chip>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const myRooms = useFetch(roomApi.mine);
  const publicRooms = useFetch(roomApi.publicRooms);
  const stats = useFetch(userApi.stats);

  async function join(roomId) {
    try {
      await roomApi.join(roomId);
      navigate(`/rooms/${roomId}`);
    } catch (err) {
      setError(err.message);
    }
  }

  const cards = [
    { label: 'Rooms you own', value: stats.data?.roomsOwned, note: 'You decide who comes in' },
    { label: 'Rooms you have joined', value: stats.data?.roomsJoined, note: 'Public and private' },
  ];
  if (user.showFlagCount) {
    cards.push({ label: 'Flagged to review', value: stats.data?.flaggedToReview, note: 'From the AI moderator', needsYou: stats.data?.flaggedToReview > 0 });
  }

  return (
    <div className="flex flex-col gap-[30px] px-14 py-11">
      <PageHeader
        eyebrow="Dashboard"
        title={<>{greeting()}, <em>{user.displayName}</em>.</>}
        subtitle="Here is what is happening in your rooms."
      >
        <Button variant="secondary" size="sm" onClick={() => document.getElementById('public-rooms')?.scrollIntoView({ behavior: 'smooth' })}>Join a room</Button>
        <Button size="sm" to="/rooms/new">Create room</Button>
      </PageHeader>

      <section className="grid grid-cols-3 gap-[22px]">
        {cards.map((card) => (
          <Card key={card.label} className="px-6 py-[22px]">
            <div className="flex items-center justify-between">
              <Eyebrow>{card.label}</Eyebrow>
              {card.needsYou && <Chip tone="clay">Needs you</Chip>}
            </div>
            <p className="mt-2 font-serif text-5xl leading-[54px]">{card.value ?? '–'}</p>
            <p className="mt-2 text-sm text-muted">{card.note}</p>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[26px] font-medium">Your rooms</h2>
        {myRooms.data?.length === 0 && <p className="text-muted">You are not in any rooms yet. Create one or join a public room below.</p>}
        <div className="grid grid-cols-3 gap-[22px]">
          {(myRooms.data ?? []).map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      </section>

      <section id="public-rooms" className="flex flex-col gap-4">
        <h2 className="text-[26px] font-medium">Public rooms to join</h2>
        <ErrorText>{error}</ErrorText>
        {publicRooms.data?.length === 0 && <p className="text-muted">No public rooms to join right now.</p>}
        <div className="flex flex-col gap-2.5">
          {(publicRooms.data ?? []).map((room) => (
            <Card key={room.id} className="flex items-center justify-between rounded-[14px] px-5 py-3.5">
              <div>
                <p className="text-[15px] font-semibold">{room.name}</p>
                <p className="text-[13px] text-muted">{room.description ?? `${room.memberCount} members`}</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => join(room.id)}>Join</Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
