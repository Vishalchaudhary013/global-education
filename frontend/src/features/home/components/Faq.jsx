import React, { useId, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { FAQS } from "../data/homeContent";

/**
 * FAQ accordion, one panel open at a time to match the convention the
 * destination guides already use.
 *
 * The open/close animation runs on `grid-template-rows` between `0fr` and
 * `1fr` rather than on a measured pixel height. That animates smoothly, needs
 * no JavaScript measuring, and keeps working when the answer reflows at a
 * different width, which a cached `scrollHeight` would get wrong.
 *
 * Markup is a button inside a heading, wired to its panel with
 * `aria-controls` and `aria-expanded`, so it is reachable and announced
 * correctly from the keyboard with no extra key handling.
 */
const FaqItem = ({ faq, isOpen, onToggle, idBase, index }) => {
  const buttonId = `${idBase}-trigger-${index}`;
  const panelId = `${idBase}-panel-${index}`;

  return (
    <Reveal delay={index * 60} y={20}>
      <div
        className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
          isOpen ? "border-primary/15" : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <h3>
          <button
            id={buttonId}
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-secondary sm:px-6"
          >
            <span className="text-base font-bold tracking-tight text-primary sm:text-lg">
              <span className="mr-1 text-slate-400">{index + 1}.</span>
              {faq.question}
            </span>
            <span
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                isOpen ? "bg-secondary text-white" : "bg-slate-100 text-primary"
              }`}
            >
              {/* Swapping the glyph keeps the icon legible at 9x9 where a
                  rotating plus reads as a smudge mid-transition. */}
              {isOpen ? (
                <HiMinus className="h-4 w-4" aria-hidden="true" />
              ) : (
                <HiPlus className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div
            className={`overflow-hidden transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:text-base">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const idBase = useId();

  return (
    <Section tone="white" id="faq">
      <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />

      <div className="mx-auto mt-12 max-w-4xl space-y-3 lg:mt-16">
        {FAQS.map((faq, index) => (
          <FaqItem
            key={faq.question}
            faq={faq}
            index={index}
            idBase={idBase}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </div>
    </Section>
  );
};

export default Faq;
