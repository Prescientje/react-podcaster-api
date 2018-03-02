import PodcastService from '../../business/services/podcast.service';
import Response from './config/response';

const PodcastController = {
    getAllPodcasts: (req, res) => {
        PodcastService.getAllPodcasts().then((podcasts) => {
            Response.json(res, 200, podcasts);
        }).catch((err) => {
            Response.error(res, 404, err);
        });
    },
    getPodcastById: (req, res) => {
        const { id } = req.params;
        PodcastService.getById(id).then((podcast) => {
            Response.json(res, 200, podcast);
        }).catch((err) => {
            Response.error(res, 404, err);
        });
    },
    createPodcast: (req, res) => {
        const {
            title, description, uploader, uploadLocation
        } = req.body;
        if (!title || !uploader || !uploadLocation) {
            Response.error(res, 400, 'Title, Uploader and UploadLocation are required');
        } else {
            PodcastService.createPodcast(title, description, uploader, uploadLocation).then((podcast) => {
                Response.json(res, 200, podcast);
            }).catch((err) => {
                Response.error(res, 404, err);
            });
        }
    }
};

export default PodcastController;
