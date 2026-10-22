import React from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiOutlineAcademicCap,
  HiOutlineBuildingOffice2,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlinePaperAirplane,
  HiOutlineBanknotes,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import Section from "./ui/Section";
import { SERVICES } from "../data/homeContent";

const ICONS = {
  counselling: HiOutlineChatBubbleLeftRight,
  university: HiOutlineBuildingOffice2,
  visa: HiOutlinePaperAirplane,
  scholarship: HiOutlineBanknotes,
  document: HiOutlineDocumentText,
  departure: HiOutlineAcademicCap,
};

/**
 * Icon tiles alternate between the two brand colours down the list, which
 * keeps a six-card grid from reading as one flat block.
 */
const TILE_TONES = [
  "bg-primary text-white",
  "bg-secondary text-white",
  "bg-primary text-white",
  "bg-secondary text-white",
  "bg-primary text-white",
  "bg-secondary text-white",
];

/**
 * `stretch` fills the grid row, which keeps cards that share a row on equal
 * heights. The two cards flanking the heading turn it off: their row is as
 * tall as the heading block, so stretching would open a gap between the
 * description and the link rather than making them match anything.
 */
const ServiceCard = ({ service, index, className = "", stretch = true }) => {
  const Icon = ICONS[service.icon] || HiOutlineChatBubbleLeftRight;
  const fill = stretch ? "h-full" : "";

  return (
    <Reveal className={`${fill} ${className}`}>
      <Link
        to={service.to}
        className={`group flex ${fill} flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-colors duration-500 ease-in-out hover:border-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:p-7`}
      >
        <span
          className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
            TILE_TONES[index % TILE_TONES.length]
          }`}
        >
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>

        <h3 className="text-[18px] font-bold tracking-tight text-primary transition-colors duration-300 group-hover:text-secondary sm:text-xl">
          {service.title}
        </h3>

        <p className="mt-3 flex-1 text-[16px] leading-5 text-slate-600">
          {service.description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-[16px] font-bold text-secondary transition-transform duration-300 ease-out-cubic group-hover:translate-x-2">
          Read More
          <HiArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </Link>
    </Reveal>
  );
};

/**
 * Services, arranged in a checkerboard around a centred heading.
 *
 * On large screens it is a three-column, three-row grid: two cards flank the
 * heading on the top row, one sits alone in the middle, and two more flank the
 * empty centre of the bottom row. The gaps are deliberate, and they are what
 * stop a plain six-up grid from reading as a wall.
 *
 * Below `lg` the arrangement collapses to the heading above an ordinary
 * two-up grid, because a checkerboard only works with three columns to
 * stagger across.
 */
const HomeServices = ({ openModal }) => {
  const [a, b, c, d, e] = SERVICES;

  const heading = (
    <Reveal className="text-center lg:self-start lg:px-2">
      <p className="mb-5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-secondary" />
        Services
      </p>
      {/* Sits in the narrow middle column, so it tops out just under the
          full-width section headings rather than matching them exactly. */}
      <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-[2.6rem]">
        Guiding Your Global Education Journey.
      </h2>
      <button
        type="button"
        onClick={openModal}
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <RollText>Book a Consultation</RollText>
        <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
          <RollIcon icon={HiArrowRight} />
        </span>
      </button>
    </Reveal>
  );

  return (
    <Section tone="white" id="services">
      {/* Phones: heading, then a swipe row. Tablet: heading, then an even grid. */}
      <div className="lg:hidden">
        {heading}
        <div className="mobile-track mt-10 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      {/*
        Desktop: the checkerboard.

        The heading leads the first row and the two cards beside it are pushed
        down by a top margin, so they begin roughly level with the bottom of
        the heading block. Self-alignment cannot do this: the cards are the
        taller item, so `self-end` leaves them flush with the top of the row.

        Those two cards also opt out of the row stretch, so they size to their
        own content instead of being pulled to the height of the heading.
      */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-2">
        <ServiceCard
          service={a}
          index={0}
          stretch={false}
          className="lg:mt-48 lg:self-start"
        />
        {heading}
        <ServiceCard
          service={b}
          index={1}
          stretch={false}
          className="lg:mt-48 lg:self-start"
        />

        <div aria-hidden="true" />
        <ServiceCard service={c} index={2} />
        <div aria-hidden="true" />

        <ServiceCard service={d} index={3} />
        <div aria-hidden="true" />
        <ServiceCard service={e} index={4} />
      </div>
    </Section>
  );
};

export default HomeServices;
