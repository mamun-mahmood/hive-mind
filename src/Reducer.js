export const initialState = {
  user: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
  FIND_USER: "FIND_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.FIND_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default reducer;
