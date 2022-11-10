import { LOGOUT, SET_USER } from "./actionTypes";

export const setUserAction = (payload) => ({ type: SET_USER, payload });
export const logoutAction = () => ({ type: LOGOUT });
