const linesToArray = (value) =>
  (value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const arrayToLines = (value) => (Array.isArray(value) ? value.join("\n") : "");

const csvToArray = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const arrayToCsv = (value) => (Array.isArray(value) ? value.join(", ") : "");

/** Drops rows the admin added but never filled in. */
const cleanRows = (rows, keys) =>
  (rows || []).filter((row) => keys.some((key) => (row?.[key] || "").trim()));

/** Destinations are addressed by a url-safe slug, not by their mongo `_id`. */
export const slugify = (value) =>
  (value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const emptyDestination = {
  id: "",
  name: "",
  heroImage: "",
  description: "",
  costs: { ug: "", pg: "", living: "" },
  visa: { processSummary: "", points: "" },
  jobs: [],
  scholarships: [],
  universities: [],
  guide: {
    flagCode: "",
    tagline: "",
    universitiesCount: "",
    stats: [],
    whyStudy: "",
    programsIntro: "",
    popularPrograms: "",
    requirements: { university: "", tests: "", visa: "" },
    setsApart: "",
    studentLifeIntro: "",
    studentLife: {
      minWage: "",
      maxWorkHours: "",
      costOfLiving: [],
      costSource: "",
      studentVisa: [],
      postStudyVisa: [],
      visaSource: "",
      employment: [],
    },
    funFacts: "",
    cities: [],
    faqs: [],
    quickFacts: {
      capital: "",
      language: "",
      time: "",
      currency: "",
      population: "",
      immigrants: "",
    },
    startDates: "",
    temperature: { summary: "", cities: [], seasons: [] },
  },
};

/** Turns an API destination into the flat-ish shape these inputs bind to. */
export const destinationToForm = (destination) => {
  const guide = destination?.guide || {};
  const studentLife = guide.studentLife || {};
  const requirements = guide.requirements || {};
  const temperature = guide.temperature || {};

  return {
    ...emptyDestination,
    id: destination?.id || "",
    name: destination?.name || "",
    heroImage: destination?.heroImage || "",
    description: destination?.description || "",
    costs: {
      ug: destination?.costs?.ug || "",
      pg: destination?.costs?.pg || "",
      living: destination?.costs?.living || "",
    },
    visa: {
      processSummary: destination?.visa?.processSummary || "",
      points: arrayToLines(destination?.visa?.points),
    },
    jobs: destination?.jobs?.map((job) => ({ ...job })) || [],
    scholarships: destination?.scholarships?.map((item) => ({ ...item })) || [],
    universities: destination?.universities?.map((item) => ({ ...item })) || [],
    guide: {
      ...emptyDestination.guide,
      flagCode: guide.flagCode || "",
      tagline: guide.tagline || "",
      universitiesCount: guide.universitiesCount ?? "",
      stats: guide.stats?.map((stat) => ({ ...stat })) || [],
      whyStudy: guide.whyStudy || "",
      programsIntro: guide.programsIntro || "",
      popularPrograms: arrayToCsv(guide.popularPrograms),
      requirements: {
        university: arrayToLines(requirements.university),
        tests: arrayToLines(requirements.tests),
        visa: arrayToLines(requirements.visa),
      },
      setsApart: guide.setsApart || "",
      studentLifeIntro: guide.studentLifeIntro || "",
      studentLife: {
        minWage: studentLife.minWage || "",
        maxWorkHours: studentLife.maxWorkHours || "",
        costOfLiving: studentLife.costOfLiving?.map((item) => ({ ...item })) || [],
        costSource: studentLife.costSource || "",
        studentVisa: studentLife.studentVisa?.map((item) => ({ ...item })) || [],
        postStudyVisa: studentLife.postStudyVisa?.map((item) => ({ ...item })) || [],
        visaSource: studentLife.visaSource || "",
        employment: studentLife.employment?.map((item) => ({ ...item })) || [],
      },
      funFacts: arrayToLines(guide.funFacts),
      cities: guide.cities?.map((city) => ({ ...city })) || [],
      faqs: guide.faqs?.map((faq) => ({ ...faq })) || [],
      quickFacts: {
        capital: guide.quickFacts?.capital || "",
        language: guide.quickFacts?.language || "",
        time: guide.quickFacts?.time || "",
        currency: guide.quickFacts?.currency || "",
        population: guide.quickFacts?.population || "",
        immigrants: guide.quickFacts?.immigrants || "",
      },
      startDates: arrayToCsv(guide.startDates),
      temperature: {
        summary: temperature.summary || "",
        cities: temperature.cities?.map((item) => ({ ...item })) || [],
        seasons: temperature.seasons?.map((item) => ({ ...item })) || [],
      },
    },
  };
};

/** Folds the form back into the nested document the API stores. */
export const formToDestination = (form) => {
  const guide = form.guide;

  return {
    // An existing destination keeps its slug so its public URL never moves; a
    // new one derives it from the name.
    id: form.id || slugify(form.name),
    name: form.name.trim(),
    heroImage: form.heroImage,
    description: form.description,
    costs: { ...form.costs },
    visa: {
      processSummary: form.visa.processSummary,
      points: linesToArray(form.visa.points),
    },
    jobs: cleanRows(form.jobs, ["title", "salary"]),
    scholarships: cleanRows(form.scholarships, ["name", "amount", "criteria"]),
    universities: cleanRows(form.universities, ["name", "location"]),
    guide: {
      flagCode: guide.flagCode.trim().toLowerCase(),
      tagline: guide.tagline,
      universitiesCount: Number(guide.universitiesCount) || undefined,
      stats: cleanRows(guide.stats, ["label", "value"]),
      whyStudy: guide.whyStudy,
      programsIntro: guide.programsIntro,
      popularPrograms: csvToArray(guide.popularPrograms),
      requirements: {
        university: linesToArray(guide.requirements.university),
        tests: linesToArray(guide.requirements.tests),
        visa: linesToArray(guide.requirements.visa),
      },
      setsApart: guide.setsApart,
      studentLifeIntro: guide.studentLifeIntro,
      studentLife: {
        minWage: guide.studentLife.minWage,
        maxWorkHours: guide.studentLife.maxWorkHours,
        costOfLiving: cleanRows(guide.studentLife.costOfLiving, ["label", "value"]),
        costSource: guide.studentLife.costSource,
        studentVisa: cleanRows(guide.studentLife.studentVisa, ["label", "value"]),
        postStudyVisa: cleanRows(guide.studentLife.postStudyVisa, ["label", "value"]),
        visaSource: guide.studentLife.visaSource,
        employment: cleanRows(guide.studentLife.employment, ["sector", "demand"]),
      },
      funFacts: linesToArray(guide.funFacts),
      cities: cleanRows(guide.cities, ["name"]),
      faqs: cleanRows(guide.faqs, ["question", "answer"]),
      quickFacts: { ...guide.quickFacts },
      startDates: csvToArray(guide.startDates),
      temperature: {
        summary: guide.temperature.summary,
        cities: cleanRows(guide.temperature.cities, ["city", "range"]),
        seasons: cleanRows(guide.temperature.seasons, ["name", "months"]),
      },
    },
  };
};

