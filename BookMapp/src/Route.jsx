import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  //Sends a empty request to the server to check if the token is valid and therefore allows access to the pages
  useEffect(() => {
    async function validate() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/validateToken`,
          options
        );
        if (!response.ok) {
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    }

    validate();
  }, [location.pathname]);

  //Potential for an actual loading screen here
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
