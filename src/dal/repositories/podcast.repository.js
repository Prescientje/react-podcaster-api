import mongoose from 'mongoose';

const PodcastRepository = {
    get: query => mongoose.model('Podcast').findOne(query),
    getAll: () => mongoose.model('Podcast').find(),
    createPodcast: podcast => mongoose.model('Podcast').create(podcast)
};

export default PodcastRepository;
