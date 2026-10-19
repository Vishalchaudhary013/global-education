import React from "react";
import { useNavigate } from "react-router-dom";
import { HiShieldExclamation } from "react-icons/hi2";

const ADMIN_ROLES = ["admin", "superadmin"];

/** Stands in for the whole dashboard when the session cannot administer it. */
const AdminAccessDenied = ({ role }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white/90 p-8 text-center">
        <HiShieldExclamation className="w-12 h-12 mx-auto mb-4 text-amber-400" />
        <h1 className="text-2xl font-bold mb-2">Admin Access Only</h1>
        <p className="text-gray-500 mb-2">
          Open this page only with an authenticated admin account.
        </p>
        {role && !ADMIN_ROLES.includes(role) && (
          <p className="text-amber-300 text-sm mb-4">
            Current account role: {role}
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold"
          >
            Go to Admin Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccessDenied;
