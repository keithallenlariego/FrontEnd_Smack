import Logo from '../components/Logo.jsx';
import Eyebrow from '../components/Eyebrow.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

const panelTones = { oat: 'bg-oat', sage: 'bg-sage' };

// Shared by Login and Signup: colored panel on the left, form on the right, footer below.
export default function AuthLayout({ tone, eyebrow, headline, text, preview, children }) {
  return (
    <div>
      <div className="flex min-h-[1024px]">
        <aside className={`flex w-[640px] shrink-0 flex-col justify-between px-14 py-[52px] ${panelTones[tone]}`}>
          <Logo />
          <div className="flex flex-col gap-[18px]">
            <Eyebrow className="text-cocoa">{eyebrow}</Eyebrow>
            <h1 className="max-w-[500px] text-[54px] leading-[62px] tracking-[-1px] [&_em]:text-cocoa">{headline}</h1>
            <p className="max-w-[440px] leading-[25px]">{text}</p>
          </div>
          {preview}
        </aside>

        <section className="flex flex-1 items-center justify-center p-10">
          <div className="flex w-[380px] flex-col gap-[26px]">
            {children}
            <p className="flex items-center gap-2.5 rounded-xl bg-oat px-4 py-3.5 text-[13px] leading-[19px]">
              <span className="size-2 shrink-0 rounded-full bg-sage" />
              Passwords are stored hashed, and inactive sessions end on their own.
            </p>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
