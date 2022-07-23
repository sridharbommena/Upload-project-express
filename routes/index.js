const express = require("express");
const router = express.Router();
const controller = require("../controller/file-upload.controller");
const multer  = require('multer')

const maxSize = 2 * 1024 * 1024
// const upload = multer({ dest: 'uploads/', limits: { fileSize: maxSize } });
const upload = multer();

let routes = (app) => {
  router.post("/upload", upload.array('files'), controller.upload);
  // router.get("/", function(req, res) {
  //   res.sendFile('../public/index.html', {root: __dirname })});
  // app.use(router);
};

module.exports = routes;
