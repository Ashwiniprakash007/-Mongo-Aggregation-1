import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePaasordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      name,
      gender,
      email,
      password,
    };

    try {
      const response = await fetch(`http://localhost:8080/user/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("SignUp successful");
        navigate("/login");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
        <h2>Register User</h2>
        <br />
      <input
        type="text"
        placeholder="Enter Nmae"
        value={name}
        onChange={handleNameChange}
      ></input>
      <br />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={handleEmailChange}
      ></input>
      <br />
      
      <input
        type="text"
        placeholder="Enter Gender"
        value={gender}
        onChange={handleGenderChange}
      ></input>
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handlePaasordChange}
      ></input>
      <br />
      <button onClick={handleSubmit}>Signup</button>
      
    </div>
  );
};

export { Register };
