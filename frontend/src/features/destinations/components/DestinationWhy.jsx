import React from "react";
import {
  HiAcademicCap,
  HiArrowRight,
  HiBanknotes,
  HiBolt,
  HiBriefcase,
  HiBuildingOffice2,
  HiGlobeAlt,
  HiHome,
  HiIdentification,
  HiLanguage,
  HiLightBulb,
  HiShieldCheck,
  HiSun,
  HiTrophy,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import Section from "@/features/home/components/ui/Section";
import { whyStudyReasons } from "../data/whyStudyReasons";

const ICONS = {
  trophy: HiTrophy,
  bolt: HiBolt,
  briefcase: HiBriefcase,
  id: HiIdentification,
  bulb: HiLightBulb,
  globe: HiGlobeAlt,
  shield: HiShieldCheck,
  sun: HiSun,
  cash: HiBanknotes,
  home: HiHome,
  cap: HiAcademicCap,
  language: HiLanguage,
  building: HiBuildingOffice2,
};

/**
 * "Why {country}?" band: a large heading, intro and call to action on the
 * left that stays in view on desktop, beside a ruled list of reasons on the
 * right, each with an icon, a title and one line of detail.
 */
const DestinationWhy = ({ destId, destination, guide, onTalk }) => {
  const name = destination.name;
  const fallback = whyStudyReasons[destId] || {};
  const reasons = guide.whyReasons?.length ? guide.whyReasons : fallback.reasons;
  const intro = guide.whyIntro || fallback.intro || guide.tagline;

  if (!reasons?.length) return null;

  return (
    <Section id="why" spacing="normal">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            Why study here
          </p>
          <h2 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Why {name}?
          </h2>
          {intro && (
            <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {intro}
            </p>
          )}
          <button
            type="button"
            onClick={onTalk}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <RollText>Talk to an Expert</RollText>
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
              <RollIcon icon={HiArrowRight} />
            </span>
          </button>
        </Reveal>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {reasons.map((reason) => {
            const Icon = ICONS[reason.icon] || HiLightBulb;
            return (
              <Reveal
                as="li"
                key={reason.title}
                y={40}
                className="flex gap-5 py-7 sm:gap-6 sm:py-8"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-secondary">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold leading-snug text-primary sm:text-2xl">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {reason.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
};

export default DestinationWhy;
