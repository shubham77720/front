import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Verifypage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
    const apiKey = "https://backenddata77720.onrender.com"
 
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showOtp, setShowOtp] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (password !== cpassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    try {
      const data = {
        email: email,
        verificationCode: otp,
        password: password,
      };
      const response = await axios.post(`${apiKey}/api/auth/resetPasswordConfirm`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setMessage('Password reset successful!');
        navigate('/');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 w-full p-6 h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-black mb-8 text-3xl font-bold text-center">Set New Password</h1>
        <div className="mb-4">
          <div className="relative">
            <input
              type={showOtp ? 'text' : 'password'}
              placeholder='OTP'
              className={`w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none ${showOtp ? 'text-gray-600' : 'text-black'}`}
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
            {showOtp ? (
              <AiOutlineEye
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 cursor-pointer"
                size={20}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 cursor-pointer"
                size={20}
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type={showPassword ? 'password' : 'text'}
              placeholder='New Password'
              className={`w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none ${showPassword ? 'text-gray-600' : 'text-black'}`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {showPassword ? (
              <AiOutlineEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 cursor-pointer"
                size={20}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 cursor-pointer"
                size={20}
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <input
            type='password'
            placeholder='Confirm Password'
            className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none text-gray-600"
            onChange={(e) => setCpassword(e.target.value)}
            value={cpassword}
          />
        </div>
        <p className="text-red-500 text-center mb-4">{message}</p>
        <button
          onClick={handleSubmit}
          className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-lg hover:bg-red-700 transition duration-300"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Verifypage;
