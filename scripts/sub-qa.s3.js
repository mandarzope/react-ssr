var s3 = require('juto-s3');

const aws = require('aws-sdk');

var cloudfront = new aws.CloudFront({
    apiVersion: '',
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
});
const lastArg = process.argv.pop();
const app = lastArg.slice(6);
var client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
        accessKeyId: "",
        secretAccessKey: "",
        signatureVersion: '',
        region: ''
    }
});


var params = {
    localDir: `./dist/${app}`,
    deleteRemoved: false,
    s3Params: {
        Bucket: "",
        Prefix: app,
    },
};

let invalidations = {
    DistributionId: '',
    InvalidationBatch: {
        CallerReference: Date.now() + '',
        Paths: {
            Quantity: 2,
            Items: [
                `/${app}/*`,
                `/${app}`
            ]
        }
    }
};

var uploader = client.uploadDir(params);
uploader.on('error', function (err) {
    console.error("unable to sync:", err.stack);
});
uploader.on('progress', function () {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function () {
    console.log("done uploading");
    cloudfront.createInvalidation(invalidations, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
});
