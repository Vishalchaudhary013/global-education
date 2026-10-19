import React from "react";
import { PAGE_SIZE } from "../utils/pagination";

/**
 * Page numbers around the current page, with "..." standing in for the pages
 * skipped between the first/last page and that window.
 */
const pageNumbers = (totalPages, page) =>
  Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter(
      (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1,
    )
    .reduce((shown, n, index, kept) => {
      if (index > 0 && n - kept[index - 1] > 1) shown.push("...");
      shown.push(n);
      return shown;
    }, []);

const Pagination = ({ total, page, setPage }) => {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;

  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-700">
          {from}–{to}
        </span>{" "}
        of <span className="font-semibold text-gray-700">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ← Prev
        </button>

        {pageNumbers(totalPages, page).map((n, index) =>
          n === "..." ? (
            <span key={`gap-${index}`} className="px-2 text-gray-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                page === n
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              {n}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
