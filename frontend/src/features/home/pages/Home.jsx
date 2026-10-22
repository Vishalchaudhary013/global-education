import React from "react";
import { useNavigate } from "react-router-dom";
import { useCounselling } from "@/features/counselling";
import { seoConfig, staticPageMetadata, useSeo } from "@/shared/seo";
import { useHomeData } from "../hooks/useHomeData";

import Hero from "../components/Hero";
import PartnerStrip from "../components/PartnerStrip";
import CourseFinder from "../components/CourseFinder";
import HomeServices from "../components/HomeServices";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import VideoBanner from "../components/VideoBanner";
import Destinations from "../components/Destinations";
import FounderQuote from "../components/FounderQuote";
import Stats from "../components/Stats";
import UpcomingEvents from "../components/UpcomingEvents";
import Articles from "../components/Articles";
import Reviews from "../components/Reviews";
import Faq from "../components/Faq";
import FinalCta from "../components/FinalCta";

/**
 * Section order follows the reference layout the homepage was designed
 * against. Events and articles come from the API and remove themselves when
 * empty, so the page still reads correctly against a fresh database.
 */
const Home = () => {
  useSeo(staticPageMetadata("/", seoConfig));

  const navigate = useNavigate();
  const { openModal } = useCounselling();
  const { events, articles } = useHomeData();

  return (
    <div className="font-sans">
      <Hero openModal={openModal} />
      {/* <PartnerStrip /> */}
      <CourseFinder navigate={navigate} />
      <HomeServices openModal={openModal} />
      <About openModal={openModal} />
      <HowItWorks />
      <VideoBanner openModal={openModal} />
      <Destinations />
      {/* <FounderQuote openModal={openModal} /> */}
      <Stats />
      <UpcomingEvents events={events} />
      <Articles articles={articles} />
      <Reviews openModal={openModal} />
      <Faq />
      <FinalCta openModal={openModal} />
    </div>
  );
};

export default Home;
