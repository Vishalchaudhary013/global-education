import React from "react";
import StepperForm from "./StepperForm";
import ImageField from "./ImageField";
import {
  Field,
  FieldGrid,
  RowList,
  TextArea,
  TextInput,
} from "./formFields";
import { STAT_ICONS } from "../utils/options";

const DestinationForm = ({ form, setForm, isEditing, onSubmit, onCancel }) => {
  const setField = (key, value) => setForm({ ...form, [key]: value });

  const setGroup = (group, key, value) =>
    setForm({ ...form, [group]: { ...form[group], [key]: value } });

  const setGuide = (key, value) =>
    setForm({ ...form, guide: { ...form.guide, [key]: value } });

  const setGuideGroup = (group, key, value) =>
    setForm({
      ...form,
      guide: { ...form.guide, [group]: { ...form.guide[group], [key]: value } },
    });

  const setStudentLife = (key, value) =>
    setGuideGroup("studentLife", key, value);

  const { guide } = form;

  const steps = [
    {
      id: "basics",
      label: "Basic Details",
      render: () => (
        <FieldGrid>
          <Field label="Destination Name" required>
            <TextInput
              required
              placeholder="e.g. United Kingdom"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Field>
          <Field label="Flag Code" hint="ISO alpha-2, e.g. gb">
            <TextInput
              placeholder="e.g. gb"
              value={guide.flagCode}
              onChange={(e) => setGuide("flagCode", e.target.value)}
            />
          </Field>
          <Field label="Tagline">
            <TextInput
              placeholder="e.g. Study in the United Kingdom"
              value={guide.tagline}
              onChange={(e) => setGuide("tagline", e.target.value)}
            />
          </Field>
          <ImageField
            label="Hero Image"
            className="md:col-span-2"
            value={form.heroImage}
            onChange={(url) => setField("heroImage", url)}
          />
          <Field label="Short Description" className="md:col-span-2">
            <TextArea
              placeholder="Brief summary shown under the hero and as the Why study fallback..."
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </Field>
        </FieldGrid>
      ),
    },
    {
      id: "overview",
      label: "Overview & Stats",
      render: () => (
        <FieldGrid>
          <Field label="Universities Count">
            <TextInput
              type="number"
              min="0"
              placeholder="e.g. 160"
              value={guide.universitiesCount}
              onChange={(e) => setGuide("universitiesCount", e.target.value)}
            />
          </Field>
          <Field label="Why Study Here" className="md:col-span-2">
            <TextArea
              placeholder="What makes this destination worth choosing..."
              value={guide.whyStudy}
              onChange={(e) => setGuide("whyStudy", e.target.value)}
            />
          </Field>
          <Field label="What Sets It Apart" className="md:col-span-2">
            <TextArea
              placeholder="The distinctive things about studying here..."
              value={guide.setsApart}
              onChange={(e) => setGuide("setsApart", e.target.value)}
            />
          </Field>
          <RowList
            label="Headline Stats"
            hint="shown in the three-up strip"
            rows={guide.stats}
            onChange={(rows) => setGuide("stats", rows)}
            addLabel="Add stat"
            columns={[
              { key: "label", placeholder: "Label, e.g. Intl. students", width: "sm:col-span-5" },
              { key: "value", placeholder: "Value, e.g. 600,000+", width: "sm:col-span-4" },
              {
                key: "icon",
                type: "select",
                placeholder: "Icon...",
                options: STAT_ICONS,
                width: "sm:col-span-3",
              },
            ]}
          />
        </FieldGrid>
      ),
    },
    {
      id: "costs",
      label: "Costs & Programs",
      render: () => (
        <FieldGrid>
          <Field label="UG Tuition">
            <TextInput
              placeholder="e.g. £12,000 - £25,000/yr"
              value={form.costs.ug}
              onChange={(e) => setGroup("costs", "ug", e.target.value)}
            />
          </Field>
          <Field label="PG Tuition">
            <TextInput
              placeholder="e.g. £15,000 - £35,000/yr"
              value={form.costs.pg}
              onChange={(e) => setGroup("costs", "pg", e.target.value)}
            />
          </Field>
          <Field label="Living Cost">
            <TextInput
              placeholder="e.g. £9,500/yr"
              value={form.costs.living}
              onChange={(e) => setGroup("costs", "living", e.target.value)}
            />
          </Field>
          <Field label="Start Dates" hint="comma separated">
            <TextInput
              placeholder="September, January"
              value={guide.startDates}
              onChange={(e) => setGuide("startDates", e.target.value)}
            />
          </Field>
          <Field label="Programs Intro" className="md:col-span-2">
            <TextArea
              rows={3}
              placeholder="Short lead-in above the popular programs list..."
              value={guide.programsIntro}
              onChange={(e) => setGuide("programsIntro", e.target.value)}
            />
          </Field>
          <Field label="Popular Programs" hint="comma separated" className="md:col-span-2">
            <TextInput
              placeholder="Business, Computer Science, Engineering..."
              value={guide.popularPrograms}
              onChange={(e) => setGuide("popularPrograms", e.target.value)}
            />
          </Field>
        </FieldGrid>
      ),
    },
    {
      id: "requirements",
      label: "Requirements",
      render: () => (
        <FieldGrid>
          <Field label="University Requirements" hint="one per line" className="md:col-span-2">
            <TextArea
              rows={5}
              placeholder={"Academic transcripts\nStatement of purpose\nLetters of recommendation"}
              value={guide.requirements.university}
              onChange={(e) => setGuideGroup("requirements", "university", e.target.value)}
            />
          </Field>
          <Field label="Test Requirements" hint="one per line" className="md:col-span-2">
            <TextArea
              rows={5}
              placeholder={"IELTS 6.5 overall\nGRE for selected programs"}
              value={guide.requirements.tests}
              onChange={(e) => setGuideGroup("requirements", "tests", e.target.value)}
            />
          </Field>
          <Field label="Visa Requirements" hint="one per line" className="md:col-span-2">
            <TextArea
              rows={5}
              placeholder={"Valid passport\nProof of funds\nCAS letter"}
              value={guide.requirements.visa}
              onChange={(e) => setGuideGroup("requirements", "visa", e.target.value)}
            />
          </Field>
        </FieldGrid>
      ),
    },
    {
      id: "student-life",
      label: "Student Life",
      render: () => (
        <FieldGrid>
          <Field label="Student Life Intro" className="md:col-span-2">
            <TextArea
              rows={3}
              placeholder="Lead-in paragraph for the student life section..."
              value={guide.studentLifeIntro}
              onChange={(e) => setGuide("studentLifeIntro", e.target.value)}
            />
          </Field>
          <Field label="Min. Wage (part-time)">
            <TextInput
              placeholder="e.g. £11.44/hour"
              value={guide.studentLife.minWage}
              onChange={(e) => setStudentLife("minWage", e.target.value)}
            />
          </Field>
          <Field label="Max. Work Hours">
            <TextInput
              placeholder="e.g. 20 hours/week in term time"
              value={guide.studentLife.maxWorkHours}
              onChange={(e) => setStudentLife("maxWorkHours", e.target.value)}
            />
          </Field>
          <RowList
            label="Cost of Living"
            rows={guide.studentLife.costOfLiving}
            onChange={(rows) => setStudentLife("costOfLiving", rows)}
            addLabel="Add cost"
            columns={[
              { key: "label", placeholder: "Label, e.g. Accommodation" },
              { key: "value", placeholder: "Value, e.g. £600/month" },
            ]}
          />
          <Field label="Cost Source URL" className="md:col-span-2">
            <TextInput
              placeholder="https://..."
              value={guide.studentLife.costSource}
              onChange={(e) => setStudentLife("costSource", e.target.value)}
            />
          </Field>
          <RowList
            label="Student Visa Details"
            rows={guide.studentLife.studentVisa}
            onChange={(rows) => setStudentLife("studentVisa", rows)}
            addLabel="Add detail"
            columns={[
              { key: "label", placeholder: "Label, e.g. Visa fee" },
              { key: "value", placeholder: "Value, e.g. £490" },
            ]}
          />
          <RowList
            label="Post-study Work Visa Details"
            rows={guide.studentLife.postStudyVisa}
            onChange={(rows) => setStudentLife("postStudyVisa", rows)}
            addLabel="Add detail"
            columns={[
              { key: "label", placeholder: "Label, e.g. Duration" },
              { key: "value", placeholder: "Value, e.g. 2 years" },
            ]}
          />
          <Field label="Visa Source URL" className="md:col-span-2">
            <TextInput
              placeholder="https://..."
              value={guide.studentLife.visaSource}
              onChange={(e) => setStudentLife("visaSource", e.target.value)}
            />
          </Field>
          <RowList
            label="Employment Opportunities"
            rows={guide.studentLife.employment}
            onChange={(rows) => setStudentLife("employment", rows)}
            addLabel="Add sector"
            columns={[
              { key: "sector", placeholder: "Sector, e.g. Healthcare" },
              { key: "demand", placeholder: "Demand, e.g. Very high" },
            ]}
          />
        </FieldGrid>
      ),
    },
    {
      id: "visa-jobs",
      label: "Visa & Jobs",
      render: () => (
        <FieldGrid>
          <Field label="Visa Process Summary" className="md:col-span-2">
            <TextArea
              rows={3}
              placeholder="How the student visa process works..."
              value={form.visa.processSummary}
              onChange={(e) => setGroup("visa", "processSummary", e.target.value)}
            />
          </Field>
          <Field label="What You'll Need" hint="one per line" className="md:col-span-2">
            <TextArea
              rows={5}
              placeholder={"Valid passport\nProof of funds\nTuberculosis test certificate"}
              value={form.visa.points}
              onChange={(e) => setGroup("visa", "points", e.target.value)}
            />
          </Field>
          <RowList
            label="Popular Roles & Salaries"
            rows={form.jobs}
            onChange={(rows) => setField("jobs", rows)}
            addLabel="Add role"
            columns={[
              { key: "title", placeholder: "Role, e.g. Data Analyst" },
              { key: "salary", placeholder: "Salary, e.g. £38,000/yr" },
            ]}
          />
        </FieldGrid>
      ),
    },
    {
      id: "scholarships",
      label: "Scholarships",
      render: () => (
        <FieldGrid>
          <RowList
            label="Scholarships & Grants"
            rows={form.scholarships}
            onChange={(rows) => setField("scholarships", rows)}
            addLabel="Add scholarship"
            columns={[
              { key: "name", placeholder: "Name, e.g. Chevening", width: "sm:col-span-4" },
              { key: "amount", placeholder: "Amount, e.g. Fully funded", width: "sm:col-span-3" },
              { key: "criteria", placeholder: "Criteria", width: "sm:col-span-5" },
            ]}
          />
        </FieldGrid>
      ),
    },
    {
      id: "universities",
      label: "Universities",
      render: () => (
        <FieldGrid>
          <p className="md:col-span-2 text-sm text-slate-500 -mt-1">
            Optional highlights stored on the destination itself. The live list on the
            public page comes from the Universities section.
          </p>
          <RowList
            label="Featured Universities"
            rows={form.universities}
            onChange={(rows) => setField("universities", rows)}
            addLabel="Add university"
            columns={[
              { key: "name", placeholder: "Name", width: "sm:col-span-4" },
              { key: "location", placeholder: "Location", width: "sm:col-span-4" },
              { key: "ranking", placeholder: "Ranking", width: "sm:col-span-4" },
              { key: "ieltsRequirement", placeholder: "IELTS", width: "sm:col-span-4" },
              { key: "studyCost", placeholder: "Study cost", width: "sm:col-span-4" },
              { key: "logo", placeholder: "Logo URL", width: "sm:col-span-4" },
            ]}
          />
        </FieldGrid>
      ),
    },
    {
      id: "cities-faqs",
      label: "Cities, Facts & FAQs",
      render: () => (
        <FieldGrid>
          <div className="md:col-span-2 flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-700">Cities to Study</p>
            {guide.cities.map((city, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-sm p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Field label={`City ${index + 1}`}>
                  <TextInput
                    placeholder="e.g. London"
                    value={city.name || ""}
                    onChange={(e) =>
                      setGuide(
                        "cities",
                        guide.cities.map((item, i) =>
                          i === index ? { ...item, name: e.target.value } : item,
                        ),
                      )
                    }
                  />
                </Field>
                <ImageField
                  label="City Image"
                  value={city.image || ""}
                  onChange={(url) =>
                    setGuide(
                      "cities",
                      guide.cities.map((item, i) =>
                        i === index ? { ...item, image: url } : item,
                      ),
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setGuide(
                      "cities",
                      guide.cities.filter((_, i) => i !== index),
                    )
                  }
                  className="md:col-span-2 self-start px-3 py-1.5 rounded-sm border border-gray-200 text-xs font-semibold text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors"
                >
                  Remove city
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setGuide("cities", [...guide.cities, { name: "", image: "" }])}
              className="self-start px-3 py-2 rounded-sm border border-dashed border-gray-300 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              + Add city
            </button>
          </div>

          <Field label="Fun Facts" hint="one per line" className="md:col-span-2">
            <TextArea
              rows={5}
              placeholder={"The UK has over 130 universities\nTea is a national institution"}
              value={guide.funFacts}
              onChange={(e) => setGuide("funFacts", e.target.value)}
            />
          </Field>

          <RowList
            label="FAQs"
            rows={guide.faqs}
            onChange={(rows) => setGuide("faqs", rows)}
            addLabel="Add FAQ"
            columns={[
              { key: "question", placeholder: "Question", width: "sm:col-span-5" },
              {
                key: "answer",
                type: "textarea",
                placeholder: "Answer",
                width: "sm:col-span-7",
              },
            ]}
          />
        </FieldGrid>
      ),
    },
    {
      id: "quick-facts",
      label: "Quick Facts & Weather",
      render: () => (
        <FieldGrid>
          <Field label="Capital">
            <TextInput
              placeholder="e.g. London"
              value={guide.quickFacts.capital}
              onChange={(e) => setGuideGroup("quickFacts", "capital", e.target.value)}
            />
          </Field>
          <Field label="Language">
            <TextInput
              placeholder="e.g. English"
              value={guide.quickFacts.language}
              onChange={(e) => setGuideGroup("quickFacts", "language", e.target.value)}
            />
          </Field>
          <Field label="Time Zone">
            <TextInput
              placeholder="e.g. GMT (UTC+0)"
              value={guide.quickFacts.time}
              onChange={(e) => setGuideGroup("quickFacts", "time", e.target.value)}
            />
          </Field>
          <Field label="Currency">
            <TextInput
              placeholder="e.g. Pound sterling (£)"
              value={guide.quickFacts.currency}
              onChange={(e) => setGuideGroup("quickFacts", "currency", e.target.value)}
            />
          </Field>
          <Field label="Population">
            <TextInput
              placeholder="e.g. 67 million"
              value={guide.quickFacts.population}
              onChange={(e) => setGuideGroup("quickFacts", "population", e.target.value)}
            />
          </Field>
          <Field label="Immigrants">
            <TextInput
              placeholder="e.g. 9.6 million"
              value={guide.quickFacts.immigrants}
              onChange={(e) => setGuideGroup("quickFacts", "immigrants", e.target.value)}
            />
          </Field>

          <Field label="Temperature Summary" className="md:col-span-2">
            <TextArea
              rows={3}
              placeholder="How the weather behaves across the year..."
              value={guide.temperature.summary}
              onChange={(e) => setGuideGroup("temperature", "summary", e.target.value)}
            />
          </Field>

          <RowList
            label="City Temperatures"
            rows={guide.temperature.cities}
            onChange={(rows) => setGuideGroup("temperature", "cities", rows)}
            addLabel="Add city"
            columns={[
              { key: "city", placeholder: "City, e.g. London" },
              { key: "range", placeholder: "Range, e.g. 4°C - 23°C" },
            ]}
          />

          <RowList
            label="Seasons"
            hint="spring, summer, autumn, winter or monsoon get an icon"
            rows={guide.temperature.seasons}
            onChange={(rows) => setGuideGroup("temperature", "seasons", rows)}
            addLabel="Add season"
            columns={[
              { key: "name", placeholder: "Season, e.g. Summer" },
              { key: "months", placeholder: "Months, e.g. June - August" },
            ]}
          />
        </FieldGrid>
      ),
    },
  ];

  return (
    <StepperForm
      title={isEditing ? "Edit Destination" : "Create Destination"}
      steps={steps}
      submitLabel={isEditing ? "Update Destination" : "Add Destination"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default DestinationForm;
