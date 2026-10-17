import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowTopRightOnSquare,
  HiEye,
  HiEyeSlash,
  HiKey,
  HiTrash,
} from "react-icons/hi2";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { useAuth } from "@/features/auth";
import {
  deleteUser,
  impersonateUser,
  setUserPassword,
} from "@/features/users/services/userService";

/**
 * Letters + digits + one special character, 8 or more. Mirrors the server rule
 * in `userController.setUserPassword` so the hint and the API agree.
 */
const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const PASSWORD_HINT =
  "Password must be at least 8 characters and include letters, numbers, and special characters.";

const statusStyles = {
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

const IconButton = ({ label, onClick, disabled, active, tone = "slate", children }) => {
  const tones = {
    slate: "text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700",
    rose: "text-rose-500 border-rose-200 bg-rose-50 hover:bg-rose-100",
    red: "text-red-500 border-red-200 bg-red-50 hover:bg-red-100",
  };
  return (
    <div className="relative group">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={`p-2 rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
          active ? "border-slate-900 text-slate-900 bg-white" : tones[tone]
        }`}
      >
        {children}
      </button>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        {label}
      </span>
    </div>
  );
};

/** A masked password cell. Reveal only works for a value set in this session. */
const PasswordCell = ({ revealed, value }) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="flex items-center gap-2">
      {shown && revealed ? (
        <span className="font-mono text-slate-700">{value}</span>
      ) : (
        <span className="tracking-[0.2em] text-slate-400 select-none">••••••••</span>
      )}
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-label={shown ? "Hide password" : "Show password"}
        className="text-slate-400 hover:text-slate-600 transition-colors"
      >
        {shown ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
      </button>
      {shown && !revealed && (
        <span className="text-[11px] text-slate-400">Stored hashed</span>
      )}
    </div>
  );
};

const PasswordField = ({ placeholder, value, onChange }) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="relative">
      <input
        type={shown ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="new-password"
        className="w-full bg-white border border-slate-200 focus:border-slate-900 rounded-lg pl-3 pr-9 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors"
      />
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-label={shown ? `Hide ${placeholder}` : `Show ${placeholder}`}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        {shown ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
      </button>
    </div>
  );
};

const emptyPasswordForm = { password: "", confirm: "", notify: false };

/**
 * Superadmin view of every admin account: open their dashboard, reset their
 * password, or remove them.
 */
const AdminsPanel = ({ admins, currentUserEmail, onRefresh, onError, onSuccess }) => {
  const navigate = useNavigate();
  const { startImpersonation } = useAuth();

  const [openRowId, setOpenRowId] = useState(null);
  const [form, setForm] = useState(emptyPasswordForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [busyRowId, setBusyRowId] = useState(null);
  /** Passwords this superadmin set just now, so the eye toggle has something to show. */
  const [revealable, setRevealable] = useState({});

  const closeForm = () => {
    setOpenRowId(null);
    setForm(emptyPasswordForm);
    setFormError("");
  };

  const togglePasswordForm = (adminId) => {
    if (openRowId === adminId) {
      closeForm();
      return;
    }
    setOpenRowId(adminId);
    setForm(emptyPasswordForm);
    setFormError("");
  };

  const openDashboard = async (admin) => {
    onError("");
    setBusyRowId(admin._id);
    try {
      const { token, user } = await impersonateUser(admin._id);
      startImpersonation(token, user);
      navigate("/admin");
    } catch (error) {
      onError(getApiErrorMessage(error));
    } finally {
      setBusyRowId(null);
    }
  };

  const savePassword = async (admin) => {
    setFormError("");

    if (!PASSWORD_RULE.test(form.password)) {
      setFormError(PASSWORD_HINT);
      return;
    }
    if (form.password !== form.confirm) {
      setFormError("Passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const result = await setUserPassword(admin._id, form.password, form.notify);
      setRevealable((prev) => ({ ...prev, [admin._id]: form.password }));
      onSuccess(
        form.notify && !result?.emailSent
          ? "Password updated, but the notification email could not be sent."
          : `Password updated for ${admin.name}`,
      );
      closeForm();
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const removeAdmin = async (admin) => {
    onError("");
    setBusyRowId(admin._id);
    try {
      await deleteUser(admin._id);
      onSuccess(`${admin.name} removed`);
      if (openRowId === admin._id) closeForm();
      await onRefresh();
    } catch (error) {
      onError(getApiErrorMessage(error));
    } finally {
      setBusyRowId(null);
    }
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#1F2853]">Admins</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {admins.length} admin {admins.length === 1 ? "account" : "accounts"}
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="self-start sm:self-auto px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-slate-200">
            <tr className="text-slate-600">
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Phone</th>
              <th className="px-5 py-3 font-semibold">Organization</th>
              <th className="px-5 py-3 font-semibold">Password</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => {
              const isSelf = admin.email === currentUserEmail;
              const isOpen = openRowId === admin._id;
              return (
                <tr key={admin._id} className="border-t border-slate-100 align-top">
                  <td className="px-5 py-4 font-bold text-[#1F2853]">{admin.name}</td>
                  <td className="px-5 py-4 text-blue-600 break-all">{admin.email}</td>
                  <td className="px-5 py-4 text-slate-600">{admin.phone || "—"}</td>
                  <td className="px-5 py-4 text-slate-600">{admin.organization || "—"}</td>
                  <td className="px-5 py-4">
                    <PasswordCell
                      revealed={!!revealable[admin._id]}
                      value={revealable[admin._id]}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                        statusStyles[admin.status] || statusStyles.Approved
                      }`}
                    >
                      {admin.status || "Approved"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex gap-2">
                        <IconButton
                          label="Open dashboard"
                          onClick={() => openDashboard(admin)}
                          disabled={busyRowId === admin._id || isSelf}
                        >
                          <HiArrowTopRightOnSquare className="w-4 h-4" />
                        </IconButton>
                        <IconButton
                          label="Change password"
                          tone="rose"
                          active={isOpen}
                          onClick={() => togglePasswordForm(admin._id)}
                        >
                          <HiKey className="w-4 h-4" />
                        </IconButton>
                        <IconButton
                          label="Delete admin"
                          tone="red"
                          onClick={() => removeAdmin(admin)}
                          disabled={busyRowId === admin._id || isSelf}
                        >
                          <HiTrash className="w-4 h-4" />
                        </IconButton>
                      </div>

                      {isOpen && (
                        <div className="w-full max-w-md border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <PasswordField
                              placeholder="New password"
                              value={form.password}
                              onChange={(value) => setForm({ ...form, password: value })}
                            />
                            <PasswordField
                              placeholder="Confirm password"
                              value={form.confirm}
                              onChange={(value) => setForm({ ...form, confirm: value })}
                            />
                          </div>

                          <p
                            className={`text-xs ${
                              formError ? "text-red-600 font-semibold" : "text-slate-500"
                            }`}
                          >
                            {formError || PASSWORD_HINT}
                          </p>

                          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={form.notify}
                              onChange={(event) =>
                                setForm({ ...form, notify: event.target.checked })
                              }
                              className="w-4 h-4 rounded border-slate-300 accent-slate-900"
                            />
                            Notify admin by email about password change
                          </label>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => savePassword(admin)}
                              disabled={saving}
                              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors"
                            >
                              {saving ? "Saving..." : "Save Password"}
                            </button>
                            <button
                              type="button"
                              onClick={closeForm}
                              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {admins.length === 0 && (
              <tr className="border-t border-slate-100">
                <td className="px-5 py-8 text-center text-slate-500" colSpan={7}>
                  No admin accounts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminsPanel;
