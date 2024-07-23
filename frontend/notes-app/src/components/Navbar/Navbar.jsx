import React, { useState } from "react";
import ProfileInfo from "../cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
const Navbar = ({ UserInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear()
    navigate("/login");
  };

  const handleSearch = () => {

  }

  const onClearSearch = () => {
    setSearchQuery("")
  }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">NOTES</h2>
      <SearchBar 
      value={searchQuery} 
      onChange={(e) => {
        setSearchQuery(e.target.value)
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      />
      <ProfileInfo UserInfo={ UserInfo } onLogout={onLogout} />
    </div>
  );
};

export default Navbar;