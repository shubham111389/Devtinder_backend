const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECREATE_ACCESS_KEY,
  },
});




console.log("SES Client initialized with region:", sesClient

);

module.exports = { sesClient };