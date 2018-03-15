import multer from 'multer';
import crypto from 'crypto';
import mime from 'mime';
import fs from 'fs';
import path from 'path';

import AWSService from './aws.service';

const MAX_SIZE = 50000000;
const NUMBER_OF_FILES = 1;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) {
                console.error('Error encrypting filename', err);
            } else {
                cb(null, `${raw.toString('hex') + Date.now()}.${mime.getExtension(file.mimetype)}`);
            }
        });
    }
});

export const upload = multer({ // eslint-disable-line
    storage,
    limits: {
        fileSize: MAX_SIZE,
        files: NUMBER_OF_FILES
    }
});

const FileService = {
    addFile: (picture, serverPath) => new Promise((resolve, reject) => {
        try {
            const filepath = path.join(__dirname, '../../../', picture.path);
            const file = fs.readFileSync(filepath);
            const extension = mime.getExtension(picture.mimetype);
            const mimeType = picture.mimetype;

            fs.unlinkSync(filepath);
            AWSService.postFile(`${serverPath}.${extension}`, file, mimeType)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.error('Error when posting image', err);
                    reject(new Error(`Error when posting image: ${err}`));
                });
        } catch (e) {
            console.error('Error while getting image off of server (catch)', e);
            reject(new Error(`Error while getting image off of server (catch) ${e})`));
        }
    })
};

export default FileService;

