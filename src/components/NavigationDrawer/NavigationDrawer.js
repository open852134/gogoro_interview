import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SubNavItem from "./SubNavItem";
import NavItem from "./NavItem";
import { Icon } from "../index";

const NavigationDrawerWrapper = styled.div`
  background-color: #20263e;
  width: ${({ isCollapseed }) => (isCollapseed ? "60px" : "300px")};
  height: 100vh;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isCollapseed }) => (isCollapseed ? "center" : "space-between")};
  padding: 12px;
`;

const NavItemsBlock = styled.ul`
  margin-top: 24px;
`;

const ItemGroup = styled.li``;

const NavigationDrawer = ({
  isCollapseed,
  routers,
  pagePath,
  permission,
  onOpenClick,
  onCloseClick,
  onItemClick
}) => {
  const [activeItem, setActiveItem] = useState({});

  const handleNatItemClick = (pathName) => {
    setActiveItem((preState) => {
      return {
        ...preState,
        [pathName]: !preState[pathName]
      };
    });
  };

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

  return (
    <NavigationDrawerWrapper isCollapseed={isCollapseed}>
      <Logo isCollapseed={isCollapseed}>
        {isCollapseed ? (
          <Icon name="menu" clickable onClick={onOpenClick} />
        ) : (
          <>
            <Icon
              name="logo"
              width="100px"
              height="28px"
              viewBox="0 0 100 28"
              clickable
            />
            <Icon name="close" onClick={onCloseClick} clickable />
          </>
        )}
      </Logo>
      <NavItemsBlock>
        {routers.map((route) => {
          return (
            <ItemGroup key={route.path}>
              {(!route.isNeedAuth || (route.isNeedAuth && permission === "A")) && (
                <>
                  <NavItem
                    isCollapseed={isCollapseed}
                    route={route}
                    pagePath={pagePath}
                    navItemClick={() => {
                      handleNatItemClick(route.name);
                      onItemClick(route.path);
                    }}
                  />
                  {route.child && (
                    <SubNavItem
                      pagePath={pagePath}
                      isShow={activeItem[route.name]}
                      route={route.child}
                      onItemClick={onItemClick}
                    />
                  )}
                </>
              )}
            </ItemGroup>
          );
        })}
      </NavItemsBlock>
    </NavigationDrawerWrapper>
  );
};

NavigationDrawer.propTypes = {
  isCollapseed: PropTypes.bool,
  routers: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isNeedAuth: PropTypes.bool.isRequired,
      child: PropTypes.oneOfType(null, PropTypes.array)
    })
  ),
  pagePath: PropTypes.string,
  permission: PropTypes.string,
  onOpenClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default NavigationDrawer;
