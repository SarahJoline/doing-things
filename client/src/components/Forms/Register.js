import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const StyledLabel = styled.label`
  color: black;
  font-size: 18px;
`;

const StyledTextInput = styled.input`
  border: none;
  border-bottom: 1px solid teal;
  outline: none;
  font-size: 18px;

  &:focus {
    outline: 2px solid #8fbc8f;
    padding: 3px;
    border-radius: 3px;
  }
`;

const StyledButton = styled.button`
  border: 1px solid darkseagreen;
  background-color: darkseagreen;
  color: white;
  border-radius: 3px;
  padding: 15px 20px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
  align-self: center;

  &:hover {
    border: 1px solid #9bbf9b;
    background-color: #9bbf9b;
  }
`;

function Register({ setOpen }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
    };

    try {
      await axios.post("/api/register", payload);
      setOpen(false);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <StyledLabel htmlFor="username">Username:</StyledLabel>
        <StyledTextInput
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledTextInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <StyledButton type="submit">Register</StyledButton>
    </StyledForm>
  );
}

export default Register;
