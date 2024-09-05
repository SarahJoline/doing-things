import React from "react";
import styled from "styled-components";
import { IconButton } from "../Buttons/IconButton";
export const StyledHeader = styled.header`
  width: 100%;
  height: 10vh;
  background-color: teal;
  min-height: 60px;
`;

function NavBar() {
  return (
    <StyledHeader>
      <IconButton icon="Hello" />
    </StyledHeader>
  );
}

export default NavBar;
