import {
  ADD_FILE,
  DELETE_FILE,
  PUSH_TO_STACK,
  SET_CURRENT_DIR,
  SET_FILES,
  SET_MODAL,
} from "../actions/actionTypes";

const defaultState = {
  files: [],
  currentDir: null,
  modal: "none",
  dirStack: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    case SET_MODAL:
      return { ...state, modal: action.payload };
    case PUSH_TO_STACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id != action.payload)],
      };
    default:
      return state;
  }
}
