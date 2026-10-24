/**
 * Well-known scholarships for each destination, keyed by destination id.
 * They fill out the scholarships list after the site's own scholarship
 * records. `link` is the program's official site. Amounts are indicative; each program's official site has the
 * current value, deadlines and eligible countries.
 *
 * `levels` lists the study levels an award funds ("UG", "PG", "PhD"), and
 * `university` names the one institution an award is limited to. The course
 * page uses both to show only awards that fit the course; the destination page
 * lists everything.
 */
export const popularScholarships = {
  uk: [
    { name: "Chevening Scholarships", amount: "Fully funded", criteria: "UK government award for one-year master's degrees, covering tuition, living costs and flights for future leaders.", provider: "UK Government (FCDO)", link: "https://www.chevening.org", levels: ["PG"] },
    { name: "Commonwealth Scholarships", amount: "Fully funded", criteria: "Master's and PhD funding for students from eligible Commonwealth countries.", provider: "Commonwealth Scholarship Commission", link: "https://cscuk.fcdo.gov.uk", levels: ["PG", "PhD"] },
    { name: "GREAT Scholarships", amount: "GBP 10,000+", criteria: "Towards tuition for one-year postgraduate courses at participating UK universities.", provider: "British Council & UK universities", link: "https://study-uk.britishcouncil.org", levels: ["PG"] },
    { name: "Gates Cambridge Scholarship", amount: "Fully funded", criteria: "Full cost of postgraduate study at the University of Cambridge for outstanding applicants.", provider: "Gates Cambridge Trust", link: "https://www.gatescambridge.org", levels: ["PG", "PhD"], university: "University of Cambridge" },
    { name: "Clarendon Fund", amount: "Fully funded", criteria: "Tuition and a living grant for graduate study at the University of Oxford.", provider: "University of Oxford", link: "https://www.ox.ac.uk/clarendon", levels: ["PG", "PhD"], university: "University of Oxford" },
    { name: "Rhodes Scholarship", amount: "Fully funded", criteria: "Postgraduate study at Oxford for exceptional young leaders from selected countries.", provider: "Rhodes Trust", link: "https://www.rhodeshouse.ox.ac.uk", levels: ["PG", "PhD"], university: "University of Oxford" },
  ],
  canada: [
    { name: "Vanier Canada Graduate Scholarships", amount: "CAD 50,000 / year", criteria: "Three years of funding for doctoral students showing leadership and research excellence.", provider: "Government of Canada", link: "https://vanier.gc.ca", levels: ["PhD"] },
    { name: "Lester B. Pearson International Scholarship", amount: "Fully funded", criteria: "Tuition, books and residence for four years of undergraduate study at the University of Toronto.", provider: "University of Toronto", link: "https://future.utoronto.ca", levels: ["UG"], university: "University of Toronto" },
    { name: "UBC International Leader of Tomorrow Award", amount: "Need-based", criteria: "Undergraduate award at the University of British Columbia for academically strong students.", provider: "University of British Columbia", link: "https://you.ubc.ca", levels: ["UG"], university: "University of British Columbia" },
    { name: "Ontario Graduate Scholarship", amount: "CAD 10,000 - 15,000", criteria: "Merit-based funding for master's and doctoral students at Ontario universities.", provider: "Government of Ontario", link: "https://www.ontario.ca", levels: ["PG", "PhD"] },
    { name: "University entrance scholarships", amount: "CAD 1,000 - 20,000", criteria: "Most Canadian universities award automatic merit scholarships to strong international applicants.", provider: "Canadian universities", link: "https://www.educanada.ca", levels: ["UG"] },
  ],
  australia: [
    { name: "Research Training Program (RTP)", amount: "Tuition + stipend", criteria: "Australian government funding for research master's and PhD students.", provider: "Australian Government", link: "https://www.education.gov.au", levels: ["PG", "PhD"] },
    { name: "Australia Awards Scholarships", amount: "Fully funded", criteria: "Full scholarships for students from eligible partner countries.", provider: "Australian Government (DFAT)", link: "https://www.dfat.gov.au", levels: ["PG", "PhD"] },
    { name: "Destination Australia", amount: "AUD 15,000 / year", criteria: "Support for students who choose to study at regional campuses.", provider: "Australian Government", link: "https://www.studyaustralia.gov.au", levels: ["UG", "PG", "PhD"] },
    { name: "University of Sydney International Scholarship", amount: "Tuition + stipend", criteria: "Covers tuition and living costs for outstanding research students.", provider: "University of Sydney", link: "https://www.sydney.edu.au", levels: ["PG", "PhD"], university: "University of Sydney" },
    { name: "University merit scholarships", amount: "10% - 50% of tuition", criteria: "Most Australian universities offer tuition reductions for high-achieving international students.", provider: "Universities", link: "https://www.studyaustralia.gov.au", levels: ["UG", "PG"] },
  ],
  usa: [
    { name: "Fulbright-Nehru Master's Fellowships", amount: "Fully funded", criteria: "Tuition, living costs and travel for Indian students pursuing a master's in the USA.", provider: "USIEF", link: "https://www.usief.org.in", levels: ["PG"] },
    { name: "Knight-Hennessy Scholars", amount: "Fully funded", criteria: "Full cost of graduate study at Stanford University for future global leaders.", provider: "Stanford University", link: "https://knight-hennessy.stanford.edu", levels: ["PG", "PhD"], university: "Stanford University" },
    { name: "Hubert H. Humphrey Fellowship", amount: "Fully funded", criteria: "Ten months of non-degree graduate study and professional development for experienced professionals.", provider: "U.S. Department of State", link: "https://www.humphreyfellowship.org", levels: ["PG"] },
    { name: "AAUW International Fellowships", amount: "USD 20,000 - 50,000", criteria: "Funding for women pursuing full-time graduate or postdoctoral study.", provider: "AAUW", link: "https://www.aauw.org", levels: ["PG", "PhD"] },
    { name: "Graduate assistantships", amount: "Tuition waiver + stipend", criteria: "Teaching and research assistant roles that cover tuition and pay a monthly stipend.", provider: "US universities", link: "https://educationusa.state.gov", levels: ["PG", "PhD"] },
  ],
  germany: [
    { name: "DAAD Scholarships", amount: "Monthly stipend", criteria: "Germany's main scholarship body funds master's and PhD study, with travel and insurance allowances.", provider: "DAAD", link: "https://www.daad.de/en", levels: ["PG", "PhD"] },
    { name: "Deutschlandstipendium", amount: "EUR 300 / month", criteria: "Merit scholarship co-funded by the government and private sponsors at German universities.", provider: "German Government & sponsors", link: "https://www.deutschlandstipendium.de", levels: ["UG", "PG"] },
    { name: "Erasmus Mundus Joint Masters", amount: "Fully funded", criteria: "Full scholarships for joint master's programs taught across several European universities.", provider: "European Union", link: "https://erasmus-plus.ec.europa.eu", levels: ["PG"] },
    { name: "Heinrich Böll Foundation Scholarships", amount: "Monthly stipend", criteria: "Support for master's and PhD students committed to sustainability and social issues.", provider: "Heinrich Böll Foundation", link: "https://www.boell.de/en", levels: ["PG", "PhD"] },
    { name: "Konrad-Adenauer-Stiftung Scholarships", amount: "Monthly stipend", criteria: "Funding for graduate students with strong academic records and social engagement.", provider: "Konrad-Adenauer-Stiftung", link: "https://www.kas.de/en", levels: ["PG", "PhD"] },
  ],
  dubai: [
    { name: "University merit scholarships", amount: "Up to 50% of tuition", criteria: "Most Dubai campuses reduce tuition for students with high grades.", provider: "Universities", link: "https://www.khda.gov.ae", levels: ["UG", "PG"] },
    { name: "Khalifa University Graduate Scholarships", amount: "Fully funded", criteria: "Tuition and a monthly stipend for research master's and PhD students in Abu Dhabi.", provider: "Khalifa University", link: "https://www.ku.ac.ae", levels: ["PG", "PhD"], university: "Khalifa University" },
    { name: "Heriot-Watt Dubai Academic Scholarships", amount: "Up to 30% of tuition", criteria: "Merit-based awards for undergraduate and postgraduate students.", provider: "Heriot-Watt University Dubai", link: "https://www.hw.ac.uk/dubai", levels: ["UG", "PG"], university: "Heriot-Watt University Dubai" },
    { name: "Middlesex University Dubai Scholarships", amount: "Partial tuition", criteria: "Academic excellence and sports scholarships for new students.", provider: "Middlesex University Dubai", link: "https://www.mdx.ac.ae", levels: ["UG", "PG"], university: "Middlesex University Dubai" },
  ],
  india: [
    { name: "ICCR Scholarships", amount: "Tuition + stipend", criteria: "Government of India scholarships for international students across undergraduate and postgraduate study.", provider: "Indian Council for Cultural Relations", link: "https://www.iccr.gov.in", levels: ["UG", "PG", "PhD"] },
    { name: "Study in India Scholarships", amount: "Fee waivers", criteria: "Tuition waivers for meritorious international students at participating institutions.", provider: "Ministry of Education, India", link: "https://www.studyinindia.gov.in", levels: ["UG", "PG"] },
    { name: "ASEAN PhD Fellowship", amount: "Fully funded", criteria: "PhD funding at the IITs for students from ASEAN countries.", provider: "Ministry of Education, India", link: "https://www.education.gov.in", levels: ["PhD"] },
  ],
  newzealand: [
    { name: "New Zealand Excellence Awards", amount: "NZD 5,000 - 10,000", criteria: "Awards for Indian students at New Zealand universities.", provider: "Education New Zealand", link: "https://www.studywithnewzealand.govt.nz", levels: ["UG", "PG"] },
    { name: "Manaaki New Zealand Scholarships", amount: "Fully funded", criteria: "Government scholarships for students from eligible partner countries.", provider: "New Zealand Government", link: "https://www.nzscholarships.govt.nz", levels: ["PG", "PhD"] },
    { name: "University of Auckland International Student Excellence Scholarship", amount: "NZD 10,000", criteria: "Merit award for new international undergraduate and postgraduate students.", provider: "University of Auckland", link: "https://www.auckland.ac.nz", levels: ["UG", "PG"], university: "University of Auckland" },
    { name: "University of Canterbury International First-Year Scholarship", amount: "NZD 5,000 - 20,000", criteria: "For high-achieving international students starting an undergraduate degree.", provider: "University of Canterbury", link: "https://www.canterbury.ac.nz", levels: ["UG"], university: "University of Canterbury" },
    { name: "Victoria University of Wellington Tongarewa Scholarship", amount: "NZD 5,000 - 10,000", criteria: "Merit scholarship for international students starting a degree in Wellington.", provider: "Victoria University of Wellington", link: "https://www.wgtn.ac.nz", levels: ["UG", "PG"], university: "Victoria University of Wellington" },
  ],
  singapore: [
    { name: "Singapore International Graduate Award (SINGA)", amount: "Fully funded", criteria: "Tuition and a monthly stipend for PhD study at NUS, NTU, SUTD and A*STAR.", provider: "A*STAR, NUS, NTU & SUTD", link: "https://www.a-star.edu.sg", levels: ["PhD"] },
    { name: "MOE Tuition Grant", amount: "Tuition subsidy", criteria: "Reduces fees at public universities in return for working in Singapore after graduating.", provider: "Ministry of Education, Singapore", link: "https://www.moe.gov.sg", levels: ["UG", "PG"] },
    { name: "NUS Research Scholarship", amount: "Tuition + stipend", criteria: "Funding for research master's and PhD students at the National University of Singapore.", provider: "National University of Singapore", link: "https://www.nus.edu.sg", levels: ["PG", "PhD"], university: "National University of Singapore" },
    { name: "NTU Research Scholarship", amount: "Tuition + stipend", criteria: "Funding for research students at Nanyang Technological University.", provider: "Nanyang Technological University", link: "https://www.ntu.edu.sg", levels: ["PG", "PhD"], university: "Nanyang Technological University" },
    { name: "ASEAN Undergraduate Scholarship", amount: "Tuition + allowance", criteria: "Undergraduate funding for students from ASEAN member countries.", provider: "Ministry of Education, Singapore", link: "https://www.moe.gov.sg", levels: ["UG"] },
  ],
};
