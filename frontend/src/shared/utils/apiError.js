const DEFAULT_MESSAGE = "Action failed. Please try again.";

/**
 * Turns an Axios/network error into a message safe to show in the UI.
 * Services throw; the hook or component decides how to display the result.
 */
export const getApiErrorMessage = (error, fallback = DEFAULT_MESSAGE) =>
  error?.response?.data?.message || error?.apiMessage || fallback;

export const isUnauthorized = (error) => error?.response?.status === 401;
