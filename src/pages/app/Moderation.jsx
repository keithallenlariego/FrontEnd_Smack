import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import RoomTabs from '../../components/RoomTabs.jsx';
import Card from '../../components/Card.jsx';
import Chip from '../../components/Chip.jsx';
import Avatar from '../../components/Avatar.jsx';
import ChoiceCard from '../../components/ChoiceCard.jsx';
import Toggle from '../../components/Toggle.jsx';
import Button from '../../components/Button.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import useFetch from '../../hooks/useFetch.js';
import { moderationApi, roomApi } from '../../api/endpoints.js';
import { colorFor, dateTimeOf, letterOf } from '../../utils/format.js';

const actions = [
  { value: 'WARN', title: 'Warn the sender', text: 'Send a gentle warning and leave the message visible.' },
  { value: 'HIDE', title: 'Hide the message', text: 'Hide it from the room until you review it.' },
  { value: 'NOTIFY', title: 'Notify me', text: 'Message stays visible and you get a heads-up.' },
];

function FlaggedCard({ flag, onReview }) {
  return (
    <Card className="flex flex-col gap-3.5 px-6 py-[22px]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <Avatar letter={letterOf(flag.senderName)} color={colorFor(flag.messageId)} />
          <strong className="text-[15px]">{flag.senderName}</strong>
          <span className="text-xs text-muted">{dateTimeOf(flag.flaggedAt)}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-muted">{flag.confidence}% sure</span>
          <Chip tone="clay">{flag.reason}</Chip>
          <Chip>{flag.actionTaken}</Chip>
        </span>
      </div>
      <p className="rounded-xl border border-line bg-cream px-4 py-3.5 leading-[22px]">{flag.content}</p>
      <div className="flex gap-2.5">
        <Button size="sm" onClick={() => onReview(flag.id, 'APPROVED')}>Approve</Button>
        <Button variant="secondary" size="sm" onClick={() => onReview(flag.id, 'RESTORED')}>Restore</Button>
        <Button variant="secondary" size="sm" onClick={() => onReview(flag.id, 'DELETED')}>Delete</Button>
      </div>
    </Card>
  );
}

export default function Moderation() {
  const { roomId } = useParams();
  const room = useFetch(() => roomApi.get(roomId), [roomId]);
  const settings = useFetch(() => moderationApi.getSettings(roomId), [roomId]);
  const flags = useFetch(() => moderationApi.flags(roomId), [roomId]);
  const [error, setError] = useState('');

  if (settings.error?.status === 403) return <Navigate to={`/rooms/${roomId}`} replace />; // owner-only page
  if (!room.data || !settings.data || !flags.data) return <p className="p-14 text-muted">Loading…</p>;

  const pending = flags.data.filter((f) => f.reviewStatus === 'PENDING');

  async function save(changes) {
    setError('');
    try {
      await moderationApi.updateSettings(roomId, { aiEnabled: settings.data.aiEnabled, actionMode: settings.data.actionMode, ...changes });
      settings.reload();
    } catch (err) {
      setError(err.message);
    }
  }

  async function review(flagId, decision) {
    setError('');
    try {
      await moderationApi.review(flagId, decision);
      flags.reload();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-7 px-14 py-11">
      <PageHeader eyebrow={`${room.data.name} / Settings`} title="AI moderator" />
      <RoomTabs roomId={roomId} active="AI moderator" />
      <ErrorText>{error}</ErrorText>

      <Card className="flex flex-col gap-[18px] p-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-medium">Turn on the AI moderator for this room</h2>
            <p className="mt-1 max-w-[640px] text-sm leading-[21px] text-muted">
              It checks new messages and flags spam or abusive content. It never removes anything on its own.
            </p>
          </div>
          <Toggle defaultOn={settings.data.aiEnabled} onChange={(on) => save({ aiEnabled: on })} />
        </div>
        <span className="text-[13px] font-medium">When a message is flagged</span>
        <div className="flex gap-3.5">
          {actions.map((a) => (
            <ChoiceCard key={a.value} title={a.title} text={a.text} selected={settings.data.actionMode === a.value} onClick={() => save({ actionMode: a.value })} />
          ))}
        </div>
      </Card>

      <div className="flex items-start gap-6">
        <section className="flex flex-1 flex-col gap-4">
          <h2 className="text-[26px] font-medium">Flagged messages</h2>
          {pending.length === 0 && <p className="text-muted">Nothing to review. The AI has not flagged anything new.</p>}
          {pending.map((flag) => <FlaggedCard key={flag.id} flag={flag} onReview={review} />)}
        </section>

        <Card className="flex w-[400px] flex-col gap-3.5 p-6">
          <h2 className="text-[22px] font-medium">Moderation log</h2>
          {flags.data.length === 0 && <p className="text-sm text-muted">No flagged messages yet.</p>}
          {flags.data.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-1.5 border-t border-line pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{entry.senderName}</span>
                <span className="text-xs text-muted">{dateTimeOf(entry.flaggedAt)}</span>
              </div>
              <div className="flex gap-2">
                <Chip tone="clay">{entry.reason}</Chip>
                <Chip tone={entry.reviewStatus === 'PENDING' ? 'oat' : 'sage'}>{entry.reviewStatus}</Chip>
              </div>
            </div>
          ))}
          <p className="text-[13px] leading-[19px] text-muted">The AI can make mistakes. Your decision is final.</p>
        </Card>
      </div>
    </div>
  );
}
