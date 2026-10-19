import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const FaqAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs?.length) return null;

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="bg-white border border-slate-200 rounded-sm">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-[#1F2853]">{faq.question}</span>
              <HiChevronDown
                className={`h-4 w-4 text-slate-500 shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 -mt-1 text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
