import React, { useMemo } from "react";
import { HiTrash } from "react-icons/hi2";
import { deleteUser } from "@/features/users/services/userService";
import { useResourceDelete } from "../../hooks/useResourceDelete";

/** Accounts without a role are students registered before roles existed. */
const isGeneralUser = (account) => account.role === "student" || !account.role;

/** Superadmin view of the registered students. */
const GeneralUsersTab = ({
  allUsers,
  currentUserEmail,
  onRefresh,
  onError,
  onSuccess,
  onUnauthorized,
}) => {
  const deleteResource = useResourceDelete({
    onError,
    onSuccess,
    onRefresh,
    onUnauthorized,
  });

  const users = useMemo(() => allUsers.filter(isGeneralUser), [allUsers]);

  return (
    <div className="-m-6 md:-m-8 bg-white min-h-[calc(100vh-72px)] flex flex-col">
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-[#1F2853]">General Users</h3>
          <p className="text-sm text-slate-500 mt-1">
            Manage registered students and general users.
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="mt-4 sm:mt-0 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-[#1F2853]">{item.name}</td>
                <td className="p-4 text-slate-500">{item.email}</td>
                <td className="p-4 text-slate-500">
                  {item.phone || "Not Provided"}
                </td>
                <td className="p-4">
                  <div className="relative group inline-block">
                    <button
                      type="button"
                      onClick={() =>
                        deleteResource(deleteUser, item._id, "User")
                      }
                      disabled={item.email === currentUserEmail}
                      aria-label={`Delete ${item.name}`}
                      className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-50 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td className="p-8 text-center text-slate-500" colSpan={4}>
                  No users found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralUsersTab;
