import React from "react";
import styled from "styled-components";
import { CheckmarkIcon, PlusIcon, TrashIcon } from "../Icons";
import SubtaskCard from "../SubtaskCard";

export const StyledListItem = styled.div`
  margin: 10px;
  border: 1px darkseagreen solid;
  border-radius: 10px;
  min-height: 50px;
  background-color: white;
  display: flex;
  padding: 0 20px;
  flex-direction: column;
`;

export const StyledMainTaskContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

export const StyledTitle = styled.h1`
  color: teal;
  font-size: 20px;
  font-weight: 500;
  width: 40%;
  text-align: left;
`;

export const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledProgressBar = styled.div`
  border: darkseagreen;
  background-color: transparent;
  width: 100px;
  border-radius: 20px;
  height: 10px;
  border: 1px darkseagreen solid;
`;
export const StyledCompletionBar = styled.div`
  background-color: darkseagreen;
  width: ${({ progress }) => `${progress}px;`}
  border-radius: 20px;
  height: 10px;
`;

export const StyledSubtaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function ListItem({ item }) {
  return (
    <StyledListItem>
      <StyledMainTaskContainer>
        <StyledTitle>{item.title}</StyledTitle>
        <StyledProgressBar>
          <StyledCompletionBar progress={item.progress} />
        </StyledProgressBar>
        <StyledButton>
          <CheckmarkIcon width="40" height="40" stroke="darkseagreen" />
        </StyledButton>
        <StyledButton>
          <PlusIcon width="40" height="40" stroke="darkseagreen" />
        </StyledButton>
        <StyledButton>
          <TrashIcon width="20" height="20" stroke="red" />
        </StyledButton>
      </StyledMainTaskContainer>
      <StyledSubtaskContainer>
        {item.subtasks.map((subtask) => {
          return <SubtaskCard subtask={subtask} />;
        })}
      </StyledSubtaskContainer>
    </StyledListItem>
  );
}

export default ListItem;
