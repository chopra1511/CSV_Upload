const express = require("express");
const multer = require('multer')
const { homePage, uploadFile, deleteFile, fileViewer } = require("../controllers/fileUpload");
const router = express.Router();

const upload = multer({dest: 'uploads'})

router.get("/", homePage);

router.post("/upload", upload.single('file'), uploadFile);

router.get("/view/:id", fileViewer);

router.post("/delete", deleteFile);


module.exports = router;
