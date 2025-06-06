import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = { username, password};
    const url = "http://localhost:4000/api/admin/adminsignup";
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
        console.log("Sign Up successful", data);
        alert("Sign Up successful");
        navigate("/adminlogin");
      } else {
        console.error("Registration failed", data.message);
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <div className='bg-[#ad08f3] w-full h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-white h-80 w-110 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center'>
        <label className='text-[#ad08f3] font-bold'>Username:<input className='ml-5 mt-5 p-1 border text-gray-500 rounded' placeholder='username' type="text" name="username" onChange={onChangeUsername} required  /></label>
        <label className='text-[#ad08f3] font-bold'>Password:<input className='ml-5 mt-5 p-1 border text-gray-500 rounded' placeholder='password' type="password" name="password" onChange={onChangePassword} required /></label>
        <button className='h-10 w-20 bg-[#ad08f3] text-white font-bold rounded mt-5' type="submit">Sign Up</button>
        <button className='h-10 w-20 bg-[#ad08f3] text-white font-bold rounded mt-5' type="button" onClick={() => navigate("/adminlogin")}>Login</button>
      </form>
    </div>
  );
};
export default AdminSignUp;