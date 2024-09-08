import React from "react";
import styled from "styled-components";
import { CheckmarkIcon } from "../Icons";

export const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSubtaskCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSubtaskTitle = styled.h2`
  font-size: 15px;
  color: dimgray;
`;

function SubtaskCard({ subtask }) {
  return (
    <StyledSubtaskCard>
      <StyledSubtaskTitle>{subtask}</StyledSubtaskTitle>
      <StyledButton>
        mark as completed
        <CheckmarkIcon
          width="20"
          height="20"
          stroke="white"
          fill="darkseagreen"
        />
      </StyledButton>
    </StyledSubtaskCard>
  );
}

export default SubtaskCard;
