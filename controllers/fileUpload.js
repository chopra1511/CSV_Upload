const mongodb = require("mongodb");
const File = require("../models/fileUpload");
const fs = require("fs");
const csvParser = require("csv-parser");
let err = " ";

exports.homePage = (req, res, next) => {
  File.find()
    .then((files) => {
      res.render("homepage", {
        title: "Home Page",
        files: files,
        error: err,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.uploadFile = (req, res, next) => {
    if (!req.file) {
      res.status(400).redirect("/");
      return err = "No file selected!";
  }

  if (req.file.mimetype != "text/csv") {
      res.status(400).redirect("/");
      return err = "Invalid file type! Please upload a CSV file."
  }
  let file = new File({
    fileName: req.file.originalname,
    filePath: req.file.path,
    file: req.file.filename,
  });

  file
    .save()
    .then((result) => {
      console.log(result);
        console.log("File Uploaded");
        err = " ";
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fileViewer = async (req, res, next) => {
  let id = req.params.id;
  let csvFile = await File.findOne({ _id: id });
  const results = [];
  const header = [];
  fs.createReadStream(csvFile.filePath)
    .pipe(csvParser())
    .on("headers", (headers) => {
      headers.map((headerRow) => header.push(headerRow));
    })
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.render("fileView", {
        title: "File Viewer",
        fileName: csvFile.fileName,
        header: header,
        data: results,
        length: results.length,
      });
    });
};

exports.deleteFile = (req, res, next) => {
  const id = req.body.deleteFileId;
  File.findByIdAndDelete(id)
    .then((result) => {
      console.log("Deleted!");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
