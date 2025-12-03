'use client';
import React from 'react';

const Loading = () => {
 
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 select-none">

  <div className="flex flex-col justify-center items-center">
    <div className="w-14 h-14 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>
    <p className="text-white text-lg mt-3 font-medium">Loading...</p>
  </div>
</div>


  );
};

export default Loading;