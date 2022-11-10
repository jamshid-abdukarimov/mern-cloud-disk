import axios from "axios";
import { API_URL } from "../config";
import {
  addFileAction,
  deleteFileAction,
  setFilesAction,
} from "../redux/actions/fileActions";
import {
  addUploadFileAction,
  changeUploaderVisibilityAction,
  changeUploadFileAction,
} from "../redux/actions/uploadActions";
import {
  hideLoaderAction,
  showLoaderAction,
} from "../redux/reducers/appReducer";

export function getFiles(dirId, sort, search) {
  return async (dispatch) => {
    try {
      dispatch(showLoaderAction());
      let url = `${API_URL}/api/files${sort ? `?sort=${sort}` : ""}${
        dirId ? `&parent=${dirId}` : ""
      }${search ? `&title=${search}` : ""}`;
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(({ data }) => dispatch(setFilesAction(data)));
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      dispatch(hideLoaderAction());
    }
  };
}

export function createFolder(name, parent) {
  return async (dispatch) => {
    try {
      await axios
        .post(
          `${API_URL}/api/files`,
          { name, type: "dir", parent },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(({ data }) => dispatch(addFileAction(data)));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dirId) formData.append("parent", dirId);
      const uploadFile = { id: Date.now(), name: file.name, progress: 0 };
      dispatch(changeUploaderVisibilityAction(true));
      dispatch(addUploadFileAction(uploadFile));
      await axios
        .post(`${API_URL}/api/files/upload`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          onUploadProgress: ({ loaded, total }) => {
            if (total) {
              let progress = Math.round((loaded * 100) / total);
              dispatch(changeUploadFileAction({ id: uploadFile.id, progress }));
            }
          },
        })
        .then(({ data }) => dispatch(addFileAction(data)));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export async function downloadFile(file) {
  await axios({
    method: "GET",
    url: `${API_URL}/api/files/download?id=${file._id}`,
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => {
    const href = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", file.name); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
  });
}

export function deleteFile(file) {
  return async (dispatch) => {
    await axios({
      method: "DELETE",
      url: `${API_URL}/api/files?id=${file._id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(({ data }) => {
        window.alert(data.message);
        dispatch(deleteFileAction(file._id));
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
}
