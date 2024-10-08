import React from "react";
import styled from "styled-components";
import { IconButton } from "../Buttons/IconButton";
export const StyledHeader = styled.header`
  width: 100%;
  height: 10vh;
  background-color: teal;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTitle = styled.h1`
  color: aliceblue;
  font-family: Optima, sans-serif;
  margin: 0;
`;

function NavBar() {
  return (
    <StyledHeader>
      <StyledTitle>OmList</StyledTitle>
      <IconButton icon="Hello" />
    </StyledHeader>
  );
}

export default NavBar;
