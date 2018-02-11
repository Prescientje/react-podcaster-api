import Response from './config/response';
import AuthService from '../../business/services/auth.service';

/**
 * ROUTE: /auth/*
 */

const AuthController = {
    login: (req, res) => {
        if (!req.headers.authorization || req.headers.authorization.split(':').length !== 2) {
            Response.error(res, 401, 'Authentication failed. Makes sure that you insert your username and password in the Authorization header split by a colon');
        } else {
            const usernamePasswordCombo = req.headers.authorization.split(':');
            const username = usernamePasswordCombo[0];
            const password = usernamePasswordCombo[1];
            AuthService.login(username, password).then((tokens) => {
                Response.custom(res, 200, tokens);
            }).catch((err) => {
                Response.error(res, 401, err);
            });
        }
    },
    register: (req, res) => {
        const {
            username, name, email, password
        } = req.body;
        if (!username || !name || !email || !password) {
            Response.error(res, 400, 'All fields including username, name, email and password are required');
        } else {
            AuthService.register(username, name, email, password).then((tokens) => {
                Response.custom(res, 200, tokens);
            }).catch((err) => {
                Response.error(res, 401, err);
            });
        }
    }
};

export default AuthController;
