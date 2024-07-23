import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { ValidateEmail } from "../../utils/helper";
import zod from "zod";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()
    
    console.log("HI")
    
    if (!name) {
      setError("Please enter a valid Name");
      return;
    }
    if (!ValidateEmail(email)) {
      setError("Please enter a valid Email address");
      return;
    }
    if (!password) {
      setError("Please enter the correct password");
      return;
    }

    const response = await axios.post("http://localhost:3000/create-account", {
      fullName: name,
      email: email,
      password: password,
    });

    console.log(response);

    if (response.data && response.data.error) {
      setError(response.data.error);
      return;
    }

    if (response.data && response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    }
    // } catch(error){
    //   if( error.response && error.response.data && error.response.data.message ){
    //     setError(error.response.data.message)
    //   }else{
    //     setError("An unexpected error occurred")
    //   }
    // }

    setError("");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              SignUp
            </button>

            <p className="text-sm text-center mt-4">
              Already Registered?{" "}
              <Link to="/login" className="font-medium underline text-primary">
                Go to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
