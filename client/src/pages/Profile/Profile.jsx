import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import "./profile.scss";
import userAvatar from "../../assets/img/user avatar2.png";
import { API_URL } from "../../config";
import { fileSize } from "../../utils/fileSize";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const uploadAvatarHandler = (e) => {
    dispatch(uploadAvatar(e.target.files[0]));
    e.target.value = null;
  };
  const avatar = currentUser.avatar
    ? `${API_URL}/${currentUser.avatar}`
    : userAvatar;

  return (
    <div className="profile">
      <img src={avatar} alt="" className="profile__img" />
      <div>
        <p>
          <b>Email: </b>
          {currentUser.email}
        </p>
        <p>
          <b>Disk space: </b>
          {fileSize(currentUser.diskSpace)}
        </p>
        <p>
          <b>Used space: </b>
          {fileSize(currentUser.usedSpace)}
        </p>
        <div className="profile__btns">
          <button onClick={() => dispatch(deleteAvatar())}>
            Delete Avatar
          </button>
          <label htmlFor="delete_avatar">Upload Avatar</label>
          <input
            id="delete_avatar"
            accept="image/*"
            type="file"
            placeholder="Upload avatar"
            onChange={uploadAvatarHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
