import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./FileList/FileList";
import "./disk.scss";
import Popup from "../Popup/Popup";
import {
  setCurrentDirAction,
  setModalAction,
} from "../../redux/actions/fileActions";
import Uploader from "../Uploader/Uploader";
import Loader from "../Loader/Loader";
import Input from "../../utils/Input";
import backIcon from "../../assets/img/back.png";

const Disk = () => {
  const [dragEnter, setDragEnter] = useState(false);
  const dispatch = useDispatch();
  const { currentDir, dirStack } = useSelector(({ files }) => files);
  const { loader } = useSelector(({ app }) => app);

  const [sort, setSort] = useState("date");
  const [search, setSearch] = useState("");
  let searchRef = useRef();

  useEffect(() => {
    dispatch(getFiles(currentDir, sort, search));
  }, [currentDir, sort]);

  useEffect(() => {
    let delayTimeOutFunction;
    if (!searchRef.current) {
      searchRef.current = true;
    } else {
      delayTimeOutFunction = setTimeout(() => {
        dispatch(getFiles(currentDir, sort, search));
      }, 500);
    }
    return () => clearTimeout(delayTimeOutFunction);
    // eslint-disable-next-line
  }, [search]);

  const backClickHandler = () => {
    if (dirStack.length) {
      const backDirId = dirStack.pop();
      dispatch(setCurrentDirAction(backDirId));
    }
  };

  const fileUploadHandler = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const dropHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  if (loader) {
    return <Loader />;
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={backClickHandler}>
          <img src={backIcon} alt="back-icon" />
        </button>
        <button
          className="disk__create"
          onClick={() => dispatch(setModalAction("flex"))}
        >
          Create folder
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Upload file
          </label>
          <input
            multiple={true}
            onChange={fileUploadHandler}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <Input
          type="search"
          style={{
            maxWidth: 200,
            marginLeft: "auto",
            marginRight: 20,
            fontSize: 16,
          }}
          placeholder="File name..."
          value={search}
          setValue={setSearch}
        />
        <select
          className="disk-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="date">Date</option>
        </select>
      </div>
      <FileList sort={sort} />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      onDrop={dropHandler}
    >
      Drag file here
    </div>
  );
};

export default Disk;
