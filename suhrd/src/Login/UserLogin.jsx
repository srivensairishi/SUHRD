import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from "js-cookie"

const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const verifyLogin = async (e) => {
    e.preventDefault();
    const userDetails = { username, password };
    const url = "http://localhost:4000/api/user/userlogin";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (response.ok) {
        console.log("Login successful", data.token);
        Cookies.set("token", data.token, { expires: 30 });
        alert("Login successful");
        navigate("/userhome");
        
      } else {
        console.error("Login failed", data.message);
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
  

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 flex flex-col items-center justify-center bg-white p-8">
          <img src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748337593/58661dfb59312fc39c529efb33baa953ff8401f8_1_aawzo5.jpg" alt="SUHRD Logo" className="w-64 h-64 object-contain" />
        </div>

        <div className="md:w-1/2 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">User Login</h2>
          <p className="text-gray-600 text-center mb-8">Enter your Username <br className="md:hidden" />& password <br className="md:hidden" />to proceed</p>
          <form className="space-y-4" onSubmit={verifyLogin}>
            <div className="flex border rounded-md overflow-hidden">
              <input onChange={onChangeUsername} type="text" placeholder="Username" className="flex-grow px-4 py-2 outline-none"  />
            </div>
            <input onChange={onChangePassword} type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md outline-none" />
            <button onClick={() => navigate('/userhome')} type="submit" className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold" > Login </button>
            <Link to = "/usersignup"><p>Don't have an account? Sign Up</p></Link>
          </form>
          <p className="text-center mt-6 text-sm text-gray-500 underline cursor-pointer"> View Terms and Conditions </p>
        </div>
      </div>
    </div>    
    </>
  );
};


export default UserLogin;
