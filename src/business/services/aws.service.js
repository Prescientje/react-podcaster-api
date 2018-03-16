import AWS from 'aws-sdk';

export const BUCKET = 'podcastr-storage1';
export const REGION = 'us-east-2';
export const KEY_START = 'uploads/';

const config = new AWS.Config({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: REGION
});

AWS.config.update(config);

const S3 = new AWS.S3();

const AWSService = {
    postFile: (key, file, mimeType) => new Promise((resolve, reject) => {
        try {
            const params = {
                Bucket: BUCKET,
                Key: key,
                Body: file,
                ACL: 'public-read',
                ContentType: mimeType
            };
            console.log('AWS', BUCKET);
            S3.putObject(params, (err, data) => {
                if (err) {
                    console.error('Error when posting image', err);
                    reject(new Error(`Error when posting image: ${err}`));
                } else {
                    resolve({
                        url: `https://s3.us-east-2.amazonaws.com/${BUCKET}/${key}`,
                        data
                    });
                }
            });
        } catch (e) {
            console.error('Error when posting image (catch)', e);
            reject(new Error(`Error when posting image (catch): ${e}`));
        }
    }),
    deleteFile: url => new Promise((resolve, reject) => {
        try {
            const key = KEY_START + url.split('%2F')[1];
            console.log(key);
            const params = {
                Bucket: BUCKET,
                Delete: {
                    Objects: [{
                        Key: key
                    }]
                }
            };
            S3.deleteObjects(params, (err, data) => {
                if (err) {
                    reject(new Error(`Error while deleting file: ${err}`));
                } else {
                    resolve(data);
                }
            });
        } catch (e) {
            reject(new Error(`Error while deleting file: ${e}`));
        }
    })
};

export default AWSService;
