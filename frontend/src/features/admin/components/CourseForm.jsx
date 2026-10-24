import React from "react";
import StepperForm from "./StepperForm";
import {
  Field,
  FieldGrid,
  RowList,
  Select,
  TextArea,
  TextInput,
} from "./formFields";
import { DESTINATION_OPTIONS } from "../utils/options";

/** One step only, so the stepper renders it as a plain panel with no rail. */
const CourseForm = ({ form, setForm, universities, isEditing, onSubmit, onCancel }) => {
  const setField = (key, value) => setForm({ ...form, [key]: value });

  const steps = [
    {
      id: "details",
      label: "Course Details",
      render: () => (
        <FieldGrid>
          <Field label="Course Name" required className="md:col-span-2">
            <TextInput
              required
              placeholder="e.g. MSc Computer Science"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Field>
          <Field label="Course Level" required>
            <Select value={form.type} onChange={(e) => setField("type", e.target.value)}>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
              <option value="Diploma">Diploma</option>
              <option value="PhD">PhD / Doctorate</option>
            </Select>
          </Field>
          <Field label="Duration" required>
            <TextInput
              required
              placeholder="e.g. 2 Years"
              value={form.duration}
              onChange={(e) => setField("duration", e.target.value)}
            />
          </Field>
          <Field label="Fee per Year (local currency)">
            <TextInput
              type="number"
              min="0"
              placeholder="e.g. 16900"
              value={form.feePerYear}
              onChange={(e) => setField("feePerYear", e.target.value)}
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
          <Field label="University" required>
            <Select
              required
              value={form.university}
              onChange={(e) => setField("university", e.target.value)}
            >
              <option value="">Select University...</option>
              {universities.map((university) => (
                <option key={university._id} value={university._id}>
                  {university.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Course Overview" className="md:col-span-2">
            <TextArea
              rows={5}
              placeholder="What the course covers and who it is for"
              value={form.overview}
              onChange={(e) => setField("overview", e.target.value)}
            />
          </Field>
          <Field
            label="Highlights"
            hint="one per line, Title: description"
            className="md:col-span-2"
          >
            <TextArea
              rows={5}
              placeholder={"Industry placements: A paid year in industry between years two and three\nAccredited by BCS"}
              value={form.highlights}
              onChange={(e) => setField("highlights", e.target.value)}
            />
          </Field>
          <Field
            label="Curriculum"
            hint="one stage per line, Stage: module, module"
            className="md:col-span-2"
          >
            <TextArea
              rows={5}
              placeholder={"Year 1: Programming Fundamentals, Discrete Mathematics, Computer Systems\nYear 2: Data Structures & Algorithms, Databases, Software Engineering"}
              value={form.curriculum}
              onChange={(e) => setField("curriculum", e.target.value)}
            />
          </Field>
          <Field label="Specialisations" hint="comma-separated" className="md:col-span-2">
            <TextInput
              placeholder="e.g. Artificial Intelligence, Data Science, Cybersecurity"
              value={form.specialisations}
              onChange={(e) => setField("specialisations", e.target.value)}
            />
          </Field>
          <p className="md:col-span-2 text-sm text-slate-500">
            Standard FAQs (duration, fees, entry requirements, intakes, careers)
            are generated from this course's details. Add extra ones here; a
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
      title={isEditing ? "Edit Course" : "Create Course"}
      steps={steps}
      submitLabel={isEditing ? "Update Course" : "Add Course"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default CourseForm;
