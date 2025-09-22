import React from "react";

const EchoLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-2xl font-bold text-white tracking-wide">Ec</span>

      <div className="relative w-6 h-6 flex items-center justify-center">
        <span className="absolute w-2 h-2 bg-[#7637ff] rounded-full"></span>
        <span className="absolute w-4 h-4 border-2 border-[#7637ff] rounded-full animate-ping"></span>
        <span className="absolute w-6 h-6 border-2 border-[#7637ff] rounded-full opacity-50"></span>
      </div>

      <span className="text-2xl font-bold text-white tracking-wide">ho</span>
    </div>
  );
};

export default EchoLogo;
