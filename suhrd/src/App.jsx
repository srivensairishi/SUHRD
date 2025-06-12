import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import AdminUser from "./AdminUser/AdminUser.jsx";
import UserLogin from "./Login/UserLogin.jsx";
import AdminLogin from "./Login/AdminLogin.jsx";
import AdminHome from "./Admin/AdminHome/AdminHome.jsx";
import EditAppContent from './Admin/EditAppContent/EditAppContent.jsx';
import AdminVideos from './Admin/AdminVideos/AdminVideos.jsx';
import AdminAssessment from './Admin/AdminAssessment/AdminAssessment.jsx';
import AdminNews from './Admin/AdminNews/AdminNews.jsx';
import UserHome from "./User/UserHome/UserHome.jsx";
import UserTicketForm from "./User/UserTicketForm/UserTicketForm.jsx";
import UserMenuBar from "./User/UserMenuBar/UserMenuBar.jsx";
import UserVideos from "./User/UserVideos/UserVideos.jsx";
import UserNews from "./User/UserNews/UserNews.jsx";
import UserAssessment from "./User/UserAssessment/UserAssessment.jsx";
import AdminSignUp from "./SignUp/AdminSignup/AdminSignUp.jsx";
import UserSignUp from "./SignUp/UserSignUp/UserSignUp.jsx";
import AdminProtectedRoute from "./ProtectedRoutes/AdminPR.jsx";
import UserProtectedRoute from "./ProtectedRoutes/UserPR.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminUser />} />

          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/adminsignup" element={<AdminSignUp />} />
          <Route path="/usersignup" element={<UserSignUp />} />

          <Route path="/adminhome" element={<AdminProtectedRoute><AdminHome /></AdminProtectedRoute>} />
          <Route path="/userhome" element={<UserProtectedRoute><UserHome /></UserProtectedRoute>} />

          <Route path="/admineditappcontent" element={<EditAppContent />} />

          <Route path="/userticket" element={<UserProtectedRoute><UserTicketForm /></UserProtectedRoute>} />

          <Route path="/adminvideos" element={<AdminProtectedRoute><AdminVideos /></AdminProtectedRoute>} />
          <Route path="/adminnews" element={<AdminProtectedRoute><AdminNews /></AdminProtectedRoute>} />
          <Route path="/adminassessment" element={<AdminProtectedRoute><AdminAssessment /></AdminProtectedRoute>} />
          
          <Route path="/uservideos" element={<UserProtectedRoute><UserVideos /></UserProtectedRoute>} />
          <Route path="/usernews" element={<UserProtectedRoute><UserNews /></UserProtectedRoute>} />
          <Route path="/userassessment" element={<UserProtectedRoute><UserAssessment /></UserProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;