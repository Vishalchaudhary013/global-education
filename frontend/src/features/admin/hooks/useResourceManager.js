import { useState } from "react";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { useResourceDelete } from "./useResourceDelete";

/**
 * The state and API plumbing every catalogue tab repeats: the create/edit form,
 * the list pagination, and the create/update/delete calls.
 *
 * `service` carries the feature's own `{ create, update, remove }` functions, so
 * this hook never needs to know an endpoint. A tab keeps whatever is specific to
 * it — the table columns, and the payload it hands to `save`.
 *
 * `closeOnSave` returns to the list after a successful save; the default leaves
 * a blank form open, ready for the next entry.
 */
export function useResourceManager({
  label,
  emptyForm,
  service,
  closeOnSave = false,
  onError,
  onSuccess,
  onRefresh,
  onUnauthorized,
}) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [page, setPage] = useState(1);

  const deleteResource = useResourceDelete({
    onError,
    onSuccess,
    onRefresh,
    onUnauthorized,
  });

  /** The form replaces the list, so both are driven off this one flag. */
  const isFormOpen = isCreateOpen || !!editingId;

  const openCreateForm = () => {
    setIsCreateOpen(true);
    setEditingId(null);
    setForm(emptyForm);
  };

  const closeForm = () => {
    setIsCreateOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  /** `values` is the record mapped into form shape by the calling tab. */
  const startEdit = (id, values) => {
    setEditingId(id);
    setForm(values);
    setIsCreateOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (payload) => {
    onError("");
    try {
      if (editingId) {
        await service.update(editingId, payload);
        onSuccess(`${label} updated`);
      } else {
        await service.create(payload);
        onSuccess(`${label} created`);
      }

      if (closeOnSave) {
        closeForm();
      } else {
        setForm(emptyForm);
        setEditingId(null);
      }

      await onRefresh();
    } catch (saveError) {
      onError(getApiErrorMessage(saveError));
    }
  };

  const remove = (id) => deleteResource(service.remove, id, label);

  return {
    form,
    setForm,
    isEditing: !!editingId,
    isFormOpen,
    page,
    setPage,
    openCreateForm,
    closeForm,
    startEdit,
    save,
    remove,
  };
}
