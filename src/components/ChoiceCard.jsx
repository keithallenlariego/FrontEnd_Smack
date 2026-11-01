// A selectable option card with a radio dot (used for public/private and the moderator action).
export default function ChoiceCard({ title, text, selected, onClick, serif = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-2xl p-5 text-left ${selected ? 'border-2 border-cocoa bg-cream' : 'border-[1.5px] border-line bg-surface'}`}
    >
      <span className="flex items-center justify-between">
        <span className={serif ? 'font-serif text-xl font-medium' : 'font-semibold'}>{title}</span>
        <span className={`size-4 rounded-full ${selected ? 'bg-cocoa' : 'border-[1.5px] border-muted'}`} />
      </span>
      <span className="mt-2 block text-[13px] leading-5 text-muted">{text}</span>
    </button>
  );
}
