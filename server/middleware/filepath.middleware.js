const fs = require("fs");
class Path {
  filePath(path) {
    return function (req, res, next) {
      if (!fs.existsSync(path)) fs.mkdirSync(path);

      req.filePath = path;
      next();
    };
  }

  staticPath(path) {
    return function (req, res, next) {
      if (!fs.existsSync(path)) fs.mkdirSync(path);

      req.staticPath = path;
      next();
    };
  }
}

module.exports = new Path();
