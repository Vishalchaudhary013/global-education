import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCounselling } from "../context/CounsellingContext";
import api from "../api";

import Hero from "../components/home/Hero";
import CourseFinder from "../components/home/CourseFinder";
import Destinations from "../components/home/Destinations";
import Reviews from "../components/home/Reviews";
import Articles from "../components/home/Articles";
import UpcomingEvents from "../components/home/UpcomingEvents";

const Home = () => {
  const navigate = useNavigate();
  const { openModal } = useCounselling();
  
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, articlesRes] = await Promise.all([
          api.get('/events'),
          api.get('/articles').catch(() => ({ data: [] }))
        ]);
        setEvents(eventsRes.data || []);
        setArticles(articlesRes.data || []);
      } catch (error) {
        console.error("Failed to fetch home data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Hero openModal={openModal} />
      <CourseFinder navigate={navigate} />
      <Destinations />
      <Reviews />
      <Articles articles={articles} />
      <UpcomingEvents events={events} />
    </div>
  );
};

export default Home;
