import Tabs from './Tabs.jsx';

// Tabs shown on both room settings pages. "General" has no page of its own yet.
export default function RoomTabs({ roomId, active }) {
  const items = [
    { label: 'General', to: `/rooms/${roomId}/settings` },
    { label: 'Members', to: `/rooms/${roomId}/settings` },
    { label: 'AI moderator', to: `/rooms/${roomId}/moderation` },
  ];
  return <Tabs items={items} active={active} />;
}
