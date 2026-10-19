import React from "react";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/features/events/services/eventService";
import DataTable from "../DataTable";
import EventForm from "../EventForm";
import Pagination from "../Pagination";
import ResourceHeader from "../ResourceHeader";
import RowActionsCell from "../RowActionsCell";
import { useResourceManager } from "../../hooks/useResourceManager";
import { emptyEvent } from "../../utils/emptyForms";
import {
  arrayToCsv,
  csvToArray,
  toDateTimeLocalValue,
  universitiesArrayToText,
  universitiesTextToArray,
} from "../../utils/formTransforms";
import { paginate } from "../../utils/pagination";

const columns = [
  "Name",
  "Date",
  "Mode",
  "Type",
  "Time",
  "Location",
  "Venue",
  "University",
  "Description",
  "Actions",
];

const eventService = {
  create: createEvent,
  update: updateEvent,
  remove: deleteEvent,
};

const toFormValues = (event) => ({
  ...emptyEvent,
  ...event,
  university: event.university?._id || "",
  countries: arrayToCsv(event.countries),
  highlights: arrayToCsv(event.highlights),
  universities: universitiesArrayToText(event.universities),
  date: toDateTimeLocalValue(event.date),
});

const toPayload = (form) => {
  const payload = {
    ...form,
    countries: csvToArray(form.countries),
    highlights: csvToArray(form.highlights),
    universities: universitiesTextToArray(form.universities),
  };
  /** An event not tied to one university has none set. */
  if (!payload.university) delete payload.university;
  return payload;
};

const EventsTab = ({
  events,
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
    label: "Event",
    emptyForm: emptyEvent,
    service: eventService,
    onError,
    onSuccess,
    onRefresh,
    onUnauthorized,
  });

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    await save(toPayload(form));
  };

  if (isFormOpen) {
    return (
      <EventForm
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
        title="Events"
        subtitle={`${events.length} events listed`}
        createLabel="Create Event"
        onCreate={openCreateForm}
      />

      <DataTable
        columns={columns}
        isEmpty={events.length === 0}
        emptyMessage="No events found."
      >
        {paginate(events, page).map((item) => (
          <tr key={item._id} className="border-t border-gray-200">
            <td className="p-3">{item.name}</td>
            <td className="p-3">{new Date(item.date).toLocaleString()}</td>
            <td className="p-3 capitalize">{item.mode}</td>
            <td className="p-3">{item.type || "N/A"}</td>
            <td className="p-3">{item.time || "N/A"}</td>
            <td className="p-3">{item.location || "N/A"}</td>
            <td className="p-3">{item.venue || "N/A"}</td>
            <td className="p-3">{item.university?.name || "N/A"}</td>
            <td
              className="p-3 max-w-xs truncate"
              title={item.description || "N/A"}
            >
              {item.description || "N/A"}
            </td>
            <RowActionsCell
              onEdit={() => startEdit(item._id, toFormValues(item))}
              onDelete={() => remove(item._id)}
            />
          </tr>
        ))}
      </DataTable>

      <Pagination total={events.length} page={page} setPage={setPage} />
    </section>
  );
};

export default EventsTab;
