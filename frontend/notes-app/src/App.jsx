import React from "react";
import Home from "./pages/Home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/SignUp";

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
