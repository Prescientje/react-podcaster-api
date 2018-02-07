import PodcastService from '../../business/services/podcast.service';
import Response from './config/response';

const PodacastController = {
    getAllPodcasts: (req, res) => {
        const allPodcasts = PodcastService.getAllPodcasts();
        Response.json(res, 200, allPodcasts);
    },
    getPodcastById: (req, res) => {
        const { id } = req.params;
        const podcast = PodcastService.getById(id);
        Response.json(res, 200, podcast);
    }
};

export default PodacastController;
