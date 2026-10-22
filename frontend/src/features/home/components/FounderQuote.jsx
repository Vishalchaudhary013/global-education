import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { Container } from "./ui/Section";
import { FOUNDER_QUOTE } from "../data/homeContent";

/**
 * Founder quote band.
 *
 * Avatar, attribution and a large centred quote over a dimmed photograph. The
 * background sits at low opacity under a brand gradient so the white text
 * holds its contrast wherever the image happens to be light.
 */
const FounderQuote = ({ openModal }) => (
  <section className="relative overflow-hidden bg-primary py-20 sm:py-24 lg:py-28">
    <img
      src={FOUNDER_QUOTE.background}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover opacity-15"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-primary"
    />

    <Container className="relative">
      <Reveal y={26} className="mx-auto max-w-3xl text-center">
        <img
          src={FOUNDER_QUOTE.image}
          alt=""
          width="112"
          height="112"
          loading="lazy"
          decoding="async"
          className="mx-auto h-16 w-16 rounded-full border-2 border-white/30 object-cover sm:h-20 sm:w-20"
        />

        <p className="mt-5 text-lg font-bold tracking-tight text-white">
          {FOUNDER_QUOTE.name}
        </p>
        <p className="mt-1 text-sm text-slate-300">{FOUNDER_QUOTE.role}</p>

        <blockquote className="mt-8 text-balance text-2xl font-extrabold leading-[1.25] tracking-tight text-white sm:text-3xl lg:text-4xl">
          &ldquo;{FOUNDER_QUOTE.quote}&rdquo;
        </blockquote>

        <button
          type="button"
          onClick={openModal}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book a Consultation
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </Reveal>
    </Container>
  </section>
);

export default FounderQuote;
