import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserMenuBar from "../User/UserMenuBar/UserMenuBar";
import UserNavbar from "../User/UserNavBar/UserNavBar"


const UserProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
    <UserNavbar />
      {children}
      <div className="mt-42"><UserMenuBar /></div>
    </>
  );
};

export default UserProtectedRoute;