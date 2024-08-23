import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(true);
  const [message, setMessage] = useState('');
   const apiKey = "https://backenddata77720.onrender.com"
 
  const navigate = useNavigate();

  const validateEmail = () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length !== 0) {
      if (emailRegex.test(email)) {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
        // Optionally handle invalid email case
      }
    }
  };

  const sendLink = async () => {
    validateEmail();
    setLoading(true);

    if (email === '') {
      setMessage('Email is required');
      setLoading(false);
    } else if (!email.includes('@')) {
      setMessage('Not a valid email address. Should be your@email.com');
      setLoading(false);
    } else {
      try {
        const response = await axios.post(`${apiKey}/api/auth/sendpasswordlink`, {
          email: email.toLowerCase(),
        });

        if (response.data.success) {
          setLoading(false);
          navigate('/Verifypage', { state: { email: email } });
        } else {
          setMessage(response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex w-[100%] justify-center items-center h-screen">
        <div className="relative">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <div className="text-blue-500 text-2xl">Loading...</div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-gray-100 w-full p-5 h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-black mb-4 text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-700 mb-4">
          Please provide your email. You'll receive an OTP to reset your password via email.
        </p>
        <div className="bg-gray-50 border border-gray-300 rounded-md p-3 flex items-center mb-4">
          <input
            type='email'
            placeholder='Email'
            className="flex-1 text-lg text-gray-800 border-none outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <p className="text-red-500 text-sm font-semibold mb-4">{message}</p>
        <button
          onClick={sendLink}
          className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-lg hover:bg-red-700 transition"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default ForgotPage;
