const fs = require("fs");
const File = require("../models/File");
const config = require("config");

class FileService {
  getPath(req, file) {
    return `${req.filePath}\\${file.user}\\${file.path}`;
  }

  createDir(req, file) {
    const filePath = this.getPath(req, file);
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created successfully!" });
        } else {
          return reject({ message: "File already exists" });
        }
      } catch (error) {
        console.log("file service error", error);
        return reject({ message: "File error" });
      }
    });
  }
  deleteFile(req, file) {
    let path = this.getPath(req, file);
    if (file.type === "dir") {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
}

module.exports = new FileService();
