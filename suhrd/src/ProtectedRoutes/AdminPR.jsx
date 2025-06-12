import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminNavbar from "../Admin/AdminNavbar/AdminNavbar";
import AdminMenuBar from "../Admin/AdminMenubar/AdminMenubar";


const AdminProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <AdminNavbar/>
      {children}
      <AdminMenuBar/>
    </>
  );
};

export default AdminProtectedRoute;