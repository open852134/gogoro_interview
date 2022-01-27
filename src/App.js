import React from "react";
import { NavigationDrawer } from "./components";
import routers from "./routers";
import { useStore } from "./store/context";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  padding: 14px;
`;

function App(props) {
  const {
    state: { ui, user },
    actions: { toggleNavigation, setPath, switchUser }
  } = useStore();

  return (
    <Wrapper>
      <NavigationDrawer
        routers={routers}
        pagePath={ui.pagePath}
        permission={user.permission}
        isCollapseed={ui.navigationCollapsed}
        onCloseClick={toggleNavigation}
        onOpenClick={toggleNavigation}
        onItemClick={(pagePath) => {
          setPath(pagePath);
        }}
      />

      <Content>
        <p>User Name：{user.name}</p>
        <p>User permission leave：{user.permission}</p>
        <button onClick={switchUser}>Switch User</button>
      </Content>
    </Wrapper>
  );
}

export default App;
