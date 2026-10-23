import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import RevealImage from "@/shared/components/RevealImage";
import { RollIcon, RollText } from "@/shared/components/Roll";
import { Container } from "@/features/home/components/ui/Section";

const STUDENT_PHOTO =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop";

const defaultIntro = (name) =>
  `${name} might be your top study abroad choice for so many reasons: academic excellence, a welcoming lifestyle, exciting job opportunities, and more. Learn all about ${name}, and how to begin your study journey there, with the information on this page.`;

/**
 * Split hero for a destination page: headline and one call to action on the
 * left, a three-photo collage on the right (one tall frame beside two stacked
 * ones).
 *
 * The tall frame uses the destination's own hero image, falling back to its
 * first city photo; the lower small frame shows the country's flag, so every
 * destination gets a complete collage without extra content entry.
 */
const DestinationHero = ({ destination, guide, onStart }) => {
  const name = destination.name;
  const mainImage = destination.heroImage || guide.cities?.[0]?.image;
  const sideImage = guide.cities?.[1]?.image || STUDENT_PHOTO;

  const photos = [
    mainImage && {
      src: mainImage,
      alt: `Studying in ${name}`,
      cell: "row-span-2",
    },
    {
      src: guide.heroStudentImage || STUDENT_PHOTO,
      alt: "International students on campus",
      cell: "",
    },
    guide.flagCode
      ? {
          src: `https://flagcdn.com/w640/${guide.flagCode}.png`,
          alt: `Flag of ${name}`,
          cell: "",
        }
      : { src: sideImage, alt: `A city in ${name}`, cell: "" },
  ].filter(Boolean);

  return (
    <section className="relative flex items-center overflow-hidden bg-white pb-12 pt-10 sm:min-h-screen sm:pb-20 sm:pt-0">
      {/* Full-screen from `sm` up, where the photo collage fills the height.
          Phones show only the copy, so they get plain padding instead of a
          viewport-tall band with empty space above and below. */}
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-primary sm:text-5xl lg:text-[48px]">
            Your Journey to{" "}
            <span className="text-secondary">Study in {name}</span> Starts
            Here
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {guide.heroIntro || defaultIntro(name)}
          </p>

          <div className="mt-9">
            <button
              type="button"
              onClick={onStart}
              className="group inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <RollText>Start Your Journey</RollText>
              <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
                <RollIcon icon={HiArrowRight} />
              </span>
            </button>
          </div>
        </Reveal>

        {/* Collage: tall photo on the left, two stacked on the right. Hidden
            on phones, where the hero is the copy and call to action alone. */}
        <ul className="hidden h-[17rem] sm:grid grid-cols-[1.4fr_1fr] grid-rows-2 gap-3 sm:h-[22rem] sm:gap-5 lg:h-[26rem]">
          {photos.map((photo, index) => (
            <li key={photo.src} className={photo.cell}>
              <RevealImage className="h-full overflow-hidden rounded-[1.25rem] bg-slate-100">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:scale-[1.05]"
                />
              </RevealImage>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default DestinationHero;
