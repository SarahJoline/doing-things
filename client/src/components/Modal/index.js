import axios from "axios";
import React from "react";
import styled from "styled-components";
import { CloseIcon } from "../Icons";

export const StyledModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background: rgb(0, 0, 0, 0.5);
  transition: opacity 0.25s ease;
`;

export const StyledModalContainer = styled.div`
  overflow-y: auto;
  scroll-padding-bottom: 60px;
  background-color: white;
  bottom: 0;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  height: 80vh;
  padding: 20px;
  z-index: 10;
  padding: 20px;
  display: flex;
  border: 1px darkseagreen solid;
  border-radius: 10px;
  flex-direction: column;
  opacity: 1 !important;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export const StyledModal = styled.div`
  background-color: white;
  opacity: 1;
  height: 80vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export const StyledTitleInput = styled.div``;

function Modal({ setOpen }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const is_recurring =
      formData.get("is-recurring") === "recurring" ? true : false;
    const recurs_every = formData.get("recurs_every") || null;
    const subtasks = [
      formData.get("subtask-1"),
      formData.get("subtask-2"),
      formData.get("subtask-3"),
      formData.get("subtask-4"),
    ].filter((subtask) => subtask); // filter out any null/empty subtasks

    const payload = {
      title,
      is_recurring,
      recurs_every,
      subtasks,
    };

    try {
      await axios.request({
        method: "POST",
        url: "/api/todos",
        data: payload,
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  return (
    <StyledModalBackdrop>
      <StyledModalContainer>
        <ModalHeader>
          <StyledButton onClick={() => setOpen(false)}>
            <CloseIcon width="30px" height="30px" stroke="darkseagreen" />
          </StyledButton>
        </ModalHeader>
        <StyledModal>
          <form onSubmit={handleSubmit}>
            <StyledTitleInput>
              <label htmlFor="task-title">Task:</label>
              <input type="text" id="task-title" name="title" />
            </StyledTitleInput>
            <div>
              <input
                type="radio"
                name="is-recurring"
                value="onetime"
                id="onetime"
              />
              <label htmlFor="onetime">One Time</label>
              <input
                type="radio"
                name="is-recurring"
                value="recurring"
                id="recurring"
              />
              <label htmlFor="recurring">Reccuring</label>
            </div>
            <label htmlFor="recurs_every">Do this task once a:</label>
            <select name="recurs_every" id="recurs_every">
              <option value="">--Please choose an option--</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <StyledTitleInput>
              <label htmlFor="add-subtasks">Add A Subtask</label>
              <input type="text" id="add-subtasks" name="subtask-1" />
              <input type="text" id="add-subtasks" name="subtask-2" />
              <input type="text" id="add-subtasks" name="subtask-3" />
              <input type="text" id="add-subtasks" name="subtask-4" />
            </StyledTitleInput>
            <button>submit</button>
          </form>
        </StyledModal>
      </StyledModalContainer>
    </StyledModalBackdrop>
  );
}

export default Modal;
