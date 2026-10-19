import React from "react";
import StepperForm from "./StepperForm";
import {
  Field,
  FieldGrid,
  Select,
  TextArea,
  TextInput,
} from "./formFields";
import { DESTINATION_OPTIONS } from "../utils/options";

const ScholarshipForm = ({ form, setForm, universities, isEditing, onSubmit, onCancel }) => {
  const setField = (key, value) => setForm({ ...form, [key]: value });

  const steps = [
    {
      id: "basics",
      label: "Basic Information",
      render: () => (
        <FieldGrid>
          <Field label="Scholarship Name" required className="md:col-span-2">
            <TextInput
              required
              placeholder="e.g. Chevening Scholarship"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Field>
          <Field label="Destination" required>
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
          <Field label="Amount / Value" required>
            <TextInput
              required
              placeholder="e.g. Fully Funded / £10,000"
              value={form.amount}
              onChange={(e) => setField("amount", e.target.value)}
            />
          </Field>
          <Field label="Provider / Sponsor">
            <TextInput
              placeholder="e.g. UK Government (FCDO)"
              value={form.provider}
              onChange={(e) => setField("provider", e.target.value)}
            />
          </Field>
          <Field label="Linked University">
            <Select
              value={form.university}
              onChange={(e) => setField("university", e.target.value)}
            >
              <option value="">No Specific University</option>
              {universities.map((university) => (
                <option key={university._id} value={university._id}>
                  {university.name}
                </option>
              ))}
            </Select>
          </Field>
        </FieldGrid>
      ),
    },
    {
      id: "criteria",
      label: "Criteria & Dates",
      render: () => (
        <FieldGrid>
          <Field label="Study Level">
            <TextInput
              placeholder="e.g. Masters / PhD"
              value={form.level}
              onChange={(e) => setField("level", e.target.value)}
            />
          </Field>
          <Field label="No. of Awards">
            <TextInput
              placeholder="e.g. 1,500+ per year"
              value={form.noOfAwards}
              onChange={(e) => setField("noOfAwards", e.target.value)}
            />
          </Field>
          <Field label="Application Deadline">
            <TextInput
              type="date"
              value={form.deadline}
              onChange={(e) => setField("deadline", e.target.value)}
            />
          </Field>
          <Field label="Eligible Fields" hint="comma separated">
            <TextInput
              placeholder="All Fields, Engineering, Business..."
              value={form.fields}
              onChange={(e) => setField("fields", e.target.value)}
            />
          </Field>
          <Field label="Eligibility Criteria" className="md:col-span-2">
            <TextInput
              placeholder="e.g. Emerging leaders with 2+ years work experience"
              value={form.eligibility}
              onChange={(e) => setField("eligibility", e.target.value)}
            />
          </Field>
        </FieldGrid>
      ),
    },
    {
      id: "content",
      label: "Details & Content",
      render: () => (
        <FieldGrid>
          <Field label="Description" className="md:col-span-2">
            <TextArea
              rows={3}
              placeholder="Detailed description of the scholarship..."
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </Field>
          <Field label="Benefits" hint="comma separated">
            <TextArea
              rows={3}
              placeholder="Full tuition, Monthly stipend, Return airfare..."
              value={form.benefits}
              onChange={(e) => setField("benefits", e.target.value)}
            />
          </Field>
          <Field label="Requirements" hint="comma separated">
            <TextArea
              rows={3}
              placeholder="Bachelor's degree, 2 years work experience..."
              value={form.requirements}
              onChange={(e) => setField("requirements", e.target.value)}
            />
          </Field>
          <Field label="Tags" hint="comma separated" className="md:col-span-2">
            <TextInput
              placeholder="Fully Funded, Leadership, Government..."
              value={form.tags}
              onChange={(e) => setField("tags", e.target.value)}
            />
          </Field>
          <Field label="How To Apply" className="md:col-span-2">
            <TextArea
              rows={3}
              placeholder="Describe the application process..."
              value={form.howToApply}
              onChange={(e) => setField("howToApply", e.target.value)}
            />
          </Field>
          <Field label="Official Link" className="md:col-span-2">
            <TextInput
              placeholder="https://www.chevening.org"
              value={form.officialLink}
              onChange={(e) => setField("officialLink", e.target.value)}
            />
          </Field>
        </FieldGrid>
      ),
    },
  ];

  return (
    <StepperForm
      title={isEditing ? "Edit Scholarship" : "Create Scholarship"}
      steps={steps}
      submitLabel={isEditing ? "Update Scholarship" : "Add Scholarship"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default ScholarshipForm;
