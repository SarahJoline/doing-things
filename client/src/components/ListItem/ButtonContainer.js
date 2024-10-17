import axios from "axios";
import React from "react";
import styled from "styled-components";
import { CheckmarkIcon, PlusIcon, TrashIcon } from "../Icons";

const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

function ButtonContainer({ id }) {
  async function deleteTodos(id) {
    try {
      await axios
        .request({
          method: "DELETE",
          url: `/api/todos/${id}`,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function markTodoAsComplete(id) {
    try {
      await axios.put(`/api/todos/${id}`, { progress: 100 }).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <StyledButtonContainer>
      <StyledButton>
        <CheckmarkIcon
          width="40"
          height="40"
          stroke="darkseagreen"
          onClick={() => markTodoAsComplete(id)}
        />
      </StyledButton>
      <StyledButton>
        <PlusIcon width="40" height="40" stroke="darkseagreen" />
      </StyledButton>
      <StyledButton>
        <TrashIcon
          width="20"
          height="20"
          stroke="red"
          onClick={() => deleteTodos(id)}
        />
      </StyledButton>
    </StyledButtonContainer>
  );
}

export default ButtonContainer;
