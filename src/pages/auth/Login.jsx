import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout.jsx';
import Field from '../../components/Field.jsx';
import Button from '../../components/Button.jsx';
import Chip from '../../components/Chip.jsx';
import Card from '../../components/Card.jsx';
import Message from '../../components/Message.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { messages } from '../../data/mockData.js';

function RoomPreview() {
  return (
    <Card className="flex w-[440px] flex-col gap-4 px-[22px] py-5">
      <div className="flex items-center justify-between">
        <strong className="text-[15px]">the-living-room</strong>
        <Chip tone="dark">Private</Chip>
      </div>
      {messages.slice(0, 2).map((m) => <Message key={m.id} {...m} />)}
    </Card>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await login(form.identifier, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthLayout
      tone="oat"
      eyebrow="Welcome back"
      headline={<>Pull up <em className="font-serif">a chair</em>.</>}
      text="Your rooms are right where you left them. Log in to pick the conversation back up."
      preview={<RoomPreview />}
    >
      <div>
        <h2 className="text-[42px] leading-[50px]">Log in</h2>
        <p className="mt-2.5 text-[15px] leading-[23px] text-muted">Use the email or username you signed up with.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[26px]">
        <div className="flex flex-col gap-[18px]">
          <Field label="Email or username" name="identifier" value={form.identifier} onChange={handleChange} placeholder="you@example.com" required />
          <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Your password" required />
        </div>
        <ErrorText>{error}</ErrorText>
        <Button type="submit" block>Log in</Button>
      </form>

      <p className="text-center text-sm text-muted">
        New here? <Link to="/signup" className="font-semibold text-cocoa underline">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
