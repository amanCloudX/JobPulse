import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Icon */}
      <span className="text-4xl animate-pulse">⚡</span>

      {/* Text */}
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-wide">
        JobPulse
      </h1>
    </div>
  );
};

export default Logo;
