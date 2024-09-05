import React from "react";
import styled from "styled-components";

export const StyledListItem = styled.div`
  margin: 10px;
`;

function ListItem({ item }) {
  return <StyledListItem>{item}</StyledListItem>;
}

export default ListItem;
