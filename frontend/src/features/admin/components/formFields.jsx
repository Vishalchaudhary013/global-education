import React from "react";
import { HiPlus, HiXMark } from "react-icons/hi2";

/**
 * Shared field styling for every admin form: square corners, no shadows.
 */
export const fieldClass =
  "w-full bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-gray-400 focus:bg-white rounded-sm px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors";

export const labelClass = "text-sm font-semibold text-gray-700";

/** Label + required marker wrapper. One grid cell of a form step. */
export const Field = ({ label, hint, required, className = "", children }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {label && (
      <label className={labelClass}>
        {label}
        {required && <span className="text-[#FF4E45]"> *</span>}
        {hint && <span className="text-gray-400 font-normal"> ({hint})</span>}
      </label>
    )}
    {children}
  </div>
);

export const TextInput = ({ className = "", ...props }) => (
  <input {...props} className={`${fieldClass} ${className}`} />
);

export const TextArea = ({ className = "", rows = 4, ...props }) => (
  <textarea {...props} rows={rows} className={`${fieldClass} resize-none ${className}`} />
);

export const Select = ({ className = "", children, ...props }) => (
  <select {...props} className={`${fieldClass} cursor-pointer ${className}`}>
    {children}
  </select>
);

/** The two-column grid every step lays its fields out on. */
export const FieldGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">{children}</div>
);

/**
 * Editable list of objects — one row per entry, with add and remove controls.
 * `columns` describes each cell: { key, placeholder, type, width }.
 */
export const RowList = ({ label, hint, columns, rows, onChange, addLabel = "Add row" }) => {
  const list = Array.isArray(rows) ? rows : [];

  const updateRow = (index, key, value) =>
    onChange(list.map((row, i) => (i === index ? { ...row, [key]: value } : row)));

  const addRow = () =>
    onChange([...list, Object.fromEntries(columns.map((column) => [column.key, ""]))]);

  const removeRow = (index) => onChange(list.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      {label && (
        <label className={labelClass}>
          {label}
          {hint && <span className="text-gray-400 font-normal"> ({hint})</span>}
        </label>
      )}

      <div className="flex flex-col gap-2">
        {list.map((row, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2">
              {columns.map((column) => (
                <div key={column.key} className={column.width || "sm:col-span-6"}>
                  {column.type === "textarea" ? (
                    <TextArea
                      rows={2}
                      placeholder={column.placeholder}
                      value={row[column.key] || ""}
                      onChange={(e) => updateRow(index, column.key, e.target.value)}
                    />
                  ) : column.type === "select" ? (
                    <Select
                      value={row[column.key] || ""}
                      onChange={(e) => updateRow(index, column.key, e.target.value)}
                    >
                      <option value="">{column.placeholder}</option>
                      {column.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <TextInput
                      type={column.type || "text"}
                      placeholder={column.placeholder}
                      value={row[column.key] || ""}
                      onChange={(e) => updateRow(index, column.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeRow(index)}
              aria-label="Remove row"
              className="mt-1 p-2 rounded-sm border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              <HiXMark className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="self-start flex items-center gap-1.5 px-3 py-2 rounded-sm border border-dashed border-gray-300 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
      >
        <HiPlus className="w-4 h-4" />
        {addLabel}
      </button>
    </div>
  );
};
