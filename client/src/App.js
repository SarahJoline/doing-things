import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import AuthHelperMethods from "./auth";
import Register from "./components/Forms/Register";
import List from "./components/List";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";

export const StyledContainer = styled.div`
  background-color: aliceblue;
`;

function App() {
  const isLoggedIn = AuthHelperMethods.loggedIn();
  const [open, setOpen] = useState(false);
  async function getTodos() {
    try {
      await axios
        .request({
          method: "GET",
          url: "/api/todos",
        })
        .then(({ data }) => {
          console.log(data);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <StyledContainer className="App">
      <NavBar open={open} setOpen={setOpen} />
      {open && <Modal setOpen={setOpen} />}

      {!!isLoggedIn && <List />}
      {!isLoggedIn && <Register />}
    </StyledContainer>
  );
}

export default App;
