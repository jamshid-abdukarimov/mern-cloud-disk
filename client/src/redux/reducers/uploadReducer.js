import {
  ADD_UPLOAD_FILE,
  CHANGE_UPLOADER_VISIBILITY,
  CHANGE_UPLOAD_FILE,
  REMOVE_UPLOAD_FILE,
} from "../actions/actionTypes";

const defaultState = {
  isVisible: false,
  files: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case CHANGE_UPLOADER_VISIBILITY:
      return { ...state, isVisible: action.payload };
    case ADD_UPLOAD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case REMOVE_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file.id != action.payload)],
      };
    case CHANGE_UPLOAD_FILE:
      return {
        ...state,
        files: [
          ...state.files.map((file) => {
            file.id === action.payload.id &&
              (file.progress = action.payload.progress);
            return file;
          }),
        ],
      };
    default:
      return state;
  }
}
