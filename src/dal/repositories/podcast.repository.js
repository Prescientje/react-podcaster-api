import mongoose from 'mongoose';

const PodcastRepository = {
    getById: query => mongoose.model('Podcast').findOne(query),
    getAll: () => mongoose.model('Podcast').find()
};

export default PodcastRepository;
