import React from "react";
import { Link } from "react-router-dom";
import { HiChevronRight, HiMapPin } from "react-icons/hi2";

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
            <h2 className="text-4xl font-extrabold text-[#1F2853] mb-4 tracking-tight">
              Popular Study Destinations
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl">
              Discover top-ranked universities in the world's best education
              hubs.
            </p>
          </div>
          <Link
            to="/destinations"
            className="hidden sm:flex items-center gap-2 text-[#FF4E45] font-semibold hover:text-[#FF4E45]"
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
              <div className="absolute inset-0 bg-[#1F2853]/40"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white font-bold text-2xl mb-1">
                  {dest.name}
                </h3>
                <p className="text-[#FF4E45]/80 text-sm font-medium flex items-center gap-1 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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

export default Destinations;
