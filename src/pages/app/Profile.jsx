import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import Card from '../../components/Card.jsx';
import Avatar from '../../components/Avatar.jsx';
import Field from '../../components/Field.jsx';
import Segmented from '../../components/Segmented.jsx';
import Toggle from '../../components/Toggle.jsx';
import Button from '../../components/Button.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { userApi } from '../../api/endpoints.js';
import { colorFor, letterOf } from '../../utils/format.js';

const accents = [
  { name: 'clay', className: 'bg-clay' },
  { name: 'sage', className: 'bg-sage' },
  { name: 'caramel', className: 'bg-caramel' },
];

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: user.displayName ?? '',
    bio: user.bio ?? '',
    dashboardTheme: user.dashboardTheme,
    defaultView: user.defaultView,
    showFlagCount: user.showFlagCount,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const update = (changes) => setForm({ ...form, ...changes });

  async function handleSave(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      setUser(await userApi.update(form));
      setMessage('Saved.');
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  async function handleDelete() {
    if (!window.confirm('Delete your account and everything tied to it? This cannot be undone.')) return;
    await userApi.remove();
    handleLogout();
  }

  return (
    <div className="flex flex-col gap-7 px-14 py-11">
      <PageHeader
        eyebrow="Your account"
        title={<>Profile & <em>settings</em>.</>}
        subtitle="Update how you appear and how your dashboard looks."
      />

      <div className="flex items-start gap-6">
        <Card as="form" onSubmit={handleSave} className="flex w-[600px] flex-col gap-[18px] p-7">
          <div className="flex items-center gap-4">
            <Avatar letter={letterOf(user.displayName)} color={colorFor(user.id)} size={72} />
            <div>
              <h2 className="text-[26px] font-medium">{user.displayName}</h2>
              <p className="text-sm text-muted">@{user.username}</p>
            </div>
          </div>
          <Field label="Display name" value={form.displayName} onChange={(e) => update({ displayName: e.target.value })} />
          <Field label="Username" value={user.username} disabled />
          <Field label="Email" type="email" value={user.email} disabled />
          <Field label="Bio" value={form.bio} onChange={(e) => update({ bio: e.target.value })} placeholder="A few words about you" />
          <ErrorText>{error}</ErrorText>
          {message && <p className="text-sm font-medium text-muted">{message}</p>}
          <div className="flex justify-end gap-3">
            <Button variant="secondary" size="sm" to="/dashboard">Cancel</Button>
            <Button size="sm" type="submit">Save changes</Button>
          </div>
        </Card>

        <div className="flex flex-1 flex-col gap-5">
          <Card className="flex flex-col gap-[18px] p-7">
            <h2 className="text-2xl font-medium">Dashboard</h2>
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] font-medium">Accent color</span>
              <div className="flex gap-3">
                {accents.map((a) => (
                  <button
                    key={a.name}
                    type="button"
                    aria-label={a.name}
                    onClick={() => update({ dashboardTheme: a.name })}
                    className={`size-9 rounded-full ${a.className} ${form.dashboardTheme === a.name ? 'ring-2 ring-cocoa ring-offset-2 ring-offset-surface' : ''}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] font-medium">Default room view</span>
              <Segmented options={['Grid', 'List']} defaultValue={form.defaultView === 'list' ? 'List' : 'Grid'} onChange={(v) => update({ defaultView: v.toLowerCase() })} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[15px]">Show flagged-message count</span>
              <Toggle defaultOn={form.showFlagCount} onChange={(on) => update({ showFlagCount: on })} />
            </div>
            <p className="text-[13px] text-muted">Press “Save changes” to keep these settings.</p>
          </Card>

          <Card className="flex flex-col items-start gap-3.5 p-7">
            <h2 className="text-2xl font-medium">Account</h2>
            <p className="max-w-[380px] text-sm leading-[21px] text-muted">Log out on this device, or delete your account and everything tied to it.</p>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={handleLogout}>Log out</Button>
              <Button variant="secondary" size="sm" danger onClick={handleDelete}>Delete account</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
