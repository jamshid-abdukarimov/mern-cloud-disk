import { HIDE_LOADER, SHOW_LOADER } from "../actions/actionTypes";

const initialState = {
  loader: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };
    default:
      return state;
  }
}

export const showLoaderAction = () => ({ type: SHOW_LOADER });
export const hideLoaderAction = () => ({ type: HIDE_LOADER });
