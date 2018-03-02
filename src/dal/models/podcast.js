import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    dateUploaded: {
        type: Date,
        required: true,
        default: Date.now()
    },
    uploader: {
        type: String,
        required: true
    },
    uploadLocation: {
        type: String
    }
});

const podcastModel = mongoose.model('Podcast', podcastSchema);

export default podcastModel;
