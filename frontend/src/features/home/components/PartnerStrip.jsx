import React from "react";
import { Container } from "./ui/Section";
import { PARTNER_NAMES } from "../data/homeContent";

/**
 * Continuously scrolling strip of partner institutions.
 *
 * The track holds the list twice and slides by exactly half its width, so the
 * animation loops on an identical frame with no visible seam. The duplicate is
 * hidden from assistive technology, which reads the first copy only.
 *
 * The whole strip stops moving under `prefers-reduced-motion` (handled in
 * index.css), leaving a static, readable row.
 */
const PartnerStrip = () => (
  <section
    aria-label="Partner institutions"
    className="bg-[#F4FAFF] py-10"
  >
    <Container>
      <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        Trusted by students placed at
      </p>
    </Container>

    <div className="marquee-mask overflow-hidden">
      <div
        className="animate-marquee flex w-max items-center gap-12 pr-12"
        style={{ "--marquee-duration": "45s" }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-12 pr-12"
          >
            {PARTNER_NAMES.map((name) => (
              <li
                key={name}
                className="whitespace-nowrap text-lg font-bold tracking-tight text-slate-300 transition-colors duration-300 hover:text-primary sm:text-xl"
              >
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerStrip;
