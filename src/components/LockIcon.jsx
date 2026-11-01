// The padlock mark used in the logo and on the "Access denied" screen.
export default function LockIcon({ size = 30, bg = 'var(--color-cocoa)', fg = 'var(--color-cream)', round = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <rect width="30" height="30" rx={round ? 15 : 9} fill={bg} />
      <rect x="10" y="6" width="10" height="12" rx="5" fill="none" stroke={fg} strokeWidth="2" />
      <rect x="8" y="14" width="14" height="10" rx="3" fill={fg} />
      <circle cx="15" cy="19" r="1.5" fill="var(--color-clay)" />
    </svg>
  );
}
