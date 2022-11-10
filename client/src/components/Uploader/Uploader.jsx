import React from "react";
import UploadFile from "./UploadFile";
import "./uploader.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeUploaderVisibilityAction } from "../../redux/actions/uploadActions";
import downloadButton from "../../assets/img/download-button.png";
const Uploader = () => {
  const dispatch = useDispatch();
  const { isVisible, files } = useSelector(({ upload }) => upload);

  return isVisible ? (
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title">Загрузки</div>
        <button
          className="uploader__close"
          onClick={() => dispatch(changeUploaderVisibilityAction(false))}
        >
          X
        </button>
      </div>
      {files.map((file) => (
        <UploadFile key={file.id} file={file} />
      ))}
    </div>
  ) : (
    <div className="open__uploader">
      <button onClick={() => dispatch(changeUploaderVisibilityAction(true))}>
        <img src={downloadButton} />
      </button>
    </div>
  );
};

export default Uploader;
