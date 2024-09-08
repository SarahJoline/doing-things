import React from "react";
import styled from "styled-components";

const StyledTrashIcon = styled.svg``;

export function TrashIcon({ width, height, stroke, fill, ...rest }) {
  return (
    <StyledTrashIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 36 36"
      {...rest}
    >
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeMiterlimit="10"
        d="M27.4 5.93H8.6a2.05 2.05 0 00-2.05 2.05V31.6a2.05 2.05 0 002.05 2.05h18.8a2.05 2.05 0 002.05-2.05V7.98a2.05 2.05 0 00-2.05-2.05z"
      ></path>
      <path
        stroke={stroke}
        strokeMiterlimit="10"
        d="M12.86 26V12.92M18 26V12.92M23.14 26V12.92"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeMiterlimit="10"
        d="M2.55 5.93h30.9M12.58 5.93a3.58 3.58 0 013.59-3.58h3.66a3.58 3.58 0 013.59 3.58"
      ></path>
    </StyledTrashIcon>
  );
}
