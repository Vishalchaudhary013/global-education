import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "../models/Destination.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/global_education";

const dummyDestinations = [
  {
    id: "australia",
    name: "Australia",
    heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2730&auto=format&fit=crop",
    description: "World-class education, post-study work opportunities, and an unmatched lifestyle.",
    universities: [
      { name: "University of Melbourne", location: "Melbourne, VIC", ranking: "Global Rank #14", logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2574&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "$30,000/year" },
      { name: "University of Sydney", location: "Sydney, NSW", ranking: "Global Rank #19", logo: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?q=80&w=2574&auto=format&fit=crop", ieltsRequirement: "7.0+", studyCost: "$35,000/year" },
      { name: "Australian National University", location: "Canberra, ACT", ranking: "Global Rank #30", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "$32,000/year" },
      { name: "Monash University", location: "Melbourne, VIC", ranking: "Global Rank #42", logo: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "$31,000/year" }
    ],
    scholarships: [
      { name: "Australia Awards", amount: "Full Tuition", criteria: "Government funded for international students" },
      { name: "Destination Australia", amount: "$15,000/year", criteria: "For students in regional Australia" },
      { name: "Research Training Program", amount: "Full Funding", criteria: "For postgraduate research students" },
      { name: "Vice-Chancellor's Scholarship", amount: "50% Tuition", criteria: "High academic achievement" }
    ],
    costs: { ug: "$20,000 - $45,000", pg: "$22,000 - $50,000", living: "$15,000 - $20,000" },
    jobs: [{ title: "Software Engineer", salary: "AUD 80,000" }, { title: "Nurse", salary: "AUD 75,000" }],
    visa: { processSummary: "Apply for subclass 500.", points: ["Enrollment proof", "Financial proof", "Health cover", "English proficiency"] }
  },
  {
    id: "uk",
    name: "United Kingdom",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop",
    description: "Home to some of the world's oldest and most prestigious universities.",
    universities: [
      { name: "University of Oxford", location: "Oxford, England", ranking: "Global Rank #3", logo: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.5+", studyCost: "£25,000/year" },
      { name: "University of Cambridge", location: "Cambridge, England", ranking: "Global Rank #2", logo: "https://images.unsplash.com/photo-1514395444329-a504ff8c5132?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.5+", studyCost: "£26,000/year" },
      { name: "Imperial College London", location: "London, England", ranking: "Global Rank #6", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.0+", studyCost: "£30,000/year" },
      { name: "UCL (University College London)", location: "London, England", ranking: "Global Rank #9", logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.0+", studyCost: "£28,000/year" }
    ],
    scholarships: [
      { name: "Chevening Scholarships", amount: "Full Funding", criteria: "Global leadership potential" },
      { name: "Commonwealth Scholarships", amount: "Full Funding", criteria: "For students from Commonwealth countries" },
      { name: "Rhodes Scholarship", amount: "Full Funding", criteria: "Postgraduate study at Oxford" },
      { name: "Gates Cambridge", amount: "Full Funding", criteria: "Outstanding intellectual ability" }
    ],
    costs: { ug: "£10,000 - £30,000", pg: "£12,000 - £35,000", living: "£9,000 - £12,000" },
    jobs: [{ title: "Data Analyst", salary: "£35,000" }, { title: "Civil Engineer", salary: "£40,000" }],
    visa: { processSummary: "Apply for Tier 4 visa.", points: ["CAS from university", "Financial proof", "English proficiency", "Biometrics"] }
  },
  {
    id: "canada",
    name: "Canada",
    heroImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2611&auto=format&fit=crop",
    description: "High quality of life, diverse culture, and excellent immigration pathways.",
    universities: [
      { name: "University of Toronto", location: "Toronto, ON", ranking: "Global Rank #21", logo: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "CAD 45,000/year" },
      { name: "University of British Columbia", location: "Vancouver, BC", ranking: "Global Rank #34", logo: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=2671&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "CAD 40,000/year" },
      { name: "McGill University", location: "Montreal, QC", ranking: "Global Rank #30", logo: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "CAD 42,000/year" },
      { name: "University of Waterloo", location: "Waterloo, ON", ranking: "Global Rank #112", logo: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "CAD 38,000/year" }
    ],
    scholarships: [
      { name: "Vanier CGS", amount: "$50,000/year", criteria: "Academic excellence at PhD level" },
      { name: "Lester B. Pearson", amount: "Full Ride", criteria: "Undergraduate leaders at UofT" },
      { name: "Canada Graduate Scholarships", amount: "$17,500", criteria: "Master's research students" },
      { name: "Trudeau Foundation", amount: "$40,000/year", criteria: "Social sciences and humanities" }
    ],
    costs: { ug: "CAD 15,000 - CAD 35,000", pg: "CAD 18,000 - CAD 40,000", living: "CAD 12,000 - CAD 15,000" },
    jobs: [{ title: "IT Consultant", salary: "CAD 70,000" }, { title: "Accountant", salary: "CAD 65,000" }],
    visa: { processSummary: "Apply for a study permit.", points: ["Letter of acceptance", "Proof of funds", "Biometrics", "Police certificate"] }
  },
  {
    id: "usa",
    name: "United States",
    heroImage: "https://images.unsplash.com/photo-1550850839-8dc894ed385a?q=80&w=2675&auto=format&fit=crop",
    description: "Leading technological innovation and a vast range of academic options.",
    universities: [
      { name: "Harvard University", location: "Cambridge, MA", ranking: "Global Rank #1", logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.5+", studyCost: "$55,000/year" },
      { name: "Stanford University", location: "Stanford, CA", ranking: "Global Rank #5", logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.0+", studyCost: "$50,000/year" },
      { name: "MIT", location: "Cambridge, MA", ranking: "Global Rank #1", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.0+", studyCost: "$58,000/year" },
      { name: "UC Berkeley", location: "Berkeley, CA", ranking: "Global Rank #10", logo: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.0+", studyCost: "$45,000/year" }
    ],
    scholarships: [
      { name: "Fulbright Program", amount: "Full Funding", criteria: "International exchange program" },
      { name: "Hubert Humphrey", amount: "Full Funding", criteria: "Experienced professionals" },
      { name: "AAUW International Fellowship", amount: "$18,000 - $30,000", criteria: "For women pursuing graduate study" },
      { name: "Knight-Hennessy", amount: "Full Funding", criteria: "Graduate students at Stanford" }
    ],
    costs: { ug: "$25,000 - $55,000", pg: "$30,000 - $60,000", living: "$15,000 - $25,000" },
    jobs: [{ title: "Software Developer", salary: "$90,000" }, { title: "Marketing Manager", salary: "$85,000" }],
    visa: { processSummary: "Apply for an F-1 visa.", points: ["I-20 form", "DS-160 application", "Visa interview", "SEVIS fee"] }
  },
  {
    id: "india",
    name: "India",
    heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2671&auto=format&fit=crop",
    description: "Rich cultural heritage and rapidly growing educational institutions.",
    universities: [
      { name: "IIT Bombay", location: "Mumbai, Maharashtra", ranking: "Global Rank #149", logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2566&auto=format&fit=crop", ieltsRequirement: "N/A", studyCost: "INR 2,00,000/year" },
      { name: "IISc Bangalore", location: "Bangalore, Karnataka", ranking: "Global Rank #225", logo: "https://images.unsplash.com/photo-1498243639359-2cee3e35d700?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "N/A", studyCost: "INR 1,50,000/year" },
      { name: "IIT Delhi", location: "New Delhi", ranking: "Global Rank #197", logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "N/A", studyCost: "INR 2,00,000/year" },
      { name: "University of Delhi", location: "New Delhi", ranking: "Global Rank #500+", logo: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "N/A", studyCost: "INR 50,000/year" }
    ],
    scholarships: [
      { name: "ICCR Scholarship", amount: "Full Funding", criteria: "International students studying in India" },
      { name: "KVPY", amount: "Monthly Stipend", criteria: "Basic science students" },
      { name: "INSPIRE Scholarship", amount: "INR 80,000/year", criteria: "Meritorious science students" },
      { name: "Pragati Scholarship", amount: "INR 50,000/year", criteria: "Female technical students" }
    ],
    costs: { ug: "INR 1L - 5L", pg: "INR 2L - 8L", living: "INR 1L - 3L" },
    jobs: [{ title: "Software Engineer", salary: "INR 12,00,000" }, { title: "Data Scientist", salary: "INR 15,00,000" }],
    visa: { processSummary: "Apply for Student Visa.", points: ["Admission letter", "Financial proof", "Passport validity", "Medical test"] }
  },
  {
    id: "germany",
    name: "Germany",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2670&auto=format&fit=crop",
    description: "Low tuition fees, strong economy, and top-tier engineering programs.",
    universities: [
      { name: "Technical University of Munich", location: "Munich", ranking: "Global Rank #37", logo: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "€0/year" },
      { name: "Ludwig Maximilian University", location: "Munich", ranking: "Global Rank #54", logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "€0/year" },
      { name: "Heidelberg University", location: "Heidelberg", ranking: "Global Rank #87", logo: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "€0/year" },
      { name: "Humboldt University Berlin", location: "Berlin", ranking: "Global Rank #120", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "€0/year" }
    ],
    scholarships: [
      { name: "DAAD Scholarship", amount: "Monthly Stipend", criteria: "International students" },
      { name: "Erasmus+", amount: "Travel + Stipend", criteria: "Exchange students" },
      { name: "Heinrich Böll", amount: "Monthly Stipend", criteria: "High academic achievement" },
      { name: "Konrad-Adenauer-Stiftung", amount: "Monthly Stipend", criteria: "Political science or related fields" }
    ],
    costs: { ug: "€0 - €3,000", pg: "€0 - €5,000", living: "€10,000 - €12,000" },
    jobs: [{ title: "Mechanical Engineer", salary: "€55,000" }, { title: "Automotive Engineer", salary: "€60,000" }],
    visa: { processSummary: "Apply for a national visa.", points: ["Admission letter", "Blocked account", "Health insurance", "Financial proof"] }
  },
  {
    id: "dubai",
    name: "Dubai",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop",
    description: "A global hub for business and education with a futuristic outlook.",
    universities: [
      { name: "American University in Dubai", location: "Dubai", ranking: "Regional Rank #1", logo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "AED 90,000/year" },
      { name: "Zayed University", location: "Dubai", ranking: "Regional Rank #5", logo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.0+", studyCost: "AED 75,000/year" },
      { name: "University of Dubai", location: "Dubai", ranking: "Regional Rank #10", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.0+", studyCost: "AED 80,000/year" },
      { name: "Heriot-Watt University", location: "Dubai", ranking: "International Campus", logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.0+", studyCost: "AED 85,000/year" }
    ],
    scholarships: [
      { name: "Dubai Merit Scholarship", amount: "50% Tuition", criteria: "High GPA" },
      { name: "Khalifa University Scholarship", amount: "Full Ride", criteria: "Engineering students" },
      { name: "ADU Scholarship", amount: "25% - 100% Tuition", criteria: "Academic merit" },
      { name: "AUS Scholarship", amount: "Varies", criteria: "Need and merit based" }
    ],
    costs: { ug: "AED 40,000 - 80,000", pg: "AED 50,000 - 100,000", living: "AED 45,000 - 60,000" },
    jobs: [{ title: "Business Analyst", salary: "AED 120,000" }, { title: "Civil Engineer", salary: "AED 110,000" }],
    visa: { processSummary: "University sponsors visa.", points: ["Admission letter", "Passport copy", "Medical test", "Health insurance"] }
  },
  {
    id: "newzealand",
    name: "New Zealand",
    heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2671&auto=format&fit=crop",
    description: "Exceptional quality of life and world-renowned research-led universities.",
    universities: [
      { name: "University of Auckland", location: "Auckland", ranking: "Global Rank #68", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "NZD 35,000/year" },
      { name: "University of Otago", location: "Dunedin", ranking: "Global Rank #206", logo: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "NZD 32,000/year" },
      { name: "Victoria University of Wellington", location: "Wellington", ranking: "Global Rank #241", logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "NZD 30,000/year" },
      { name: "University of Canterbury", location: "Christchurch", ranking: "Global Rank #256", logo: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "NZD 31,000/year" }
    ],
    scholarships: [
      { name: "New Zealand Excellence Awards", amount: "NZD 10,000", criteria: "Indian students for PG study" },
      { name: "Manaaki New Zealand Scholarships", amount: "Full Funding", criteria: "Developing country students" },
      { name: "Tongarewa Scholarship", amount: "NZD 5,000 - 10,000", criteria: "International students at Victoria Univ" },
      { name: "University of Auckland International Student Excellence", amount: "NZD 10,000", criteria: "Academic merit" }
    ],
    costs: { ug: "NZD 25,000 - 45,000", pg: "NZD 30,000 - 50,000", living: "NZD 15,000 - 20,000" },
    jobs: [{ title: "Software Engineer", salary: "NZD 85,000" }, { title: "Environmental Scientist", salary: "NZD 75,000" }],
    visa: { processSummary: "Apply for a Fee Paying Student Visa.", points: ["Offer of place", "Proof of funds", "Health insurance", "Character certificate"] }
  },
  {
    id: "singapore",
    name: "Singapore",
    heroImage: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=80&w=2670&auto=format&fit=crop",
    description: "A leading global education hub known for its excellence in technology and business.",
    universities: [
      { name: "National University of Singapore (NUS)", location: "Singapore", ranking: "Global Rank #8", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "SGD 30,000/year" },
      { name: "Nanyang Technological University (NTU)", location: "Singapore", ranking: "Global Rank #26", logo: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "SGD 32,000/year" },
      { name: "Singapore Management University (SMU)", location: "Singapore", ranking: "Regional Leader", logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "7.0+", studyCost: "SGD 45,000/year" },
      { name: "Singapore University of Technology and Design (SUTD)", location: "Singapore", ranking: "Innovative Leader", logo: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2670&auto=format&fit=crop", ieltsRequirement: "6.5+", studyCost: "SGD 28,000/year" }
    ],
    scholarships: [
      { name: "Singapore International Graduate Award (SINGA)", amount: "Full Funding", criteria: "PhD in Science and Engineering" },
      { name: "ASEAN Undergraduate Scholarship", amount: "Full Tuition + Stipend", criteria: "Citizens of ASEAN countries" },
      { name: "NTU University Scholars Programme", amount: "Full Ride", criteria: "Outstanding leadership and academics" },
      { name: "SMU Merit Scholarship", amount: "Full Tuition", criteria: "Undergraduate excellence" }
    ],
    costs: { ug: "SGD 20,000 - 40,000", pg: "SGD 30,000 - 60,000", living: "SGD 12,000 - 18,000" },
    jobs: [{ title: "Software Engineer", salary: "SGD 75,000" }, { title: "Financial Analyst", salary: "SGD 80,000" }],
    visa: { processSummary: "Apply for a Student's Pass (STP).", points: ["Admission letter", "eForm 16", "Financial capability", "Medical checkup"] }
  }
];

const seedDestinations = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Destination.deleteMany({});
    await Destination.insertMany(dummyDestinations);
    console.log("Successfully seeded destinations with working images.");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDestinations();
