import PodcastService from '../../business/services/podcast.service';
import Response from './config/response';

const PodcastController = {
    getAllPodcasts: (req, res) => {
        PodcastService.getAllPodcasts().then((podcasts) => {
            Response.json(res, 200, podcasts);
        }).catch((err) => {
            console.log(err);
            Response.error(res, 404, err);
        });
    },
    getPodcastById: (req, res) => {
        const { id } = req.params;
        const podcast = PodcastService.getById(id);
        Response.json(res, 200, podcast);
    }
};

export default PodcastController;
