import React from "react";
import StepperForm from "./StepperForm";
import ImageField from "./ImageField";
import {
  Field,
  FieldGrid,
  RowList,
  Select,
  TextArea,
  TextInput,
} from "./formFields";
import { DESTINATION_OPTIONS } from "../utils/options";

/** Ranking bodies the public rankings table knows by name. */
const RANKING_SOURCES = ["QS", "THE", "USN", "ARWU"];

const UniversityForm = ({ form, setForm, isEditing, onSubmit, onCancel }) => {
  const setField = (key, value) => setForm({ ...form, [key]: value });

  const steps = [
    {
      id: "basics",
      label: "Basic Information",
      render: () => (
        <FieldGrid>
          <Field label="University Name" required>
            <TextInput
              required
              placeholder="e.g. University of Oxford"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Field>
          <Field label="Location / City" required>
            <TextInput
              required
              placeholder="e.g. Oxford, UK"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </Field>
          <Field label="Destination Country" required>
            <Select
              required
              value={form.destination}
              onChange={(e) => setField("destination", e.target.value)}
            >
              <option value="">Select country...</option>
              {DESTINATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Global Ranking">
            <TextInput
              placeholder="e.g. #3 Global"
              value={form.ranking}
              onChange={(e) => setField("ranking", e.target.value)}
            />
          </Field>
          <Field label="Established In">
            <TextInput
              placeholder="e.g. 1827"
              value={form.established}
              onChange={(e) => setField("established", e.target.value)}
            />
          </Field>
          <Field label="Famous For">
            <TextInput
              placeholder="e.g. Education, Medicine, Nursing"
              value={form.famousFor}
              onChange={(e) => setField("famousFor", e.target.value)}
            />
          </Field>
          <Field label="Official Website" className="md:col-span-2">
            <TextInput
              type="url"
              placeholder="e.g. https://www.utoronto.ca"
              value={form.website}
              onChange={(e) => setField("website", e.target.value)}
            />
          </Field>
          <ImageField
            label="Logo"
            className="md:col-span-2"
            value={form.logo}
            onChange={(url) => setField("logo", url)}
          />
        </FieldGrid>
      ),
    },
    {
      id: "fees",
      label: "Admission & Fees",
      render: () => (
        <FieldGrid>
          <Field label="IELTS Requirement">
            <TextInput
              placeholder="e.g. 6.5 overall"
              value={form.ieltsRequirement}
              onChange={(e) => setField("ieltsRequirement", e.target.value)}
            />
          </Field>
          <Field label="Study Cost">
            <TextInput
              placeholder="e.g. AUD 48,000/yr"
              value={form.studyCost}
              onChange={(e) => setField("studyCost", e.target.value)}
            />
          </Field>
          <Field label="Living Cost">
            <TextInput
              placeholder="e.g. AUD 21,000/yr"
              value={form.livingCost}
              onChange={(e) => setField("livingCost", e.target.value)}
            />
          </Field>
          <Field label="Tuition">
            <TextInput
              placeholder="e.g. £32,000/year"
              value={form.tuition}
              onChange={(e) => setField("tuition", e.target.value)}
            />
          </Field>
          <Field label="Intake Months">
            <TextInput
              placeholder="e.g. September, January"
              value={form.intakes}
              onChange={(e) => setField("intakes", e.target.value)}
            />
          </Field>
          <Field label="Acceptance Rate">
            <TextInput
              placeholder="e.g. 70%-75%"
              value={form.acceptanceRate}
              onChange={(e) => setField("acceptanceRate", e.target.value)}
            />
          </Field>
          <Field label="Student : Teacher Ratio">
            <TextInput
              placeholder="e.g. 14:1"
              value={form.studentTeacherRatio}
              onChange={(e) => setField("studentTeacherRatio", e.target.value)}
            />
          </Field>
          <Field label="Male : Female Ratio">
            <TextInput
              placeholder="e.g. 67 : 33"
              value={form.genderRatio}
              onChange={(e) => setField("genderRatio", e.target.value)}
            />
          </Field>
        </FieldGrid>
      ),
    },
    {
      id: "overview",
      label: "Overview",
      render: () => (
        <FieldGrid>
          <Field label="University Overview / Description" className="md:col-span-2">
            <TextArea
              rows={6}
              placeholder="Brief description of the university, its strengths, and what makes it unique for international students..."
              value={form.overview}
              onChange={(e) => setField("overview", e.target.value)}
            />
          </Field>
          <Field label="Application Steps" hint="one per line, in order">
            <TextArea
              rows={7}
              placeholder={"Register on the official portal\nFill in your personal details\nSubmit and pay the application fee"}
              value={form.applicationSteps}
              onChange={(e) => setField("applicationSteps", e.target.value)}
            />
          </Field>
          <Field label="Required Documents" hint="one per line">
            <TextArea
              rows={7}
              placeholder={"Academic transcripts\nPassport copy\nEnglish test scores"}
              value={form.requiredDocuments}
              onChange={(e) => setField("requiredDocuments", e.target.value)}
            />
          </Field>
        </FieldGrid>
      ),
    },
    {
      id: "rankings",
      label: "Rankings",
      render: () => (
        <FieldGrid>
          <RowList
            label="Rankings by Year"
            hint="one row per ranking body and year; the page shows the latest four years"
            rows={form.rankings}
            onChange={(rows) => setField("rankings", rows)}
            addLabel="Add ranking"
            columns={[
              {
                key: "source",
                placeholder: "Ranked by",
                type: "select",
                options: RANKING_SOURCES,
                width: "sm:col-span-4",
              },
              { key: "year", placeholder: "Year, e.g. 2025", type: "number", width: "sm:col-span-4" },
              { key: "rank", placeholder: "Rank, e.g. 439 or 301-350", width: "sm:col-span-4" },
            ]}
          />
        </FieldGrid>
      ),
    },
    {
      id: "stories",
      label: "Success Stories",
      render: () => (
        <FieldGrid>
          <RowList
            label="Student Success Stories"
            hint="real students only; name and course are required to show"
            rows={form.successStories}
            onChange={(rows) => setField("successStories", rows)}
            addLabel="Add story"
            columns={[
              { key: "studentName", placeholder: "Student name", width: "sm:col-span-4" },
              { key: "course", placeholder: "Course at this university", width: "sm:col-span-5" },
              { key: "intake", placeholder: "Intake, e.g. Sept 2024", width: "sm:col-span-3" },
              { key: "story", placeholder: "Short quote from the student", type: "textarea", width: "sm:col-span-12" },
            ]}
          />
        </FieldGrid>
      ),
    },
    {
      id: "faqs",
      label: "FAQs",
      render: () => (
        <FieldGrid>
          <p className="md:col-span-2 text-sm text-slate-500 -mt-1">
            Standard questions (location, ranking, intakes, IELTS, costs) are
            generated from this university's details. Add extra ones here; a
            question with the same wording replaces the generated one.
          </p>
          <RowList
            label="Extra FAQs"
            rows={form.faqs}
            onChange={(rows) => setField("faqs", rows)}
            addLabel="Add question"
            columns={[
              { key: "question", placeholder: "Question", width: "sm:col-span-12" },
              { key: "answer", placeholder: "Answer", type: "textarea", width: "sm:col-span-12" },
            ]}
          />
        </FieldGrid>
      ),
    },
  ];

  return (
    <StepperForm
      title={isEditing ? "Edit University" : "Create University"}
      steps={steps}
      submitLabel={isEditing ? "Update University" : "Add University"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default UniversityForm;
