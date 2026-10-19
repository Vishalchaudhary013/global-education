import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineGlobeAlt, HiAcademicCap, HiChevronDown, HiBars3, HiXMark } from "react-icons/hi2";
import { useCounselling } from "@/features/counselling";
import { useAuth } from "@/features/auth";
import { HiUserCircle } from "react-icons/hi2";

const Navbar = () => {
  const { openModal } = useCounselling();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

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
    <nav className="bg-white sticky top-0 z-50 w-full ">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeAll}>
          <HiAcademicCap className="h-8 w-8 text-[#1F2853]" />
          <span className="text-xl font-bold text-[#1F2853] tracking-tight">
            Global<span className="">Edu</span>
          </span>
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
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {/* Destinations Dropdown */}
          <div className="relative group py-2">
            <Link
              to="/destinations"
              className="flex items-center gap-1 hover:text-[#FF4E45] transition-colors"
            >
              Destinations <HiChevronDown className="h-4 w-4" />
            </Link>
            <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-left group-hover:scale-100 scale-95">
              <div className="py-2">
                <Link
                  to="/destinations/australia"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Australia
                </Link>
                <Link
                  to="/destinations/uk"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  United Kingdom
                </Link>
                <Link
                  to="/destinations/canada"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Canada
                </Link>
                <Link
                  to="/destinations/usa"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  United States
                </Link>
                <Link
                  to="/destinations/germany"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Germany
                </Link>
                <Link
                  to="/destinations/dubai"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Dubai
                </Link>
                <Link
                  to="/destinations/india"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  India
                </Link>
                <Link
                  to="/destinations/newzealand"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  New Zealand
                </Link>
                <Link
                  to="/destinations/singapore"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Singapore
                </Link>
                <Link
                  to="/destinations"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors border-t border-slate-100 mt-1 font-semibold"
                >
                  View All Destinations
                </Link>
              </div>
            </div>
          </div>

          {/* Courses Dropdown */}
          <div className="relative group py-2">
            <Link
              to="/courses"
              className="flex items-center gap-1 hover:text-[#FF4E45] transition-colors"
            >
              Courses <HiChevronDown className="h-4 w-4" />
            </Link>
            <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-left group-hover:scale-100 scale-95">
              <div className="py-2">
                <p className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  By Level
                </p>
                <Link
                  to="/courses?level=ug"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Undergraduate
                </Link>
                <Link
                  to="/courses?level=pg"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Postgraduate
                </Link>
                <Link
                  to="/courses?level=phd"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  PhD / Doctorate
                </Link>
                <p className="px-4 pt-3 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 mt-1">
                  By Destination
                </p>
                <Link
                  to="/destinations/india"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  India
                </Link>
                <Link
                  to="/destinations/uk"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  United Kingdom
                </Link>
                <Link
                  to="/destinations/australia"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Australia
                </Link>
                <Link
                  to="/destinations/canada"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Canada
                </Link>
                <Link
                  to="/destinations/usa"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  USA
                </Link>
                <Link
                  to="/destinations/germany"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Germany
                </Link>
                <Link
                  to="/destinations/newzealand"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  New Zealand
                </Link>
                <Link
                  to="/destinations/singapore"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  Singapore
                </Link>
                <Link
                  to="/courses"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors border-t border-slate-100 mt-1 font-semibold"
                >
                  Browse All Courses
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/universities"
            className="hover:text-[#FF4E45] transition-colors hover:-translate-y-0.5 transform inline-block py-2"
          >
            Universities
          </Link>

          <Link
            to="/scholarships"
            className="hover:text-[#FF4E45] transition-colors hover:-translate-y-0.5 transform inline-block py-2"
          >
            Scholarships
          </Link>
          {/* <Link
            to="/events"
            className="hover:text-[#FF4E45] transition-colors hover:-translate-y-0.5 transform inline-block py-2"
          >
            Events
          </Link> */}
          {/* <Link
            to="/articles"
            className="hover:text-[#FF4E45] transition-colors hover:-translate-y-0.5 transform inline-block py-2"
          >
            Articles
          </Link> */}

          {/* Exams Dropdown */}
          <div className="relative group py-2">
            <Link
              to="/exams"
              className="flex items-center gap-1 hover:text-[#FF4E45] transition-colors"
            >
              Exams <HiChevronDown className="h-4 w-4" />
            </Link>
            <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-left group-hover:scale-100 scale-95">
              <div className="py-2">
                <Link
                  to="/exams?type=ielts"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  IELTS
                </Link>
                <Link
                  to="/exams?type=toefl"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  TOEFL
                </Link>
                <Link
                  to="/exams?type=gre"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  GRE
                </Link>
                <Link
                  to="/exams?type=gmat"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors"
                >
                  GMAT
                </Link>
                <Link
                  to="/exams"
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-[#FF4E45] transition-colors border-t border-slate-100 mt-1 font-semibold"
                >
                  View All Exams
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/services"
            className="hover:text-[#FF4E45] transition-colors hover:-translate-y-0.5 transform inline-block py-2"
          >
            Services
          </Link>
          


          <div className="h-6 w-px bg-slate-300 "></div>

          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 p-2 rounded-md transition-colors">
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
            <div className="relative group py-2">
              <button className="flex items-center gap-2 text-[#1F2853] hover:text-[#FF4E45] transition-colors">
                <div className="h-8 w-8 rounded-full bg-indigo-100 text-[#FF4E45] flex items-center justify-center font-bold text-sm uppercase">
                  {user.email ? user.email.charAt(0) : "U"}
                </div>
                <HiChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-right group-hover:scale-100 scale-95">
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
            className="bg-[#FF4E45] hover:bg-[#E03A30] text-white px-5 py-2.5 rounded-full font-semibold hover:-translate-y-0.5 transition-all"
          >
            Book Free Counselling
          </button>
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
