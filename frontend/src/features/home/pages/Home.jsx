import React from "react";
import { useNavigate } from "react-router-dom";
import { useCounselling } from "@/features/counselling";
import { useHomeData } from "../hooks/useHomeData";

import Hero from "../components/Hero";
import CourseFinder from "../components/CourseFinder";
import Destinations from "../components/Destinations";
import Reviews from "../components/Reviews";
import Articles from "../components/Articles";
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {
  const navigate = useNavigate();
  const { openModal } = useCounselling();
  
  const { events, articles } = useHomeData();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Hero openModal={openModal} />
      <CourseFinder navigate={navigate} />
      <Destinations />
      <UpcomingEvents events={events} />
      
      
      <Reviews />
      <Articles articles={articles} />
    </div>
  );
};

export default Home;
