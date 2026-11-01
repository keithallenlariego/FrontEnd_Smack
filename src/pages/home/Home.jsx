import { Link } from 'react-router-dom';
import Logo from '../../components/Logo.jsx';
import Button from '../../components/Button.jsx';
import Chip from '../../components/Chip.jsx';
import Card from '../../components/Card.jsx';
import Avatar from '../../components/Avatar.jsx';
import Eyebrow from '../../components/Eyebrow.jsx';
import Message from '../../components/Message.jsx';
import SiteFooter from '../../components/SiteFooter.jsx';
import { members, messages, flaggedMessages } from '../../data/mockData.js';

const features = [
  { accent: 'bg-clay', label: '01 · Private rooms', title: 'Doors that lock.', text: 'Make a room public or private. In a private room, only the people you let in can enter, read, or send.' },
  { accent: 'bg-sage', label: '02 · Real-time', title: 'Messages, right away.', text: 'Chat live with everyone in the room, and scroll back through the history whenever you join.' },
  { accent: 'bg-caramel', label: '03 · Gentle moderation', title: 'A helper, not a boss.', text: 'Turn on an AI moderator for a room. It only flags spam and abuse. You review it and decide.' },
];

const valueStrip = ['Owner-controlled access', 'Real-time messaging', 'Hashed passwords', 'AI that only flags'];

const steps = [
  { number: '01', title: 'Create your account', text: 'Sign up with an email and password. Your password is stored hashed, and the main features wait until you log in.' },
  { number: '02', title: 'Open or join a room', text: 'Start a public or private room of your own, or join one you were invited to. Leave whenever you like.' },
  { number: '03', title: 'Chat, and stay in charge', text: 'Message in real time and read the history. Owners choose who stays and what the AI helper does.' },
];

const roles = [
  { tone: 'dark', chip: 'Owner', title: 'Room owner', items: ['Create, edit, and delete the room', 'Set it public or private', 'Remove members and change roles', 'Turn the AI moderator on or off', 'Review flagged messages'] },
  { tone: 'oat', chip: 'Member', title: 'Member', items: ['Join and leave rooms', 'Send and read messages', 'Read the chat history', 'See who is in the room'] },
];

// ----- Small pieces only used on this page -----

function Showcase({ panel, flip, eyebrow, title, text, link, children }) {
  return (
    <section className={`flex items-center justify-center gap-[88px] px-16 py-[72px] ${flip ? 'flex-row-reverse' : ''}`}>
      <div className={`flex h-[460px] w-[620px] items-center justify-center rounded-[32px] ${panel}`}>{children}</div>
      <div className="flex w-[480px] flex-col gap-[18px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-[46px] leading-[54px] tracking-[-0.5px]">{title}</h2>
        <p className="leading-[26px] text-muted">{text}</p>
        <Link to="/signup" className="font-semibold underline">{link}</Link>
      </div>
    </section>
  );
}

function RoomMock() {
  return (
    <Card className="flex w-[470px] flex-col gap-[18px] px-[26px] py-6">
      <div className="flex items-center justify-between">
        <strong>the-living-room</strong>
        <Chip tone="dark">Private</Chip>
      </div>
      <Eyebrow>Who can enter</Eyebrow>
      {members.slice(0, 3).map((m) => (
        <div key={m.id} className="flex items-center justify-between">
          <span className="flex items-center gap-3"><Avatar letter={m.letter} color={m.color} />{m.name}</span>
          <Chip tone={m.role === 'OWNER' ? 'dark' : 'oat'}>{m.role}</Chip>
        </div>
      ))}
    </Card>
  );
}

function ChatMock() {
  return (
    <Card className="flex w-[480px] flex-col gap-4 px-6 py-[22px]">
      <strong># the-daily</strong>
      {messages.filter((m) => !m.flagged).slice(0, 3).map((m) => <Message key={m.id} {...m} />)}
      <div className="rounded-xl border-[1.5px] border-line bg-cream px-4 py-3 text-sm text-muted">Message # the-daily</div>
    </Card>
  );
}

function ModerationMock() {
  const flag = flaggedMessages[0];
  return (
    <Card className="flex w-[480px] flex-col gap-4 px-[26px] py-6">
      <div className="flex items-center justify-between">
        <strong>Flagged for review</strong>
        <Chip tone="clay">{flag.reason}</Chip>
      </div>
      <div className="rounded-xl border border-line bg-cream px-4 py-3.5">
        <p className="leading-[22px]">{flag.text}</p>
        <p className="mt-1 text-xs text-muted">From {flag.sender} · hidden from the room</p>
      </div>
      <p className="text-[13px] text-muted">The AI is {flag.confidence}% sure. You decide.</p>
      <div className="flex gap-2.5">
        <Button variant="secondary" size="sm">Restore</Button>
        <Button size="sm">Delete</Button>
      </div>
    </Card>
  );
}

export default function Home() {
  return (
    <>
      {/* Nav */}
      <header className="flex items-center justify-between px-16 py-6">
        <Logo />
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" to="/login">Log in</Button>
          <Button size="sm" to="/signup">Sign up</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center gap-[22px] px-16 pb-14 pt-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-oat px-3.5 py-[7px] font-mono text-[11px] font-medium uppercase tracking-[0.1em]">
          <i className="size-2 rounded-full bg-sage" />
          Private by default · Real-time chat
        </span>
        <h1 className="max-w-[980px] text-[68px] leading-[78px] tracking-[-1px]">
          A cozy place to talk,<br />with <em>a door you control</em>.
        </h1>
        <p className="max-w-[660px] text-lg leading-7 text-muted">
          Create an account, open a room, and chat in real time. Keep it public or make it private, choose who comes in,
          and let an optional AI helper flag spam while you stay in charge.
        </p>
        <div className="flex gap-3.5">
          <Button size="lg" to="/signup">Create your account</Button>
          <Button size="lg" variant="secondary" to="/login">I already have an account</Button>
        </div>
        <p className="text-[13px] text-muted">Free to use · Runs in your browser · No app to install</p>
      </section>

      {/* Feature cards */}
      <section className="flex justify-center gap-6 px-16 pb-10 pt-2">
        {features.map((f) => (
          <Card key={f.title} className="flex w-[360px] flex-col gap-3.5 p-7">
            <i className={`h-[5px] w-10 rounded-sm ${f.accent}`} />
            <Eyebrow>{f.label}</Eyebrow>
            <h3 className="text-[26px] font-medium leading-8">{f.title}</h3>
            <p className="text-[15px] leading-[23px] text-muted">{f.text}</p>
          </Card>
        ))}
      </section>

      {/* Value strip */}
      <div className="flex items-center justify-between border-y border-line bg-surface px-16 py-[22px]">
        {valueStrip.map((item) => (
          <span key={item} className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.08em]">
            <i className="size-2 rounded-full bg-caramel" />
            {item}
          </span>
        ))}
      </div>

      {/* How it works */}
      <section className="flex flex-col items-center gap-14 px-16 py-[104px]">
        <div className="flex flex-col items-center gap-3.5 text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="max-w-[800px] text-5xl leading-[56px] tracking-[-0.5px]">Three steps to a <em>quiet corner</em>.</h2>
        </div>
        <div className="flex gap-14">
          {steps.map((s) => (
            <div key={s.number} className="flex w-[340px] flex-col gap-3.5">
              <span className="font-serif text-6xl leading-[70px] text-caramel">{s.number}</span>
              <h3 className="text-[25px] font-medium leading-8">{s.title}</h3>
              <p className="text-[15px] leading-6 text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcases */}
      <Showcase
        panel="bg-oat"
        eyebrow="01 / Your room, your rules"
        title={<>Decide who <em>walks in</em>.</>}
        text="Make a room private and only the people you let in can enter, read, or send. Anyone else is turned away at the door."
        link="Make a private room"
      >
        <RoomMock />
      </Showcase>
      <Showcase
        flip
        panel="bg-sage"
        eyebrow="02 / No refreshing"
        title={<>Talk now. <em>Read it later</em>.</>}
        text="Messages show up for everyone in the room the moment they are sent, and the history is waiting when you open a room."
        link="See how a room feels"
      >
        <ChatMock />
      </Showcase>
      <Showcase
        panel="bg-clay/20"
        eyebrow="03 / A helper, not a boss"
        title={<>You have the <em>final say</em>.</>}
        text="Turn on the AI moderator for a room. It flags spam and abuse and can warn, hide, or notify you. You approve, restore, or delete."
        link="Learn about moderation"
      >
        <ModerationMock />
      </Showcase>

      {/* Roles */}
      <section className="flex flex-col items-center gap-[52px] bg-surface px-16 py-[104px]">
        <div className="flex flex-col items-center gap-3.5 text-center">
          <Eyebrow>Roles</Eyebrow>
          <h2 className="text-5xl leading-[56px] tracking-[-0.5px]">Everyone knows <em>their role</em>.</h2>
        </div>
        <div className="flex gap-7">
          {roles.map((role) => (
            <Card key={role.title} className="flex w-[560px] flex-col gap-5 rounded-3xl bg-cream px-9 pb-9 pt-8">
              <span><Chip tone={role.tone}>{role.chip}</Chip></span>
              <h3 className="text-[30px] font-medium">{role.title}</h3>
              {role.items.map((item) => (
                <p key={item} className="flex items-center gap-3"><i className="size-2 rounded-full bg-sage" />{item}</p>
              ))}
            </Card>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="flex justify-center px-16 py-[72px]">
        <div className="flex w-[1240px] items-center justify-between gap-7 rounded-3xl bg-oat px-9 py-7">
          <div>
            <h3 className="mb-2 text-[28px] font-medium">Built with safety in mind.</h3>
            <p className="max-w-[760px] text-[15px] leading-6">
              Passwords are stored hashed, the main features stay locked until you log in, and inactive sessions end on their own.
            </p>
          </div>
          <Button to="/signup">Create your account</Button>
        </div>
      </section>

      {/* Call to action */}
      <section className="flex flex-col items-center gap-[26px] bg-oat px-16 py-[110px] text-center">
        <h2 className="max-w-[1150px] text-[64px] leading-[72px] tracking-[-1px]">Your people are <em>one room away</em>.</h2>
        <p className="max-w-[600px] text-lg leading-7 text-muted">Make an account, open a door, and start talking. It runs in your browser.</p>
        <div className="flex gap-3.5">
          <Button size="lg" to="/signup">Create your account</Button>
          <Button size="lg" variant="secondary" to="/login">Log in</Button>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
