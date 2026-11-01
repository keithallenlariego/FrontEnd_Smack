const colors = {
  clay: 'bg-clay text-cream',
  sage: 'bg-sage text-cocoa',
  caramel: 'bg-caramel text-cocoa',
};

export default function Avatar({ letter, color = 'clay', size = 32 }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-semibold ${colors[color]}`}
      style={{ width: size, height: size, fontSize: size > 34 ? 15 : 13 }}
    >
      {letter}
    </span>
  );
}
