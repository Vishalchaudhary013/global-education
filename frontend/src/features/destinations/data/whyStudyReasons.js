/**
 * "Why study here?" reasons for the destination page, keyed by destination id.
 *
 * Each reason has an `icon` key (mapped to an icon in DestinationWhy), a short
 * title and a one-line description. A `whyReasons` / `whyIntro` stored on
 * `destination.guide` overrides these.
 */
export const whyStudyReasons = {
  uk: {
    intro:
      "From Oxford to Edinburgh, the UK pairs centuries-old universities with strong career prospects and a truly international student life.",
    reasons: [
      {
        icon: "trophy",
        title: "World-ranked universities",
        text: "Oxford, Cambridge, Imperial and UCL regularly rank among the top 10 universities in the world.",
      },
      {
        icon: "bolt",
        title: "Shorter degrees, lower total cost",
        text: "Most bachelor's degrees take 3 years and master's just 1, saving you a year or more of fees and living costs.",
      },
      {
        icon: "briefcase",
        title: "Work while you study",
        text: "Work up to 20 hours a week during term and full-time in official holidays to support yourself.",
      },
      {
        icon: "id",
        title: "Graduate Route visa",
        text: "Stay on and work in the UK after graduating, with longer stays available for PhD graduates.",
      },
      {
        icon: "bulb",
        title: "Research that leads the world",
        text: "UK universities produce world-leading research across science, medicine, business and the arts.",
      },
      {
        icon: "globe",
        title: "Multicultural, close to Europe",
        text: "Large international communities on every campus, with mainland Europe a short trip away.",
      },
    ],
  },
  australia: {
    intro:
      "Australia combines globally recognised degrees with a relaxed outdoor lifestyle, generous work rights and some of the world's most liveable cities.",
    reasons: [
      {
        icon: "trophy",
        title: "Globally ranked universities",
        text: "Several Australian universities sit in the world's top 100, and their degrees are recognised everywhere.",
      },
      {
        icon: "id",
        title: "Post-study work rights",
        text: "The Temporary Graduate visa lets eligible graduates stay and gain work experience after their studies.",
      },
      {
        icon: "briefcase",
        title: "Part-time work allowed",
        text: "Work up to 48 hours a fortnight during term and unlimited hours during scheduled course breaks.",
      },
      {
        icon: "bulb",
        title: "Industry-focused programs",
        text: "Many courses include placements and industry projects, so you graduate with real experience.",
      },
      {
        icon: "shield",
        title: "High quality of life",
        text: "Safe, multicultural cities like Melbourne and Sydney consistently rank among the world's most liveable.",
      },
      {
        icon: "sun",
        title: "Sun, beaches and the outdoors",
        text: "A warm climate and world-famous coastline make life outside the classroom just as memorable.",
      },
    ],
  },
  canada: {
    intro:
      "Canada offers high-quality, affordable degrees, a welcoming multicultural society and one of the clearest paths from study to work and residency.",
    reasons: [
      {
        icon: "cash",
        title: "Quality education, lower fees",
        text: "Tuition is generally lower than in the USA or UK, with degrees respected by employers worldwide.",
      },
      {
        icon: "id",
        title: "Post-Graduation Work Permit",
        text: "Eligible graduates can work in Canada for up to 3 years, depending on the length of their program.",
      },
      {
        icon: "briefcase",
        title: "Work while you study",
        text: "Work part-time off campus during academic sessions and full-time during scheduled breaks.",
      },
      {
        icon: "home",
        title: "Pathway to permanent residency",
        text: "Canadian study and work experience can count towards permanent residency programs.",
      },
      {
        icon: "bulb",
        title: "Co-op programs",
        text: "Many degrees include paid co-op work terms, so you build experience and contacts before graduating.",
      },
      {
        icon: "shield",
        title: "Safe and welcoming",
        text: "Canada is known for its safety, diversity and friendliness towards international students.",
      },
    ],
  },
  usa: {
    intro:
      "The USA is home to many of the world's best-known universities, flexible degrees and unmatched opportunities in research, tech and business.",
    reasons: [
      {
        icon: "trophy",
        title: "Home to top-ranked universities",
        text: "MIT, Harvard, Stanford and many more consistently lead global university rankings.",
      },
      {
        icon: "bolt",
        title: "Flexible curriculum",
        text: "Explore subjects before choosing a major, and combine majors and minors to suit your goals.",
      },
      {
        icon: "id",
        title: "OPT and STEM OPT",
        text: "Gain up to 12 months of work experience after graduating, with a longer extension for STEM graduates.",
      },
      {
        icon: "briefcase",
        title: "On-campus work",
        text: "Work on campus during your studies to earn while you learn and build your CV.",
      },
      {
        icon: "bulb",
        title: "Research and innovation",
        text: "Well-funded labs and close links with industry put you at the cutting edge of your field.",
      },
      {
        icon: "cap",
        title: "Scholarships and assistantships",
        text: "A wide range of merit scholarships, grants and assistantships can reduce the cost of your degree.",
      },
    ],
  },
  germany: {
    intro:
      "Germany is Europe's engineering and research powerhouse, with low or no tuition at public universities and strong job prospects after graduation.",
    reasons: [
      {
        icon: "cash",
        title: "Low or no tuition fees",
        text: "Most public universities charge little or no tuition, with only a small semester contribution.",
      },
      {
        icon: "bulb",
        title: "Engineering and research excellence",
        text: "Germany is a global leader in engineering, automotive, science and applied research.",
      },
      {
        icon: "language",
        title: "English-taught programs",
        text: "A growing number of master's programs are taught fully in English.",
      },
      {
        icon: "id",
        title: "Stay on to find work",
        text: "Graduates can extend their residence permit for up to 18 months to look for a job.",
      },
      {
        icon: "briefcase",
        title: "Part-time work allowed",
        text: "International students can work part-time alongside their studies within an annual limit.",
      },
      {
        icon: "globe",
        title: "In the heart of Europe",
        text: "Travel across the Schengen area with ease and experience many cultures during your studies.",
      },
    ],
  },
  dubai: {
    intro:
      "Dubai brings international university campuses, a global business hub and a safe, modern lifestyle together, just a short flight from home.",
    reasons: [
      {
        icon: "building",
        title: "International branch campuses",
        text: "Earn the same degree as the home campus from leading UK, Australian and US universities.",
      },
      {
        icon: "cash",
        title: "Tax-free salaries",
        text: "The UAE has no personal income tax, so graduates keep more of what they earn.",
      },
      {
        icon: "globe",
        title: "Global crossroads",
        text: "A hub between Europe, Asia and Africa, just a few hours' flight from India.",
      },
      {
        icon: "briefcase",
        title: "Internships and part-time work",
        text: "Eligible students can take up part-time work and internships with university approval.",
      },
      {
        icon: "shield",
        title: "Safe and modern city",
        text: "Dubai is known for its safety, world-class infrastructure and cosmopolitan lifestyle.",
      },
      {
        icon: "id",
        title: "Golden Visa for top graduates",
        text: "Outstanding graduates may qualify for the UAE's long-term Golden Visa.",
      },
    ],
  },
  india: {
    intro:
      "India offers world-renowned institutions, affordable fees and a vibrant, diverse culture in one of the world's fastest-growing economies.",
    reasons: [
      {
        icon: "trophy",
        title: "Renowned institutions",
        text: "The IITs, IIMs and other leading institutes are respected by employers around the world.",
      },
      {
        icon: "cash",
        title: "Affordable fees and living costs",
        text: "Tuition and everyday costs are a fraction of those in most other study destinations.",
      },
      {
        icon: "bolt",
        title: "Fast-growing economy",
        text: "A booming startup and tech scene creates strong internship and career opportunities.",
      },
      {
        icon: "language",
        title: "English-medium teaching",
        text: "Most higher education programs are taught in English.",
      },
      {
        icon: "cap",
        title: "Scholarships for international students",
        text: "Government programs such as Study in India offer fee waivers and scholarships.",
      },
      {
        icon: "globe",
        title: "Rich, diverse culture",
        text: "Experience centuries of history, many languages and festivals all year round.",
      },
    ],
  },
  newzealand: {
    intro:
      "New Zealand offers globally ranked universities, a safe and welcoming society and breathtaking landscapes right on your doorstep.",
    reasons: [
      {
        icon: "trophy",
        title: "Every university is ranked",
        text: "All eight New Zealand universities feature in the QS World University Rankings.",
      },
      {
        icon: "id",
        title: "Post-study work visa",
        text: "Eligible graduates can stay and work in New Zealand for up to 3 years.",
      },
      {
        icon: "briefcase",
        title: "Work while you study",
        text: "Work part-time during the academic year and full-time during scheduled holidays.",
      },
      {
        icon: "shield",
        title: "One of the safest countries",
        text: "New Zealand consistently ranks among the most peaceful countries in the world.",
      },
      {
        icon: "bulb",
        title: "Practical, hands-on learning",
        text: "Teaching focuses on independent thinking, research and real-world problem solving.",
      },
      {
        icon: "sun",
        title: "Stunning natural beauty",
        text: "Mountains, beaches and lakes make it easy to balance study with adventure.",
      },
    ],
  },
  singapore: {
    intro:
      "Singapore is Asia's education and business hub, with top-ranked universities, a safe and clean city and strong links to global employers.",
    reasons: [
      {
        icon: "trophy",
        title: "Asia's top universities",
        text: "NUS and NTU rank among the best universities in the world and in Asia.",
      },
      {
        icon: "building",
        title: "Global business hub",
        text: "Many multinational companies have their Asia headquarters here, creating strong career links.",
      },
      {
        icon: "shield",
        title: "Safe and clean",
        text: "Singapore is one of the safest and best-organised cities in the world.",
      },
      {
        icon: "language",
        title: "English-speaking",
        text: "English is the main language of teaching, business and everyday life.",
      },
      {
        icon: "briefcase",
        title: "Part-time work during term",
        text: "Eligible students at approved institutions can work part-time during term.",
      },
      {
        icon: "globe",
        title: "Close to home",
        text: "Short flights to India and the rest of Asia make it easy to travel home.",
      },
    ],
  },
};
