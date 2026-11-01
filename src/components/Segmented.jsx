import { useState } from 'react';

// `onChange(option)` is optional: use it to save the new value.
export default function Segmented({ options, defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue);

  function choose(option) {
    setValue(option);
    onChange?.(option);
  }

  return (
    <div className="inline-flex gap-1 rounded-xl bg-oat p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => choose(option)}
          className={`rounded-[9px] px-[18px] py-2 text-sm ${value === option ? 'bg-surface font-semibold' : 'font-medium'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
