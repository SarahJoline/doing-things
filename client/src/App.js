import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import AuthHelperMethods from "./auth";
import Register from "./components/Forms/Register";
import List from "./components/List";
import Login from "./components/Login";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
export const StyledContainer = styled.div`
  background-color: aliceblue;
`;

function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

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
    <Router>
      <StyledContainer className="App">
        <NavBar open={open} setOpen={setOpen} />
        {open && <Modal setOpen={setOpen} />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <List />
              </ProtectedRoute>
            }
          />
        </Routes>
      </StyledContainer>
    </Router>
  );
}

export default App;
