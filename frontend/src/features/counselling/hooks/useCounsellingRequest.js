import { useState } from "react";
import { submitCounsellingRequest } from "../services/counsellingService";

/**
 * Submission state for the counselling form.
 * status: 'idle' | 'loading' | 'success' | 'error'
 */
export function useCounsellingRequest() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const submit = async (formData) => {
    setStatus("loading");
    setError(null);
    try {
      await submitCounsellingRequest(formData);
      setStatus("success");
      return true;
    } catch (err) {
      console.error("Error submitting request", err);
      setError(err);
      setStatus("error");
      return false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
  };

  return { status, error, submit, reset };
}
