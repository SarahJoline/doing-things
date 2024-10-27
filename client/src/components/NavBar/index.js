import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthHelperMethods from "../../auth";
import { IconButton } from "../Buttons/IconButton";
import { PlusIcon } from "../Icons";

export const StyledHeader = styled.header`
  height: 10vh;
  background-color: teal;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 50px;
  }
`;

export const StyledTitle = styled.h1`
  color: aliceblue;
  font-family: Optima, sans-serif;
  margin: 0;
`;

export const StyledLogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
`;

function NavBar({ open, setOpen }) {
  const navigate = useNavigate();

  const isLoggedIn = AuthHelperMethods.loggedIn();

  function logout() {
    AuthHelperMethods.logout("id_token");
    navigate("/login");
  }
  return (
    <StyledHeader>
      <StyledTitle>OmList</StyledTitle>
      {isLoggedIn && (
        <StyledButtonContainer>
          <IconButton handleClick={() => setOpen(!open)}>
            <PlusIcon width="40" height="40" stroke="white" />
          </IconButton>
          <StyledLogoutButton onClick={() => logout()}>
            Logout
          </StyledLogoutButton>
        </StyledButtonContainer>
      )}
    </StyledHeader>
  );
}

export default NavBar;
