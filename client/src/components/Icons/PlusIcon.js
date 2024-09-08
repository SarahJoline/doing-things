import React from "react";
import styled from "styled-components";

const StyledPlusIcon = styled.svg``;

export function PlusIcon({ width, height, fill, stroke, ...rest }) {
  return (
    <StyledPlusIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 36 36"
      {...rest}
    >
      <path fill={fill} d="M18 34a16 16 0 100-32 16 16 0 000 32z"></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M25 18H10.65M17.83 10.83v14.34"
      ></path>
    </StyledPlusIcon>
  );
}
