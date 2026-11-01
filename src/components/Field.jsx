// A labelled input. Any extra props (value, onChange, name, required...) go straight to the <input>.
export default function Field({ label, type = 'text', ...inputProps }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium">{label}</span>
      <input
        type={type}
        {...inputProps}
        className="rounded-xl border-[1.5px] border-line bg-surface px-4 py-3.5 text-[15px] placeholder:text-muted focus:outline-2 focus:outline-offset-1 focus:outline-clay disabled:text-muted"
      />
    </label>
  );
}
