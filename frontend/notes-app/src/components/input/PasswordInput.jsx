import React, { useState } from "react";
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa6"
const PasswordInput = ({ value, onChange, placeholder }) => {
  const [Showpassword, setShowpassword] = useState(false);

  const toggleShowPassword = () => {
    setShowpassword(!Showpassword)
  }
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={Showpassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      { Showpassword ? <FaRegEye size={22} className="text-primary cursor-primary" onClick={() => toggleShowPassword()} /> : <FaRegEyeSlash size={22} className="text-slate-500 cursor-primary" onClick={() => toggleShowPassword()} />}
    </div>
  );
};

export default PasswordInput;
