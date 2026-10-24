/**
 * General documents for the course page's "Requirements" section, grouped
 * into tabs. Academic documents and minimum scores depend on the study level:
 * an undergraduate applicant sends school records, a postgraduate one sends
 * their degree records. Figures are typical minimums, not any one
 * university's rules.
 *
 * TEMPORARY until courses store their own requirements.
 */

/** Typical minimums per study level. */
const MINIMUMS = {
  UG: { percentage: 60, ielts: "6.0", toefl: 80, pte: 55, duolingo: 105 },
  PG: { percentage: 50, ielts: "6.5", toefl: 90, pte: 60, duolingo: 115 },
  Diploma: { percentage: 50, ielts: "5.5", toefl: 72, pte: 50, duolingo: 95 },
  PhD: { percentage: 55, ielts: "7.0", toefl: 100, pte: 65, duolingo: 120 },
};

const schoolRecords = (min) => [
  {
    title: "Class 12 Marksheet",
    detail: `Min. Percentage is ${min.percentage}`,
    description:
      "Your Higher Secondary (Class 12) marksheet from your school board, showing every subject and the overall result.",
  },
  {
    title: "Class 12 Passing Certificate",
    description:
      "The certificate your board issues once you pass Class 12. If results are pending, you can apply with predicted grades and send it later.",
  },
  {
    title: "Class 10 Marksheet",
    description:
      "Your Secondary School (Class 10) marksheet, used to confirm earlier results and your date of birth.",
  },
  {
    title: "School Leaving Certificate",
    description:
      "Issued by your school when you leave. Some universities ask for it alongside your Class 12 documents.",
  },
];

const degreeRecords = (min, degree) => [
  {
    title: `${degree} Consolidated Marksheets`,
    detail: `Min. Percentage is ${min.percentage}`,
    description: `A single marksheet listing every subject and grade across your ${degree.toLowerCase()} degree, issued by your university.`,
  },
  {
    title: `${degree} Provisional Certificate`,
    description:
      "Issued after your final exams to confirm you have completed the degree, until the final certificate is ready.",
  },
  {
    title: `${degree} Semester Marksheets`,
    detail: `Min. Percentage is ${min.percentage}`,
    description:
      "Marksheets for every semester or year of your degree. Final-year students can apply with the semesters completed so far.",
  },
  {
    title: `${degree} Graduation Certificate`,
    description:
      "Your final degree certificate. If you have not graduated yet, it can follow once your university issues it.",
  },
];

const ACADEMIC = {
  UG: (min) => schoolRecords(min),
  Diploma: (min) => schoolRecords(min),
  PG: (min) => degreeRecords(min, "Undergraduate"),
  PhD: (min) => [
    ...degreeRecords(min, "Postgraduate").slice(0, 2),
    {
      title: "Undergraduate Degree Certificate",
      description:
        "Your bachelor's degree certificate and consolidated marksheet, to show your full academic history.",
    },
    {
      title: "Research Proposal",
      description:
        "An outline of the research you plan to do: the question, why it matters, your methods and a rough timeline.",
    },
  ],
};

const englishTests = (min, ielts) => [
  {
    title: "IELTS Academic",
    detail: `Min. overall score is ${ielts || min.ielts}`,
    description:
      "The most widely accepted English test. Most universities also set a minimum for each band, usually 0.5 to 1 below the overall score.",
  },
  {
    title: "TOEFL iBT",
    detail: `Min. score is ${min.toefl}`,
    description:
      "Accepted by most universities in the USA and Canada and by many elsewhere. Scores are valid for two years.",
  },
  {
    title: "PTE Academic",
    detail: `Min. score is ${min.pte}`,
    description:
      "A computer-based test with fast results, widely accepted in Australia, New Zealand and the UK.",
  },
  {
    title: "Duolingo English Test",
    detail: `Min. score is ${min.duolingo}`,
    description:
      "An online test you can take from home. Accepted by a growing number of universities; check that yours is one of them.",
  },
];

const IDENTITY = [
  {
    title: "Valid Passport",
    description:
      "A passport valid for the full length of your course. Upload the bio-data page with your application.",
  },
  {
    title: "Passport-size Photographs",
    description:
      "Recent colour photographs on a white background, in the size your destination's visa office asks for.",
  },
  {
    title: "National ID Card",
    description:
      "A government-issued ID, such as an Aadhaar card, used to verify your identity and address.",
  },
  {
    title: "Birth Certificate",
    description:
      "Sometimes asked for to confirm your date of birth, especially if it differs across your documents.",
  },
];

const MEDICAL = [
  {
    title: "Medical Examination Report",
    description:
      "A health check by a panel physician approved by your destination's immigration authority, needed for some student visas.",
  },
  {
    title: "Tuberculosis (TB) Test Certificate",
    description:
      "Required by some destinations, such as the UK, for applicants from countries including India. Taken at an approved clinic.",
  },
  {
    title: "Vaccination Records",
    description:
      "Proof of routine immunisations. Some universities and countries also ask for specific vaccines before you arrive.",
  },
  {
    title: "Health Insurance",
    description:
      "Proof of cover for your stay, such as Overseas Student Health Cover in Australia or the Immigration Health Surcharge in the UK.",
  },
];

const PROFESSIONAL = [
  {
    title: "Updated CV / Resume",
    description:
      "Your education, work experience, projects and skills, kept to one or two pages.",
  },
  {
    title: "Statement of Purpose (SOP)",
    description:
      "A personal essay on why you chose this course and university, and how it fits your career plans.",
  },
  {
    title: "Letters of Recommendation (LOR)",
    detail: "Usually 2 required",
    description:
      "From teachers or employers who know your work well, on official letterhead and signed.",
  },
  {
    title: "Work Experience Letters",
    description:
      "From each employer, on company letterhead, with your role and dates of employment. Optional unless the course asks for experience.",
  },
];

const levelOf = (type) => (MINIMUMS[type] ? type : "PG");

/** Typical minimum percentage and English test scores for a study level. */
export const minimumsFor = (type) => MINIMUMS[levelOf(type)];

/** Tabs for a course: `{ key, label, items: [{ title, detail?, description }] }`. */
export const requirementsFor = (course) => {
  const level = levelOf(course.type);
  const min = MINIMUMS[level];

  return [
    { key: "academic", label: "Academic Certificates", items: ACADEMIC[level](min) },
    {
      key: "english",
      label: "English Language Tests",
      items: englishTests(min, course.university?.ieltsRequirement),
    },
    { key: "identity", label: "Identity", items: IDENTITY },
    { key: "medical", label: "Medical", items: MEDICAL },
    { key: "professional", label: "Professional Records", items: PROFESSIONAL },
  ];
};
