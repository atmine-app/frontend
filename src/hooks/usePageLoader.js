import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function usePageLoader() {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsPageLoading(true);
      const timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 500); // You can adjust the delay as needed

      return () => {
        clearTimeout(timer);
      };
    }
  }, [location.pathname]);

  return isPageLoading;
}

export default usePageLoader;