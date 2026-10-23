import React, { useId, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";
import SectionHeading from "@/features/home/components/ui/SectionHeading";
import { destinationFaqs } from "../data/destinationFaqs";

const questionKey = (value) => (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * One accordion row, matching the landing page FAQ: a button inside a
 * heading wired to its panel, with the panel opening on `grid-template-rows`
 * so the animation needs no height measuring.
 */
const FaqItem = ({ faq, isOpen, onToggle, idBase, index }) => {
  const buttonId = `${idBase}-trigger-${index}`;
  const panelId = `${idBase}-panel-${index}`;

  return (
    <Reveal>
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

/**
 * Destination FAQ, built like the landing page FAQ: centred heading over a
 * single accordion column. Questions come from the destination's guide
 * first, then its bundled extras, with repeats dropped.
 */
const DestinationFaq = ({ destId, destination, guide }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const idBase = useId();

  const seen = new Set();
  const faqs = [...(guide.faqs || []), ...(destinationFaqs[destId] || [])].filter(
    (faq) => {
      const key = questionKey(faq.question);
      if (!key || !faq.answer || seen.has(key)) return false;
      seen.add(key);
      return true;
    },
  );

  if (faqs.length === 0) return null;

  return (
    <Section tone="white" id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title={`Frequently Asked Questions about ${destination.name}`}
      />

      <div className="mx-auto mt-12 max-w-4xl space-y-3 lg:mt-16">
        {faqs.map((faq, index) => (
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

export default DestinationFaq;
