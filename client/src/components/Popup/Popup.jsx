import React from "react";
import Input from "../../utils/Input";
import "./popup.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalAction } from "../../redux/actions/fileActions";
import { useState } from "react";
import { createFolder } from "../../actions/file";

const Popup = () => {
  const { modal, currentDir } = useSelector(({ files }) => files);
  const dispatch = useDispatch();
  const [dirName, setDirName] = useState("");
  return (
    <div
      className="popup"
      onClick={() => dispatch(setModalAction("none"))}
      style={{ display: modal }}
    >
      <div
        className="popup__content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup__header">
          <div className="popup__title">Create new folder</div>
          <button
            className="popup__close"
            onClick={() => dispatch(setModalAction("none"))}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Введите название папки..."
          value={dirName}
          setValue={setDirName}
        />
        <button
          className="popup__create"
          onClick={() => dispatch(createFolder(dirName, currentDir))}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Popup;
