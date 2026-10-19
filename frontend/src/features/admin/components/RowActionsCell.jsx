import React from "react";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";

const tooltipClass =
  "absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none";

const RowActionButton = ({ label, onClick, hoverClass, children }) => (
  <div className="relative group flex items-center justify-center">
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`p-1.5 rounded-lg text-gray-400 transition-colors ${hoverClass}`}
    >
      {children}
    </button>
    <span className={tooltipClass}>{label}</span>
  </div>
);

/** The edit/delete cell closing every catalogue table row. */
const RowActionsCell = ({ onEdit, onDelete }) => (
  <td className="p-3 flex gap-2">
    <RowActionButton
      label="Edit"
      onClick={onEdit}
      hoverClass="hover:text-blue-600 hover:bg-blue-50"
    >
      <HiPencilSquare className="w-4 h-4" />
    </RowActionButton>
    <RowActionButton
      label="Delete"
      onClick={onDelete}
      hoverClass="hover:text-red-600 hover:bg-red-50"
    >
      <HiTrash className="w-4 h-4" />
    </RowActionButton>
  </td>
);

export default RowActionsCell;
