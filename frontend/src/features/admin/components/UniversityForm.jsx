import React from "react";
import StepperForm from "./StepperForm";
import ImageField from "./ImageField";
import {
  Field,
  FieldGrid,
  Select,
  TextArea,
  TextInput,
} from "./formFields";
import { DESTINATION_OPTIONS } from "../utils/options";

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
