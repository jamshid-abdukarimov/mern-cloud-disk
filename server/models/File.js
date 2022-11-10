const { model, Schema } = require("mongoose");

const File = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  path: { type: String, default: "" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  parent: { type: Schema.Types.ObjectId, ref: "File" },
  childs: [{ type: Schema.Types.ObjectId, ref: "File" }],
});

module.exports = model("File", File);
