import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import SubtaskCard from "../SubtaskCard";
import ButtonContainer from "./ButtonContainer";

export const StyledListItem = styled.div`
  margin: 10px;
  border: 1px darkseagreen solid;
  border-radius: 10px;
  min-height: 50px;
  background-color: white;
  display: flex;
  padding: 0 10px;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;

export const StyledMainTaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTitle = styled.h1`
  color: teal;
  font-size: 15px;
  font-weight: 500;
  width: 40%;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 20px;
  }
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

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

function ListItem({ item }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  async function addSubtask(id, subtask) {
    try {
      await axios.put(`/api/todos/${id}`, { subtasks: subtask }).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <StyledListItem>
      <StyledMainTaskContainer>
        <StyledTitle>{item.name}</StyledTitle>
        <StyledProgressBar>
          <StyledCompletionBar progress={item.progress} />
        </StyledProgressBar>
        {!isMobile && <ButtonContainer id={item.id} />}
      </StyledMainTaskContainer>
      <div>
        <StyledSubtaskContainer>
          {item.subtasks?.map((subtask) => {
            return <SubtaskCard subtask={subtask} />;
          })}
        </StyledSubtaskContainer>
        {isMobile && <ButtonContainer id={item.id} />}
      </div>
    </StyledListItem>
  );
}

export default ListItem;
