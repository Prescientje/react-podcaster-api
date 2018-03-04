import PodcastRepository from '../../dal/repositories/podcast.repository';

const PodcastService = {
    getAllPodcasts: () => new Promise((resolve, reject) => {
        PodcastRepository.getAll().then((podcasts) => {
            resolve(podcasts);
        }).catch(reject);
    }),
    getById: id => () => new Promise((resolve, reject) => {
        PodcastRepository.getById(id).then((podcast) => {
            resolve(podcast);
        }).catch(reject);
    })
};

export default PodcastService;
