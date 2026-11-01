import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import Card from '../../components/Card.jsx';
import Field from '../../components/Field.jsx';
import ChoiceCard from '../../components/ChoiceCard.jsx';
import Toggle from '../../components/Toggle.jsx';
import Button from '../../components/Button.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import { roomApi } from '../../api/endpoints.js';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('PRIVATE');
  const [aiModeratorEnabled, setAiModeratorEnabled] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      const room = await roomApi.create({ name, description, visibility, aiModeratorEnabled });
      navigate(`/rooms/${room.id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-7 px-14 py-11">
      <PageHeader
        eyebrow="New room"
        title={<>Open a <em>new</em> room.</>}
        subtitle="Pick a name, decide who can enter, and you are ready to chat."
      />

      <Card as="form" onSubmit={handleSubmit} className="flex w-[700px] flex-col gap-6 p-9">
        <Field label="Room name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. the-living-room" required />
        <Field label="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this room about?" />

        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-medium">Who can enter</span>
          <div className="flex gap-3.5">
            <ChoiceCard serif title="Public" text="Anyone who is logged in can find and join this room." selected={visibility === 'PUBLIC'} onClick={() => setVisibility('PUBLIC')} />
            <ChoiceCard serif title="Private" text="Only people you let in can enter, read, or send messages." selected={visibility === 'PRIVATE'} onClick={() => setVisibility('PRIVATE')} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 rounded-[14px] border-[1.5px] border-line bg-cream px-[18px] py-4">
          <div>
            <p className="text-[15px] font-semibold">Turn on the AI moderator</p>
            <p className="max-w-[480px] text-[13px] leading-[19px] text-muted">It flags spam and abusive messages. You review them. Change this any time.</p>
          </div>
          <Toggle onChange={setAiModeratorEnabled} />
        </div>

        <ErrorText>{error}</ErrorText>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" size="sm" to="/dashboard">Cancel</Button>
          <Button size="sm" type="submit">Create room</Button>
        </div>
      </Card>
    </div>
  );
}
