import React from "react";
import PropTypes from "prop-types";
import iconList from "./iconList";
import styled from "styled-components";

const Svg = styled.svg`
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

const Icon = ({ name, clickable, ...props }) => {
  return (
    <Svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      clickable={clickable}
      {...props}
    >
      {iconList[name]}
    </Svg>
  );
};

Icon.propTypes = {};

export default Icon;
