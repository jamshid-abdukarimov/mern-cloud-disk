import { LOGOUT, SET_USER } from "../actions/actionTypes";

const defaultState = {
  currentUser: {},
  isAuth: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload, isAuth: true };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, currentUser: {}, isAuth: false };
    default:
      return state;
  }
}
