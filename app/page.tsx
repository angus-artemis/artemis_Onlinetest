"use client";

import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Artemis App</h1>
        <p className="text-gray-600 mb-8">Your influencer marketing platform</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Clicked {count} times
        </button>
      </div>
    </div>
  );
}
