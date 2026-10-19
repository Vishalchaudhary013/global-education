import React from "react";
import StepperForm from "./StepperForm";
import ImageField from "./ImageField";
import { Field, FieldGrid, Select, TextArea, TextInput } from "./formFields";

const EventForm = ({ form, setForm, universities, isEditing, onSubmit, onCancel }) => {
  const setField = (key, value) => setForm({ ...form, [key]: value });

  const steps = [
    {
      id: "details",
      label: "Event Details",
      render: () => (
        <FieldGrid>
          <Field label="Event Name" required className="md:col-span-2">
            <TextInput
              required
              placeholder="e.g. Global University Fair 2026"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Field>
          <Field label="Event Mode">
            <Select value={form.mode} onChange={(e) => setField("mode", e.target.value)}>
              <option value="online">Online</option>
              <option value="offline">Offline (In-Person)</option>
              <option value="hybrid">Hybrid</option>
            </Select>
          </Field>
          <Field label="Event Type">
            <TextInput
              placeholder="e.g. webinar, education_fair, assessment"
              value={form.type}
              onChange={(e) => setField("type", e.target.value)}
            />
          </Field>
          <Field label="Date & Time" required>
            <TextInput
              type="datetime-local"
              required
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
            />
          </Field>
          <Field label="Display Time">
            <TextInput
              placeholder="e.g. 10:00 AM - 5:00 PM (IST)"
              value={form.time}
              onChange={(e) => setField("time", e.target.value)}
            />
          </Field>
          <Field label="City / Location">
            <TextInput
              placeholder="e.g. New Delhi, India"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </Field>
          <Field label="Venue Name">
            <TextInput
              placeholder="e.g. Taj Palace Hotel"
              value={form.venue}
              onChange={(e) => setField("venue", e.target.value)}
            />
          </Field>
          <Field label="Host University">
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
      id: "content",
      label: "Content & Details",
      render: () => (
        <FieldGrid>
          <Field label="Description" className="md:col-span-2">
            <TextArea
              rows={3}
              placeholder="Detailed description of the event..."
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </Field>
          <Field label="Countries" hint="comma separated">
            <TextArea
              rows={2}
              placeholder="United Kingdom, USA, Canada..."
              value={form.countries}
              onChange={(e) => setField("countries", e.target.value)}
            />
          </Field>
          <Field label="Highlights" hint="comma separated">
            <TextArea
              rows={2}
              placeholder="Meet 50+ universities, Free IELTS counselling..."
              value={form.highlights}
              onChange={(e) => setField("highlights", e.target.value)}
            />
          </Field>
          <Field
            label="Participating Universities"
            hint="one per line: Name | Country | Role"
            className="md:col-span-2"
          >
            <TextArea
              rows={5}
              placeholder={"University of Oxford | UK | Participant\nHarvard University | USA | Participant"}
              value={form.universities}
              onChange={(e) => setField("universities", e.target.value)}
              className="font-mono"
            />
          </Field>
        </FieldGrid>
      ),
    },
  ];

  return (
    <StepperForm
      title={isEditing ? "Edit Event" : "Create Event"}
      steps={steps}
      submitLabel={isEditing ? "Update Event" : "Add Event"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default EventForm;
