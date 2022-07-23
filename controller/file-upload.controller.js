const uploadFile = require("../service/file-upload.service");

const upload = async (req, res) => {
  try {
    // console.log(req);
    if ( req.files.length == 0) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    if(req.files.length>3)
    {
      return res.status(400).send({message: "Total files count exceeds than 3, please upload 3 or less files."})
    }

      responseArray = [];
      for(i=0;i<req.files.length;i++)
      {
        const response = await uploadFile(req.files[i]);
        responseArray.push(response.data);
      }      
      res.status(200).send(responseArray);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};

/*
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};
*/

/*
const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
*/

module.exports = {
  upload,
//  getListFiles,
//  download,
};