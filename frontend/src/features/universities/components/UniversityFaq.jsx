import React, { useId, useState } from "react";
import FaqItem from "@/shared/components/FaqItem";
import { questionKey } from "@/shared/utils/questionKey";
import Section from "@/features/home/components/ui/Section";
import SectionHeading from "@/features/home/components/ui/SectionHeading";

/**
 * Standard questions answered from the university's own record, so every page
 * has a useful FAQ without hand-written entries. Where a field is empty the
 * answer falls back to general guidance rather than inventing a figure.
 */
const generatedFaqs = (university) => {
  const { name, location, destination, ranking, intakes, ieltsRequirement, studyCost, livingCost } =
    university;
  const place =
    location && location.toLowerCase() !== destination?.toLowerCase()
      ? `${location}, ${destination}`
      : destination;

  return [
    place && {
      question: `Where is ${name} located?`,
      answer: `${name} is located in ${place}. Our counsellors can tell you more about the campus, the city and student life there.`,
    },
    {
      question: `What is the ranking of ${name}?`,
      answer: ranking
        ? `${name} is ranked ${ranking}. See the University Rankings table on this page for its position in the QS, THE, US News and ARWU rankings over recent years.`
        : `See the University Rankings table on this page for ${name}'s position in the major world rankings over recent years.`,
    },
    {
      question: `What are the intakes at ${name}?`,
      answer: intakes
        ? `${name} admits international students in the following intakes: ${intakes}. Availability varies by course, so check your programme's start dates early.`
        : `Most programmes at ${name} start in the main autumn intake, and some also offer a spring intake. Availability varies by course.`,
    },
    {
      question: `What IELTS score do I need for ${name}?`,
      answer: ieltsRequirement
        ? `An IELTS score of ${ieltsRequirement} is typically required. Some courses ask for higher band scores, and TOEFL or PTE results are often accepted too.`
        : `English requirements vary by course; most programmes ask for an overall IELTS band of 6.0 to 7.0. TOEFL or PTE results are often accepted too.`,
    },
    {
      question: `How much does it cost to study at ${name}?`,
      answer:
        studyCost || livingCost
          ? [
              studyCost && `Tuition is around ${studyCost}.`,
              livingCost && `Living costs are around ${livingCost}.`,
              "See the Fees Estimate table on this page for course-by-course fees.",
            ]
              .filter(Boolean)
              .join(" ")
          : "Fees depend on your course and level of study. See the Fees Estimate table on this page for course-by-course fees.",
    },
    {
      question: `Are scholarships available for international students at ${name}?`,
      answer: `Yes. ${name} offers scholarships and tuition discounts to international students, from merit awards to research funding. See the Scholarships section on this page for current options.`,
    },
    {
      question: `What documents do I need to apply to ${name}?`,
      answer:
        "Usually academic transcripts, a passport copy, English test scores, a statement of purpose, letters of recommendation and an updated CV. See Admission Requirements on this page for the full list.",
    },
    {
      question: `How can Edeco help me get into ${name}?`,
      answer: `Our counsellors help you shortlist courses, prepare your application and statement of purpose, apply for scholarships and get your visa, all free of charge. Book a free counselling session to get started.`,
    },
  ].filter(Boolean);
};

/**
 * University FAQ, built like the destination page's: centred heading over a
 * single accordion column, first question open. Questions entered in admin
 * come first, then the generated ones, with repeats dropped.
 */
const UniversityFaq = ({ university }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const idBase = useId();

  const seen = new Set();
  const faqs = [...(university.faqs || []), ...generatedFaqs(university)].filter((faq) => {
    const key = questionKey(faq.question);
    if (!key || !faq.answer || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title={`Frequently Asked Questions `}
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

export default UniversityFaq;
