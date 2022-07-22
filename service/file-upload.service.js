const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const stream = require('stream');

const CLIENT_ID = '44659227801-eo7qhobi7uj5b8jpjjvht2uuqf1fsl4a.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04dZOtgDV3rFwCgYIARAAGAQSNwF-L9IrSRFuD20lFktXOJ34vKp2h7j9HWgCHnVMYZ1oUBkY42MZxkSxzuw_BPIj02i3z3R1hP0';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: "v3",
    auth: oAuth2Client
})



const uploadFile =  async function fileUpload(file)
{
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    
    // const filePath = file.path;
    console.log("file uploading.."+ file.originalname);
    try{
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: file.mimetye
            },
            media: {
                mimeType: file.mimetye,
                body: bufferStream
            }
        });
        console.log("Uploaded...");
        console.log(response.data);
        return(response);
    }catch(error)
    {
        console.log("Error:");
        return(error);
    }
}

module.exports = uploadFile;