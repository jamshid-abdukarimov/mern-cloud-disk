import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import downloadIcon from "../../../../assets/img/download-icon.png";
import deleteIcon from "../../../../assets/img/delete-icon.svg";
import {
  pushToStackAction,
  setCurrentDirAction,
} from "../../../../redux/actions/fileActions";
import "./file.scss";
import { deleteFile, downloadFile } from "../../../../actions/file";
import { fileSize } from "../../../../utils/fileSize";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const { currentDir } = useSelector(({ files }) => files);
  const openDirHandler = () => {
    if (file.type === "dir") {
      dispatch(pushToStackAction(currentDir));
      dispatch(setCurrentDirAction(file._id));
    }
  };

  const handleDownloadFile = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };

  const handleDeleteFile = (e) => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  return (
    <div className="file" onClick={openDirHandler}>
      <img
        src={file.type === "dir" ? dirLogo : fileLogo}
        alt=""
        className="file__img"
      />
      <div className="file__name">{file?.name}</div>
      <div className="file__date">{file?.date?.slice(0, 10)}</div>
      <div className="file__size">{fileSize(file?.size)}</div>
      {file?.type !== "dir" && (
        <button onClick={handleDownloadFile} className="file__btn download-btn">
          <img src={downloadIcon} alt="download-icon" />
        </button>
      )}
      <button onClick={handleDeleteFile} className="file__btn delete-btn">
        <img src={deleteIcon} alt="delete-icon" />
      </button>
    </div>
  );
};

export default File;
