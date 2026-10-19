import React from "react";
import {
  createDestination,
  deleteDestination,
  updateDestination,
} from "@/features/destinations/services/destinationService";
import DataTable from "../DataTable";
import DestinationForm from "../DestinationForm";
import Pagination from "../Pagination";
import ResourceHeader from "../ResourceHeader";
import RowActionsCell from "../RowActionsCell";
import { useResourceManager } from "../../hooks/useResourceManager";
import {
  destinationToForm,
  emptyDestination,
  formToDestination,
} from "../../utils/destinationFormModel";
import { paginate } from "../../utils/pagination";

const columns = [
  "Name",
  "Slug",
  "Tagline",
  "Universities",
  "UG Cost",
  "PG Cost",
  "Living",
  "Description",
  "Actions",
];

const destinationService = {
  create: createDestination,
  update: updateDestination,
  remove: deleteDestination,
};

const DestinationsTab = ({
  destinations,
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
    label: "Destination",
    emptyForm: emptyDestination,
    service: destinationService,
    closeOnSave: true,
    onError,
    onSuccess,
    onRefresh,
    onUnauthorized,
  });

  /**
   * The form covers every guide field the destination page renders, so the whole
   * document is written in one call. `goToStep` comes from the stepper, which
   * lets a failed check reveal the step holding the offending field.
   */
  const handleSubmit = async (event, goToStep) => {
    event.preventDefault();
    onError("");

    const payload = formToDestination(form);
    if (!payload.name || !payload.id) {
      goToStep?.(0);
      onError("Destination needs a name.");
      return;
    }

    await save(payload);
  };

  if (isFormOpen) {
    return (
      <DestinationForm
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
        title="Destinations"
        subtitle={`${destinations.length} destinations listed`}
        createLabel="Create Destination"
        onCreate={openCreateForm}
        tone="brand"
      />

      <DataTable
        columns={columns}
        isEmpty={destinations.length === 0}
        emptyMessage="No destinations found."
        radiusClass="rounded-sm"
      >
        {paginate(destinations, page).map((destination) => (
          <tr
            key={destination._id || destination.id}
            className="border-t border-gray-200"
          >
            <td className="p-3">{destination.name}</td>
            <td className="p-3">{destination.id}</td>
            <td className="p-3">{destination.guide?.tagline || "N/A"}</td>
            <td className="p-3">
              {destination.guide?.universitiesCount ?? "N/A"}
            </td>
            <td className="p-3">{destination.costs?.ug || "N/A"}</td>
            <td className="p-3">{destination.costs?.pg || "N/A"}</td>
            <td className="p-3">{destination.costs?.living || "N/A"}</td>
            <td
              className="p-3 max-w-xs truncate"
              title={destination.description || "N/A"}
            >
              {destination.description || "N/A"}
            </td>
            {/* The slug is the destination's API key, not `_id`. */}
            <RowActionsCell
              onEdit={() =>
                startEdit(destination.id, destinationToForm(destination))
              }
              onDelete={() => remove(destination.id)}
            />
          </tr>
        ))}
      </DataTable>

      <Pagination total={destinations.length} page={page} setPage={setPage} />
    </section>
  );
};

export default DestinationsTab;
