const formidable = require('formidable');
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");
const { Transform } = require('stream');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

const parsefile = async (req) => {
    return new Promise((resolve, reject) => {
        const options = {
            maxFileSize: 100 * 1024 * 1024, // 100 MB limit
            allowEmptyFiles: false,
        };

        const form = formidable(options);
        let fieldsData = {}; // Object to capture fields

        form.on('field', (name, value) => {
            fieldsData[name] = value; // Store form fields as they are received
        });

        form.parse(req, (err) => {
            if (err) {
                return reject(err.message);
            }
        });

        form.on('error', (error) => {
            reject(error.message);
        });

        form.on('fileBegin', (formName, file) => {
            file.open = async function () {
                this._writeStream = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk);
                    },
                });

                this._writeStream.on('error', (e) => {
                    form.emit('error', e);
                });

                // Generate a unique file key using a UUID
                const uniqueKey = `${Date.now().toString()}-${uuidv4()}-${file.originalFilename}`;
                const upload = new Upload({
                    client: new S3Client({
                        credentials: {
                            accessKeyId,
                            secretAccessKey,
                        },
                        region,
                    }),
                    params: {
                        Bucket,
                        Key: uniqueKey,
                        Body: this._writeStream,
                    },
                    tags: [], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false, // optional manually handle dropped parts
                });

                upload.done()
                    .then((data) => {
                        const fileUrl = `https://${Bucket}.s3.${region}.amazonaws.com/${uniqueKey}`;
                        resolve({ fileUrl, fields: fieldsData });
                    })
                    .catch((err) => {
                        form.emit('error', err);
                    });
            };

            file.end = function (cb) {
                this._writeStream.on('finish', () => {
                    this.emit('end');
                    cb();
                });
                this._writeStream.end();
            };
        });
    });
};

module.exports = parsefile;
