import React from "react";
import StepperForm from "./StepperForm";
import {
  Field,
  FieldGrid,
  Select,
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
