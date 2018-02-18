import PodcastRepository from '../../dal/repositories/podcast.repository';

const PodcastService = {
    getAllPodcasts: () => new Promise((resolve, reject) => {
        PodcastRepository.getAll().then((podcasts) => {
            resolve(podcasts);
        }).catch(reject);
    }),
    getById: id => `Podcast ${id}`
};

export default PodcastService;
