import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineGlobeAlt,
  HiChevronDown,
  HiBars3,
  HiXMark,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineBeaker,
  HiOutlineBuildingLibrary,
  HiOutlineCurrencyDollar,
  HiOutlineClipboardDocumentList,
  HiOutlineLanguage,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCalculator,
  HiOutlinePresentationChartLine,
  HiOutlineNewspaper,
  HiOutlineCalendarDays,
  HiArrowRight,
} from "react-icons/hi2";
import { useCounselling } from "@/features/counselling";
import { useAuth } from "@/features/auth";
import { RollText } from "@/shared/components/Roll";
import Logo from "@/shared/components/Logo";

// Full-width mega menu content, keyed by the desktop trigger that opens it
const MEGA_MENUS = {
  destinations: {
    label: "Destinations",
    to: "/destinations",
    footer: { to: "/destinations", label: "View all destinations" },
    columns: [
      {
        title: "Most popular",
        items: [
          { to: "/destinations/uk", label: "United Kingdom", desc: "World-ranked unis, 1-year master's.", flag: "gb", badge: "Popular" },
          { to: "/destinations/usa", label: "United States", desc: "Ivy League to top research schools.", flag: "us" },
          { to: "/destinations/canada", label: "Canada", desc: "Post-study work & PR pathways.", flag: "ca" },
        ],
      },
      {
        title: "Oceania",
        items: [
          { to: "/destinations/australia", label: "Australia", desc: "Go8 universities, great lifestyle.", flag: "au" },
          { to: "/destinations/newzealand", label: "New Zealand", desc: "Safe, scenic, globally recognised.", flag: "nz" },
        ],
      },
      {
        title: "Asia",
        items: [
          { to: "/destinations/singapore", label: "Singapore", desc: "Asia's education & tech hub.", flag: "sg" },
          { to: "/destinations/india", label: "India", desc: "Fast-growing global campuses.", flag: "in" },
        ],
      },
      {
        title: "Europe & Middle East",
        items: [
          { to: "/destinations/germany", label: "Germany", desc: "Low or no tuition at public unis.", flag: "de" },
          { to: "/destinations/dubai", label: "Dubai", desc: "International branch campuses.", flag: "ae" },
        ],
      },
    ],
  },
  courses: {
    label: "Courses",
    to: "/courses",
    footer: { to: "/courses", label: "Browse all courses" },
    columns: [
      {
        title: "By level",
        items: [
          { to: "/courses?level=ug", label: "Undergraduate", desc: "Bachelor's degrees & diplomas.", icon: HiOutlineBookOpen },
          { to: "/courses?level=pg", label: "Postgraduate", desc: "Master's, MBA & PG diplomas.", icon: HiOutlineAcademicCap, badge: "Popular" },
          { to: "/courses?level=phd", label: "PhD / Doctorate", desc: "Research degrees & funding.", icon: HiOutlineBeaker },
        ],
      },
      {
        title: "Top destinations",
        items: [
          { to: "/destinations/uk", label: "United Kingdom", desc: "Courses in the UK.", flag: "gb" },
          { to: "/destinations/usa", label: "USA", desc: "Courses in the USA.", flag: "us" },
          { to: "/destinations/canada", label: "Canada", desc: "Courses in Canada.", flag: "ca" },
          { to: "/destinations/australia", label: "Australia", desc: "Courses in Australia.", flag: "au" },
        ],
      },
      {
        title: "More destinations",
        items: [
          { to: "/destinations/germany", label: "Germany", desc: "Courses in Germany.", flag: "de" },
          { to: "/destinations/india", label: "India", desc: "Courses in India.", flag: "in" },
          { to: "/destinations/newzealand", label: "New Zealand", desc: "Courses in New Zealand.", flag: "nz" },
          { to: "/destinations/singapore", label: "Singapore", desc: "Courses in Singapore.", flag: "sg" },
        ],
      },
      {
        title: "Plan ahead",
        items: [
          { to: "/universities", label: "Universities", desc: "Compare top institutions.", icon: HiOutlineBuildingLibrary },
          { to: "/scholarships", label: "Scholarships", desc: "Fund your studies abroad.", icon: HiOutlineCurrencyDollar },
          { to: "/exams", label: "Entrance exams", desc: "Tests you'll need to apply.", icon: HiOutlineClipboardDocumentList },
        ],
      },
    ],
  },
  exams: {
    label: "Exams",
    to: "/exams",
    footer: { to: "/exams", label: "View all exams" },
    columns: [
      {
        title: "English proficiency",
        items: [
          { to: "/exams?type=ielts", label: "IELTS", desc: "Accepted in 140+ countries.", icon: HiOutlineLanguage },
          { to: "/exams?type=toefl", label: "TOEFL", desc: "Preferred by US universities.", icon: HiOutlineChatBubbleLeftRight },
        ],
      },
      {
        title: "Graduate admissions",
        items: [
          { to: "/exams?type=gre", label: "GRE", desc: "For master's & PhD programs.", icon: HiOutlineCalculator },
          { to: "/exams?type=gmat", label: "GMAT", desc: "For MBA & business schools.", icon: HiOutlinePresentationChartLine },
        ],
      },
      {
        title: "Prepare",
        items: [
          { to: "/articles", label: "Articles", desc: "Prep tips & study guides.", icon: HiOutlineNewspaper },
          { to: "/events", label: "Events", desc: "Webinars & prep sessions.", icon: HiOutlineCalendarDays },
        ],
      },
    ],
  },
};

const Navbar = () => {
  const { openModal } = useCounselling();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  // megaMenu keeps the last opened menu so its content stays during fade-out
  const [megaMenu, setMegaMenu] = useState("destinations");
  const [megaOpen, setMegaOpen] = useState(false);

  const openMega = (name) => {
    setMegaMenu(name);
    setMegaOpen(true);
  };
  const closeMega = () => setMegaOpen(false);

  React.useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const activeMega = MEGA_MENUS[megaMenu];

  const renderMegaTrigger = (name) => {
    const isActive = megaOpen && megaMenu === name;
    return (
      <div className="py-2" onMouseEnter={() => openMega(name)}>
        <Link
          to={MEGA_MENUS[name].to}
          onClick={closeMega}
          onFocus={() => openMega(name)}
          aria-expanded={isActive}
          aria-haspopup="true"
          className={`flex items-center gap-1 hover:text-[#FF4E45] transition-colors ${isActive ? "text-[#FF4E45]" : ""}`}
        >
          {MEGA_MENUS[name].label}
          <HiChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
          />
        </Link>
      </div>
    );
  };

  React.useEffect(() => {
    if (user && user.region) {
      setSelectedRegion(user.region);
    }
  }, [user]);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const toggleSection = (name) =>
    setOpenSection((prev) => (prev === name ? null : name));

  const closeAll = () => {
    setMobileOpen(false);
    setOpenSection(null);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 w-full " onMouseLeave={closeMega}>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeAll} onMouseEnter={closeMega}>
          <Logo className="h-6 sm:h-7" />
        </Link>

        {/* Mobile: right side buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={openModal}
            className="text-xs bg-[#FF4E45] hover:bg-[#E03A30] text-white px-3 py-2 rounded-full font-semibold transition-colors"
          >
            Counselling
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <HiXMark className="h-5 w-5" />
            ) : (
              <HiBars3 className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-[15px] font-medium text-slate-600">
          {renderMegaTrigger("destinations")}
          {renderMegaTrigger("courses")}

          <Link
            to="/universities"
            onMouseEnter={closeMega}
            className="hover:text-[#FF4E45] transition-colors duration-[450ms] inline-block py-2"
          >
            Universities
          </Link>

          <Link
            to="/scholarships"
            onMouseEnter={closeMega}
            className="hover:text-[#FF4E45] transition-colors duration-[450ms] inline-block py-2"
          >
            Scholarships
          </Link>
          {/* <Link
            to="/events"
            className="hover:text-[#FF4E45] transition-colors duration-[450ms] inline-block py-2"
          >
            Events
          </Link> */}
          {/* <Link
            to="/articles"
            className="hover:text-[#FF4E45] transition-colors duration-[450ms] inline-block py-2"
          >
            Articles
          </Link> */}

          {renderMegaTrigger("exams")}

          <Link
            to="/services"
            onMouseEnter={closeMega}
            className="hover:text-[#FF4E45] transition-colors duration-[450ms] inline-block py-2"
          >
            Services
          </Link>
          


          <div className="h-6 w-px bg-slate-300 "></div>

          <div onMouseEnter={closeMega} className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 p-2 rounded-md transition-colors">
            <HiOutlineGlobeAlt className="h-4 w-4 text-slate-500" />
            <select 
              value={selectedRegion}
              onChange={handleRegionChange}
              className="bg-transparent border-none outline-none cursor-pointer text-slate-600 font-medium"
            >
              <option value="" disabled hidden>Select Region</option>
              <optgroup label="North America">
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="mx">Mexico</option>
              </optgroup>
              <optgroup label="Europe">
                <option value="uk">United Kingdom</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
                <option value="it">Italy</option>
                <option value="es">Spain</option>
                <option value="ie">Ireland</option>
                <option value="nl">Netherlands</option>
                <option value="se">Sweden</option>
                <option value="ch">Switzerland</option>
              </optgroup>
              <optgroup label="Asia & Oceania">
                <option value="in">India</option>
                <option value="cn">China</option>
                <option value="jp">Japan</option>
                <option value="kr">South Korea</option>
                <option value="sg">Singapore</option>
                <option value="au">Australia</option>
                <option value="nz">New Zealand</option>
              </optgroup>
              <optgroup label="Middle East">
                <option value="ae">United Arab Emirates</option>
                <option value="sa">Saudi Arabia</option>
                <option value="qa">Qatar</option>
              </optgroup>
            </select>
          </div>

          <div className="h-6 w-px bg-slate-300 "></div>

          {user && (
            <div className="relative group py-2" onMouseEnter={closeMega}>
              <button className="flex items-center gap-2 text-[#1F2853] hover:text-[#FF4E45] transition-colors">
                <div className="h-8 w-8 rounded-full bg-indigo-100 text-[#FF4E45] flex items-center justify-center font-bold text-sm uppercase">
                  {user.email ? user.email.charAt(0) : "U"}
                </div>
                <HiChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl opacity-0 invisible translate-y-2.5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 [transition:translate_400ms_ease,opacity_200ms_ease_200ms,visibility_400ms] z-50 overflow-hidden">
                <div className="py-2">
                  {(user.role === "admin" || user.role === "superadmin") && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={openModal}
            onMouseEnter={closeMega}
            className="group bg-[#FF4E45] text-white px-5 py-2.5 rounded-full font-semibold"
          >
            <RollText>Book Free Counselling</RollText>
          </button>
        </div>
      </div>

      {/* Desktop full-width mega menu */}
      <div
        className={`hidden md:block absolute inset-x-0 top-full bg-white border-t border-slate-100 shadow-[0_24px_48px_-16px_rgba(31,40,83,0.18)] [transition:translate_300ms_ease,opacity_200ms_ease,visibility_300ms] ${
          megaOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        }`}
      >
        <div
          key={megaMenu}
          className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8 grid gap-x-6 gap-y-8"
          style={{ gridTemplateColumns: `repeat(${activeMega.columns.length}, minmax(0, 1fr))` }}
        >
          {activeMega.columns.map((col) => (
            <div key={col.title}>
              <p className="px-3 mb-3 text-xs font-semibold text-[#FF4E45]">{col.title}</p>
              <div className="space-y-1">
                {col.items.map(({ to, label, desc, icon: Icon, flag, badge }) => (
                  <Link
                    key={to + label}
                    to={to}
                    onClick={closeMega}
                    className="group/item flex items-start gap-3 rounded-xl p-3 hover:bg-indigo-50/70 transition-colors"
                  >
                    {flag ? (
                      <span className="h-10 w-10 shrink-0 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200 group-hover/item:ring-2 group-hover/item:ring-[#FF4E45]/40 transition-shadow">
                        <img
                          src={`https://flagcdn.com/w80/${flag}.png`}
                          srcSet={`https://flagcdn.com/w160/${flag}.png 2x`}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ) : (
                      <span className="h-10 w-10 shrink-0 rounded-full bg-indigo-50 text-[#1F2853] flex items-center justify-center group-hover/item:bg-white group-hover/item:text-[#FF4E45] transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-sm font-semibold text-[#1F2853]">
                        {label}
                        {badge && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                            {badge}
                          </span>
                        )}
                      </span>
                      <span className="block mt-0.5 text-xs font-normal text-slate-500">{desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border-t border-slate-100">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between text-sm">
            <p className="text-slate-500">
              Not sure where to start?{" "}
              <button
                onClick={() => {
                  closeMega();
                  openModal();
                }}
                className="font-semibold text-[#1F2853] hover:text-[#FF4E45] transition-colors"
              >
                Talk to a counsellor for free
              </button>
            </p>
            <Link
              to={activeMega.footer.to}
              onClick={closeMega}
              className="flex items-center gap-1.5 font-semibold text-[#FF4E45] hover:gap-2.5 transition-all"
            >
              {activeMega.footer.label} <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1 text-sm font-medium text-[#1F2853]">
            {/* Destinations Accordion */}
            <div>
              <button
                onClick={() => toggleSection("destinations")}
                className="w-full flex items-center justify-between py-3 border-b border-slate-100 hover:text-[#FF4E45] transition-colors"
              >
                <span>Destinations</span>
                <HiChevronDown
                  className={`h-4 w-4 transition-transform ${openSection === "destinations" ? "rotate-180" : ""}`}
                />
              </button>
              {openSection === "destinations" && (
                <div className="pl-4 py-2 space-y-1 bg-slate-50 rounded-b-lg">
                  {[
                    ["australia", "Australia"],
                    ["uk", "United Kingdom"],
                    ["canada", "Canada"],
                    ["usa", "United States"],
                    ["germany", "Germany"],
                    ["dubai", "Dubai"],
                    ["india", "India"],
                    ["newzealand", "New Zealand"],
                    ["singapore", "Singapore"],
                  ].map(([slug, label]) => (
                    <Link
                      key={slug}
                      to={`/destinations/${slug}`}
                      onClick={closeAll}
                      className="block py-2 hover:text-[#FF4E45] transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    to="/destinations"
                    onClick={closeAll}
                    className="block py-2 font-semibold text-[#FF4E45] transition-colors"
                  >
                    View All Destinations →
                  </Link>
                </div>
              )}
            </div>

            {/* Courses Accordion */}
            <div>
              <button
                onClick={() => toggleSection("courses")}
                className="w-full flex items-center justify-between py-3 border-b border-slate-100 hover:text-[#FF4E45] transition-colors"
              >
                <span>Courses</span>
                <HiChevronDown
                  className={`h-4 w-4 transition-transform ${openSection === "courses" ? "rotate-180" : ""}`}
                />
              </button>
              {openSection === "courses" && (
                <div className="pl-4 py-2 space-y-1 bg-slate-50 rounded-b-lg">
                  <Link
                    to="/courses?level=ug"
                    onClick={closeAll}
                    className="block py-2 hover:text-[#FF4E45]"
                  >
                    Undergraduate
                  </Link>
                  <Link
                    to="/courses?level=pg"
                    onClick={closeAll}
                    className="block py-2 hover:text-[#FF4E45]"
                  >
                    Postgraduate
                  </Link>
                  <Link
                    to="/courses?level=phd"
                    onClick={closeAll}
                    className="block py-2 hover:text-[#FF4E45]"
                  >
                    PhD / Doctorate
                  </Link>
                  <Link
                    to="/courses"
                    onClick={closeAll}
                    className="block py-2 font-semibold text-[#FF4E45]"
                  >
                    Browse All Courses →
                  </Link>
                </div>
              )}
            </div>

            {/* Flat links */}
            <Link
              to="/scholarships"
              onClick={closeAll}
              className="block py-3 border-b border-slate-100 hover:text-[#FF4E45] transition-colors"
            >
              Scholarships
            </Link>
            <Link
              to="/events"
              onClick={closeAll}
              className="block py-3 border-b border-slate-100 hover:text-[#FF4E45] transition-colors"
            >
              Events
            </Link>
            <Link
              to="/articles"
              onClick={closeAll}
              className="block py-3 border-b border-slate-100 hover:text-[#FF4E45] transition-colors"
            >
              Articles
            </Link>

            {/* Exams Accordion */}
            <div>
              <button
                onClick={() => toggleSection("exams")}
                className="w-full flex items-center justify-between py-3 border-b border-slate-100 hover:text-[#FF4E45] transition-colors"
              >
                <span>Exams</span>
                <HiChevronDown
                  className={`h-4 w-4 transition-transform ${openSection === "exams" ? "rotate-180" : ""}`}
                />
              </button>
              {openSection === "exams" && (
                <div className="pl-4 py-2 space-y-1 bg-slate-50 rounded-b-lg">
                  <Link
                    to="/exams?type=ielts"
                    onClick={closeAll}
                    className="block py-2 hover:text-[#FF4E45]"
                  >
                    IELTS
                  </Link>
                  <Link
                    to="/exams?type=toefl"
                    onClick={closeAll}
                    className="block py-2 hover:text-[#FF4E45]"
                  >
                    TOEFL
                  </Link>
                  <Link
                    to="/exams?type=gre"
                    onClick={closeAll}
                    className="block py-2 hover:text-[#FF4E45]"
                  >
                    GRE
                  </Link>
                  <Link
                    to="/exams?type=gmat"
                    onClick={closeAll}
                    className="block py-2 hover:text-[#FF4E45]"
                  >
                    GMAT
                  </Link>
                  <Link
                    to="/exams"
                    onClick={closeAll}
                    className="block py-2 font-semibold text-[#FF4E45]"
                  >
                    View All Exams →
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/universities"
              onClick={closeAll}
              className="block py-3 border-b border-slate-100 hover:text-[#FF4E45] transition-colors"
            >
              Universities
            </Link>


            {user && (
              <>
                <div className="py-3 px-2 border-b border-slate-100 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 text-[#FF4E45] flex items-center justify-center font-bold text-lg uppercase">
                    {user.email ? user.email.charAt(0) : "U"}
                  </div>
                  <div>
                    <p className="font-bold text-[#1F2853]">{user.email || user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                  </div>
                </div>
                {(user.role === "admin" || user.role === "superadmin") && (
                  <Link
                    to="/admin"
                    onClick={closeAll}
                    className="block py-3 border-b border-slate-100 hover:text-[#FF4E45] transition-colors font-semibold"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    closeAll();
                  }}
                  className="w-full text-left py-3 border-b border-slate-100 text-red-600 font-semibold"
                >
                  Logout
                </button>
              </>
            )}

            {/* CTA Button */}
            <div className="pt-3 pb-2">
              <button
                onClick={() => {
                  openModal();
                  closeAll();
                }}
                className="w-full bg-[#FF4E45] hover:bg-[#E03A30] text-white py-3 rounded-full font-semibold transition-colors"
              >
                Book Free Counselling
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
