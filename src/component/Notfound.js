import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-[100%] h-screen text-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-lg text-blue-500 hover:text-blue-700">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
