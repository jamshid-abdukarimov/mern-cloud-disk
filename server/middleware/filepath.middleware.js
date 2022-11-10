class Path {
  filePath(path) {
    return function (req, res, next) {
      req.filePath = path;
      next();
    };
  }

  staticPath(path) {
    return function (req, res, next) {
      req.staticPath = path;
      next();
    };
  }
}

module.exports = new Path();
