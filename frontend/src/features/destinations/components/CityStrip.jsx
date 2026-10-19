import React, { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop";

const CityStrip = ({ cities }) => {
  const trackRef = useRef(null);

  if (!cities?.length) return null;

  const scrollBy = (direction) => {
    trackRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth pb-1"
      >
        {cities.map((city) => (
          <div key={city.name} className="shrink-0 w-32 text-center">
            <div className="h-32 w-32 rounded-sm overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={city.image || FALLBACK_IMAGE}
                alt={city.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                  e.target.onerror = null;
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-[#1F2853]">{city.name}</p>
          </div>
        ))}
      </div>

      {cities.length > 4 && (
        <>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous cities"
            className="absolute left-0 top-16 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-sm bg-white border border-slate-200 text-[#1F2853] hover:border-[#FF4E45] hover:text-[#FF4E45] flex items-center justify-center transition-colors"
          >
            <HiChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next cities"
            className="absolute right-0 top-16 -translate-y-1/2 translate-x-1/2 h-8 w-8 rounded-sm bg-white border border-slate-200 text-[#1F2853] hover:border-[#FF4E45] hover:text-[#FF4E45] flex items-center justify-center transition-colors"
          >
            <HiChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default CityStrip;
