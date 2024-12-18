import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ListItem from "../ListItem";

export const StyledList = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding: 10px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

function List() {
  const [data, setData] = useState([]);
  async function getTodos() {
    const token = localStorage.getItem("id_token");
    try {
      await axios
        .get("/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setData(data);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <StyledList>
      {data.map((item) => {
        return <ListItem item={item} />;
      })}
    </StyledList>
  );
}

export default List;
