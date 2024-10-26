import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import AuthHelperMethods from "../../auth";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 90vh;
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
  background-color: rgb(240, 248, 255);

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
  const [email, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      name,
      password,
    };

    try {
      const { data } = await axios.post("/api/user", payload);

      AuthHelperMethods.setToken(data.token);
      setOpen(false);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <StyledLabel htmlFor="email">Email:</StyledLabel>
        <StyledTextInput
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <StyledLabel htmlFor="name">Name:</StyledLabel>
        <StyledTextInput
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
