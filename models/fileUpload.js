const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: {
      options: { timeZone: "Asia/Kolkata" },
    },
  }
);


module.exports = mongoose.model("File", fileSchema);