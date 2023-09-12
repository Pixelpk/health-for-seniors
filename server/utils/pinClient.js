const PinpointClient = require("@aws-sdk/client-pinpoint").PinpointClient;

// Set the AWS Region and your AWS access key and secret key.
const REGION = "us-east-1";
const AWS_ACCESS_KEY_ID = "AKIAYJALDLHGHP7ZTOXZ";
const AWS_SECRET_ACCESS_KEY = "EenTP/rv4o0ODYdp0+B1TWXZ5EV8c1Nx+2IlQEXX";

// Set the MediaConvert Service Object
const pinClient = new PinpointClient({
  region: REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = { pinClient };
