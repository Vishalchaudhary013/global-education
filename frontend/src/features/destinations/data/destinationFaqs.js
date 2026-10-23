/**
 * Extra FAQs for each destination, keyed by destination id. They are shown
 * after the FAQs in the destination guide (`guide.faqs`), with any repeated
 * question dropped. Visa and work rules change often, so review these
 * answers against official government sources regularly.
 */
export const destinationFaqs = {
  uk: [
    { question: "Which English tests do UK universities accept?", answer: "Most universities accept IELTS Academic, PTE Academic, TOEFL iBT and often Duolingo. Scores usually range from IELTS 6.0 to 7.0 depending on the course, and some universities waive the test if your previous studies were in English." },
    { question: "Can I work while studying in the UK?", answer: "Students on degree-level courses can usually work up to 20 hours a week during term time and full-time during official university holidays." },
    { question: "How long can I stay in the UK after graduating?", answer: "The Graduate Route lets you stay and work after your degree, currently for 2 years (3 years for PhD graduates). The government has announced a shorter stay for applications from January 2027, so check the latest rules before you apply." },
    { question: "Can I bring my family on a UK student visa?", answer: "Since January 2024, only students on postgraduate research programs (such as a PhD) and some government-funded students can bring dependants." },
    { question: "When should I apply for the September intake?", answer: "Start 8 to 12 months ahead. Undergraduate applications go through UCAS, with the main deadline in late January, while most postgraduate courses accept applications until places fill up." },
  ],
  australia: [
    { question: "What is the Genuine Student requirement?", answer: "Since March 2024, student visa applicants must show they genuinely intend to study in Australia by answering questions about their course choice, circumstances and plans. It replaced the earlier GTE statement." },
    { question: "Which English tests are accepted in Australia?", answer: "IELTS Academic, PTE Academic, TOEFL iBT and Cambridge English are widely accepted. Most courses ask for IELTS 6.0 to 7.0 or an equivalent score." },
    { question: "What is OSHC?", answer: "Overseas Student Health Cover is compulsory health insurance that you must hold for the full length of your student visa." },
    { question: "Can I bring my family to Australia?", answer: "You can usually include your partner and children in your student visa application. You will need to show funds and health cover for them as well." },
    { question: "How early should I apply for a student visa?", answer: "Apply as soon as you receive your Confirmation of Enrolment (CoE), ideally at least 2 to 3 months before your course starts." },
  ],
  canada: [
    { question: "What is a Provincial Attestation Letter (PAL)?", answer: "Most study permit applicants need a Provincial or Territorial Attestation Letter from the province where they will study. Your institution usually provides it with or after your offer letter." },
    { question: "Is the Student Direct Stream (SDS) still available?", answer: "No. The SDS fast-track program ended in November 2024, and all students now apply through the regular study permit process." },
    { question: "Which English tests do Canadian institutions accept?", answer: "IELTS Academic, TOEFL iBT, PTE Academic and CAEL are widely accepted, and many institutions also accept Duolingo." },
    { question: "Can my spouse work in Canada while I study?", answer: "Spouses of students in master's programs of 16 months or longer, doctoral programs and some professional programs may qualify for an open work permit." },
    { question: "Do I need a co-op work permit?", answer: "Yes, if your program includes a mandatory work placement or internship. It is usually issued together with your study permit." },
  ],
  usa: [
    { question: "What is an I-20?", answer: "The I-20 is the Certificate of Eligibility your university issues after you are admitted and show proof of funds. You need it to pay the SEVIS fee and apply for your F-1 visa." },
    { question: "What is the SEVIS fee?", answer: "The I-901 SEVIS fee is a one-time fee every F-1 student must pay before the visa interview." },
    { question: "Which tests do I need to study in the USA?", answer: "Most universities ask for TOEFL, IELTS or Duolingo. Some graduate programs also require the GRE or GMAT, and some undergraduate programs consider SAT or ACT scores, though many have made them optional." },
    { question: "What is the STEM OPT extension?", answer: "Graduates of eligible STEM degrees can extend their 12-month OPT by a further 24 months of work experience in their field." },
    { question: "When should I apply for the Fall intake?", answer: "Graduate deadlines usually fall between December and February. Undergraduate Early Decision deadlines are usually in November and Regular Decision in January." },
  ],
  germany: [
    { question: "What is the APS certificate?", answer: "Indian applicants need an APS certificate, which verifies your academic documents, before applying for a German student visa and at many universities." },
    { question: "What is uni-assist?", answer: "Uni-assist is a central service that checks international applications on behalf of many German universities. Some universities accept applications directly instead." },
    { question: "Can I work while studying in Germany?", answer: "International students can work up to 140 full days or 280 half days a year, and student assistant jobs at the university often have more flexible rules." },
    { question: "Can I stay in Germany after graduating?", answer: "Yes. Graduates can apply for a residence permit of up to 18 months to look for a job related to their degree." },
    { question: "What is the semester contribution?", answer: "Most public universities charge a semester contribution of roughly EUR 100 to 400, which covers administration and student services and often includes a public transport ticket." },
  ],
  dubai: [
    { question: "Do I need a student visa to study in Dubai?", answer: "Yes. Your university sponsors your student residence visa, which is usually valid for one year and renewed each year of your course." },
    { question: "Which English tests are accepted in Dubai?", answer: "Most universities accept IELTS Academic or TOEFL iBT, typically asking for IELTS 5.5 to 6.5 depending on the course." },
    { question: "What are the intakes in Dubai?", answer: "The main intake is in September, and many universities also admit students in January, with some offering a smaller summer intake." },
    { question: "Is Dubai safe for international students?", answer: "Yes. Dubai is consistently ranked among the safest cities in the world, with a large international student community." },
    { question: "Can I stay in the UAE after graduating?", answer: "You can switch to an employment visa once you find a job, and outstanding graduates may qualify for the long-term Golden Visa." },
  ],
  india: [
    { question: "How do international students apply to Indian universities?", answer: "You can apply through the government's Study in India portal or directly to universities. Some institutions, such as the NITs, also admit international students through dedicated schemes." },
    { question: "What visa do I need to study in India?", answer: "You need an Indian student visa. Students admitted through the Study in India portal can apply for an e-Student visa online." },
    { question: "Do I need an English test to study in India?", answer: "Many institutions accept IELTS or TOEFL scores, and some accept proof that your previous studies were taught in English instead." },
    { question: "Which are the top institutions in India?", answer: "The IITs, IIMs, IISc Bangalore, AIIMS and leading central universities such as the University of Delhi are among the most respected institutions." },
    { question: "Is on-campus accommodation available?", answer: "Most universities offer hostel accommodation, and many reserve rooms for international students." },
  ],
  newzealand: [
    { question: "Which English tests are accepted in New Zealand?", answer: "IELTS Academic, PTE Academic and TOEFL iBT are widely accepted. Undergraduate courses usually ask for IELTS 6.0 and postgraduate courses IELTS 6.5." },
    { question: "What are the main intakes in New Zealand?", answer: "Universities have two main intakes, in February and July, and some institutions offer additional start dates." },
    { question: "Is health insurance compulsory?", answer: "Yes. You must hold acceptable medical and travel insurance for the whole time you are on a student visa." },
    { question: "What is the Green List?", answer: "The Green List names hard-to-fill roles that offer faster pathways to residence. Studying in a related field can strengthen your options after graduation." },
    { question: "How early should I apply for a student visa?", answer: "Apply once you have your offer of place and funds ready, ideally at least 2 to 3 months before your course starts." },
  ],
  singapore: [
    { question: "What is a Student's Pass?", answer: "The Student's Pass is the permit international students need for full-time study. You apply through ICA's online system after accepting your offer." },
    { question: "Which English tests are accepted in Singapore?", answer: "Universities accept IELTS or TOEFL, and the requirement is often waived if your previous studies were taught in English." },
    { question: "What are the main intakes in Singapore?", answer: "The main intake is in August, and some programs also start in January." },
    { question: "Can I stay in Singapore after graduating?", answer: "You can work in Singapore once you receive a job offer and qualify for an Employment Pass or S Pass." },
    { question: "Is on-campus accommodation available?", answer: "NUS, NTU and other universities have residential halls, and first-year international students are often given priority." },
  ],
};
