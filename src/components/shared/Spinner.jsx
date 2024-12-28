"use client";

import React from "react";


const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="spinner-border animate-spin inline-block w-20 h-20 border-4 rounded-full border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
