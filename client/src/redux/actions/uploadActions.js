import {
  ADD_UPLOAD_FILE,
  CHANGE_UPLOADER_VISIBILITY,
  CHANGE_UPLOAD_FILE,
  REMOVE_UPLOAD_FILE,
} from "./actionTypes";

export const changeUploaderVisibilityAction = (payload) => ({
  type: CHANGE_UPLOADER_VISIBILITY,
  payload,
});
export const addUploadFileAction = (payload) => ({
  type: ADD_UPLOAD_FILE,
  payload,
});
export const removeUploadFileAction = (payload) => ({
  type: REMOVE_UPLOAD_FILE,
  payload,
});
export const changeUploadFileAction = (payload) => ({
  type: CHANGE_UPLOAD_FILE,
  payload,
});
