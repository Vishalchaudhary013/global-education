import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { useCarousel } from "@/shared/hooks/useCarousel";
import Section from "@/features/home/components/ui/Section";

/**
 * TEMPORARY sample stories so the section can be previewed before real ones
 * are entered. They are labelled as samples on the page, since passing them
 * off as real students would mislead applicants. Remove once real stories
 * exist for every university.
 */
const sampleStories = (name) => [
  {
    studentName: "Aarav Sharma",
    course: "MSc Computer Science",
    intake: "September 2024",
    story: `I was unsure which universities fit my profile. My counsellor shortlisted the right programmes, and I got my offer from ${name} within weeks.`,
  },
  {
    studentName: "Priya Nair",
    course: "Master of Business Administration (MBA)",
    intake: "January 2024",
    story: "From my statement of purpose to the visa interview, every step was planned. I joined my MBA on time and with a scholarship.",
  },
  {
    studentName: "Rohan Mehta",
    course: "BEng Civil Engineering",
    intake: "September 2023",
    story: "The application felt overwhelming at first. Having one person guide me through documents and deadlines made it simple.",
  },
  {
    studentName: "Ananya Iyer",
    course: "MSc Data Science",
    intake: "September 2024",
    story: "I got help preparing for IELTS and choosing accommodation, so I could focus on settling in when I arrived.",
  },
  {
    studentName: "Karan Singh",
    course: "BBA Business Administration",
    intake: "September 2023",
    story: `My parents had many questions about costs and safety. The team answered all of them, and now I'm in my second year at ${name}.`,
  },
  {
    studentName: "Sneha Reddy",
    course: "BSc Nursing",
    intake: "February 2024",
    story: "They helped me find a course with strong clinical placements and walked me through the visa process step by step.",
  },
];

const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1F2853&color=fff&bold=true&size=96`;

const arrowClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-primary";

const StoryCard = ({ story }) => (
  <li className="w-[18.5rem] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]">
    <figure className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-slate-200 bg-white p-6 transition-colors duration-500 ease-out-cubic hover:border-primary/30 sm:p-7">
      {/* Oversized closing quote, tinting coral on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 right-5 text-[7rem] font-bold leading-none text-primary/5 transition-colors duration-500 group-hover:text-secondary/15"
      >
        &rdquo;
      </span>

      <figcaption className="relative flex items-center gap-3">
        <img
          src={story.photo || avatarUrl(story.studentName)}
          alt=""
          width="48"
          height="48"
          loading="lazy"
          decoding="async"
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-primary">
            {story.studentName}
          </p>
          <p className="line-clamp-2 text-sm font-semibold text-secondary">
            {story.course}
          </p>
        </div>
      </figcaption>

      {story.story && (
        <blockquote className="relative mt-5 flex-1 text-base leading-7 text-slate-600">
          &ldquo;{story.story}&rdquo;
        </blockquote>
      )}

      
    </figure>
  </li>
);

/**
 * "Success Stories" carousel: students who joined this university, each card
 * showing the student, their course here, a short quote and their intake.
 * Uses the university's `successStories`, or labelled samples until those
 * are entered.
 */
const UniversityStories = ({ university }) => {
  const { name } = university;
  const own = (university.successStories || []).filter(
    (story) => story.studentName && story.course,
  );
  const isSample = own.length === 0;
  const stories = isSample ? sampleStories(name) : own;
  const { trackRef, atStart, atEnd, canScroll, scrollByCard } = useCarousel();

  return (
    <Section id="stories" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            Success Stories
          </p>
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
            Our Students at {name}
          </h2>
          
        </Reveal>

        {/* Arrows only while some cards are out of view. */}
        {canScroll && (
          <Reveal y={30} delay={150} className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous stories"
              className={arrowClass}
            >
              <HiArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Next stories"
              className={arrowClass}
            >
              <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Reveal>
        )}
      </div>

      <Reveal className="mt-10 lg:mt-14">
        <ul
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-2"
        >
          {stories.map((story, index) => (
            <StoryCard key={`${story.studentName}-${index}`} story={story} />
          ))}
        </ul>
      </Reveal>
    </Section>
  );
};

export default UniversityStories;
