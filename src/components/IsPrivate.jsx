import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    // If the user is not logged in
    return <Navigate to="/login" />;
  } else {
    // If the user is logged in, allow to see the page
    return children;
  }
}

export default IsPrivate;
