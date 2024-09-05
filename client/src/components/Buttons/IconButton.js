import React from "react";
import styled from "styled-components";

export const StyledIconButton = styled.button`
  background-color: transparent;
  padding: 0;
  border: 0;
`;

export function IconButton({ icon: Icon }) {
  return (
    <StyledIconButton>
      <Icon />
    </StyledIconButton>
  );
}
