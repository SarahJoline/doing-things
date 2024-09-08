import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import List from "./components/List";
import NavBar from "./components/NavBar";

export const StyledContainer = styled.div`
  background-color: aliceblue;
`;

function App() {
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
      <NavBar />
      {/* <Modal /> */}

      <List />
    </StyledContainer>
  );
}

export default App;
