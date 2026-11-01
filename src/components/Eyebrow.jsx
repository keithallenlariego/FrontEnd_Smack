// Small mono label that sits above headings.
export default function Eyebrow({ children, className = '' }) {
  return <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted ${className}`}>{children}</span>;
}
