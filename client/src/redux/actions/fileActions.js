import {
  ADD_FILE,
  DELETE_FILE,
  PUSH_TO_STACK,
  SET_CURRENT_DIR,
  SET_FILES,
  SET_MODAL,
} from "./actionTypes";

export const setFilesAction = (payload) => ({ type: SET_FILES, payload });
export const setCurrentDirAction = (payload) => ({
  type: SET_CURRENT_DIR,
  payload,
});
export const addFileAction = (payload) => ({ type: ADD_FILE, payload });
export const setModalAction = (payload) => ({ type: SET_MODAL, payload });
export const pushToStackAction = (payload) => ({
  type: PUSH_TO_STACK,
  payload,
});
export const deleteFileAction = (payload) => ({
  type: DELETE_FILE,
  payload,
});
