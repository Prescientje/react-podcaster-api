import express from 'express';
import bodyParser from 'body-parser';

import AuthController from '../controllers/auth.controller';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

// Availible via the base_url/auth route
router.route('/login')
    .post(AuthController.login);

router.route('/register')
    .post(AuthController.register);


export default router;
