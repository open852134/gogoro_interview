import { useReducer } from "react";
import actionTypes from "./actionTypes";
import reducer from "./reducer";

const useActions = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleNavigation = () => {
    dispatch({ type: actionTypes.TOGGLE_NAVIGATION_COLLAPSE });
  };

  const setPath = (pagePath) => {
    dispatch({ type: actionTypes.SET_NAVIGATION_LINK, pagePath });
  };

  const switchUser = () => {
    dispatch({ type: actionTypes.SWITCH_USER });
  };

  return {
    state,
    actions: {
      toggleNavigation,
      setPath,
      switchUser
    }
  };
};

export default useActions;
