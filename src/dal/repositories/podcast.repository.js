import mongoose from 'mongoose';

const PodcastRepository = {
    get: (query, projection = {}) => mongoose.model('Podcast').findOne(query, projection),
    getAll: () => mongoose.model('Podcast').find(),
    createPodcast: podcast => mongoose.model('Podcast').create(podcast),
    updatePodcastInformation: (id, podcastInfo) => mongoose.model('Podcast').findByIdAndUpdate(
        id,
        { $set: { ...podcastInfo } },
        { new: true }
    )
};

export default PodcastRepository;
