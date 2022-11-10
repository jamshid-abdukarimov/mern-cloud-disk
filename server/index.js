const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.router");
const PORT = process.env.PORT || config.get("serverPort");
const cors = require("cors");
const filePathMiddleware = require("./middleware/filepath.middleware");
const path = require("path");

const app = express();
app.use(fileUpload({}));
app.use(filePathMiddleware.filePath(path.resolve(__dirname, "files")));
app.use(filePathMiddleware.staticPath(path.resolve(__dirname, "static")));
app.use(express.static("static"));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));
    app.listen(PORT, () => {
      console.log(`SERVER WORKS ON PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
