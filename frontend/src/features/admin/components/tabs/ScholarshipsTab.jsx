import React from "react";
import {
  createScholarship,
  deleteScholarship,
  updateScholarship,
} from "@/features/scholarships/services/scholarshipService";
import DataTable from "../DataTable";
import Pagination from "../Pagination";
import ResourceHeader from "../ResourceHeader";
import RowActionsCell from "../RowActionsCell";
import ScholarshipForm from "../ScholarshipForm";
import { useResourceManager } from "../../hooks/useResourceManager";
import { emptyScholarship } from "../../utils/emptyForms";
import { arrayToCsv, csvToArray } from "../../utils/formTransforms";
import { paginate } from "../../utils/pagination";

const columns = [
  "Name",
  "Destination",
  "University",
  "Amount",
  "Level",
  "Provider",
  "Eligibility",
  "Deadline",
  "Actions",
];

const scholarshipService = {
  create: createScholarship,
  update: updateScholarship,
  remove: deleteScholarship,
};

/** The list fields are typed as comma separated text, so both ways convert. */
const toFormValues = (scholarship) => ({
  ...emptyScholarship,
  ...scholarship,
  university: scholarship.university?._id || "",
  fields: arrayToCsv(scholarship.fields),
  benefits: arrayToCsv(scholarship.benefits),
  requirements: arrayToCsv(scholarship.requirements),
  tags: arrayToCsv(scholarship.tags),
});

const toPayload = (form) => {
  const payload = {
    ...form,
    deadline: form.deadline || null,
    fields: csvToArray(form.fields),
    benefits: csvToArray(form.benefits),
    requirements: csvToArray(form.requirements),
    tags: csvToArray(form.tags),
  };
  /** A scholarship open to several universities has none set. */
  if (!payload.university) delete payload.university;
  return payload;
};

const ScholarshipsTab = ({
  scholarships,
  universities,
  onRefresh,
  onError,
  onSuccess,
  onUnauthorized,
}) => {
  const {
    form,
    setForm,
    isEditing,
    isFormOpen,
    page,
    setPage,
    openCreateForm,
    closeForm,
    startEdit,
    save,
    remove,
  } = useResourceManager({
    label: "Scholarship",
    emptyForm: emptyScholarship,
    service: scholarshipService,
    onError,
    onSuccess,
    onRefresh,
    onUnauthorized,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await save(toPayload(form));
  };

  if (isFormOpen) {
    return (
      <ScholarshipForm
        form={form}
        setForm={setForm}
        universities={universities}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={closeForm}
      />
    );
  }

  return (
    <section className="space-y-6">
      <ResourceHeader
        title="Scholarships"
        subtitle={`${scholarships.length} scholarships listed`}
        createLabel="Create Scholarship"
        onCreate={openCreateForm}
      />

      <DataTable
        columns={columns}
        isEmpty={scholarships.length === 0}
        emptyMessage="No scholarships found."
      >
        {paginate(scholarships, page).map((scholarship) => (
          <tr key={scholarship._id} className="border-t border-gray-200">
            <td className="p-3">{scholarship.name}</td>
            <td className="p-3">{scholarship.destination}</td>
            <td className="p-3">
              {scholarship.university?.name || "Multiple / N/A"}
            </td>
            <td className="p-3">{scholarship.amount}</td>
            <td className="p-3">{scholarship.level || "N/A"}</td>
            <td className="p-3">{scholarship.provider || "N/A"}</td>
            <td
              className="p-3 max-w-xs truncate"
              title={scholarship.eligibility || "N/A"}
            >
              {scholarship.eligibility || "N/A"}
            </td>
            <td className="p-3">
              {scholarship.deadline
                ? new Date(scholarship.deadline).toLocaleDateString()
                : "N/A"}
            </td>
            <RowActionsCell
              onEdit={() => startEdit(scholarship._id, toFormValues(scholarship))}
              onDelete={() => remove(scholarship._id)}
            />
          </tr>
        ))}
      </DataTable>

      <Pagination total={scholarships.length} page={page} setPage={setPage} />
    </section>
  );
};

export default ScholarshipsTab;
