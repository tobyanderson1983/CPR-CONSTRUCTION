
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAutoLogoutWithWarning({ timeout = 12000, warningTime = 10000 }) {
  const navigate = useNavigate();
 

  useEffect(() => {
    let warningTimeout;
    let logoutTimeout;

    const logout = () => {
        
      localStorage.removeItem("token");
      localStorage.removeItem('user');
      window.dispatchEvent(new Event("storage"));
      alert("You have been logged out.");
      navigate("/"); // redirect to login/home
    
    };

    
    const showWarning = () => {
     
      logoutTimeout = setTimeout(logout, warningTime); // ✅ guarantee logout after warning
      alert("You will be logged out soon due to inactivity.");

    };

    const resetTimers = () => {
      clearTimeout(warningTimeout);
      clearTimeout(logoutTimeout);
      warningTimeout = setTimeout(showWarning, timeout - warningTime);
    };

    // Start timers initially
    resetTimers();

    // Listen for activity to reset timers
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) =>
      window.addEventListener(event, resetTimers)
    );

    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(logoutTimeout);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimers)
      );
    };
  }, [navigate, timeout, warningTime]);

  return null;
}

export default useAutoLogoutWithWarning;

