/**
 * Static copy for the homepage sections that have no API behind them.
 *
 * Deliberately isolated in one file so each block can be swapped for a live
 * endpoint without touching a component: the sections only read from here.
 *
 * What *is* already live comes from the API instead and is not duplicated
 * here — events (`/api/events`), articles (`/api/articles`), and the course,
 * university and destination searches the finder links into.
 *
 * Destination cards are built from `destinationGuides`, the same source the
 * destination detail pages use, so the taglines and university counts shown on
 * the homepage are the real figures rather than a second set that can drift.
 */

import { destinationGuides } from "@/features/destinations/data/destinationGuides";

/* Services: mirrors the six services on `/services` so the two pages agree. */
export const SERVICES = [
  {
    id: "counselling",
    title: "Free Counselling",
    description:
      "One-to-one guidance to match your academic record, budget and career goals to the right course.",
    icon: "counselling",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    to: "/services",
  },
  {
    id: "university-selection",
    title: "University Selection",
    description:
      "A shortlist built around your profile, from ambitious reaches to confident safety choices.",
    icon: "university",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
    to: "/universities",
  },
  {
    id: "visa",
    title: "Visa Guidance",
    description:
      "Documentation, financial evidence and interview preparation handled end to end.",
    icon: "visa",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    to: "/services",
  },
  {
    id: "scholarships",
    title: "Scholarship & Funding",
    description:
      "Find the awards you actually qualify for, with a full breakdown of tuition and living costs.",
    icon: "scholarship",
    image:
      "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=1200&auto=format&fit=crop",
    to: "/scholarships",
  },
  {
    id: "applications",
    title: "Application Support",
    description:
      "SOPs, LORs and transcripts reviewed and submitted on time, to every university on your list.",
    icon: "document",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop",
    to: "/services",
  },
  {
    id: "pre-departure",
    title: "Pre-Departure & Beyond",
    description:
      "Accommodation, loans, part-time work rights and a post-study roadmap before you fly.",
    icon: "departure",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    to: "/services",
  },
];

/* About */
/* Short enough to sit on one line across the About band at desktop width. */
export const ABOUT_POINTS = [
  "Tailored Educational Pathways",
  "End-to-End Guidance",
  "Global University Network",
];

/* The three photographs across the foot of the About band. */
export const ABOUT_STRIP = [
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=900&auto=format&fit=crop",
    alt: "Students talking outside a university building",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop",
    alt: "A counsellor reviewing an application with a student",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=900&auto=format&fit=crop",
    alt: "Graduates celebrating at their degree ceremony",
  },
];

/* How it works */
export const STEPS = [
  {
    number: "01",
    title: "Search",
    description:
      "Search thousands of courses across 500+ partner universities.",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1200&auto=format&fit=crop",
    to: "/courses",
  },
  {
    number: "02",
    title: "Compare",
    description:
      "Compare rankings, tuition and entry requirements in one place.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    to: "/universities",
  },
  {
    number: "03",
    title: "Explore",
    description:
      "Connect with our experts to get a free consultation.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    to: "/events",
  },
  {
    number: "04",
    title: "Apply",
    description:
      "Our experts assist with applications and your student visa.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    to: "/services",
  },
  {
    number: "05",
    title: "Start your journey",
    description:
      "At last, kick off your fresh study journey abroad.",
    image:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1200&auto=format&fit=crop",
    to: "/services",
  },
];

/* Statistics */
export const STATS = [
  {
    value: 500,
    suffix: "+",
    label: "Partnering Universities",
    icon: "universities",
  },
  { value: 9, suffix: "", label: "Study Destinations", icon: "countries" },
  { value: 25000, suffix: "+", label: "Students Guided", icon: "students" },
  { value: 12000, suffix: "+", label: "Total Courses", icon: "courses" },
];

/*
  Destinations: images are keyed by the destination slugs the routes already
  use, while the copy and counts are read from the shared guide data.
*/
const DESTINATION_IMAGES = {
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1400&auto=format&fit=crop",
  australia:
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1400&auto=format&fit=crop",
  canada:
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1400&auto=format&fit=crop",
  usa: "https://images.unsplash.com/photo-1550850839-8dc894ed385a?q=80&w=1400&auto=format&fit=crop",
  germany:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1400&auto=format&fit=crop",
  newzealand:
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1400&auto=format&fit=crop",
  singapore:
    "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=80&w=1400&auto=format&fit=crop",
  dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1400&auto=format&fit=crop",
  india:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1400&auto=format&fit=crop",
};

const DESTINATION_NAMES = {
  uk: "United Kingdom",
  australia: "Australia",
  canada: "Canada",
  usa: "United States",
  germany: "Germany",
  newzealand: "New Zealand",
  singapore: "Singapore",
  dubai: "Dubai",
  india: "India",
};

/**
 * Every destination that has a route, for the search dropdowns. The values are
 * the slugs `/destinations/:id` and the `?destination=` filters already expect.
 */
export const DESTINATION_OPTIONS = Object.keys(DESTINATION_NAMES).map(
  (slug) => ({ value: slug, label: DESTINATION_NAMES[slug] }),
);

/** The order the destination carousel steps through. */
const DESTINATION_ORDER = [
  "uk",
  "australia",
  "canada",
  "usa",
  "germany",
  "newzealand",
  "singapore",
  "india",
  "dubai",
];

export const DESTINATIONS = DESTINATION_ORDER.map((slug) => {
  const guide = destinationGuides[slug] || {};
  return {
    slug,
    name: DESTINATION_NAMES[slug] || slug,
    tagline: guide.tagline || "",
    universitiesCount: guide.universitiesCount || null,
    image: DESTINATION_IMAGES[slug],
  };
});

/*
  Testimonials. There is no `/api/reviews` route yet, though a `Review` model exists on the
  server. When that endpoint lands, swap this array for the service call: the
  field names below already match the model (studentName, university,
  destination, reviewText, rating).
*/
export const TESTIMONIALS = [
  {
    studentName: "Sarah Jenkins",
    university: "University of Toronto",
    destination: "Canada",
    rating: 5,
    reviewText:
      "GlobalEdu made my dream of studying in Canada a reality. The visa guidance was flawless, and I had my offer eight weeks after my first counselling call.",
  },
  {
    studentName: "Rahul Sharma",
    university: "University of Melbourne",
    destination: "Australia",
    rating: 5,
    reviewText:
      "From shortlisting universities to my offer letter, the team was with me at every step. They flagged costs I had not even thought to budget for.",
  },
  {
    studentName: "Amira Hassan",
    university: "University of Edinburgh",
    destination: "United Kingdom",
    rating: 5,
    reviewText:
      "The scholarship guidance helped me secure a partial award worth £6,000. I would never have found it on my own, let alone applied in time.",
  },
  {
    studentName: "James Park",
    university: "TU Munich",
    destination: "Germany",
    rating: 5,
    reviewText:
      "I had no idea Germany offered tuition-free public universities. GlobalEdu opened that door and walked me through the blocked account process.",
  },
  {
    studentName: "Sarah Jenkins",
    university: "University of Toronto",
    destination: "Canada",
    rating: 5,
    reviewText:
      "GlobalEdu made my dream of studying in Canada a reality. The visa guidance was flawless, and I had my offer eight weeks after my first counselling call.",
  },
];

/* FAQ */
export const FAQS = [
  {
    question: "Is your counselling really free?",
    answer:
      "Yes. Profile evaluation, university shortlisting, application support and visa guidance cost you nothing — we are funded by our partner universities, not by students.",
  },
  {
    question: "When should I start my application?",
    answer:
      "Nine to twelve months before your intake is comfortable. That leaves room for entrance tests, scholarship deadlines and visa processing without rushing any of them.",
  },
  {
    question: "Which entrance tests will I need?",
    answer:
      "Most destinations ask for proof of English through IELTS, TOEFL or PTE, and some postgraduate courses add the GRE or GMAT. Our exam guides break down the format and scoring for each.",
  },
  {
    question: "Can you help me find scholarships?",
    answer:
      "Scholarship matching is part of every shortlist we prepare. We check the awards you qualify for at each university, plus government and external funding for your destination.",
  },
  {
    question: "What happens if my visa is refused?",
    answer:
      "We review the refusal notice with you, correct whatever caused it and reapply, or move your application to another intake or university at no extra cost.",
  },
  {
    question: "Do you support students after they fly?",
    answer:
      "Yes — accommodation, airport pickup, bank accounts, part-time work rights and a post-study work roadmap are all covered in the pre-departure briefing and afterwards.",
  },
];

/*
  Hero collage. `offset` nudges alternate tiles down on wide screens so the row
  staggers rather than sitting on one baseline.
*/
/*
  Hero collage. Tiles are listed left to right so the entrance stagger sweeps
  across the band. Every tile is the same size; only its position changes.
  `cell` carries that placement: a plain two-column stack on small screens, and
  from `lg` an explicit cell in the twelve-column, two-row mosaic the hero grid
  declares. The two rows interleave horizontally — a lower tile sits under the
  gap each upper pair leaves — which is what keeps the band from reading as a
  plain filmstrip even with uniform tiles.
*/
export const HERO_COLLAGE = [
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
    alt: "Students walking together on campus",
    cell: "lg:col-start-1 lg:row-start-1",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    alt: "A student meeting an education counsellor",
    cell: "lg:col-start-3 lg:row-start-2",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
    alt: "A graduate at their degree ceremony",
    cell: "lg:col-start-6 lg:row-start-1",
  },
  {
    src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
    alt: "A university library interior",
    cell: "lg:col-start-8 lg:row-start-2",
  },
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    alt: "A university lecture hall",
    cell: "lg:col-start-10 lg:row-start-1",
  },
];

/*
  Partner strip. Names rather than logo files: we hold no licence to reproduce
  university marks, and a wordmark row is honest and trivially swapped for real
  artwork later.
*/
export const PARTNER_NAMES = [
  "University of Toronto",
  "University of Melbourne",
  "University of Edinburgh",
  "TU Munich",
  "University of Auckland",
  "National University of Singapore",
  "University of British Columbia",
  "King's College London",
];

/* The founder quote band. */
export const FOUNDER_QUOTE = {
  quote:
    "We don't just send students abroad. We open doors to futures without borders, and we stay until the door is fully open.",
  name: "Priya Nair",
  role: "Founder, Global Education and Career",
  image:
    "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  background:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
};

/* The wide video banner between the process and the destinations. */
export const VIDEO_BANNER = {
  image:
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop",
  caption: "See how a counselling session actually works",
};

/* Faces for the ring around the closing call to action. */
export const CTA_FACES = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
];

/* Human labels for the Event schema's `mode` enum. */
export const EVENT_MODE_LABELS = {
  online: "Online",
  offline: "Physical",
  hybrid: "Hybrid",
};

/* Study levels, matching the `type` values the course records use. */
export const STUDY_LEVELS = [
  { value: "UG", label: "Undergraduate" },
  { value: "PG", label: "Postgraduate" },
  { value: "Diploma", label: "Diploma" },
];

/*
  Subjects for the course finder. Each value is submitted as `?name=`, which
  the courses list matches against the course name, so these read as ordinary
  search terms rather than a taxonomy the API would have to know about.
*/
export const SUBJECTS = [
  { value: "Business", label: "Business & Management" },
  { value: "Computer", label: "Computer Science & IT" },
  { value: "Engineering", label: "Engineering" },
  { value: "Data", label: "Data Science & Analytics" },
  { value: "Health", label: "Health & Medicine" },
  { value: "Law", label: "Law" },
  { value: "Art", label: "Arts & Design" },
  { value: "Finance", label: "Accounting & Finance" },
];

/* Cities the events list is matched against, by venue and location. */
export const EVENT_CITIES = [
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Toronto", label: "Toronto" },
  { value: "Sydney", label: "Sydney" },
  { value: "Melbourne", label: "Melbourne" },
  { value: "Auckland", label: "Auckland" },
  { value: "Berlin", label: "Berlin" },
  { value: "Dubai", label: "Dubai" },
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
];

/* Calendar months, submitted as a 1-based number. */
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((label, index) => ({ value: String(index + 1), label }));

/*
  Photographs for the event cards.

  The Event schema carries a `logo` (a brand mark) but no photograph, so the
  cards would otherwise show a flat logo tile where the reference shows a
  scene. One photo is picked per card by position, and the event's own logo is
  kept as a small badge over it. Drop these the moment the API grows an image
  field: the card already prefers `event.image` when one is present.
*/
export const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1200&auto=format&fit=crop",
];
