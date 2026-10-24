/**
 * Course structure for the course page's "What You'll Study" section.
 *
 * A course's own `curriculum` (entered in admin) wins: one stage per line,
 * "Stage name: module, module, ...". Without it, a typical structure is built
 * from the course's subject area and study level, laid out over its duration.
 *
 * TEMPORARY typical modules until every course has its own; exact modules
 * vary by university.
 */
import { subjectOf } from "./careerSalaries";
import { yearsFrom } from "./studyCosts";

/**
 * Typical modules per subject. `ug` has four stages (foundations, core,
 * advanced, final year); `pg` has three (core, advanced, capstone).
 */
const MODULES = {
  Medicine: {
    ug: [
      ["Human Anatomy", "Physiology", "Biochemistry", "Introduction to Healthcare"],
      ["Pathology", "Pharmacology", "Microbiology", "Clinical Skills"],
      ["Clinical Medicine", "Public Health & Epidemiology", "Medical Ethics & Law", "Electives"],
      ["Clinical Placements", "Research Project"],
    ],
    pg: [
      ["Research Methods", "Epidemiology & Biostatistics", "Health Systems & Policy", "Evidence-Based Practice"],
      ["Global Health", "Health Economics", "Clinical Leadership", "Specialist Electives"],
      ["Dissertation or Research Project"],
    ],
    specialisations: ["Public Health", "Clinical Research", "Nursing", "Pharmacy", "Health Informatics", "Global Health"],
  },
  "Computer Science": {
    ug: [
      ["Programming Fundamentals", "Discrete Mathematics", "Computer Systems", "Web Development"],
      ["Data Structures & Algorithms", "Databases", "Operating Systems", "Software Engineering"],
      ["Computer Networks", "Artificial Intelligence", "Cybersecurity", "Electives"],
      ["Final Year Project", "Industry Placement"],
    ],
    pg: [
      ["Advanced Algorithms", "Machine Learning", "Distributed Systems", "Research Methods"],
      ["Cloud Computing", "Data Engineering", "Computer Vision & NLP", "Specialist Electives"],
      ["Dissertation or Industry Project"],
    ],
    specialisations: ["Artificial Intelligence", "Data Science", "Cybersecurity", "Software Engineering", "Cloud Computing", "Human-Computer Interaction"],
  },
  Business: {
    ug: [
      ["Principles of Management", "Microeconomics", "Financial Accounting", "Business Communication"],
      ["Marketing", "Organisational Behaviour", "Business Statistics", "Corporate Finance"],
      ["Strategic Management", "International Business", "Entrepreneurship", "Electives"],
      ["Business Project", "Internship"],
    ],
    pg: [
      ["Managerial Economics", "Financial & Management Accounting", "Marketing Management", "Leadership & Organisational Behaviour"],
      ["Corporate Strategy", "Operations & Supply Chain", "Business Analytics", "Specialist Electives"],
      ["Consulting Project or Dissertation"],
    ],
    specialisations: ["Finance", "Marketing", "Business Analytics", "Human Resources", "International Business", "Entrepreneurship"],
  },
  Engineering: {
    ug: [
      ["Engineering Mathematics", "Physics for Engineers", "Engineering Drawing & CAD", "Programming"],
      ["Mechanics & Materials", "Thermodynamics", "Electrical Circuits", "Design Principles"],
      ["Control Systems", "Manufacturing Processes", "Project Management", "Electives"],
      ["Capstone Design Project", "Industrial Training"],
    ],
    pg: [
      ["Advanced Engineering Mathematics", "Simulation & Modelling", "Advanced Design", "Research Methods"],
      ["Sustainable Engineering", "Systems Engineering", "Specialist Electives"],
      ["Thesis or Industry Project"],
    ],
    specialisations: ["Mechanical", "Civil", "Electrical & Electronics", "Aerospace", "Robotics & Automation", "Renewable Energy"],
  },
};

/**
 * Economics sits under Business for careers, but its modules are its own,
 * so it gets a separate set (matched by name before the subject areas).
 */
const ECONOMICS = {
  ug: [
    ["Principles of Microeconomics", "Principles of Macroeconomics", "Mathematics for Economists", "Statistics"],
    ["Intermediate Microeconomics", "Intermediate Macroeconomics", "Econometrics", "Economic History"],
    ["Development Economics", "International Economics", "Public Economics", "Electives"],
    ["Research Project", "Dissertation"],
  ],
  pg: [
    ["Advanced Microeconomics", "Advanced Macroeconomics", "Econometrics", "Research Methods"],
    ["Development Economics", "Financial Economics", "Policy Analysis", "Specialist Electives"],
    ["Dissertation"],
  ],
  specialisations: ["Development Economics", "Financial Economics", "Econometrics", "Public Policy", "International Trade", "Behavioural Economics"],
};

/** Courses outside the four subject areas: the shape of the course, no specialisations. */
const GENERAL = {
  ug: [
    ["Introductory Core Modules", "Academic Writing & Research Skills", "Quantitative & Analytical Methods"],
    ["Core Subject Modules", "Research Methods", "Applied Practice"],
    ["Advanced Specialist Modules", "Electives from Related Fields", "Professional Practice"],
    ["Final Year Project or Dissertation"],
  ],
  pg: [
    ["Advanced Core Modules", "Research Methods", "Professional Skills"],
    ["Specialist Electives", "Applied Practice"],
    ["Dissertation or Capstone Project"],
  ],
  specialisations: [],
};

const PHD_STAGES = [
  { label: "Research Training", meta: "Year 1", modules: ["Research Methods", "Literature Review", "Research Proposal"] },
  { label: "Independent Research", meta: "Years 2–3", modules: ["Original Research", "Conference Papers", "Teaching Assistance"] },
  { label: "Thesis", meta: "Final year", modules: ["Thesis Writing", "Viva / Defence"] },
];

/** Admin text: one stage per line, "Stage name: module, module". */
const parseCurriculum = (text) =>
  String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const split = line.indexOf(":");
      const label = split > 0 ? line.slice(0, split).trim() : `Stage ${index + 1}`;
      const modules = (split > 0 ? line.slice(split + 1) : line)
        .split(",")
        .map((module) => module.trim())
        .filter(Boolean);
      return { label, meta: null, modules };
    })
    .filter((stage) => stage.modules.length);

/** Comma- or line-separated admin list. */
const parseList = (text) =>
  String(text || "")
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);

/**
 * Undergraduate stages over the course length: three years fold the final
 * year into the third, four or more give it a stage of its own.
 */
const undergraduateStages = (modules, years) => {
  const [foundations, core, advanced, final] = modules;
  if (years >= 4) {
    return [
      { label: "Foundations", meta: "Year 1", modules: foundations },
      { label: "Core Study", meta: "Year 2", modules: core },
      { label: "Advanced Study", meta: "Year 3", modules: advanced },
      { label: "Final Year", meta: years > 4 ? "Year 4 onwards" : "Year 4", modules: final },
    ];
  }
  return [
    { label: "Foundations", meta: "Year 1", modules: foundations },
    { label: "Core Study", meta: "Year 2", modules: core },
    { label: "Advanced Study & Project", meta: "Year 3", modules: [...advanced, ...final] },
  ];
};

/** Postgraduate stages: semesters for a one-year course, years for longer ones. */
const postgraduateStages = (modules, years) => {
  const [core, advanced, capstone] = modules;
  const long = years >= 2;
  return [
    { label: "Core Modules", meta: long ? "Year 1" : "Semester 1", modules: core },
    { label: "Advanced Modules", meta: long ? "Year 1–2" : "Semester 2", modules: advanced },
    { label: "Capstone", meta: long ? "Year 2" : "Final term", modules: capstone },
  ];
};

/** Diploma: the undergraduate foundations, then core study with a project. */
const diplomaStages = (modules) => [
  { label: "Foundations", meta: "Term 1", modules: modules[0] },
  { label: "Applied Study & Project", meta: "Term 2", modules: [...modules[1], ...modules[3]] },
];

/**
 * Stages and specialisations for a course. `typical` is true when they are
 * the generated stand-ins rather than the course's own.
 */
export const curriculumFor = (course) => {
  const subject = subjectOf(course.name)?.subject;
  const set = /econom/i.test(course.name)
    ? ECONOMICS
    : MODULES[subject] || GENERAL;

  const ownStages = parseCurriculum(course.curriculum);
  const ownSpecialisations = parseList(course.specialisations);

  let stages = ownStages;
  if (!stages.length) {
    const years = yearsFrom(course.duration);
    stages =
      course.type === "PhD"
        ? PHD_STAGES
        : course.type === "PG"
          ? postgraduateStages(set.pg, years)
          : course.type === "Diploma"
            ? diplomaStages(set.ug)
            : undergraduateStages(set.ug, years);
  }

  return {
    stages,
    specialisations: ownSpecialisations.length ? ownSpecialisations : set.specialisations,
    typical: !ownStages.length,
  };
};
