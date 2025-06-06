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

          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/userhome" element={<UserHome />} />

          <Route path="/admineditappcontent" element={<EditAppContent />} />

          <Route path="/userticket" element={<UserTicketForm />} />

          <Route path="/adminvideos" element={<AdminVideos />} />
          <Route path="/adminnews" element={<AdminNews />} />
          <Route path="/adminassessment" element={<AdminAssessment />} />
          
          <Route path="/uservideos" element={<UserVideos />} />
          <Route path="/usernews" element={<UserNews />} />
          <Route path="/userassessment" element={<UserAssessment />} />
        </Routes>
      </BrowserRouter>
      {/* <UserVideos  /> */}
    </>
  )
}
export default App;