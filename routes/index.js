const express = require("express");
const router = express.Router();
const controller = require("../controller/file-upload.controller");
const multer  = require('multer')

const maxSize = 2 * 1024 * 1024
const upload = multer({ dest: 'uploads/', limits: { fileSize: maxSize } })

let routes = (app) => {
  router.post("/upload", upload.single('file'), controller.upload);
  app.use(router);
};

module.exports = routes;
