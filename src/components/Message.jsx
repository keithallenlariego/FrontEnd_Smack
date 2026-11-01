import Avatar from './Avatar.jsx';

export default function Message({ name, letter, color, time, text, large = false }) {
  return (
    <div className={`flex ${large ? 'gap-3.5' : 'gap-3'}`}>
      <Avatar letter={letter} color={color} size={large ? 40 : 32} />
      <div>
        <div className="flex items-baseline gap-2">
          <strong className={large ? 'text-[15px]' : 'text-[13px]'}>{name}</strong>
          <span className={`text-muted ${large ? 'text-xs' : 'text-[11px]'}`}>{time}</span>
        </div>
        <p className={large ? 'mt-1 text-[15px] leading-[23px]' : 'mt-[3px] text-sm'}>{text}</p>
      </div>
    </div>
  );
}
