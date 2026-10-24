import React from "react";

/**
 * Two-option currency switch with a sliding highlight behind the active
 * option.
 */
const CurrencyToggle = ({ options, value, onChange, label = "Show fees in" }) => {
  const activeIndex = options.indexOf(value);

  return (
    <div
      role="group"
      aria-label={label}
      className="relative inline-grid grid-cols-2 rounded-sm border border-slate-200 bg-white p-1"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-sm bg-primary transition-transform duration-500 ease-out-cubic"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={`relative z-10 min-w-16 rounded-sm px-4 py-2 text-sm font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
              active ? "text-white" : "text-primary hover:text-secondary"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default CurrencyToggle;
