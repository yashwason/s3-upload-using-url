const AWS = require('aws-sdk'),
    fetch = require(`node-fetch`);

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-json-file.html
AWS.config.loadFromPath('./config.json');
const S3 = new AWS.S3();

const uploadFileToS3 = (url, bucket, key) => {
    /*
        url = url of file to be uploaded
        bucket = name of S3 bucket to upload the file to
        key = name of the file after uploading to S3
    */
   
    const params = {
        Bucket: bucket,
        Key: key,
        ACL: 'public-read',
    }

    return fetch(url)
    .then((res) => {
        params.ContentType = res.headers.get(`content-type`);
        return res.buffer();
    })
    .then((buffer) => {
        params.Body = buffer;
        return S3.putObject(params).promise();
    })
    .catch((err) => console.log(err));
}

module.exports = uploadFileToS3;