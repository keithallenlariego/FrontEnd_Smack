import { useState } from 'react';

// `onChange(isOn)` is optional: use it to save the new value.
export default function Toggle({ defaultOn = false, onChange }) {
  const [on, setOn] = useState(defaultOn);

  function handleClick() {
    setOn(!on);
    onChange?.(!on);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={handleClick}
      className={`flex h-6 w-11 items-center rounded-full p-[3px] ${on ? 'bg-sage' : 'bg-oat'}`}
    >
      <span className={`size-[18px] rounded-full bg-cream transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}
