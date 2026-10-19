import React from "react";

/**
 * The bordered table every catalogue tab renders. `columns` is the header row,
 * `children` the `<tr>` rows, and `emptyMessage` fills the table when the
 * dataset has nothing in it.
 */
const DataTable = ({
  columns,
  isEmpty,
  emptyMessage,
  radiusClass = "rounded-xl",
  children,
}) => (
  <div className={`overflow-auto border border-gray-200 ${radiusClass}`}>
    <table className="w-full text-sm">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr className="text-left">
          {columns.map((column) => (
            <th key={column} className="p-3">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
        {isEmpty && (
          <tr className="border-t border-gray-200">
            <td className="p-3 text-gray-500" colSpan={columns.length}>
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default DataTable;
