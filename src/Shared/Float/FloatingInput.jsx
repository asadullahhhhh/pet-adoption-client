import React, { useState } from "react";

const FloatingLabelInput = ({ label, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mt-6">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          block w-full px-3 pt-6 pb-2 text-base text-black border 
          rounded-md appearance-none focus:outline-none focus:ring-0 
          focus:border-blue-600 border-gray-300
        `}
        placeholder=" "
      />
      <label
        className={`
          absolute text-gray-500 duration-200 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] 
          left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-4 
          peer-placeholder-shown:text-gray-400 
          ${isFocused || value ? "scale-75 -translate-y-3 text-blue-600" : ""}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
