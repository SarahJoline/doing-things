import React from "react";
import styled from "styled-components";

export const StyledIconButton = styled.button`
  background-color: transparent;
  padding: 0;
  border: 0;
  cursor: pointer;
`;

export function IconButton({ handleClick, children }) {
  return <StyledIconButton onClick={handleClick}>{children}</StyledIconButton>;
}
