import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D0D0D] text-[#E5E5E5]">
      <h1 className="text-5xl font-bold text-[#D946EF] mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-lg font-medium rounded-lg">
        Go Back Home
      </Link>
    </div>
  );
}
