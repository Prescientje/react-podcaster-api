import UserRepository from '../../dal/repositories/user.repository';
import PodcastRepository from '../../dal/repositories/podcast.repository';

const AuthService = {
    login: (username, password) => new Promise((resolve, reject) => {
        UserRepository.get({ username }).then((user) => {
            if (!user.validPassword(password)) {
                reject(new Error('Authentication failed. Wrong password.'));
            } else {
                user.generateJwt().then((tokenObj) => {
                    const { accessToken, expiresIn } = tokenObj;
                    resolve({
                        access_token: accessToken,
                        expires_in: expiresIn,
                        token_type: 'Bearer'
                    });
                });
            }
        }).catch((err) => {
            reject(err);
        });
    }),
    register: (username, name, email, password) => new Promise((resolve, reject) => {
        UserRepository.get({ username }).then((auser) => {
            if (auser) {
                reject(new Error('Username is already taken'));
            } else {
                UserRepository.createUser(username, name, email, password).then((tokenObj) => {
                    const { accessToken, expiresIn } = tokenObj;
                    resolve({
                        access_token: accessToken,
                        expires_in: expiresIn,
                        token_type: 'Bearer'
                    });
                });
            }
        }).catch((err) => {
            reject(new Error(`An error has occcured: ${err}`));
        });
    }),
    checkIfUserExists: username => new Promise((resolve, reject) => {
        UserRepository.get({ username }).then((auser) => {
            if (auser) {
                resolve(auser);
            } else {
                reject(new Error('User does not exist'));
            }
        }).catch(reject);
    }),
    canAccess: (payload, username) => payload.username === username,
    canUpdate: (payload, id) => new Promise((resolve, reject) => {
        PodcastRepository.get({
            _id: id
        }).then((podcast) => {
            if (payload.username === podcast.uploader) {
                resolve();
            } else {
                reject(new Error('Unable to update this podcast'));
            }
        }).catch(() => {
            reject(new Error('Podcast not found'));
        });
    })
};

export default AuthService;
