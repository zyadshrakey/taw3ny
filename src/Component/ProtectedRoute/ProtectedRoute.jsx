import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  return localStorage.getItem("userToken") ? (
    children
  ) : (
    <Navigate to={localStorage.getItem("userToken") ? "/login" : "/register"} />
  );
}

export default ProtectedRoute;
