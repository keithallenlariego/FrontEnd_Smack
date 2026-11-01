const tones = {
  dark: 'bg-cocoa text-cream',
  oat: 'bg-oat text-cocoa',
  sage: 'bg-sage text-cocoa',
  clay: 'bg-clay text-cream',
};

export default function Chip({ tone = 'oat', children }) {
  return (
    <span className={`inline-block rounded-full px-[9px] py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.05em] ${tones[tone]}`}>
      {children}
    </span>
  );
}
