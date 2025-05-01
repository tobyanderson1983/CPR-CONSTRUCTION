
import { useState, useEffect, useCallback, useRef } from "react";

const useAutoLogoutWithWarning = ({ warningTime = 700, logoutTime = 600, onLogout }) => {
  const [showWarning, setShowWarning] = useState(false);
  const warningTimeoutId = useRef(null);
  const logoutTimeoutId = useRef(null);

  const clearTimers = () => {
    if (warningTimeoutId.current) {
      clearTimeout(warningTimeoutId.current);
      warningTimeoutId.current = null;
    }
    if (logoutTimeoutId.current) {
      clearTimeout(logoutTimeoutId.current);
      logoutTimeoutId.current = null;
    }
  };

  const resetTimers = useCallback(() => {
    clearTimers();

    // Start warning timer
    warningTimeoutId.current = setTimeout(() => {
      setShowWarning(true);

      // Start logout countdown after warning
      logoutTimeoutId.current = setTimeout(() => {
        setShowWarning(false);
        if (typeof onLogout === "function") {
          onLogout();
        }
      }, logoutTime - warningTime);
    }, warningTime);
  }, [warningTime, logoutTime, onLogout]);

  const dismissWarning = () => {
    setShowWarning(false);
    resetTimers(); // Restart inactivity tracking
  };

  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "click", "scroll"];

    const handleActivity = () => {
      resetTimers();
    };

    activityEvents.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimers(); // Initialize timers on mount

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, handleActivity));
      clearTimers();
    };
  }, [resetTimers]);

  return { showWarning, dismissWarning };
};

export default useAutoLogoutWithWarning;
