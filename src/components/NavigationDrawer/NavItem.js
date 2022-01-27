import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../index";

const NavItemWrapper = styled.div`
  color: #fff;
  display: flex;
  padding: 12px;
  cursor: pointer;
  align-items: center;
  background-color: ${({ active }) => (active ? "#363c52" : "inherit")};
  justify-content: ${({ isCollapseed }) => isCollapseed && "center"};
`;
const NavItemTitle = styled.h2`
  font-size: 18px;
`;
const NavItemIcon = styled.div`
  margin-right: ${({ isCollapseed }) => (isCollapseed ? "0px" : "12px")};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const NavItem = ({ isCollapseed, route, pagePath, navItemClick }) => {
  const navItemActive = useCallback(
    (route) => {
      let result = false;

      if (route.path === pagePath) {
        result = true;
        return result;
      }

      if (route.child) {
        route.child.forEach((route) => {
          if (navItemActive(route)) {
            result = true;
          }
        });
      }

      return result;
    },
    [pagePath]
  );

  const renderTitle = useMemo(
    () => !isCollapseed && <NavItemTitle>{route.name}</NavItemTitle>,
    [isCollapseed, route.name]
  );

  return (
    <NavItemWrapper
      isCollapseed={isCollapseed}
      active={navItemActive(route)}
      onClick={navItemClick}
    >
      <NavItemIcon isCollapseed={isCollapseed}>
        <Icon name={route.name.toLowerCase()} />
      </NavItemIcon>
      {renderTitle}
    </NavItemWrapper>
  );
};

NavItem.propTypes = {
  isCollapseed: PropTypes.bool,
  route: PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isNeedAuth: PropTypes.bool.isRequired,
    child: PropTypes.oneOfType(null, PropTypes.array)
  }),
  pagePath: PropTypes.string,
  navItemClick: PropTypes.func.isRequired
};

export default NavItem;
