import actionTypes from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_NAVIGATION_COLLAPSE:
      return {
        ...state,
        ui: {
          ...state.ui,
          navigationCollapsed: !state.ui.navigationCollapsed
        }
      };
    case actionTypes.SET_NAVIGATION_LINK:
      return {
        ...state,
        ui: {
          ...state.ui,
          pagePath: action.pagePath
        }
      };

    case actionTypes.SWITCH_USER:
      const nextUserInfo = [...state.fakeUser].reverse();

      return {
        ...state,
        user: nextUserInfo[0],
        fakeUser: nextUserInfo
      };
    default:
      throw new Error("auth context reducer got the wrong action type");
  }
};

export default reducer;
