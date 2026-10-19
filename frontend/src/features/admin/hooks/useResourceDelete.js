import { getApiErrorMessage, isUnauthorized } from "@/shared/utils/apiError";

/**
 * One delete flow for every admin table.
 *
 * `removeResource` is the feature's own service call for the row being deleted,
 * so no caller needs to know an endpoint. A 401 here means the session itself is
 * gone, so the page signs the admin out instead of showing a row-level error.
 */
export function useResourceDelete({
  onError,
  onSuccess,
  onRefresh,
  onUnauthorized,
}) {
  return async (removeResource, id, label) => {
    onError("");
    try {
      await removeResource(id);
      onSuccess(`${label} deleted`);
      await onRefresh();
    } catch (deleteError) {
      if (isUnauthorized(deleteError)) {
        onUnauthorized();
        return;
      }
      onError(getApiErrorMessage(deleteError));
    }
  };
}
