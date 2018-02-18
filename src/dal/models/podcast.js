import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true,
        default: Date.now()
    },
    uploader: {
        type: String,
        required: true
    }
});

const podcastModel = mongoose.model('Podcast', podcastSchema);

export default podcastModel;
