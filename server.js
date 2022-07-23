const cors = require("cors");
const express = require("express");
const path = require("path");
const multer  = require('multer');
const controller = require("./controller/file-upload.controller");

const app = express();

global.__basedir = __dirname;
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: true }));

// middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false } )); // this is to handle URL encoded data
// app.use(upload());


const upload = multer();

// enable static files pointing to the folder "public"
app.use(express.static(path.join(__dirname, "public")));
app.post("/upload", upload.array('files'), controller.upload);

const initRoutes = require("./routes");
initRoutes(app);
let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});