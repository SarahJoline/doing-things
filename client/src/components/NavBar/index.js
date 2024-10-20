import React from "react";
import styled from "styled-components";
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
`;

export const StyledTitle = styled.h1`
  color: aliceblue;
  font-family: Optima, sans-serif;
  margin: 0;
`;

export const StyledSpaceHolder = styled.h1`
  width: 40px;
`;

function NavBar({ open, setOpen }) {
  return (
    <StyledHeader>
      <StyledSpaceHolder />
      <StyledTitle>OmList</StyledTitle>
      <IconButton handleClick={() => setOpen(!open)}>
        <PlusIcon width="40" height="40" stroke="white" />
      </IconButton>
    </StyledHeader>
  );
}

export default NavBar;
