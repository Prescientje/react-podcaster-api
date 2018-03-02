import PodcastRepository from '../../dal/repositories/podcast.repository';
import AuthService from './auth.service';
import FileService from './file.service';

const PodcastService = {
    getAllPodcasts: () => PodcastRepository.getAll(),
    getById: id => PodcastRepository.get({ _id: id }, { __v: 0 }),
    createPodcast: (title, description, uploader) => new Promise((resolve, reject) => {
        AuthService.checkIfUserExists(uploader).then(() => {
            PodcastRepository.createPodcast({
                title, description, uploader
            }).then((podcast) => {
                resolve(podcast);
            }).catch(reject);
        }).catch(reject);
    }),
    updatePodcastInformation: (id, ...podcastInfo) => new Promise((resolve, reject) => {
        PodcastRepository.update(id, { ...podcastInfo }).then((podcast) => {
            resolve(podcast);
        }).catch(reject);
    }),
    addPodcast: (id, file) => new Promise((resolve, reject) => {
        PodcastService.getById(id).then((apodcast) => {
            if (apodcast) {
                if (file) {
                    const path = `podcasts/podcast_${apodcast._id}`;
                    FileService.addFile(file, path)
                        .then(result =>
                            PodcastService.updatePodcastInformation(id, result))
                        .then((podcast) => {
                            resolve(podcast);
                        }).catch(reject);
                } else {
                    resolve();
                }
            } else {
                reject(new Error('Podcast does not exist'));
            }
        });
    })
};

export default PodcastService;
