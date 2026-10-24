import React, { useId, useState } from "react";
import FaqItem from "@/shared/components/FaqItem";
import { questionKey } from "@/shared/utils/questionKey";
import Section from "@/features/home/components/ui/Section";
import SectionHeading from "@/features/home/components/ui/SectionHeading";
import { currencyFor, formatMoney, toInr } from "@/shared/utils/currency";
import { careersFor } from "../data/careerSalaries";
import { minimumsFor } from "../data/courseRequirements";

/**
 * Part-time work allowed on a student visa during term, per destination.
 * Rules change; destinations not listed get general guidance instead.
 */
const WORK_RIGHTS = {
  uk: "up to 20 hours a week during term time, and full time during official holidays",
  usa: "up to 20 hours a week on campus during term, and full time during breaks",
  canada: "up to 24 hours a week off campus during term, and full time during scheduled breaks",
  australia: "up to 48 hours per fortnight during term, and unlimited hours during breaks",
  germany: "up to 140 full days or 280 half days a year",
  ireland: "up to 20 hours a week during term, and 40 hours a week during holidays",
};
WORK_RIGHTS["united kingdom"] = WORK_RIGHTS.uk;
WORK_RIGHTS["united states"] = WORK_RIGHTS.usa;

const ENTRY_QUALIFICATION = {
  UG: (min) => `Class 12 (or equivalent) with at least ${min.percentage}%`,
  Diploma: (min) => `Class 12 (or equivalent) with at least ${min.percentage}%`,
  PG: (min) => `a bachelor's degree with at least ${min.percentage}%`,
  PhD: (min) => `a master's degree with at least ${min.percentage}%, plus a research proposal`,
};

/** "A, B and C" */
const listOf = (items) =>
  items.length > 1
    ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
    : items[0] || "";

/**
 * Standard questions answered from the course's own record and the data the
 * other sections on the page use, so every course has a useful FAQ without
 * hand-written entries. Where a field is empty the answer falls back to
 * general guidance rather than inventing a figure.
 */
const generatedFaqs = (course) => {
  const { name, type, duration, destination } = course;
  const university = course.university || {};
  const at = university.name ? ` at ${university.name}` : "";
  const min = minimumsFor(type);
  const ielts = university.ieltsRequirement || min.ielts;
  const qualification = (ENTRY_QUALIFICATION[type] || ENTRY_QUALIFICATION.PG)(min);
  const fee = Number(course.feePerYear);
  const currency = currencyFor(destination);
  const roles = careersFor(name).careers.slice(0, 4).map((career) => career.role);
  const workRights = WORK_RIGHTS[destination?.trim().toLowerCase()];

  return [
    duration && {
      question: `How long is ${name}${at}?`,
      answer: `${name}${at} takes ${duration.toLowerCase()} of full-time study.`,
    },
    {
      question: `What are the fees for ${name}${at}?`,
      answer: fee
        ? `Tuition is ${formatMoney(fee, currency.code)} per year${
            currency.code === "INR"
              ? ""
              : ` (about ${formatMoney(toInr(fee, currency), "INR")})`
          }. See the Fees & Cost of Study table on this page for the full-course total, including living costs, health insurance and the visa fee.`
        : `Tuition depends on the university and is confirmed in your offer letter. See the Fees & Cost of Study table on this page for an estimate, including living costs, health insurance and the visa fee.`,
    },
    {
      question: `What are the entry requirements for ${name}?`,
      answer: `You usually need ${qualification}, and proof of English such as IELTS ${ielts}. See the Requirements section on this page for the full list of documents.`,
    },
    {
      question: `What IELTS score do I need for ${name}?`,
      answer: `An overall IELTS score of ${ielts} is typically required. TOEFL iBT (${min.toefl}), PTE Academic (${min.pte}) and the Duolingo English Test (${min.duolingo}) are often accepted instead, and some universities waive the test if you studied in English.`,
    },
    {
      question: `When are the intakes for ${name}?`,
      answer: university.intakes
        ? `${university.name || "The university"} admits international students in the following intakes: ${university.intakes}. Not every course runs in every intake, so check this course's start dates early.`
        : `Most courses start in the main autumn intake, and some also offer a spring intake. Apply 6 to 9 months ahead to leave time for your visa.`,
    },
    roles.length > 0 && {
      question: `What careers can I pursue after ${name}?`,
      answer: `Graduates commonly work as ${listOf(roles)}. See the Careers & Salaries table on this page for typical salaries by country.`,
    },
    destination && {
      question: `Can I work while studying in ${destination}?`,
      answer: workRights
        ? `Yes. International students in ${destination} can usually work ${workRights}. Rules depend on your visa, so check the current conditions before you start work.`
        : `Most student visas allow some part-time work during term. The hours depend on your visa, so check the current conditions in ${destination} before you start work.`,
    },
    // {
    //   question: `Are scholarships available for ${name}?`,
    //   answer: `Yes. Universities offer merit scholarships and tuition discounts to international students, and government and external awards are open to many courses. Our counsellors can help you find the ones you are eligible for.`,
    // },
    // {
    //   question: `How can Edeco help me apply for ${name}?`,
    //   answer: `Our counsellors help you shortlist courses, prepare your application and statement of purpose, apply for scholarships and get your visa, all free of charge. Book a free counselling session to get started.`,
    // },
  ].filter(Boolean);
};

/**
 * Course FAQ, built like the university page's: centred heading over a single
 * accordion column, first question open. Questions entered in admin come
 * first, then the generated ones, with repeats dropped.
 */
const CourseFaq = ({ course }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const idBase = useId();

  const seen = new Set();
  const faqs = [...(course.faqs || []), ...generatedFaqs(course)].filter((faq) => {
    const key = questionKey(faq.question);
    if (!key || !faq.answer || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <Section id="faq" tone="light">
      <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />

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

export default CourseFaq;
