import Response from '../../controllers/config/response';
import AuthService from '../../../business/services/auth.service';

const RouterService = {
    canPost: (req, res, next) => {
        const { payload, body: { uploader } } = req;
        const isAccessible = AuthService.canAccess(payload, uploader);
        if (isAccessible) {
            next();
        } else {
            Response.error(res, 401, `Unable to create this podcast under this username: ${uploader})`);
        }
    },
    canUpdate: (req, res, next) => {
        const { payload, params: { id } } = req;
        AuthService.canUpdate(payload, id)
            .then(() => next())
            .catch((error) => {
                Response.error(res, 401, error);
            });
    }
};

export default RouterService;
