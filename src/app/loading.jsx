import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="h-14 w-14 border-4 border-maroon-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute h-6 w-6 bg-maroon-600 rounded-full animate-ping"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-maroon-700 font-medium tracking-wide">
        Memuat halaman...
      </p>
    </div>
  );
};

export default loading;
