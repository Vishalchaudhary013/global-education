import React from "react";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { updateCounsellingRequestStatus } from "@/features/counselling/services/counsellingService";

const STATUSES = ["pending", "contacted", "resolved"];

/** Incoming counselling requests. Read-only apart from the status dropdown. */
const CounsellingRequestsTab = ({ requests, onRefresh, onError, onSuccess }) => {
  const changeStatus = async (requestId, status) => {
    onError("");
    try {
      await updateCounsellingRequestStatus(requestId, status);
      onSuccess("Request status updated");
      await onRefresh();
    } catch (statusError) {
      onError(getApiErrorMessage(statusError));
    }
  };

  return (
    <section className="overflow-auto border border-gray-200 rounded-xl">
      <table className="w-full text-sm">
        <thead className="bg-white">
          <tr className="text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Destination</th>
            <th className="p-3">Course Level</th>
            <th className="p-3">Message</th>
            <th className="p-3">Submitted</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="border-t border-gray-200">
              <td className="p-3">{request.name}</td>
              <td className="p-3">{request.email}</td>
              <td className="p-3">{request.phone || "N/A"}</td>
              <td className="p-3">{request.destination || "N/A"}</td>
              <td className="p-3">{request.courseLevel || "N/A"}</td>
              <td
                className="p-3 max-w-xs truncate"
                title={request.message || "N/A"}
              >
                {request.message || "N/A"}
              </td>
              <td className="p-3">
                {request.createdAt
                  ? new Date(request.createdAt).toLocaleString()
                  : "N/A"}
              </td>
              <td className="p-3 capitalize">{request.status}</td>
              <td className="p-3">
                <select
                  value={request.status}
                  onChange={(event) =>
                    changeStatus(request._id, event.target.value)
                  }
                  aria-label={`Status for ${request.name}`}
                  className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}

          {requests.length === 0 && (
            <tr className="border-t border-gray-200">
              <td className="p-3 text-gray-500" colSpan={9}>
                No counselling requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default CounsellingRequestsTab;
