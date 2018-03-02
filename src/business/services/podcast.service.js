import PodcastRepository from '../../dal/repositories/podcast.repository';
import AuthService from './auth.service';

const PodcastService = {
    getAllPodcasts: () => PodcastRepository.getAll(),
    getById: id => PodcastRepository.get({ _id: id }),
    createPodcast: (title, description = '', uploader, uploadLocation) => new Promise((resolve, reject) => {
        AuthService.checkIfUserExists(uploader).then(() => {
            PodcastRepository.createPodcast({
                title, description, uploader, uploadLocation
            }).then((podcast) => {
                resolve(podcast);
            }).catch(reject);
        }).catch(reject);
    })
};

export default PodcastService;
