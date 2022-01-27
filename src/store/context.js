import React from "react";
import useActions from "./useActions";

const StoreContext = React.createContext();

const initialState = {
  user: {
    name: "Steven",
    permission: "A"
  },
  ui: {
    navigationCollapsed: false,
    pagePath: ""
  },
  fakeUser: [
    {
      name: "Steven",
      permission: "A"
    },
    {
      name: "John",
      permission: "B"
    }
  ]
};

const PageProvider = (props) => {
  const { state, actions } = useActions(initialState);

  return (
    <StoreContext.Provider value={{ state, actions }}>
      {props.children}
    </StoreContext.Provider>
  );
};
const useStore = () => React.useContext(StoreContext);

export { PageProvider, useStore };
