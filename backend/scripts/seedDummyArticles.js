import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "../models/Article.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/global_education";

const allArticles = [
  {
    title: "Best Universities in Canada for Computer Science",
    category: "Study Abroad",
    author: "Sarah Mitchell",
    authorRole: "Senior Education Consultant",
    date: "2026-02-15",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
    excerpt:
      "Canada has emerged as a top destination for computer science students worldwide. Discover the universities offering world-class programs, cutting-edge research, and strong industry connections.",
    tags: ["Canada", "Computer Science", "Universities", "Tech"],
    content: [
      {
        heading: "Why Canada for Computer Science?",
        body: "Canada is home to some of the world's most innovative tech hubs, including Toronto, Vancouver, and Montreal. These cities are magnets for global tech giants like Google, Microsoft, and Amazon, creating unparalleled internship and career opportunities for CS graduates. The country's welcoming immigration policies also make it a top choice for students planning to settle after graduation.",
      },
      {
        heading: "University of Toronto",
        body: "Consistently ranked among the top 25 universities globally for computer science, U of T offers world-class research opportunities in AI, machine learning, and cybersecurity. The David R. Cheriton School of Computer Science is renowned for its faculty, many of whom are pioneers in artificial intelligence. Tuition for international students is approximately CAD 58,000 per year.",
      },
      {
        heading: "University of British Columbia (UBC)",
        body: "Located in Vancouver — Canada's tech capital — UBC's CS program is known for its strong ties with the local tech industry. Students benefit from co-op programs that can last up to 20 months, ensuring graduates enter the workforce with substantial real-world experience. The department actively collaborates with companies like Electronic Arts, Hootsuite, and Microsoft Research.",
      },
      {
        heading: "McGill University",
        body: "Montreal's thriving AI ecosystem makes McGill one of the best places in the world to study computer science. McGill is home to Mila — the world's largest academic research centre dedicated to deep learning — founded by Turing Award winner Yoshua Bengio. Programs are offered in both English and French, giving students an added linguistic advantage.",
      },
      {
        heading: "University of Waterloo",
        body: "If one university defines Canada's tech identity, it's Waterloo. Its co-operative education program is legendary — students alternate between academic terms and paid work terms, earning an average of CAD 30,000+ during the program. Waterloo alumni have founded and lead some of the world's most successful tech companies, including BlackBerry and Shopify.",
      },
      {
        heading: "How to Apply",
        body: "Applications are typically submitted through the Ontario University Application Centre (OUAC) for Ontario schools or directly through the university for others. Requirements include official transcripts, English proficiency scores (IELTS 6.5+ or TOEFL 90+), a statement of purpose, and letters of recommendation. Deadlines generally fall between January and March for September intake.",
      },
    ],
  },
  {
    title: "Living and Studying in Sydney: A Complete Guide",
    category: "Student Life",
    author: "James O'Brien",
    authorRole: "Study Abroad Advisor",
    date: "2026-02-02",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop",
    excerpt:
      "Sydney is one of the most vibrant student cities in the world. From iconic beaches to world-class universities, here's everything you need to know about student life in Australia's harbour city.",
    tags: ["Australia", "Sydney", "Student Life", "Cost of Living"],
    content: [
      {
        heading: "Why Choose Sydney?",
        body: "Sydney consistently ranks among the top 10 cities globally for students. With four QS top-100 ranked universities, a multicultural population where over 40% of residents were born overseas, and a warm climate year-round, Sydney offers an exceptional student experience. The city's strong economy also ensures excellent part-time work opportunities.",
      },
      {
        heading: "Top Universities in Sydney",
        body: "The University of Sydney (ranked #18 globally) and UNSW Sydney (ranked #19 globally) are the flagship institutions. Both offer a wide range of programs from engineering and business to medicine and arts. Macquarie University and UTS (University of Technology Sydney) are also highly regarded, especially for business, law, and technology programs.",
      },
      {
        heading: "Cost of Living",
        body: "Sydney is an expensive city. Budget approximately AUD 2,000–2,800 per month for living costs including rent, food, transport, and leisure. Student accommodation on or near campus is the most affordable option, typically ranging from AUD 250–400 per week. Shared apartments in suburbs like Newtown, Glebe, or Ultimo are popular among students.",
      },
      {
        heading: "Part-Time Work",
        body: "Student visa holders in Australia can work up to 48 hours per fortnight during semester and unlimited hours during breaks. The minimum wage in Australia is AUD 23.23 per hour — one of the highest in the world — making part-time work a significant contribution to your living expenses. Popular student jobs include hospitality, retail, and tutoring.",
      },
      {
        heading: "Getting Around Sydney",
        body: "Sydney has an excellent public transport system including trains, buses, light rail, and ferries, all accessible with the Opal card. Students receive discounted fares. Cycling is also popular, with a growing network of dedicated bike lanes. The city is very walkable in many inner suburbs.",
      },
      {
        heading: "Student Lifestyle",
        body: "Beyond academics, Sydney offers Bondi Beach, the Blue Mountains, harbour cruises, and a thriving café and arts scene. Universities offer hundreds of student clubs and societies. The city hosts world-famous events like Vivid Sydney, the Sydney Festival, and MARDI GRAS, ensuring there's always something exciting to experience.",
      },
    ],
  },
  {
    title: "Top 10 Scholarships for International Students in 2026",
    category: "Scholarships",
    author: "Priya Sharma",
    authorRole: "Scholarship Research Specialist",
    date: "2026-01-20",
    readTime: "10 min read",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
    excerpt:
      "Funding your education abroad doesn't have to be a dream. We've compiled the most prestigious and accessible scholarships available to international students in 2026.",
    tags: ["Scholarships", "Funding", "International Students", "2026"],
    content: [
      {
        heading: "Chevening Scholarships (UK)",
        body: "Fully funded by the UK government, Chevening scholarships are awarded to outstanding individuals with demonstrated leadership potential. The scholarship covers tuition, living allowance, return airfare, and other allowances. Over 1,800 scholarships are awarded annually across 160 countries.",
      },
      {
        heading: "Fulbright Program (USA)",
        body: "The Fulbright Program is the US government's flagship international educational exchange program. It provides funding for graduate studies, advanced research, and teaching English abroad. Since 1946, Fulbright has awarded approximately 400,000 grants to over 160 countries.",
      },
      {
        heading: "DAAD Scholarships (Germany)",
        body: "The German Academic Exchange Service (DAAD) is the world's largest funding organisation for international academic exchange. It offers hundreds of scholarship programs for study, research, and language courses, mostly in English, making Germany accessible to non-German speakers.",
      },
      {
        heading: "Vanier Canada Graduate Scholarships",
        body: "Valued at CAD 50,000 per year for three years, the Vanier CGS is one of Canada's most prestigious doctoral scholarships. It targets world-class doctoral students who demonstrate leadership skills and a high standard of scholarly achievement in social sciences, humanities, natural sciences, engineering, or health.",
      },
      {
        heading: "Endeavour Leadership Program (Australia)",
        body: "Funded by the Australian Government, this program provides international scholars with the opportunity to undertake study, research, or professional development in Australia. Awards cover tuition, living expenses, travel, and health insurance.",
      },
      {
        heading: "Tips for a Winning Scholarship Application",
        body: "Start early — at least 12 months before the deadline. Tailor your personal statement to each scholarship's values and objectives. Secure strong references from academic or professional mentors. Demonstrate leadership, community involvement, and a clear vision for how the scholarship will help you achieve your goals and contribute to your home country.",
      },
    ],
  },
  {
    title: "How to Crack IELTS: A Complete Strategy Guide",
    category: "Test Preparation",
    author: "Dr. Ahmed Hassan",
    authorRole: "IELTS Master Trainer",
    date: "2026-01-10",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2673&auto=format&fit=crop",
    excerpt:
      "Scoring 7+ on IELTS requires more than just English knowledge. Learn the proven strategies, common pitfalls, and preparation timeline that top scorers use.",
    tags: ["IELTS", "Test Prep", "English", "Strategy"],
    content: [
      {
        heading: "Understanding the IELTS Format",
        body: "IELTS (International English Language Testing System) has two versions: Academic and General Training. For university admission, you'll need Academic IELTS. The test has four sections — Listening (30 min), Reading (60 min), Writing (60 min), and Speaking (11–14 min) — and is scored on a band scale from 1 to 9. Most universities require a minimum of 6.5 overall with no band below 6.0.",
      },
      {
        heading: "Listening Strategies",
        body: "Practice active listening daily with English podcasts, news, and academic lectures. During the test, read the questions before the audio plays. Watch out for distractors — answers that sound correct but are changed or corrected later in the recording. Transfer answers carefully during the 10-minute transfer period.",
      },
      {
        heading: "Reading Strategies",
        body: "IELTS Academic reading uses texts from academic journals, which can be dense. Don't read the whole passage first — scan for keywords from the questions. Manage your time: aim for 20 minutes per section. True/False/Not Given questions are among the trickiest — 'Not Given' means the information simply isn't there, not that it's false.",
      },
      {
        heading: "Writing Task 1 & 2",
        body: "Task 1 requires you to describe a graph, chart, map, or process in at least 150 words. Use accurate data and identify key trends. Task 2 is a 250-word essay — the most heavily weighted section. Practice both problem-solution and argument essays. Aim for a 4-paragraph structure: introduction, two body paragraphs, and a conclusion.",
      },
      {
        heading: "Speaking Tips",
        body: "The speaking test is a face-to-face interview. Part 1 is familiar topics, Part 2 is a 2-minute talk on a cue card, and Part 3 is an abstract discussion. Don't memorise responses — examiners are trained to detect them and will penalise you. Focus on fluency, coherence, and using a range of vocabulary and grammatical structures.",
      },
      {
        heading: "Recommended Study Plan",
        body: "Give yourself at least 8–12 weeks of dedicated preparation. Week 1–2: Diagnostic test and identify weaknesses. Week 3–6: Targeted skills practice. Week 7–10: Full practice tests under exam conditions. Week 11–12: Review mistakes, fine-tune timing, and simulate test day. Official Cambridge IELTS practice books (volumes 1–18) are the gold standard resource.",
      },
    ],
  },
  {
    title: "UK Student Visa Guide 2026: Everything You Need to Know",
    category: "Visa & Immigration",
    author: "Lucy Thompson",
    authorRole: "Immigration & Visa Specialist",
    date: "2025-12-28",
    readTime: "11 min read",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop",
    excerpt:
      "Navigating the UK Student Visa (formerly Tier 4) can be overwhelming. This comprehensive guide walks you through every step — from CAS to biometrics — to ensure a smooth application.",
    tags: ["UK", "Student Visa", "Immigration", "2026"],
    content: [
      {
        heading: "What is the UK Student Visa?",
        body: "The UK Student Visa (previously called the Tier 4 student visa) allows you to study a full-time course in the UK. You can apply if you are 16 or over and have been offered a place on a course by a licensed student sponsor (your university), have enough money to support yourself and pay for your course, and can speak, read, write, and understand English.",
      },
      {
        heading: "Getting Your Confirmation of Acceptance for Studies (CAS)",
        body: "After accepting your unconditional offer and meeting all conditions, your university will issue a CAS — a unique 14-character reference number. You cannot apply for a visa without this. Your CAS contains details about your course, fees, and any previous study in the UK. It is valid for 6 months from the date of issue.",
      },
      {
        heading: "Financial Requirements",
        body: "You must show you have enough money to pay your course fees for the first year AND living costs of £1,334/month (up to 9 months) if studying in London, or £1,023/month outside London. These funds must have been held in your account for at least 28 consecutive days before the date on your bank statement.",
      },
      {
        heading: "The Application Process",
        body: "Apply online at least 3 months before your course starts. You'll need to: create a UKVI account, complete the online application form, pay the application fee (£363) and the Immigration Health Surcharge (currently £776/year), upload your documents, and attend a biometric appointment at a visa application centre.",
      },
      {
        heading: "Documents Required",
        body: "Essential documents include: a valid passport, your CAS number, financial evidence (bank statements), English language test results (IELTS, TOEFL, or Pearson PTE), ATAS clearance if your course requires it, parental consent if you're under 18, and tuberculosis (TB) test results if you're from a listed country.",
      },
      {
        heading: "After Arriving in the UK",
        body: "You must collect your Biometric Residence Permit (BRP) within 10 days of arriving. The BRP is your main immigration document for the duration of your stay. Register with a local GP (doctor) as soon as possible. Check whether your visa allows you to work — most Student Visas allow up to 20 hours per week during term time.",
      },
    ],
  },
  {
    title: "Germany: Study for Free at World-Class Universities",
    category: "Study Abroad",
    author: "Klaus Werner",
    authorRole: "Germany Study Abroad Specialist",
    date: "2025-12-15",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2670&auto=format&fit=crop",
    excerpt:
      "Germany's public universities charge minimal or no tuition fees, even for international students. Discover how to study at institutions ranked among the world's best without breaking the bank.",
    tags: ["Germany", "Tuition Free", "Europe", "Engineering"],
    content: [
      {
        heading: "Free Education in Germany",
        body: "In 2014, Germany abolished tuition fees at public universities. Today, most public universities charge no tuition — only a semester contribution of €100–€350 that covers administrative costs and often includes a public transport pass. Private universities do charge tuition, but the public sector houses some of Germany's most prestigious institutions.",
      },
      {
        heading: "Top Universities",
        body: "Ludwig Maximilian University of Munich (LMU) and Technical University of Munich (TUM) consistently rank among the world's top 50 universities. Heidelberg University, founded in 1386, is Germany's oldest university. RWTH Aachen is world-renowned for engineering and technology. The Free University of Berlin and Humboldt University are leaders in social sciences and humanities.",
      },
      {
        heading: "Language Requirements",
        body: "Many master's and PhD programs are now offered entirely in English, making them accessible to international students. For undergraduate programs, you'll generally need German proficiency (TestDaF or DSH). The Goethe-Institut offers German language courses worldwide. Learning German also significantly enhances your social integration and job prospects.",
      },
      {
        heading: "Living Costs in Germany",
        body: "Germany is significantly more affordable than the UK or Australia. Budget approximately €850–€1,100/month for living costs in major cities like Berlin, Munich, or Hamburg. Student residence hall rooms cost €200–€400/month. Public transport passes are included in the semester contribution at many universities. Berlin is particularly affordable compared to other European capitals.",
      },
      {
        heading: "Post-Study Work Opportunities",
        body: "Germany's thriving economy — Europe's largest — offers exceptional career opportunities for graduates. After completing your degree, you can apply for an 18-month residence permit to search for work. Germany's skilled worker shortage means international graduates are actively recruited, particularly in engineering, IT, healthcare, and sciences.",
      },
    ],
  },
  {
    title: "Writing a Winning Statement of Purpose (SOP): Expert Tips",
    category: "Application Tips",
    author: "Prof. Ananya Roy",
    authorRole: "Admissions Consultant",
    date: "2025-11-30",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2673&auto=format&fit=crop",
    excerpt:
      "Your Statement of Purpose can make or break your application. Learn how to structure it, what admissions committees actually want, and common mistakes to avoid.",
    tags: ["SOP", "Application", "Admissions", "Writing"],
    content: [
      {
        heading: "What Admissions Committees Actually Want",
        body: "Your SOP should answer three core questions: Why do you want to pursue this specific program? Why are you qualified to succeed? And why does this particular university fit your goals? Admissions officers read thousands of SOPs — they want to see a genuine, compelling narrative, not a list of achievements they can already see in your CV.",
      },
      {
        heading: "Structure Your SOP Effectively",
        body: "A strong SOP typically follows this structure: Opening hook (one memorable paragraph), Academic background and intellectual development, Professional experience and skills gained, Why this program and university specifically, Future goals and how this degree enables them, Closing paragraph. Aim for 800–1,000 words for most programs, unless a specific length is required.",
      },
      {
        heading: "The Opening Paragraph",
        body: "Avoid clichéd openings like 'From a very young age, I have been fascinated by...' Instead, open with a specific moment, project, or realisation that sparked your interest. A concrete anecdote or an intellectual question you've been wrestling with will immediately differentiate your essay from the hundreds the admissions committee reads.",
      },
      {
        heading: "Connecting Experience to Academic Goals",
        body: "Don't just list your experiences — analyse them. Explain what you learned, how it changed your thinking, and how it directly connects to what you want to study. The narrative thread between your past, present, and future must be coherent and convincing. Every paragraph should serve the central argument of why you are an ideal candidate.",
      },
      {
        heading: "Research the University and Program",
        body: "Generic SOPs are immediately recognisable and often rejected. Name specific professors whose research aligns with your interests. Reference specific courses, labs, or initiatives at the university. Explain concretely why this program — not just any program in this field — is the right next step for you.",
      },
      {
        heading: "Common Mistakes to Avoid",
        body: "Do not repeat your CV. Do not apologise for weaknesses — address them briefly and positively if necessary. Avoid vague language like 'vast experience' or 'passion for excellence.' Do not use translations or write in another language first — write directly in English. Have at least three people review your final draft, including someone outside your field.",
      },
    ],
  },
  {
    title: "USA vs UK: Which Is the Better Study Destination for You?",
    category: "Study Abroad",
    author: "Emma Rosenberg",
    authorRole: "International Education Advisor",
    date: "2025-11-18",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2599&auto=format&fit=crop",
    excerpt:
      "Both the USA and UK are world leaders in higher education, but they offer very different student experiences. We break down the key differences to help you decide.",
    tags: ["USA", "UK", "Comparison", "Study Abroad"],
    content: [
      {
        heading: "Duration & Course Structure",
        body: "UK undergraduate degrees take 3 years (4 in Scotland); US degrees take 4 years. UK degrees are more specialised from day one, while US programs are broader, with general education requirements in the first two years. For master's degrees, the UK typically offers 1-year programs vs 2-year programs in the US — a significant difference in both cost and time.",
      },
      {
        heading: "Tuition & Financial Aid",
        body: "US universities can be significantly more expensive, with tuition at top private universities exceeding USD 60,000 per year. However, the US also has a much more robust financial aid and scholarship ecosystem, including merit-based awards, assistantships, and fellowships. UK tuition for international students typically ranges from £15,000–£30,000 per year, with fewer merit scholarships available but lower overall costs due to shorter program duration.",
      },
      {
        heading: "Top University Rankings",
        body: "Both countries dominate global rankings. The US is home to Harvard, MIT, Stanford, Caltech, and many more. The UK boasts Oxford, Cambridge, Imperial College, UCL, and the London School of Economics. Ultimately, both countries offer world-class options across virtually all disciplines.",
      },
      {
        heading: "Post-Study Work Opportunities",
        body: "The US Optional Practical Training (OPT) allows graduates to work for 12 months post-graduation, extendable to 36 months for STEM graduates. The UK offers a Graduate Route visa, allowing international graduates to stay and work for 2 years (3 for PhD graduates) without a job offer. Both have pathways to longer-term skilled worker visas.",
      },
      {
        heading: "Cultural Experience",
        body: "The US is geographically vast with enormous campus cultures, Greek life, college sports, and a strong sense of university identity. The UK offers proximity to Europe, rich history, and a more independent student culture. US campuses are often self-contained communities, while UK universities are more integrated into city life. Your preference for this cultural dynamic matters enormously.",
      },
    ],
  },
  {
    title: "How to Fund Your MBA Abroad: Loans, Scholarships & Sponsorships",
    category: "Scholarships",
    author: "Rahul Mehta",
    authorRole: "MBA Admissions Coach",
    date: "2025-10-25",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
    excerpt:
      "An MBA from a top global business school can cost upwards of $150,000. But with the right funding strategy, it's more achievable than you think. Here's your complete funding roadmap.",
    tags: ["MBA", "Funding", "Business School", "Scholarships"],
    content: [
      {
        heading: "Understanding the True Cost of an MBA",
        body: "The full cost of a two-year MBA at a top US business school (Harvard, Wharton, Kellogg) typically ranges from USD 180,000–220,000 including tuition, fees, and living expenses. One-year programs at UK/European schools (INSEAD, LBS, Oxford Said) range from USD 80,000–120,000. Understanding this total cost, not just tuition, is the starting point for building your funding strategy.",
      },
      {
        heading: "School-Specific Scholarships",
        body: "Most top business schools offer merit-based scholarships ranging from $10,000 to full rides for exceptional candidates. These are awarded at admission — your application strength IS your scholarship application. Minority scholarships, women in business scholarships, and scholarships for students from developing countries often have less competition and significant award values.",
      },
      {
        heading: "External Scholarships for MBA Students",
        body: "The Forté Foundation offers fellowships to women pursuing MBAs. The National Black MBA Association offers scholarships for Black students. The Consortium for Graduate Study in Management provides full-tuition fellowships at leading business schools. Government scholarships like Chevening (UK) and Eiffel Excellence (France) also fund MBA studies.",
      },
      {
        heading: "Education Loans",
        body: "Several international banks offer unsecured education loans specifically for MBA students admitted to top programs — without requiring collateral. Prodigy Finance, MPower Financing, and MPOWER are popular options for international students. Interest rates are typically 7–13%. Many Indian students also utilise nationalised bank loans with government interest subsidies.",
      },
      {
        heading: "Corporate Sponsorship",
        body: "Many professionals pursue an MBA with full or partial employer sponsorship. Approach your employer 12–18 months before you plan to apply. Companies typically prefer sponsoring after 3–5 years of solid performance. The typical arrangement is full funding in exchange for a return-of-service commitment (usually 2–3 years post-MBA). McKinsey, BCG, and major banks commonly sponsor MBA candidates.",
      },
    ],
  },
];

const seedArticles = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Clear existing
    await Article.deleteMany({});
    
    // Insert new
    await Article.insertMany(allArticles.map(({ _id, ...rest }) => rest)); // Omitting hardcoded _id
    
    console.log("Successfully seeded original articles.");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedArticles();
