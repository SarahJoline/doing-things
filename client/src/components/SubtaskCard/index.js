import React from "react";
import styled from "styled-components";
import { CheckmarkIcon } from "../Icons";

export const StyledButton = styled.button`
  // border: 1px darkseagreen solid;
  // border-radius: 3px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: darkseagreen;
`;

export const StyledSubtaskCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const StyledSubtaskTitle = styled.h2`
  font-size: 10px;
  color: dimgray;

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

function SubtaskCard({ subtask }) {
  return (
    <StyledSubtaskCard>
      <StyledSubtaskTitle>{subtask?.name}</StyledSubtaskTitle>
      <StyledButton onClick={() => markSubtaskAsCompleted(subtask?.id)}>
        <CheckmarkIcon
          width="30"
          height="30"
          stroke="darkseagreen"
          fill="white"
        />
      </StyledButton>
    </StyledSubtaskCard>
  );
}

export default SubtaskCard;
