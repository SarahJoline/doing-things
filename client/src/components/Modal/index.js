import axios from "axios";
import React, { useState } from "react";
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

export const StyledTransparentButton = styled.button`
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

const StyledTitle = styled.h1`
  font-size: 25px;
  color: teal;
  font-weight: 500;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const StyledLabel = styled.label`
  color: black;
  font-size: 18px;
`;

const StyledSubtaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledTextInput = styled.input`
  border: none;
  border-bottom: 1px solid teal;
  outline: none;
  font-size: 18px;

  &:focus {
    outline: 2px solid #8fbc8f;
    padding: 3px;
    border-radius: 3px;
  }
`;

const StyledButton = styled.button`
  border: 1px solid darkseagreen;
  background-color: darkseagreen;
  color: white;
  border-radius: 3px;
  padding: 15px 20px;
  font-size: 20px;
  font-weight: 500px;
  cursor: pointer;
  width: fit-content;
  align-self: center;

  &:hover {
    border: 1px solid #9bbf9b;
    background-color: #9bbf9b;
  }
`;

function Modal({ setOpen }) {
  const [isRecurring, setIsRecurring] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("title");
    const is_recurring =
      formData.get("is-recurring") === "recurring" ? true : false;
    const frequency = formData.get("recurs_every") || null;
    const subtasks = [
      formData.get("subtask-1"),
      formData.get("subtask-2"),
      formData.get("subtask-3"),
      formData.get("subtask-4"),
    ].filter((subtask) => subtask); // filter out any null/empty subtasks

    const payload = {
      name,
      is_recurring,
      progress: 0,
      frequency,
      user_id: "user@example.com",
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
          <StyledTransparentButton onClick={() => setOpen(false)}>
            <CloseIcon width="30px" height="30px" stroke="darkseagreen" />
          </StyledTransparentButton>
        </ModalHeader>
        <StyledModal>
          <StyledTitle>Add a task</StyledTitle>
          <StyledForm onSubmit={handleSubmit}>
            <div>
              <StyledLabel htmlFor="task-title">Task:</StyledLabel>
              <StyledTextInput type="text" id="task-title" name="title" />
            </div>
            <div>
              <input
                type="radio"
                name="is-recurring"
                value="onetime"
                id="onetime"
                onClick={() => setIsRecurring(false)}
              />
              <StyledLabel htmlFor="onetime">One Time</StyledLabel>
              <input
                type="radio"
                name="is-recurring"
                value="recurring"
                id="recurring"
                onClick={() => setIsRecurring(true)}
              />
              <StyledLabel htmlFor="recurring">Reccuring</StyledLabel>
            </div>
            {isRecurring && (
              <>
                <StyledLabel htmlFor="recurs_every">
                  Do this task once a:
                </StyledLabel>
                <select name="recurs_every" id="recurs_every">
                  <option value="">Select frequency</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </>
            )}

            <StyledSubtaskContainer>
              <StyledLabel htmlFor="add-subtasks">Add A Subtask</StyledLabel>
              <StyledTextInput type="text" id="add-subtasks" name="subtask-1" />
              <StyledTextInput type="text" id="add-subtasks" name="subtask-2" />
              <StyledTextInput type="text" id="add-subtasks" name="subtask-3" />
              <StyledTextInput type="text" id="add-subtasks" name="subtask-4" />
            </StyledSubtaskContainer>
            <StyledButton>Submit</StyledButton>
          </StyledForm>
        </StyledModal>
      </StyledModalContainer>
    </StyledModalBackdrop>
  );
}

export default Modal;
