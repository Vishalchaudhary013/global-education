import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { getCounsellingRequests } from "@/features/counselling/services/counsellingService";
import { getCourses } from "@/features/courses/services/courseService";
import { getEvents } from "@/features/events/services/eventService";
import { getScholarships } from "@/features/scholarships/services/scholarshipService";
import { getUniversities } from "@/features/universities/services/universityService";
import { getUsers } from "@/features/users/services/userService";
import { useAuth } from "@/features/auth";

const ADMIN_ROLES = ["admin", "superadmin"];

/**
 * Loads every dataset the admin dashboard renders.
 *
 * Sections load independently (Promise.allSettled) so one failing endpoint
 * still leaves the rest of the dashboard usable. `error` is shared with the
 * page's mutation handlers, which is why its setter is returned too.
 */
export function useAdminData() {
  const { user, token } = useAuth();

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [events, setEvents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const isSuperadmin = user?.role === "superadmin";

  const refresh = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      const results = await Promise.allSettled([
        getUniversities({ admin: true }),
        getCourses({ admin: true }),
        getScholarships({ admin: true }),
        getEvents({ admin: true }),
        getCounsellingRequests(),
        isSuperadmin ? getUsers() : Promise.resolve([]),
      ]);

      const [uniRes, courseRes, scholarshipRes, eventRes, requestRes, userRes] =
        results;

      const valueOf = (result) =>
        result.status === "fulfilled" ? result.value || [] : [];

      setUniversities(valueOf(uniRes));
      setCourses(valueOf(courseRes));
      setScholarships(valueOf(scholarshipRes));
      setEvents(valueOf(eventRes));
      setRequests(valueOf(requestRes));
      setAllUsers(valueOf(userRes));

      if (results.some((result) => result.status === "rejected")) {
        setError("Some dashboard sections could not be loaded. Please refresh.");
      }
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  }, [isSuperadmin]);

  useEffect(() => {
    if (!token || !ADMIN_ROLES.includes(user?.role)) {
      setIsLoading(false);
      return;
    }
    refresh();
  }, [token, user?.role, refresh]);

  return {
    universities,
    courses,
    scholarships,
    events,
    requests,
    allUsers,
    isLoading,
    error,
    setError,
    refresh,
  };
}
