import React, { useState } from "react";
import {
  HiMagnifyingGlass,
  HiMapPin,
  HiAcademicCap,
  HiChevronRight,
  HiPlay,
  HiCheckCircle,
  HiStar,
  HiArrowTrendingUp,
  HiUsers,
  HiBookOpen,
  HiCalendarDays,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useCounselling } from "../context/CounsellingContext";
import EventCard from "../components/EventCard";
import api from "../api";

const Home = () => {
  const navigate = useNavigate();
  const { openModal } = useCounselling();
  
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2670&auto=format&fit=crop"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, articlesRes] = await Promise.all([
          api.get('/events'),
          api.get('/articles').catch(() => ({ data: [] })) // Fallback if no article endpoint
        ]);
        setEvents(eventsRes.data || []);
        setArticles(articlesRes.data || []);
      } catch (error) {
        console.error("Failed to fetch home data", error);
      }
    };
    fetchData();
  }, []);

  // Hero Section
  const Hero = () => (
    <div className="relative pt-10 pb-10 lg:pt-25 lg:pb-40 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Students"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === currentHeroIndex ? "opacity-50" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-slate-900/20"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-300 border border-primary/30 text-sm font-semibold mb-6 tracking-wide text-indigo-400">
            DISCOVER YOUR POTENTIAL
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Study Abroad with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400">
              Global Education
            </span>{" "}
            and Career
          </h1>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
            Explore top universities, scholarships, and career opportunities
            around the world. Your journey to global success starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={openModal}
              className="bg-gradient-to-r from-primary-600 to-indigo-500 hover:from-indigo-500 hover:to-primary-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Book Free Counselling <HiChevronRight className="h-5 w-5" />
            </button>
            {/* <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center">
              Apply Now
            </button> */}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-8 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <HiCheckCircle className="h-5 w-5 text-emerald-400" /> 100% Free
              Guidance
            </div>
            <div className="flex items-center gap-2">
              <HiCheckCircle className="h-5 w-5 text-emerald-400" /> 500+ Top
              Universities
            </div>
            <div className="flex items-center gap-2">
              <HiCheckCircle className="h-5 w-5 text-emerald-400" /> Fast Visa
              Processing
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Course Finder Section
  const CourseFinder = () => {
    const [searchType, setSearchType] = useState("courses");
    const [searchTerm, setSearchTerm] = useState("");
    const [courseLevel, setCourseLevel] = useState("");
    const [destination, setDestination] = useState("");

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchType === "courses") {
        const params = new URLSearchParams();
        if (searchTerm) params.append("name", searchTerm);
        if (courseLevel) params.append("type", courseLevel);
        if (destination) params.append("destination", destination);
        navigate(`/courses?${params.toString()}`);
      } else {
        if (destination) {
          navigate(`/destinations/${destination}`);
        } else {
          navigate("/destinations");
        }
      }
    };

    return (
      <div className=" py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold  mb-3 tracking-tight">
              Find Your Perfect <span className="">{searchType === "courses" ? "Course" : "University"}</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Search from thousands of courses and universities across the
              globe.
            </p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
            <div className="flex gap-4 mb-8 border-b border-slate-800 pb-4">
              <button
                type="button"
                onClick={() => setSearchType("courses")}
                className={`text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${searchType === "courses" ? "bg-primary text-white" : "text-slate-400 hover:text-white"}`}
              >
                Find Courses
              </button>
              <button
                type="button"
                onClick={() => setSearchType("universities")}
                className={`text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${searchType === "universities" ? "bg-primary text-white" : "text-slate-400 hover:text-white"}`}
              >
                Find Universities
              </button>
            </div>

            <form
              className={`grid grid-cols-1 ${searchType === "courses" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-4`}
              onSubmit={handleSearch}
            >
              {searchType === "courses" && (
                <div className="relative col-span-1 border border-slate-700 rounded-xl overflow-hidden group focus-within:border-primary">
                  <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Course Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 outline-none placeholder-slate-500 font-medium"
                  />
                </div>
              )}

              {searchType === "courses" && (
                <div className="relative col-span-1 border border-slate-700 rounded-xl overflow-hidden focus-within:border-primary">
                  <select
                    value={courseLevel}
                    onChange={(e) => setCourseLevel(e.target.value)}
                    className="w-full bg-slate-800 text-white px-4 py-4 outline-none font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Course Level</option>
                    <option value="UG">Undergraduate</option>
                    <option value="PG">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                  <HiChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 rotate-90 pointer-events-none" />
                </div>
              )}

              <div className={`relative ${searchType === "courses" ? "col-span-1" : "col-span-2"} border border-slate-700 rounded-xl overflow-hidden focus-within:border-primary`}>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-800 text-white px-4 py-4 outline-none font-medium appearance-none cursor-pointer"
                >
                  <option value="">Destination</option>
                  <option value="uk">UK</option>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                  <option value="india">India</option>
                  <option value="dubai">Dubai</option>
                  <option value="newzealand">New Zealand</option>
                  <option value="singapore">Singapore</option>
                </select>
                <HiMapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
              </div>

              <div className="col-span-1">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-indigo-500 text-white py-4 rounded-xl font-bold text-lg transition-colors h-full"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Popular Destinations Section
  const Destinations = () => {
    const dests = [
      {
        name: "Australia",
        slug: "australia",
        img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2730&auto=format&fit=crop",
      },
      {
        name: "UK",
        slug: "uk",
        img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop",
      },
      {
        name: "Canada",
        slug: "canada",
        img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2611&auto=format&fit=crop",
      },
      {
        name: "USA",
        slug: "usa",
        img: "https://images.unsplash.com/photo-1550850839-8dc894ed385a?q=80&w=2675&auto=format&fit=crop",
      },
      {
        name: "Germany",
        slug: "germany",
        img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2670&auto=format&fit=crop",
      },
      {
        name: "India",
        slug: "india",
        img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2671&auto=format&fit=crop",
      },
      {
        name: "Dubai",
        slug: "dubai",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop",
      },
      {
        name: "New Zealand",
        slug: "newzealand",
        img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2671&auto=format&fit=crop",
      },
      {
        name: "Singapore",
        slug: "singapore",
        img: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=80&w=2670&auto=format&fit=crop",
      },
    ];

    return (
      <div className="py-20 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
                Popular Study Destinations
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl">
                Discover top-ranked universities in the world's best education
                hubs.
              </p>
            </div>
            <Link
              to="/destinations"
              className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:text-indigo-700"
            >
              View All <HiChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dests.map((dest, i) => (
              <Link
                to={`/destinations/${dest.slug}`}
                key={i}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? "col-span-2 md:col-span-2 row-span-2 h-[400px]" : "h-[192px]"}`}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-bold text-2xl mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-primary-200 text-sm font-medium text-slate-300 flex items-center gap-1 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <HiMapPin className="h-4 w-4" /> Explore Top Unis
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Reviews Section
  const Reviews = () => (
    <div className="py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-slate-800 mb-16">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Jenkins",
              uni: "University of Toronto, Canada",
              text: "GlobalEdu made my dream of studying in Canada a reality. Their visa guidance was absolutely flawless!",
            },
            {
              name: "Rahul Sharma",
              uni: "University of Melbourne, Australia",
              text: "From shortlisting universities to my offer letter, the team was with me every step. Highly recommended!",
            },
            {
              name: "Amira Hassan",
              uni: "University of Edinburgh, UK",
              text: "The scholarship guidance helped me secure a partial scholarship worth £6,000. Truly life-changing!",
            },
            {
              name: "James Park",
              uni: "TU Munich, Germany",
              text: "I had no idea Germany offered free education. GlobalEdu opened that door for me. Best decision ever!",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 text-amber-400 mb-4">
                <HiStar className="fill-current w-5 h-5" />
                <HiStar className="fill-current w-5 h-5" />
                <HiStar className="fill-current w-5 h-5" />
                <HiStar className="fill-current w-5 h-5" />
                <HiStar className="fill-current w-5 h-5" />
              </div>
              <p className="text-slate-600 mb-6 italic hover:text-slate-900 transition-colors">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`}
                  alt={item.name}
                  className="w-12 h-12 rounded-full ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-bold text-slate-800">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.uni}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Articles Section
  const Articles = () => (
    <div className="py-24 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-extrabold text-slate-800">
            Latest Articles
          </h2>
          <Link
            to="/articles"
            className="text-primary font-bold hover:underline"
          >
            View All Articles
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.slice(0, 4).map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mb-4 line-clamp-2">
                  {article.title}
                </h3>
                <Link
                  to={`/articles/${article._id}`}
                  className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-1"
                >
                  Read Fully <HiChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Upcoming Events Section
  const UpcomingEvents = () => (
    <div className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
              <HiCalendarDays className="h-4 w-4" /> Don't Miss Out
            </p>
            <h2 className="text-4xl font-extrabold text-slate-900">
              Upcoming Events
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Join education fairs, webinars, and assessment days to fast-track
              your study abroad journey.
            </p>
          </div>
          <Link
            to="/events"
            className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:text-indigo-700 shrink-0"
          >
            View All Events <HiChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.slice(0, 4).map((event) => {
            const d = new Date(event.date);
            const modeColors = {
              online: "bg-sky-100 text-sky-700",
              offline: "bg-rose-100 text-rose-700",
              hybrid: "bg-violet-100 text-violet-700",
            };
            const modeLabels = {
              online: "🌐 Online",
              offline: "📍 In-Person",
              hybrid: "🔀 Hybrid",
            };
            return (
              <Link
                to={`/events/${event._id}`}
                key={event._id}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Card Top — gradient date */}
                <div className="bg-gradient-to-br from-indigo-600 to-primary p-5 flex items-center gap-4">
                  <div className="text-center bg-white/15 rounded-xl px-4 py-2">
                    <span className="block text-indigo-200 text-xs font-bold uppercase tracking-widest">
                      {d.toLocaleString("default", { month: "short" })}
                    </span>
                    <span className="block text-white text-3xl font-extrabold leading-none">
                      {d.getDate()}
                    </span>
                    <span className="block text-indigo-200 text-xs">
                      {d.getFullYear()}
                    </span>
                  </div>
                  <div>
                    <img
                      src={event.logo}
                      alt={event.name}
                      className="w-12 h-12 rounded-xl border-2 border-white/30 object-cover"
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col gap-3">
                  <span
                    className={`self-start text-xs font-bold px-2.5 py-1 rounded-full ${modeColors[event.mode]}`}
                  >
                    {modeLabels[event.mode]}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {event.name}
                  </h3>
                  <p className="text-slate-500 text-xs flex items-center gap-1.5">
                    <HiMapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                    {event.mode === "online"
                      ? "Virtual / Online"
                      : `${event.venue}, ${event.location}`}
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{event.time}</span>
                    <span className="text-xs text-primary font-bold flex items-center gap-1">
                      Register <HiChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-indigo-700"
          >
            View All Events <HiChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />

      <Destinations />
      <CourseFinder />

      <UpcomingEvents />
      <Reviews />
      <Articles />
    </div>
  );
};

export default Home;
