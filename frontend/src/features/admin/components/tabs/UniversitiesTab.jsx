import React from "react";
import {
  createUniversity,
  deleteUniversity,
  updateUniversity,
} from "@/features/universities/services/universityService";
import DataTable from "../DataTable";
import Pagination from "../Pagination";
import ResourceHeader from "../ResourceHeader";
import RowActionsCell from "../RowActionsCell";
import UniversityForm from "../UniversityForm";
import { useResourceManager } from "../../hooks/useResourceManager";
import { emptyUniversity } from "../../utils/emptyForms";
import { paginate } from "../../utils/pagination";

const columns = [
  "Name",
  "Location",
  "Destination",
  "Ranking",
  "IELTS",
  "Study Cost",
  "Living Cost",
  "Tuition",
  "Intakes",
  "Overview",
  "Actions",
];

const universityService = {
  create: createUniversity,
  update: updateUniversity,
  remove: deleteUniversity,
};

const UniversitiesTab = ({
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
    label: "University",
    emptyForm: emptyUniversity,
    service: universityService,
    onError,
    onSuccess,
    onRefresh,
    onUnauthorized,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await save(form);
  };

  if (isFormOpen) {
    return (
      <UniversityForm
        form={form}
        setForm={setForm}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={closeForm}
      />
    );
  }

  return (
    <section className="space-y-6">
      <ResourceHeader
        title="Universities"
        subtitle={`${universities.length} Universities listed`}
        createLabel="Create University"
        onCreate={openCreateForm}
      />

      <DataTable
        columns={columns}
        isEmpty={universities.length === 0}
        emptyMessage="No universities found."
      >
        {paginate(universities, page).map((university) => (
          <tr key={university._id} className="border-t border-gray-200">
            <td className="p-3">{university.name}</td>
            <td className="p-3">{university.location}</td>
            <td className="p-3">{university.destination}</td>
            <td className="p-3">{university.ranking || "N/A"}</td>
            <td className="p-3">{university.ieltsRequirement || "N/A"}</td>
            <td className="p-3">{university.studyCost || "N/A"}</td>
            <td className="p-3">{university.livingCost || "N/A"}</td>
            <td className="p-3">{university.tuition || "N/A"}</td>
            <td className="p-3">{university.intakes || "N/A"}</td>
            <td
              className="p-3 max-w-xs truncate"
              title={university.overview || "N/A"}
            >
              {university.overview || "N/A"}
            </td>
            <RowActionsCell
              onEdit={() =>
                startEdit(university._id, {
                  ...emptyUniversity,
                  ...university,
                })
              }
              onDelete={() => remove(university._id)}
            />
          </tr>
        ))}
      </DataTable>

      <Pagination total={universities.length} page={page} setPage={setPage} />
    </section>
  );
};

export default UniversitiesTab;
