import axios from "axios";
import React, { useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";

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
    <div className="App">
      <NavBar />
      <Modal />
      <button>Add task</button>
      <List />
    </div>
  );
}

export default App;
