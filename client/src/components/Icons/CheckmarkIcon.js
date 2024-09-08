import React from "react";
import styled from "styled-components";

const StyledCheckmarkIcon = styled.svg``;

export function CheckmarkIcon({ width, height, fill, stroke, ...rest }) {
  return (
    <StyledCheckmarkIcon
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
        strokeMiterlimit="10"
        d="M9.8 18.75l4.97 4.96 11.42-11.42"
      ></path>
    </StyledCheckmarkIcon>
  );
}
