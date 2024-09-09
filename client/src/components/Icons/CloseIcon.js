import React from "react";
import styled from "styled-components";

const StyledCloseIcon = styled.svg``;

export function CloseIcon({ width, height, stroke, fill, ...rest }) {
  return (
    <StyledCloseIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      {...rest}
    >
      <path fill={fill} d="M0 0H32V32H0z"></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.757"
        d="M28 29.333L2.666 4M28 4L2.667 29.333"
      ></path>
    </StyledCloseIcon>
  );
}
