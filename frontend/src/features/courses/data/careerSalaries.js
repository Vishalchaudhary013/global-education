/**
 * Indicative annual salary ranges by subject area, for the course page's
 * "Careers & Salaries" table. Figures are in thousands of each country's local
 * currency and are approximate, not live market data.
 *
 * A course picks the first subject whose `match` hits its name; anything else
 * gets the general graduate set. `match` is loose on purpose, for course
 * names; `textMatch` is a stricter test for running prose such as scholarship
 * descriptions, where words like "it" or "health" mean nothing.
 */

export const SALARY_COUNTRIES = [
  { key: "USA", label: "USA", code: "USD" },
  { key: "UK", label: "UK", code: "GBP" },
  { key: "Australia", label: "Australia", code: "AUD" },
  { key: "Canada", label: "Canada", code: "CAD" },
  { key: "Germany", label: "Germany", code: "EUR" },
];

const SUBJECTS = [
  {
    subject: "Medicine",
    match: /medic|mbbs|nursing|pharma|health|clinical|biomed|physio|dental|surgery/i,
    textMatch: /\bmedic(al|ine)\b|\bmbbs\b|\bnursing\b|\bpharmac|\bhealthcare\b|\bpublic health\b|\bclinical\b|\bdentist/i,
    careers: [
      { role: "Physician / Specialist Doctor", USA: "180–320K", UK: "70–110K", Australia: "130–250K", Canada: "200–350K", Germany: "80–130K" },
      { role: "Registered Nurse", USA: "80–110K", UK: "35–55K", Australia: "70–95K", Canada: "75–100K", Germany: "45–60K" },
      { role: "Clinical Pharmacist", USA: "120–150K", UK: "45–65K", Australia: "90–130K", Canada: "100–130K", Germany: "55–75K" },
      { role: "Physiotherapist", USA: "85–105K", UK: "35–50K", Australia: "75–95K", Canada: "80–100K", Germany: "40–55K" },
      { role: "Public Health Specialist", USA: "75–110K", UK: "40–65K", Australia: "85–110K", Canada: "80–110K", Germany: "55–80K" },
      { role: "Medical Researcher / Epidemiologist", USA: "95–140K", UK: "45–75K", Australia: "95–130K", Canada: "85–125K", Germany: "60–90K" },
    ],
  },
  {
    subject: "Computer Science",
    match: /comput|software|data|artificial intelligence|\bai\b|machine learning|cyber|information tech|\bit\b|informatics/i,
    textMatch: /computer science|\bcomputing\b|\bsoftware\b|data science|artificial intelligence|machine learning|cyber\s?security|information technology|\bstem\b/i,
    careers: [
      { role: "Software Engineer", USA: "110–170K", UK: "45–80K", Australia: "100–150K", Canada: "85–130K", Germany: "55–85K" },
      { role: "Data Scientist", USA: "115–170K", UK: "50–85K", Australia: "110–160K", Canada: "90–135K", Germany: "60–90K" },
      { role: "Machine Learning Engineer", USA: "130–200K", UK: "60–100K", Australia: "120–180K", Canada: "100–150K", Germany: "65–100K" },
      { role: "Cloud / DevOps Engineer", USA: "115–165K", UK: "50–85K", Australia: "110–160K", Canada: "95–135K", Germany: "60–90K" },
      { role: "Cybersecurity Analyst", USA: "95–145K", UK: "40–70K", Australia: "95–140K", Canada: "80–120K", Germany: "55–80K" },
      { role: "Product Manager", USA: "120–180K", UK: "55–95K", Australia: "120–170K", Canada: "100–150K", Germany: "65–100K" },
    ],
  },
  {
    subject: "Business",
    match: /business|management|\bmba\b|marketing|financ|account|econom|commerce|\bbba\b/i,
    textMatch: /\bbusiness\b|\bmanagement\b|\bmba\b|\bmarketing\b|\bfinance\b|\baccounting\b|\beconomics\b|\bcommerce\b/i,
    careers: [
      { role: "Management Consultant", USA: "95–160K", UK: "45–90K", Australia: "100–160K", Canada: "85–140K", Germany: "60–100K" },
      { role: "Financial Analyst", USA: "75–115K", UK: "35–60K", Australia: "75–110K", Canada: "65–95K", Germany: "50–70K" },
      { role: "Marketing Manager", USA: "90–150K", UK: "40–75K", Australia: "100–150K", Canada: "80–120K", Germany: "55–85K" },
      { role: "Business Analyst", USA: "80–120K", UK: "38–65K", Australia: "90–130K", Canada: "70–100K", Germany: "50–75K" },
      { role: "Accountant", USA: "65–95K", UK: "30–55K", Australia: "70–100K", Canada: "60–90K", Germany: "45–65K" },
      { role: "HR Manager", USA: "85–130K", UK: "40–70K", Australia: "100–140K", Canada: "80–115K", Germany: "55–80K" },
    ],
  },
  {
    subject: "Engineering",
    match: /engineer|mechanic|civil|electric|electronic|chemical|aerospace|robotic/i,
    textMatch: /\bengineering\b|\bstem\b|\bmechanical\b|\bcivil engineering\b|\belectrical\b|\baerospace\b|\brobotics\b/i,
    careers: [
      { role: "Mechanical Engineer", USA: "80–120K", UK: "32–55K", Australia: "80–120K", Canada: "70–105K", Germany: "50–75K" },
      { role: "Civil Engineer", USA: "80–120K", UK: "32–55K", Australia: "85–130K", Canada: "70–105K", Germany: "50–72K" },
      { role: "Electrical Engineer", USA: "90–135K", UK: "35–60K", Australia: "90–135K", Canada: "75–115K", Germany: "55–80K" },
      { role: "Project Engineer", USA: "85–125K", UK: "38–60K", Australia: "95–140K", Canada: "75–110K", Germany: "55–78K" },
      { role: "Design Engineer", USA: "75–110K", UK: "32–52K", Australia: "80–115K", Canada: "65–95K", Germany: "50–70K" },
      { role: "Engineering Manager", USA: "130–190K", UK: "60–95K", Australia: "150–200K", Canada: "120–170K", Germany: "80–120K" },
    ],
  },
];

const GENERAL = {
  subject: null,
  careers: [
    { role: "Graduate Analyst / Associate", USA: "60–85K", UK: "28–40K", Australia: "65–85K", Canada: "55–75K", Germany: "42–55K" },
    { role: "Project Coordinator", USA: "55–80K", UK: "28–40K", Australia: "70–90K", Canada: "55–75K", Germany: "40–55K" },
    { role: "Research Assistant", USA: "45–65K", UK: "28–38K", Australia: "70–90K", Canada: "45–65K", Germany: "40–55K" },
    { role: "Consultant", USA: "85–140K", UK: "40–75K", Australia: "95–140K", Canada: "80–120K", Germany: "55–85K" },
    { role: "Operations Manager", USA: "80–120K", UK: "40–65K", Australia: "100–140K", Canada: "75–110K", Germany: "55–80K" },
    { role: "Team Lead / Manager", USA: "100–150K", UK: "50–80K", Australia: "120–160K", Canada: "95–135K", Germany: "65–95K" },
  ],
};

/** The subject area a course name falls in, or null when none matches. */
export const subjectOf = (courseName = "") =>
  SUBJECTS.find(({ match }) => match.test(courseName)) || null;

export const careersFor = (courseName = "") => subjectOf(courseName) || GENERAL;
