const fs = require("fs");
const config = require("config");
const { v4 } = require("uuid");
const fileService = require("../services/fileService");
const File = require("../models/File");
const User = require("../models/User");

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(req, file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(req, file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getFiles(req, res) {
    try {
      let files;
      const { sort, title, parent } = req.query;
      switch (sort) {
        case "name":
          files = await File.find({
            user: req.user.id,
            parent,
          }).sort({ name: 1 });
          break;
        case "type":
          files = await File.find({
            user: req.user.id,
            parent,
          }).sort({ type: 1 });
          break;
        case "date":
          files = await File.find({
            user: req.user.id,
            parent,
          }).sort({ date: 1 });
          break;
        default:
          files = await File.find({
            user: req.user.id,
            parent,
          });
          break;
      }
      if (title) {
        let newFiles = [];
        files.filter(
          (file) => file.name.includes(title) && newFiles.push(file)
        );
        return res.json(newFiles);
      }
      return res.json(files);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Cannot get files" });
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file;
      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      });
      const user = await User.findOne({ _id: req.user.id });

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: "There no space on the disk" });
      }
      user.usedSpace = user.usedSpace + file.size;

      let path;
      if (parent) {
        path = `${req.filePath}\\${user.id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${req.filePath}\\${user.id}\\${file.name}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "File already exists" });
      }
      file.mv(path);

      const type = file.name.split(".").pop();
      let filePath = file.name;
      if (parent) {
        filePath = parent.path + "\\" + file.name;
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent ? parent._id : null,
        user: user._id,
      });

      await dbFile.save();
      await user.save();

      res.json(dbFile);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Upload error" });
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });
      const path = fileService.getPath(req, file);
      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(400).json({ message: "Download error" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Download error" });
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });
      console.log(file);
      if (!file) {
        return res.status(400).json({ message: "File not found" });
      }

      fileService.deleteFile(req, file);
      await file.remove();
      return res.json({ message: "File was deleted" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Folder is not empty" });
    }
  }

  async uploadAvatar(req, res) {
    try {
      const file = req.files.file;
      const user = await User.findById(req.user.id);
      const avatarName = `${v4()}.jpg`;
      file.mv(`${req.staticPath}\\${avatarName}`);
      user.avatar = avatarName;
      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Upload avatar error" });
    }
  }

  async deleteAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id);
      fs.unlinkSync(`${req.staticPath}\\${user.avatar}`);
      user.avatar = null;
      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Delete avatar error" });
    }
  }
}

module.exports = new FileController();
