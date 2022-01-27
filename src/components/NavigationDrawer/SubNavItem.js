import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const SubItemGroup = styled.ul`
  max-height: ${({ isShow }) => (isShow ? "100em" : "0em")};
  overflow: hidden;
`;
const SubItem = styled.li`
  cursor: pointer;
`;
const ItemTitle = styled.p`
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 12px;
  position: relative;
  padding-left: ${({ layer }) => `${12 * layer}px`};

  ${({ active }) =>
    active &&
    css`
      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background-color: #05d7ff;
      }
    `}
`;

const SubNavItem = ({ pagePath, route, layer = 1, isShow, onItemClick }) => {
  const handleSubItemClick = (e, pagePath) => {
    e.stopPropagation();
    onItemClick(pagePath);
  };

  return (
    <SubItemGroup isShow={isShow}>
      {route.map((route) => {
        return (
          <SubItem key={route.path} onClick={(e) => handleSubItemClick(e, route.path)}>
            <ItemTitle layer={layer} active={route.path === pagePath}>
              {route.name}
            </ItemTitle>
            {route.child && route.child.length > 0 && (
              <SubNavItem
                isShow
                pagePath={pagePath}
                route={route.child}
                layer={layer + 1}
                onItemClick={onItemClick}
              />
            )}
          </SubItem>
        );
      })}
    </SubItemGroup>
  );
};

SubNavItem.propTypes = {
  pagePath: PropTypes.string,
  routers: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isNeedAuth: PropTypes.bool.isRequired,
      child: PropTypes.oneOfType(null, PropTypes.array)
    })
  ),
  layer: PropTypes.number,
  isShow: PropTypes.bool,
  onItemClick: PropTypes.func
};

export default SubNavItem;
