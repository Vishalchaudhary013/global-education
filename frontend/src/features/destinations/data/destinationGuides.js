/**
 * Country guide content for the destination detail page.
 *
 * Anything stored on `destination.guide` in the database wins; these entries are
 * the bundled fallback so every destination page renders a complete guide.
 */

/**
 * City photos, each checked to show the city it is labelled with. Add more by
 * dropping a verified image URL in here and listing the city under a country.
 */
const CITY_IMG = {
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
  edinburgh: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800&auto=format&fit=crop",
  sydney: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop",
  melbourne: "https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=800&auto=format&fit=crop",
  toronto: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=800&auto=format&fit=crop",
  vancouver: "https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=800&auto=format&fit=crop",
  montreal: "https://images.unsplash.com/photo-1519178614-68673b201f36?q=80&w=800&auto=format&fit=crop",
  newyork: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop",
  boston: "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?q=80&w=800&auto=format&fit=crop",
  sanfrancisco: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800&auto=format&fit=crop",
  chicago: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=800&auto=format&fit=crop",
  seattle: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=800&auto=format&fit=crop",
  berlin: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800&auto=format&fit=crop",
  munich: "https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=800&auto=format&fit=crop",
  heidelberg: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=800&auto=format&fit=crop",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
  abudhabi: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=800&auto=format&fit=crop",
  delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop",
  mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop",
  bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800&auto=format&fit=crop",
  auckland: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=800&auto=format&fit=crop",
  wellington: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?q=80&w=800&auto=format&fit=crop",
  singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
};

export const destinationGuides = {
  uk: {
    flagCode: "gb",
    tagline: "Transform your life in the hub of global education",
    universitiesCount: 109,
    stats: [
      { label: "International students", value: "758K", icon: "students" },
      { label: "Happiness ranking", value: "20", icon: "happiness" },
      { label: "Employment rate", value: "75%", icon: "employment" },
    ],
    whyStudy:
      "The UK is a leading study destination with an excellent higher education system and a multicultural environment. The country is known for its world-renowned universities, with 4 institutions in the top 10 of the QS World University Rankings. Apart from academics, the benefits of studying in the UK include helping you land an awesome career and experience a classy lifestyle. Moreover, the educational system in the UK is all about inspiring greatness.",
    programsIntro:
      "The vast range of programs that you can access in the UK will surely elevate your career ambitions. And these courses are definitely going to prepare you for high-income jobs. From business to arts, and engineering, you've got a lot of options to choose from.",
    popularPrograms: [
      "Business",
      "Business Administration",
      "World Englishes",
      "Computer Sciences",
      "Finance",
      "Law",
      "Sociology",
      "Media Studies And Communication",
      "Education",
      "Economics",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Work experience letter",
        "CV",
        "Personal statement",
        "Reference",
        "UG/PG certificates",
        "Proof of funds",
      ],
      tests: ["IELTS 6.0 - 7.0", "PTE 59 - 65", "TOEFL iBT 80 - 100", "Duolingo 105 - 120", "GMAT (select MBA programs)"],
      visa: [
        "Confirmation of Acceptance for Studies (CAS)",
        "Valid passport",
        "Proof of funds for tuition and living costs",
        "Tuberculosis test certificate",
        "Immigration Health Surcharge payment",
        "Biometric residence permit appointment",
      ],
    },
    setsApart:
      "One of the things that sets the UK apart is that it allows graduates to stay and work for two years after completing a degree. In fact, PhD graduates can stay up to three years. Following this, you may also be eligible for a Permanent Residency (PR) in the UK, with a post-study work visa.",
    studentLifeIntro:
      "The UK offers a diverse student life and high academic standards. Additionally, the easy access to various accommodation options, part-time jobs, and post-study opportunities is a big plus. Everything you need to know to plan your student life in the UK is below. Do check it out.",
    studentLife: {
      minWage: "GBP 10-12",
      maxWorkHours: "20 hours a week",
      costOfLiving: [
        { label: "Accommodation", value: "GBP 1,000 to 1,500/month" },
        { label: "Food", value: "GBP 200 to 300/month" },
        { label: "Transportation", value: "GBP 60 to 100/month" },
        { label: "Utilities", value: "GBP 150 to 200/month" },
        { label: "Health insurance", value: "GBP 30 to 50/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Enrolled in a course at an educational institution in the UK" },
        { label: "Validity", value: "Course duration + 4 months" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Completion of a degree or other eligible qualification at a UK higher education provider" },
        { label: "Validity", value: "2 years for graduates and 3 years for doctoral graduates" },
      ],
      visaSource: "https://www.gov.uk/",
      employment: [
        { sector: "Information Technology", demand: "High" },
        { sector: "Artificial Intelligence", demand: "High" },
        { sector: "Healthcare", demand: "High" },
        { sector: "Construction and Skilled Trades", demand: "Medium" },
        { sector: "Retail and Hospitality", demand: "Low to Medium" },
      ],
    },
    funFacts: [
      "Britishers drink about 100 million cups of tea every day",
      "Stonehenge in the UK is a prehistoric monument that's older than the pyramids!",
      "Cheese rolling is considered a sport in the United Kingdom.",
      'The UK celebrates several "bank holidays," which means you\'ll get extra days off.',
      'The London Underground, or "the Tube," is the oldest metro system in the world, since 1863.',
      "London alone has over 270 nationalities, making it one of the most diverse cities globally.",
      "The UK has over 30 distinct language accents.",
      "Many UK universities and cities have been featured in the Harry Potter movies.",
    ],
    cities: [
      { name: "London", image: CITY_IMG.london },
      { name: "Edinburgh", image: CITY_IMG.edinburgh },
    ],
    faqs: [
      {
        question: "How much study gap is acceptable in the UK for a master's?",
        answer:
          "Most UK universities accept a study gap of up to 5 years for a master's programme, provided you can justify it with work experience, professional certifications, or family reasons. A well-written statement of purpose explaining the gap matters more than the gap itself.",
      },
      {
        question: "How much money is required to study in the UK?",
        answer:
          "Budget roughly GBP 12,000 to GBP 35,000 a year for tuition depending on the course, plus GBP 12,000 to GBP 15,000 a year for living costs. UKVI also requires proof of funds of GBP 1,483 per month in London and GBP 1,136 per month outside London.",
      },
      {
        question: "Can I get permanent residency in the UK after my studies?",
        answer:
          "Yes. After your Graduate Route visa, you can switch to a Skilled Worker visa with an eligible job offer. Five continuous years on a qualifying work visa makes you eligible to apply for Indefinite Leave to Remain (ILR).",
      },
    ],
    quickFacts: {
      capital: "London",
      language: "English",
      time: "GMT+0 or GMT+1",
      currency: "Great Britain Pound (GBP)",
      population: "69M",
      immigrants: "16%",
    },
    startDates: ["Jan", "May", "Sep"],
    temperature: {
      summary:
        "In the UK, you'll experience a temperate climate, with mild summers, cool winters, and frequent rainfall throughout the year.",
      cities: [
        { city: "London", range: "2°C to 22°C" },
        { city: "Manchester", range: "1°C to 19°C" },
        { city: "Edinburgh", range: "-1°C to 18°C" },
        { city: "Birmingham", range: "1°C to 21°C" },
      ],
      seasons: [
        { name: "Spring", months: "Mar - May" },
        { name: "Summer", months: "Jun - Aug" },
        { name: "Autumn", months: "Sep - Nov" },
        { name: "Winter", months: "Dec - Feb" },
      ],
    },
  },

  australia: {
    flagCode: "au",
    tagline: "World-class degrees under the sunniest skies",
    universitiesCount: 43,
    stats: [
      { label: "International students", value: "620K", icon: "students" },
      { label: "Happiness ranking", value: "10", icon: "happiness" },
      { label: "Employment rate", value: "79%", icon: "employment" },
    ],
    whyStudy:
      "Australia pairs a research-driven education system with one of the highest standards of living in the world. Seven Australian universities sit in the global top 100, and degrees here are recognised everywhere. Add generous post-study work rights, a relaxed outdoor lifestyle, and a huge international community, and it is easy to see why Australia is a first choice for so many students.",
    programsIntro:
      "From mining engineering to nursing and data science, Australian universities are built around industry needs. Most programs include placements or capstone projects, so you graduate with experience, not just a transcript.",
    popularPrograms: [
      "Nursing",
      "Information Technology",
      "Accounting",
      "Civil Engineering",
      "Data Science",
      "Hospitality Management",
      "Business Analytics",
      "Social Work",
      "Agriculture",
      "Public Health",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Academic transcripts",
        "CV",
        "Statement of purpose",
        "Letters of recommendation",
        "UG/PG certificates",
        "Proof of funds",
      ],
      tests: ["IELTS 6.0 - 7.0", "PTE 50 - 65", "TOEFL iBT 70 - 94", "GRE (select programs)"],
      visa: [
        "Confirmation of Enrolment (CoE)",
        "Genuine Student (GS) statement",
        "Overseas Student Health Cover (OSHC)",
        "Proof of funds",
        "Health examination",
        "Police clearance certificate",
      ],
    },
    setsApart:
      "Australia's Temporary Graduate visa (subclass 485) lets you stay and work for 2 to 4 years after graduating, and longer in regional areas. Regional study also earns you extra points towards permanent residency through the skilled migration programme.",
    studentLifeIntro:
      "Student life in Australia is outdoors, friendly, and surprisingly affordable outside the big two cities. Part-time work is easy to find, and campuses are set up to support international students from day one.",
    studentLife: {
      minWage: "AUD 24-26",
      maxWorkHours: "48 hours a fortnight",
      costOfLiving: [
        { label: "Accommodation", value: "AUD 900 to 1,800/month" },
        { label: "Food", value: "AUD 400 to 600/month" },
        { label: "Transportation", value: "AUD 100 to 160/month" },
        { label: "Utilities", value: "AUD 150 to 250/month" },
        { label: "Health insurance (OSHC)", value: "AUD 50 to 80/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Confirmed enrolment in a CRICOS-registered course" },
        { label: "Validity", value: "Course duration + up to 6 months" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Completion of a CRICOS-registered degree of at least 2 academic years" },
        { label: "Validity", value: "2 to 4 years depending on qualification and location" },
      ],
      visaSource: "https://immi.homeaffairs.gov.au/",
      employment: [
        { sector: "Healthcare and Nursing", demand: "High" },
        { sector: "Information Technology", demand: "High" },
        { sector: "Engineering", demand: "High" },
        { sector: "Education and Training", demand: "Medium" },
        { sector: "Retail and Hospitality", demand: "Medium" },
      ],
    },
    funFacts: [
      "Australia has over 10,000 beaches — you could visit a new one every day for 27 years.",
      "It is home to the world's largest reef system, the Great Barrier Reef.",
      "Melbourne has been ranked the world's most liveable city seven years in a row.",
      "Australia's Wi-Fi technology was invented by the CSIRO research agency.",
      "There are more kangaroos in Australia than people.",
      "Coffee culture here is so strong that global chains struggle to compete.",
      "Australia spans three different time zones.",
      "Tasmania has the cleanest air in the world.",
    ],
    cities: [
      { name: "Sydney", image: CITY_IMG.sydney },
      { name: "Melbourne", image: CITY_IMG.melbourne },
    ],
    faqs: [
      {
        question: "How much money is required to study in Australia?",
        answer:
          "Tuition typically runs AUD 20,000 to AUD 50,000 a year. For the student visa you must also show living costs of AUD 29,710 a year, plus travel and health cover.",
      },
      {
        question: "Can I work while studying in Australia?",
        answer:
          "Yes. Student visa holders can work up to 48 hours a fortnight during term and unlimited hours during scheduled course breaks.",
      },
      {
        question: "Is permanent residency possible after studying in Australia?",
        answer:
          "Yes. Many graduates move from the subclass 485 visa to a skilled or employer-sponsored visa, which can lead to permanent residency. Studying in a regional area adds points to your application.",
      },
    ],
    quickFacts: {
      capital: "Canberra",
      language: "English",
      time: "GMT+8 to GMT+11",
      currency: "Australian Dollar (AUD)",
      population: "27M",
      immigrants: "30%",
    },
    startDates: ["Feb", "Jul", "Nov"],
    temperature: {
      summary:
        "Australia's climate ranges from tropical in the north to temperate in the south, with warm summers and mild winters in most student cities.",
      cities: [
        { city: "Sydney", range: "8°C to 26°C" },
        { city: "Melbourne", range: "6°C to 26°C" },
        { city: "Brisbane", range: "10°C to 29°C" },
        { city: "Perth", range: "8°C to 31°C" },
      ],
      seasons: [
        { name: "Summer", months: "Dec - Feb" },
        { name: "Autumn", months: "Mar - May" },
        { name: "Winter", months: "Jun - Aug" },
        { name: "Spring", months: "Sep - Nov" },
      ],
    },
  },

  canada: {
    flagCode: "ca",
    tagline: "Affordable degrees with a clear path to residency",
    universitiesCount: 96,
    stats: [
      { label: "International students", value: "1M", icon: "students" },
      { label: "Happiness ranking", value: "15", icon: "happiness" },
      { label: "Employment rate", value: "73%", icon: "employment" },
    ],
    whyStudy:
      "Canada combines high-quality education with tuition that is noticeably lower than the US or UK. Its universities are research powerhouses, co-op programmes are built into many degrees, and the country is consistently ranked among the safest and most welcoming in the world. For students planning to settle abroad long term, Canada's immigration pathways are hard to beat.",
    programsIntro:
      "Canadian institutions are known for co-op degrees that alternate study terms with paid work terms. That means you graduate with Canadian work experience already on your CV.",
    popularPrograms: [
      "Computer Science",
      "Business Management",
      "Health Sciences",
      "Mechanical Engineering",
      "Hospitality Management",
      "Supply Chain Management",
      "Early Childhood Education",
      "Finance",
      "Environmental Science",
      "Cybersecurity",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Academic transcripts",
        "CV",
        "Statement of purpose",
        "Letters of recommendation",
        "UG/PG certificates",
        "Proof of funds",
      ],
      tests: ["IELTS 6.0 - 7.0", "PTE 58 - 65", "TOEFL iBT 80 - 100", "Duolingo 110 - 125"],
      visa: [
        "Letter of Acceptance from a Designated Learning Institution",
        "Provincial Attestation Letter (PAL)",
        "Guaranteed Investment Certificate (GIC)",
        "Proof of funds",
        "Medical examination",
        "Biometrics",
      ],
    },
    setsApart:
      "The Post-Graduation Work Permit (PGWP) lets you work in Canada for up to 3 years after a qualifying programme. That Canadian work experience counts directly towards Express Entry, which is the most common route to permanent residency.",
    studentLifeIntro:
      "Canada is multicultural by design, so settling in is straightforward. Campuses run dedicated international offices, and most cities have strong public transport and student housing options.",
    studentLife: {
      minWage: "CAD 15-17",
      maxWorkHours: "24 hours a week",
      costOfLiving: [
        { label: "Accommodation", value: "CAD 800 to 1,600/month" },
        { label: "Food", value: "CAD 300 to 500/month" },
        { label: "Transportation", value: "CAD 90 to 150/month" },
        { label: "Utilities", value: "CAD 100 to 200/month" },
        { label: "Health insurance", value: "CAD 60 to 90/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Acceptance at a Designated Learning Institution" },
        { label: "Validity", value: "Course duration + 90 days" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Graduation from an eligible PGWP programme of at least 8 months" },
        { label: "Validity", value: "8 months to 3 years, matching programme length" },
      ],
      visaSource: "https://www.canada.ca/",
      employment: [
        { sector: "Information Technology", demand: "High" },
        { sector: "Healthcare", demand: "High" },
        { sector: "Skilled Trades", demand: "High" },
        { sector: "Finance and Accounting", demand: "Medium" },
        { sector: "Retail and Hospitality", demand: "Medium" },
      ],
    },
    funFacts: [
      "Canada has more lakes than the rest of the world combined.",
      "It is officially bilingual — English and French.",
      "Canada produces 71% of the world's maple syrup.",
      "The country has the longest coastline on earth.",
      "Basketball was invented by a Canadian, James Naismith.",
      "Toronto is the most multicultural city in the world by share of foreign-born residents.",
      "Canada has six time zones.",
      "Churchill, Manitoba is known as the polar bear capital of the world.",
    ],
    cities: [
      { name: "Toronto", image: CITY_IMG.toronto },
      { name: "Vancouver", image: CITY_IMG.vancouver },
      { name: "Montreal", image: CITY_IMG.montreal },
    ],
    faqs: [
      {
        question: "What is the GIC and do I need one?",
        answer:
          "A Guaranteed Investment Certificate is a deposit of CAD 20,635 held with a Canadian bank that proves you can cover your first year of living costs. It is required under the Student Direct Stream and strongly recommended otherwise.",
      },
      {
        question: "How much money is required to study in Canada?",
        answer:
          "Tuition is usually CAD 15,000 to CAD 40,000 a year. Add CAD 12,000 to CAD 18,000 for living costs, which is also roughly what you must show for the study permit.",
      },
      {
        question: "Can I get permanent residency after studying in Canada?",
        answer:
          "Yes. One year of skilled Canadian work experience on a PGWP makes you eligible for the Canadian Experience Class under Express Entry, which is a direct route to permanent residency.",
      },
    ],
    quickFacts: {
      capital: "Ottawa",
      language: "English, French",
      time: "GMT-3:30 to GMT-8",
      currency: "Canadian Dollar (CAD)",
      population: "41M",
      immigrants: "23%",
    },
    startDates: ["Jan", "May", "Sep"],
    temperature: {
      summary:
        "Canada has four distinct seasons. Winters are cold and snowy, while summers are warm and comfortable in most student cities.",
      cities: [
        { city: "Toronto", range: "-7°C to 27°C" },
        { city: "Vancouver", range: "1°C to 22°C" },
        { city: "Montreal", range: "-11°C to 26°C" },
        { city: "Calgary", range: "-13°C to 23°C" },
      ],
      seasons: [
        { name: "Spring", months: "Mar - May" },
        { name: "Summer", months: "Jun - Aug" },
        { name: "Autumn", months: "Sep - Nov" },
        { name: "Winter", months: "Dec - Feb" },
      ],
    },
  },

  usa: {
    flagCode: "us",
    tagline: "Study where the world's biggest ideas get built",
    universitiesCount: 4000,
    stats: [
      { label: "International students", value: "1.1M", icon: "students" },
      { label: "Happiness ranking", value: "23", icon: "happiness" },
      { label: "Employment rate", value: "72%", icon: "employment" },
    ],
    whyStudy:
      "The United States hosts more international students than any other country, and for good reason. It has the deepest research funding in the world, the widest range of programmes, and unmatched flexibility — you can change your major, minor across disciplines, and build a degree around your interests. Proximity to global industry leaders also makes internships genuinely career-defining.",
    programsIntro:
      "American universities let you shape your own degree. STEM programmes are especially attractive because they qualify for an extended work authorisation period after graduation.",
    popularPrograms: [
      "Computer Science",
      "Data Science",
      "Business Administration",
      "Electrical Engineering",
      "Artificial Intelligence",
      "Public Health",
      "Economics",
      "Psychology",
      "Biotechnology",
      "Media and Communication",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Academic transcripts",
        "CV",
        "Statement of purpose",
        "Letters of recommendation",
        "UG/PG certificates",
        "Proof of funds",
      ],
      tests: ["IELTS 6.5 - 7.5", "TOEFL iBT 80 - 100", "GRE 300 - 325", "GMAT 600 - 700", "SAT/ACT (undergraduate)"],
      visa: [
        "Form I-20 from your university",
        "SEVIS fee receipt",
        "DS-160 confirmation",
        "Visa interview appointment",
        "Proof of funds",
        "Proof of ties to home country",
      ],
    },
    setsApart:
      "Optional Practical Training (OPT) gives you 12 months of work authorisation after graduating, and STEM graduates get a 24-month extension on top — three years in total to build US experience before moving to an H-1B work visa.",
    studentLifeIntro:
      "Campus life in the US is a culture of its own: societies, sports, research labs, and career fairs. On-campus jobs are the easiest way to earn while you study and are open from your first semester.",
    studentLife: {
      minWage: "USD 7.25-16",
      maxWorkHours: "20 hours a week on campus",
      costOfLiving: [
        { label: "Accommodation", value: "USD 800 to 2,000/month" },
        { label: "Food", value: "USD 300 to 600/month" },
        { label: "Transportation", value: "USD 70 to 150/month" },
        { label: "Utilities", value: "USD 120 to 220/month" },
        { label: "Health insurance", value: "USD 100 to 200/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Admission to a SEVP-certified institution with an issued I-20" },
        { label: "Validity", value: "Duration of status plus a 60-day grace period" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Completion of a degree at a SEVP-certified institution" },
        { label: "Validity", value: "12 months OPT, plus 24 months for STEM graduates" },
      ],
      visaSource: "https://travel.state.gov/",
      employment: [
        { sector: "Software and AI", demand: "High" },
        { sector: "Healthcare", demand: "High" },
        { sector: "Finance", demand: "Medium to High" },
        { sector: "Biotechnology", demand: "Medium" },
        { sector: "Media and Design", demand: "Medium" },
      ],
    },
    funFacts: [
      "The US has no official national language at the federal level.",
      "Harvard was founded in 1636, before the country itself existed.",
      "American universities award more than 1 million bachelor's degrees every year.",
      "Silicon Valley was built largely on Stanford research spin-offs.",
      "The Library of Congress is the largest library in the world.",
      "US campuses often have their own zip codes and police departments.",
      "Students can change their major even after starting their degree.",
      "The country spans six time zones.",
    ],
    cities: [
      { name: "New York", image: CITY_IMG.newyork },
      { name: "Boston", image: CITY_IMG.boston },
      { name: "San Francisco", image: CITY_IMG.sanfrancisco },
      { name: "Chicago", image: CITY_IMG.chicago },
      { name: "Seattle", image: CITY_IMG.seattle },
    ],
    faqs: [
      {
        question: "How much money is required to study in the USA?",
        answer:
          "Tuition ranges from USD 20,000 at public universities to USD 60,000 at private ones. Living costs add USD 12,000 to USD 20,000 a year depending on the city.",
      },
      {
        question: "What is the difference between OPT and CPT?",
        answer:
          "CPT is work authorisation tied to a required internship during your course. OPT is post-completion work authorisation of 12 months, extendable by 24 months for STEM degrees.",
      },
      {
        question: "Does an F-1 visa allow me to work off campus?",
        answer:
          "Not in your first academic year. After that, off-campus work is permitted only through CPT, OPT, or authorised economic hardship employment.",
      },
    ],
    quickFacts: {
      capital: "Washington, D.C.",
      language: "English",
      time: "GMT-5 to GMT-10",
      currency: "US Dollar (USD)",
      population: "341M",
      immigrants: "14%",
    },
    startDates: ["Jan", "May", "Aug"],
    temperature: {
      summary:
        "The US spans almost every climate type. Expect cold winters in the northeast and midwest, and mild weather year round on the west coast.",
      cities: [
        { city: "New York", range: "-3°C to 29°C" },
        { city: "Boston", range: "-6°C to 28°C" },
        { city: "San Francisco", range: "8°C to 22°C" },
        { city: "Chicago", range: "-8°C to 29°C" },
      ],
      seasons: [
        { name: "Spring", months: "Mar - May" },
        { name: "Summer", months: "Jun - Aug" },
        { name: "Autumn", months: "Sep - Nov" },
        { name: "Winter", months: "Dec - Feb" },
      ],
    },
  },

  germany: {
    flagCode: "de",
    tagline: "Tuition-free public universities in Europe's engine room",
    universitiesCount: 400,
    stats: [
      { label: "International students", value: "470K", icon: "students" },
      { label: "Happiness ranking", value: "24", icon: "happiness" },
      { label: "Employment rate", value: "77%", icon: "employment" },
    ],
    whyStudy:
      "Germany is the only major study destination where public universities charge little to no tuition, even for international students. It is Europe's largest economy, with deep links between universities and industry giants in engineering, automotive, and manufacturing. English-taught master's programmes have grown rapidly, so German fluency is no longer a barrier to entry.",
    programsIntro:
      "Germany is best known for engineering and applied sciences, but its business schools and computer science faculties are climbing fast. Most programmes include a mandatory industry semester.",
    popularPrograms: [
      "Mechanical Engineering",
      "Automotive Engineering",
      "Computer Science",
      "Data Engineering",
      "Renewable Energy",
      "Business Informatics",
      "Supply Chain Management",
      "Architecture",
      "Biotechnology",
      "Economics",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Academic transcripts",
        "CV",
        "Motivation letter",
        "Letters of recommendation",
        "APS certificate",
        "Proof of funds",
      ],
      tests: ["IELTS 6.5 - 7.0", "TOEFL iBT 80 - 95", "GRE (select programs)", "TestDaF / DSH (German-taught programs)"],
      visa: [
        "University admission letter",
        "Blocked account with EUR 11,904",
        "Health insurance confirmation",
        "Academic certificates",
        "Proof of accommodation",
        "Visa interview at the German consulate",
      ],
    },
    setsApart:
      "Public universities in Germany charge no tuition fee for most bachelor's and many master's programmes — you pay only a semester contribution of EUR 150 to EUR 350, which usually includes a regional transport pass. Graduates also get an 18-month job-seeker residence permit.",
    studentLifeIntro:
      "Germany is affordable, extremely well connected by rail, and sits at the centre of Europe, so weekend travel is easy. Student unions subsidise housing, canteens, and transport.",
    studentLife: {
      minWage: "EUR 12-13",
      maxWorkHours: "20 hours a week",
      costOfLiving: [
        { label: "Accommodation", value: "EUR 350 to 700/month" },
        { label: "Food", value: "EUR 180 to 280/month" },
        { label: "Transportation", value: "EUR 30 to 60/month" },
        { label: "Utilities", value: "EUR 100 to 180/month" },
        { label: "Health insurance", value: "EUR 110 to 130/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Admission to a recognised German higher education institution" },
        { label: "Validity", value: "Issued for 3 months, then converted to a residence permit" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Completion of a degree at a recognised German institution" },
        { label: "Validity", value: "18-month job-seeker residence permit" },
      ],
      visaSource: "https://www.make-it-in-germany.com/",
      employment: [
        { sector: "Engineering", demand: "High" },
        { sector: "Information Technology", demand: "High" },
        { sector: "Renewable Energy", demand: "High" },
        { sector: "Healthcare", demand: "Medium to High" },
        { sector: "Logistics", demand: "Medium" },
      ],
    },
    funFacts: [
      "Germany has over 20,000 castles.",
      "Public university tuition is free for international students too.",
      "There are more than 1,500 types of sausage in Germany.",
      "The printing press, the car, and aspirin were all invented here.",
      "Some stretches of the Autobahn have no speed limit.",
      "Germany has over 1,300 breweries.",
      "Berlin has more bridges than Venice.",
      "University semester tickets usually cover unlimited regional travel.",
    ],
    cities: [
      { name: "Berlin", image: CITY_IMG.berlin },
      { name: "Munich", image: CITY_IMG.munich },
      { name: "Heidelberg", image: CITY_IMG.heidelberg },
    ],
    faqs: [
      {
        question: "Is studying in Germany really free?",
        answer:
          "At public universities, yes for tuition in most states. You still pay a semester contribution of EUR 150 to EUR 350 and must cover your own living costs. Private universities charge full tuition.",
      },
      {
        question: "Do I need to speak German?",
        answer:
          "Not for English-taught programmes, which now number in the thousands. However, B1 level German makes part-time work and daily life considerably easier, and is often required for full-time jobs.",
      },
      {
        question: "What is a blocked account?",
        answer:
          "It is a special bank account where you deposit EUR 11,904 before your visa interview. The money is released to you in monthly instalments once you arrive, proving you can support yourself for a year.",
      },
    ],
    quickFacts: {
      capital: "Berlin",
      language: "German",
      time: "GMT+1 or GMT+2",
      currency: "Euro (EUR)",
      population: "84M",
      immigrants: "19%",
    },
    startDates: ["Apr", "Oct"],
    temperature: {
      summary:
        "Germany has a temperate seasonal climate — cold winters, pleasant summers, and moderate rainfall spread across the year.",
      cities: [
        { city: "Berlin", range: "-2°C to 25°C" },
        { city: "Munich", range: "-4°C to 24°C" },
        { city: "Hamburg", range: "-1°C to 23°C" },
        { city: "Frankfurt", range: "-1°C to 26°C" },
      ],
      seasons: [
        { name: "Spring", months: "Mar - May" },
        { name: "Summer", months: "Jun - Aug" },
        { name: "Autumn", months: "Sep - Nov" },
        { name: "Winter", months: "Dec - Feb" },
      ],
    },
  },

  dubai: {
    flagCode: "ae",
    tagline: "International branch campuses in a tax-free business hub",
    universitiesCount: 70,
    stats: [
      { label: "International students", value: "200K", icon: "students" },
      { label: "Happiness ranking", value: "22", icon: "happiness" },
      { label: "Employment rate", value: "80%", icon: "employment" },
    ],
    whyStudy:
      "Dubai hosts branch campuses of leading UK, Australian, and Indian universities, so you can earn an internationally recognised degree closer to home and at a lower cost. The city is a global hub for aviation, logistics, finance, and tourism, which makes internships easy to find. Income is tax-free, and the student community is one of the most diverse anywhere.",
    programsIntro:
      "Programmes in Dubai lean heavily towards business, aviation, hospitality, and technology — the sectors that drive the local economy and hire graduates directly.",
    popularPrograms: [
      "Business Administration",
      "Aviation Management",
      "Hospitality and Tourism",
      "Computer Science",
      "Finance and Banking",
      "Architecture",
      "Logistics and Supply Chain",
      "Media and Marketing",
      "Interior Design",
      "Artificial Intelligence",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Academic transcripts",
        "CV",
        "Statement of purpose",
        "Passport-size photographs",
        "UG/PG certificates",
        "Proof of funds",
      ],
      tests: ["IELTS 5.5 - 6.5", "TOEFL iBT 60 - 80", "PTE 50 - 58", "EmSAT (select programs)"],
      visa: [
        "University admission letter",
        "Student residence visa application",
        "Medical fitness test",
        "Emirates ID registration",
        "Health insurance",
        "Proof of funds",
      ],
    },
    setsApart:
      "The UAE Green Visa and the 5-year Golden Visa for outstanding graduates let high-performing students stay on without an employer sponsor. Combined with zero income tax, that makes Dubai unusually attractive for early-career earnings.",
    studentLifeIntro:
      "Dubai is safe, modern, and extremely well connected. Campuses cluster in Dubai International Academic City and Knowledge Park, and the metro makes getting around straightforward.",
    studentLife: {
      minWage: "AED 30-45",
      maxWorkHours: "15 hours a week during term",
      costOfLiving: [
        { label: "Accommodation", value: "AED 2,500 to 5,000/month" },
        { label: "Food", value: "AED 800 to 1,500/month" },
        { label: "Transportation", value: "AED 300 to 500/month" },
        { label: "Utilities", value: "AED 400 to 700/month" },
        { label: "Health insurance", value: "AED 150 to 350/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Enrolment at a licensed UAE higher education institution" },
        { label: "Validity", value: "1 year, renewable for the duration of the course" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Graduation from a UAE institution, with distinction for the Golden Visa" },
        { label: "Validity", value: "2-year Green Visa, or 5-year or 10-year Golden Visa" },
      ],
      visaSource: "https://u.ae/",
      employment: [
        { sector: "Finance and Banking", demand: "High" },
        { sector: "Tourism and Hospitality", demand: "High" },
        { sector: "Logistics and Aviation", demand: "High" },
        { sector: "Information Technology", demand: "Medium to High" },
        { sector: "Construction", demand: "Medium" },
      ],
    },
    funFacts: [
      "Around 85% of Dubai's residents are expatriates.",
      "The Burj Khalifa is the tallest building in the world at 828 metres.",
      "Dubai has a police fleet that includes Lamborghinis and Bugattis.",
      "There is no personal income tax in the UAE.",
      "The Dubai Metro is fully driverless.",
      "Dubai International is the world's busiest airport for international passengers.",
      "The city has indoor ski slopes in the middle of the desert.",
      "Friday and Saturday used to be the weekend; it is now Saturday and Sunday.",
    ],
    cities: [
      { name: "Dubai", image: CITY_IMG.dubai },
      { name: "Abu Dhabi", image: CITY_IMG.abudhabi },
    ],
    faqs: [
      {
        question: "Are degrees from Dubai branch campuses recognised globally?",
        answer:
          "Yes, provided the institution is accredited by the UAE Ministry of Education or operates in a free zone under its parent university's accreditation. The award is usually identical to the home-campus degree.",
      },
      {
        question: "How much money is required to study in Dubai?",
        answer:
          "Tuition runs roughly AED 37,000 to AED 90,000 a year. Living costs add AED 45,000 to AED 80,000 depending on your accommodation choice.",
      },
      {
        question: "Can I work part time on a student visa in Dubai?",
        answer:
          "Yes, with a work permit from the Ministry of Human Resources. Students in free zones such as Dubai International Academic City can apply through their university.",
      },
    ],
    quickFacts: {
      capital: "Abu Dhabi",
      language: "Arabic, English",
      time: "GMT+4",
      currency: "UAE Dirham (AED)",
      population: "11M",
      immigrants: "88%",
    },
    startDates: ["Jan", "May", "Sep"],
    temperature: {
      summary:
        "Dubai has a hot desert climate. Summers are very hot and humid, while winters are warm, dry, and ideal for outdoor life.",
      cities: [
        { city: "Dubai", range: "14°C to 41°C" },
        { city: "Abu Dhabi", range: "13°C to 42°C" },
        { city: "Sharjah", range: "13°C to 41°C" },
      ],
      seasons: [
        { name: "Winter", months: "Dec - Feb" },
        { name: "Spring", months: "Mar - May" },
        { name: "Summer", months: "Jun - Sep" },
        { name: "Autumn", months: "Oct - Nov" },
      ],
    },
  },

  india: {
    flagCode: "in",
    tagline: "World-class institutes at a fraction of the global cost",
    universitiesCount: 1100,
    stats: [
      { label: "International students", value: "47K", icon: "students" },
      { label: "Happiness ranking", value: "126", icon: "happiness" },
      { label: "Employment rate", value: "65%", icon: "employment" },
    ],
    whyStudy:
      "India offers one of the best cost-to-quality ratios in global education. The IITs, IIMs, and IISc rank among the world's leading technical and management institutes, and the country's technology sector gives students direct access to a fast-growing job market. English is the medium of instruction across higher education, so there is no language barrier.",
    programsIntro:
      "Engineering, medicine, and management dominate, but design, liberal arts, and data science programmes have expanded quickly at private universities.",
    popularPrograms: [
      "Computer Science Engineering",
      "Business Management",
      "Medicine (MBBS)",
      "Data Science",
      "Mechanical Engineering",
      "Design",
      "Pharmacy",
      "Hotel Management",
      "Law",
      "Commerce",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Academic transcripts",
        "CV",
        "Statement of purpose",
        "Entrance exam scorecard",
        "UG/PG certificates",
        "Proof of funds",
      ],
      tests: ["JEE / NEET / CAT (programme dependent)", "IELTS 6.0 (some universities)", "TOEFL iBT 70+", "GATE (postgraduate engineering)"],
      visa: [
        "Admission letter from a recognised institution",
        "Student visa application",
        "Proof of financial support",
        "Passport valid for 6+ months",
        "FRRO registration after arrival",
        "Medical certificate",
      ],
    },
    setsApart:
      "Tuition at Indian institutes is a fraction of what comparable programmes cost abroad, and campus placement is built into the system — top institutes run structured recruitment drives where companies hire directly from final-year cohorts.",
    studentLifeIntro:
      "Campus life in India is residential and community-driven, with hostels, clubs, and annual festivals. Living costs are low, so a modest budget goes a long way.",
    studentLife: {
      minWage: "INR 150-250",
      maxWorkHours: "Internships only on a student visa",
      costOfLiving: [
        { label: "Accommodation", value: "INR 6,000 to 20,000/month" },
        { label: "Food", value: "INR 4,000 to 8,000/month" },
        { label: "Transportation", value: "INR 1,000 to 2,500/month" },
        { label: "Utilities", value: "INR 1,500 to 3,000/month" },
        { label: "Health insurance", value: "INR 500 to 1,500/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Admission to a recognised Indian educational institution" },
        { label: "Validity", value: "Up to 5 years, matching course duration" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Conversion to an employment visa with a qualifying job offer" },
        { label: "Validity", value: "1 to 5 years depending on the employment contract" },
      ],
      visaSource: "https://indianvisaonline.gov.in/",
      employment: [
        { sector: "Information Technology", demand: "High" },
        { sector: "Healthcare", demand: "High" },
        { sector: "Manufacturing", demand: "Medium to High" },
        { sector: "Finance", demand: "Medium" },
        { sector: "Education", demand: "Medium" },
      ],
    },
    funFacts: [
      "India has the second-largest higher education system in the world.",
      "Chess, the decimal system, and the concept of zero originated here.",
      "There are 22 officially recognised languages.",
      "Nalanda, founded in the 5th century, was one of the world's first residential universities.",
      "India is the world's largest producer of films.",
      "The country has the highest cricket ground in the world, in Chail.",
      "Indian Railways is among the largest employers on earth.",
      "Campus festivals here draw tens of thousands of visitors.",
    ],
    cities: [
      { name: "Delhi", image: CITY_IMG.delhi },
      { name: "Mumbai", image: CITY_IMG.mumbai },
      { name: "Bangalore", image: CITY_IMG.bangalore },
    ],
    faqs: [
      {
        question: "How much money is required to study in India?",
        answer:
          "Tuition at public institutes can be as low as INR 50,000 a year, while private universities charge INR 2 to 15 lakh. Living costs are typically INR 1.5 to 3 lakh a year.",
      },
      {
        question: "Do international students need an entrance exam?",
        answer:
          "Many institutes reserve seats for international students under supernumerary quotas that waive the national entrance exams. Medicine and the IITs are the main exceptions.",
      },
      {
        question: "Can I work part time while studying in India?",
        answer:
          "A student visa does not permit general part-time employment. You can take up internships and research assistantships linked to your programme.",
      },
    ],
    quickFacts: {
      capital: "New Delhi",
      language: "Hindi, English",
      time: "GMT+5:30",
      currency: "Indian Rupee (INR)",
      population: "1.44B",
      immigrants: "0.4%",
    },
    startDates: ["Jan", "Jul", "Aug"],
    temperature: {
      summary:
        "India's climate varies widely by region, from Himalayan winters in the north to tropical weather in the south, with a monsoon season from June to September.",
      cities: [
        { city: "Delhi", range: "7°C to 41°C" },
        { city: "Mumbai", range: "18°C to 34°C" },
        { city: "Bangalore", range: "15°C to 34°C" },
        { city: "Pune", range: "11°C to 38°C" },
      ],
      seasons: [
        { name: "Summer", months: "Mar - Jun" },
        { name: "Monsoon", months: "Jul - Sep" },
        { name: "Autumn", months: "Oct - Nov" },
        { name: "Winter", months: "Dec - Feb" },
      ],
    },
  },

  newzealand: {
    flagCode: "nz",
    tagline: "Small country, world-class degrees, spectacular backyard",
    universitiesCount: 8,
    stats: [
      { label: "International students", value: "70K", icon: "students" },
      { label: "Happiness ranking", value: "11", icon: "happiness" },
      { label: "Employment rate", value: "78%", icon: "employment" },
    ],
    whyStudy:
      "All eight of New Zealand's universities rank in the global top 500, which no other country can claim. Class sizes are small, supervisors are accessible, and the country consistently scores near the top for safety, peace, and quality of life. Add generous post-study work rights and one of the most spectacular natural environments anywhere, and it is a compelling alternative to the larger destinations.",
    programsIntro:
      "New Zealand plays to its strengths: agriculture and environmental science, engineering, healthcare, and a film and creative sector with a global reputation.",
    popularPrograms: [
      "Agricultural Science",
      "Environmental Management",
      "Information Technology",
      "Nursing",
      "Civil Engineering",
      "Film and Animation",
      "Business Management",
      "Tourism and Hospitality",
      "Viticulture",
      "Marine Biology",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Academic transcripts",
        "CV",
        "Statement of purpose",
        "Letters of recommendation",
        "UG/PG certificates",
        "Proof of funds",
      ],
      tests: ["IELTS 6.0 - 6.5", "PTE 50 - 58", "TOEFL iBT 60 - 90", "Duolingo 100 - 115"],
      visa: [
        "Offer of place from an approved institution",
        "Proof of funds of NZD 20,000 a year",
        "Medical and chest X-ray certificates",
        "Police clearance certificate",
        "Onward travel evidence",
        "Health and travel insurance",
      ],
    },
    setsApart:
      "New Zealand's Post Study Work Visa gives you up to 3 years of open work rights, meaning no employer sponsorship is needed. Doctoral and master's graduates qualify regardless of their field of study, which is unusually flexible.",
    studentLifeIntro:
      "Campuses are compact and welcoming, and nowhere in the country is far from a beach or a mountain. Students can work part time from the start of their course.",
    studentLife: {
      minWage: "NZD 23-24",
      maxWorkHours: "20 hours a week",
      costOfLiving: [
        { label: "Accommodation", value: "NZD 800 to 1,500/month" },
        { label: "Food", value: "NZD 350 to 550/month" },
        { label: "Transportation", value: "NZD 100 to 160/month" },
        { label: "Utilities", value: "NZD 150 to 250/month" },
        { label: "Health insurance", value: "NZD 50 to 90/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Offer of place from an NZQA-approved education provider" },
        { label: "Validity", value: "Course duration, up to 4 years" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Completion of a qualifying degree at an approved provider" },
        { label: "Validity", value: "1 to 3 years depending on qualification level" },
      ],
      visaSource: "https://www.immigration.govt.nz/",
      employment: [
        { sector: "Healthcare and Nursing", demand: "High" },
        { sector: "Construction and Engineering", demand: "High" },
        { sector: "Information Technology", demand: "Medium to High" },
        { sector: "Agriculture and Food Technology", demand: "Medium" },
        { sector: "Tourism and Hospitality", demand: "Medium" },
      ],
    },
    funFacts: [
      "New Zealand has roughly five sheep for every person.",
      "It was the first country in the world to give women the vote, in 1893.",
      "The Lord of the Rings and Hobbit films were shot here.",
      "There are no snakes anywhere in the country.",
      "Nowhere in New Zealand is more than 128 km from the sea.",
      "Auckland has more boats per capita than any other city.",
      "The kiwi is a flightless bird, and also what New Zealanders call themselves.",
      "Queenstown is considered the birthplace of commercial bungee jumping.",
    ],
    cities: [
      { name: "Auckland", image: CITY_IMG.auckland },
      { name: "Wellington", image: CITY_IMG.wellington },
    ],
    faqs: [
      {
        question: "How much money is required to study in New Zealand?",
        answer:
          "Tuition is usually NZD 22,000 to NZD 35,000 a year. Immigration New Zealand also requires proof of NZD 20,000 a year for living costs.",
      },
      {
        question: "Can I work while studying in New Zealand?",
        answer:
          "Most student visa holders can work up to 20 hours a week during term and full time over scheduled breaks. Doctoral and master's research students can work full time throughout.",
      },
      {
        question: "Is residency possible after studying in New Zealand?",
        answer:
          "Yes. Work experience gained on the Post Study Work Visa can count towards the Skilled Migrant Category or the Green List residence pathways for in-demand occupations.",
      },
    ],
    quickFacts: {
      capital: "Wellington",
      language: "English, Māori",
      time: "GMT+12 or GMT+13",
      currency: "New Zealand Dollar (NZD)",
      population: "5.3M",
      immigrants: "29%",
    },
    startDates: ["Feb", "Jul"],
    temperature: {
      summary:
        "New Zealand has a mild maritime climate with no extremes. The north is subtropical, while the south gets genuine alpine winters.",
      cities: [
        { city: "Auckland", range: "8°C to 24°C" },
        { city: "Wellington", range: "6°C to 21°C" },
        { city: "Christchurch", range: "1°C to 23°C" },
        { city: "Queenstown", range: "-1°C to 23°C" },
      ],
      seasons: [
        { name: "Summer", months: "Dec - Feb" },
        { name: "Autumn", months: "Mar - May" },
        { name: "Winter", months: "Jun - Aug" },
        { name: "Spring", months: "Sep - Nov" },
      ],
    },
  },

  singapore: {
    flagCode: "sg",
    tagline: "Asia's education and innovation capital",
    universitiesCount: 34,
    stats: [
      { label: "International students", value: "75K", icon: "students" },
      { label: "Happiness ranking", value: "30", icon: "happiness" },
      { label: "Employment rate", value: "84%", icon: "employment" },
    ],
    whyStudy:
      "Singapore punches far above its size: NUS and NTU both sit inside the global top 30, and the city-state is the regional headquarters for a large share of Asia's banking, shipping, and technology firms. English is an official language, the public transport is excellent, and it is consistently rated one of the safest cities in the world.",
    programsIntro:
      "Finance, engineering, and computing dominate, reflecting the industries that recruit here. Many programmes build in internships with firms based in the city.",
    popularPrograms: [
      "Computer Science",
      "Finance and Banking",
      "Business Analytics",
      "Electrical Engineering",
      "Supply Chain and Logistics",
      "Hospitality Management",
      "Biomedical Sciences",
      "Maritime Studies",
      "Artificial Intelligence",
      "Accountancy",
    ],
    requirements: {
      university: [
        "Passport",
        "High school documents",
        "Academic transcripts",
        "CV",
        "Personal statement",
        "Letters of recommendation",
        "UG/PG certificates",
        "Proof of funds",
      ],
      tests: ["IELTS 6.5 - 7.0", "TOEFL iBT 90 - 100", "GRE 310+ (postgraduate)", "GMAT 650+ (MBA)"],
      visa: [
        "In-Principle Approval letter",
        "Student's Pass application via SOLAR",
        "eForm 16 submission",
        "Medical examination",
        "Proof of funds",
        "Passport-size photographs",
      ],
    },
    setsApart:
      "Singapore's tuition grant scheme can cut fees substantially at public universities in exchange for a commitment to work for a Singapore-registered company for three years after graduating — a built-in route into one of Asia's strongest job markets.",
    studentLifeIntro:
      "Everything in Singapore is close and well connected. Campuses are modern, hawker centres keep food costs low, and the rest of Southeast Asia is a short flight away.",
    studentLife: {
      minWage: "SGD 10-15",
      maxWorkHours: "16 hours a week during term",
      costOfLiving: [
        { label: "Accommodation", value: "SGD 700 to 1,800/month" },
        { label: "Food", value: "SGD 300 to 600/month" },
        { label: "Transportation", value: "SGD 80 to 120/month" },
        { label: "Utilities", value: "SGD 100 to 200/month" },
        { label: "Health insurance", value: "SGD 40 to 80/month" },
      ],
      costSource: "https://www.numbeo.com/",
      studentVisa: [
        { label: "Eligibility", value: "Acceptance into a full-time course at an approved institution" },
        { label: "Validity", value: "Course duration, renewable" },
      ],
      postStudyVisa: [
        { label: "Eligibility", value: "Graduation from an approved institution with a qualifying job offer" },
        { label: "Validity", value: "1-year Long Term Visit Pass, or an Employment Pass once hired" },
      ],
      visaSource: "https://www.ica.gov.sg/",
      employment: [
        { sector: "Finance and Banking", demand: "High" },
        { sector: "Information Technology", demand: "High" },
        { sector: "Biomedical and Pharma", demand: "Medium to High" },
        { sector: "Logistics and Maritime", demand: "Medium to High" },
        { sector: "Hospitality", demand: "Medium" },
      ],
    },
    funFacts: [
      "Singapore has four official languages: English, Malay, Mandarin, and Tamil.",
      "It is one of only three surviving city-states in the world.",
      "Changi Airport has been voted the world's best airport more than a dozen times.",
      "The country is home to the world's first night safari.",
      "Chewing gum sales have been restricted since 1992.",
      "Over 45% of the island is covered by greenery.",
      "Singapore reclaimed roughly a quarter of its land area from the sea.",
      "It has one of the highest concentrations of millionaires per capita.",
    ],
    cities: [{ name: "Singapore", image: CITY_IMG.singapore }],
    faqs: [
      {
        question: "How much money is required to study in Singapore?",
        answer:
          "Tuition is roughly SGD 20,000 to SGD 60,000 a year before any grant. Living costs add SGD 12,000 to SGD 20,000 depending on your housing.",
      },
      {
        question: "What is the Singapore tuition grant?",
        answer:
          "It is a government subsidy that reduces fees at public universities. In return, international students sign a bond to work for a Singapore-registered company for three years after graduating.",
      },
      {
        question: "Can I work part time on a Student's Pass?",
        answer:
          "Students at approved institutions may work up to 16 hours a week during term and full time during scheduled vacations, subject to their institution's rules.",
      },
    ],
    quickFacts: {
      capital: "Singapore",
      language: "English, Malay, Mandarin, Tamil",
      time: "GMT+8",
      currency: "Singapore Dollar (SGD)",
      population: "6M",
      immigrants: "43%",
    },
    startDates: ["Jan", "Aug"],
    temperature: {
      summary:
        "Singapore is tropical year round: hot, humid, and rainy, with very little variation between months.",
      cities: [{ city: "Singapore", range: "24°C to 32°C" }],
      seasons: [
        { name: "Monsoon", months: "Nov - Mar" },
        { name: "Summer", months: "Apr - Oct" },
      ],
    },
  },
};

/** Treats blank strings, empty arrays and empty objects as "not provided". */
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0);

/**
 * Merges the stored `destination.guide` over the bundled fallback for that
 * country. Stored values win, but any key left blank in the database keeps the
 * bundled content so the page never renders half empty.
 */
export function resolveGuide(destId, storedGuide) {
  const fallback = destinationGuides[destId] || {};
  const stored = storedGuide?.toObject?.() ?? storedGuide ?? {};
  const merged = { ...fallback };

  Object.entries(stored).forEach(([key, value]) => {
    if (isEmpty(value)) return;
    const fallbackValue = fallback[key];
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof fallbackValue === "object" &&
      !Array.isArray(fallbackValue)
    ) {
      const nested = { ...fallbackValue };
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        if (!isEmpty(nestedValue)) nested[nestedKey] = nestedValue;
      });
      merged[key] = nested;
      return;
    }
    merged[key] = value;
  });

  return merged;
}

export default destinationGuides;
