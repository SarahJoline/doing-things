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

function Modal({ setOpen }) {
  return (
    <StyledModalBackdrop>
      <StyledModalContainer>
        <ModalHeader>
          <StyledButton onClick={() => setOpen(false)}>
            <CloseIcon width="30px" height="30px" stroke="darkseagreen" />
          </StyledButton>
        </ModalHeader>
        <StyledModal>
          <form>
            <div>
              <label htmlFor="task-name">Name the task:</label>
              <input type="text" id="task-name" />
            </div>
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
                value="Recurring"
                id="recurring"
              />
              <label htmlFor="recurring">Reccuring</label>
            </div>
            <label htmlFor="task-frequency">Do this task once a:</label>
            <select name="task-frequency" id="task-frequency">
              <option value="">--Please choose an option--</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>

            <button>submit</button>
          </form>
        </StyledModal>
      </StyledModalContainer>
    </StyledModalBackdrop>
  );
}

export default Modal;
