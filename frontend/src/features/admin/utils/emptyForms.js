/**
 * The blank shape of each catalogue form. Every field is present so a form
 * stays controlled, and so loading a record for editing can spread over it
 * without leaving `undefined` inputs behind.
 *
 * The destination form is far larger and lives in `destinationFormModel`.
 */

export const emptyUniversity = {
  name: "",
  location: "",
  destination: "",
  ranking: "",
  established: "",
  famousFor: "",
  website: "",
  acceptanceRate: "",
  studentTeacherRatio: "",
  genderRatio: "",
  rankings: [],
  successStories: [],
  faqs: [],
  applicationSteps: "",
  requiredDocuments: "",
  ieltsRequirement: "",
  logo: "",
  studyCost: "",
  livingCost: "",
  overview: "",
  tuition: "",
  intakes: "",
};

export const emptyCourse = {
  name: "",
  type: "UG",
  destination: "",
  university: "",
  duration: "",
  feePerYear: "",
  overview: "",
  highlights: "",
  curriculum: "",
  specialisations: "",
  faqs: [],
};

export const emptyScholarship = {
  name: "",
  destination: "",
  university: "",
  amount: "",
  eligibility: "",
  deadline: "",
  level: "",
  provider: "",
  noOfAwards: "",
  description: "",
  fields: "",
  benefits: "",
  requirements: "",
  howToApply: "",
  officialLink: "",
  tags: "",
};

export const emptyEvent = {
  name: "",
  mode: "online",
  type: "",
  date: "",
  time: "",
  location: "",
  university: "",
  logo: "",
  countries: "",
  highlights: "",
  universities: "",
  description: "",
  venue: "",
};
