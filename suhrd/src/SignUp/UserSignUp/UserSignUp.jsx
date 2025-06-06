import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

const UserSignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [MobileNO, setMobileNO] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  }
  const onChangeMobileNo = (e) => {
    setMobileNO(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = { username, password , location , MobileNO };
    const url = "http://localhost:4000/api/user/usersignup";
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
      console.log(data)
      if (response.ok) {
        console.log("Sign Up successful", data);
        alert("Sign Up successful");
        navigate("/userlogin");
      } else {
        console.log("Registration failed", data.message);
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <div className='bg-[#ad08f3] w-full h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-white h-100 w-180 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center'>
        <label className='text-[#ad08f3] font-bold'>Username:<input className='ml-5 mt-5 p-1 border text-gray-500 rounded' placeholder='username' type="text" name="username" onChange={onChangeUsername} required  /></label>
        <label className='text-[#ad08f3] font-bold'>Password:<input className='ml-5 mt-5 p-1 border text-gray-500 rounded' placeholder='password' type="password" name="password" onChange={onChangePassword} required /></label>
        <label className='text-[#ad08f3] font-bold'>Location:<input className='ml-5 mt-5 p-1 border text-gray-500 rounded' placeholder='location' type="text" name="location" onChange={onChangeLocation} required /></label>
        <label className='text-[#ad08f3] font-bold'>Mobile No:<input className='ml-5 mt-5 p-1 border text-gray-500 rounded' placeholder='mobile no' type="number" name="mobileno" onChange={onChangeMobileNo} required /></label>
        <button className='h-10 w-20 bg-[#ad08f3] text-white font-bold rounded mt-5' type="submit">Sign Up</button>
        <button className='h-10 w-20 bg-[#ad08f3] text-white font-bold rounded mt-5' type="button" onClick={() => navigate("/userlogin")}>Login</button>
      </form>
    </div>
  );
};

export default UserSignUp;
