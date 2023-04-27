import { BellIcon } from "@heroicons/react/24/outline";
import React from "react";

const AppHeader = () => {
  return (
    <div className="appHeader bg-slate-200">
      {/* <img src="logo.jpg" width={50} alt="logo"/> */}
      <h1 className="font-bold text-blue-700 border-2 py-2 px-3 "> FCORE S3</h1>
      <h3 className="font-bold text-gray-600">
        Object Storage Manager 
      </h3>
      <div className="flex">
        <button type="button" className="bg-blue-300 rounded p-1 mr-3 font-bold text-sm px-4 text-blue-900 hover:text-red-600 cursor-pointer  ">Admin </button>
        <BellIcon className="w-6 hover:cursor-pointer" />
        </div>
    </div>
  );
};

export default AppHeader;
