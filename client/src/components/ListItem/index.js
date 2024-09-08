import React from "react";
import styled from "styled-components";

export const StyledListItem = styled.div`
  margin: 10px;
  border: 1px darkseagreen solid;
  border-radius: 10px;
  min-height: 50px;
  background-color: white;
  display: flex;
  padding: 0 20px;
  align-items: baseline;
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

function ListItem({ item }) {
  return (
    <StyledListItem>
      <StyledTitle>{item.title}</StyledTitle>
      <StyledProgressBar>
        <StyledCompletionBar progress={item.progress} />
      </StyledProgressBar>
      <StyledButton>completed</StyledButton>
      <StyledButton>trash</StyledButton>
    </StyledListItem>
  );
}

export default ListItem;
