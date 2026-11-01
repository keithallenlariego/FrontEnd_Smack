import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout.jsx';
import Field from '../../components/Field.jsx';
import Button from '../../components/Button.jsx';
import Chip from '../../components/Chip.jsx';
import Card from '../../components/Card.jsx';
import Eyebrow from '../../components/Eyebrow.jsx';
import Toggle from '../../components/Toggle.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function SettingsPreview() {
  return (
    <Card className="flex w-[440px] flex-col gap-4 px-[22px] py-5">
      <Eyebrow>Room settings</Eyebrow>
      <div className="flex items-center justify-between"><span>Visibility</span><Chip tone="dark">Private</Chip></div>
      <div className="flex items-center justify-between"><span>Members</span><span className="text-sm text-muted">4 people</span></div>
      <div className="flex items-center justify-between">
        <span>AI moderator</span>
        <Toggle defaultOn />
      </div>
    </Card>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    try {
      await register(form.username, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthLayout
      tone="sage"
      eyebrow="New here"
      headline={<>Make a <em className="font-serif">room of your own</em>.</>}
      text="Keep it public, or make it private so only the people you let in can join. You decide who comes in."
      preview={<SettingsPreview />}
    >
      <div>
        <h2 className="text-[42px] leading-[50px]">Create your account</h2>
        <p className="mt-2.5 text-[15px] leading-[23px] text-muted">It takes a minute. Then you can open a room or join one.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[26px]">
        <div className="flex flex-col gap-[18px]">
          <Field label="Username" name="username" value={form.username} onChange={handleChange} placeholder="Pick a username" required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 8 characters" required />
          <Field label="Confirm password" name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Type it once more" required />
        </div>
        <ErrorText>{error}</ErrorText>
        <Button type="submit" block>Create account</Button>
      </form>

      <p className="text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="font-semibold text-cocoa underline">Log in</Link>
      </p>
    </AuthLayout>
  );
}
