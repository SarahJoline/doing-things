import React from "react";
import styled from "styled-components";
import ListItem from "../ListItem";

export const StyledList = styled.div`
  display: flex;
  flex-wrap: true;
  width: 100%;
  padding: 40px;
`;

function List() {
  const list = [
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
  ];
  return (
    <StyledList>
      {list.map((item) => {
        return <ListItem item={item} />;
      })}
    </StyledList>
  );
}

export default List;
