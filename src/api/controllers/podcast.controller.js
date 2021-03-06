import PodcastService from '../../business/services/podcast.service';
import Response from './config/response';
import { upload } from '../../business/services/file.service';

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
            title, description, uploader
        } = req.body;
        if (!title || !uploader || !description) {
            Response.error(res, 400, 'Title, Uploader, and Description are required');
        } else {
            PodcastService.createPodcast(title, description, uploader).then((podcast) => {
                Response.json(res, 200, podcast);
            }).catch((err) => {
                Response.error(res, 404, err);
            });
        }
    },
    storeFile: (req, res) => {
        upload.single('podcast')(req, res, (fileError) => {
            if (fileError) {
                Response.error(res, 400, 'The file uploaded was larger than 50mb');
            } else {
                PodcastService.addPodcast(req.params.id, req.file).then((podcastLocation) => {
                    Response.json(res, 200, podcastLocation);
                }).catch((err) => {
                    Response.error(res, 404, err);
                });
            }
        });
    },
    updatePodcastInformation: (req, res) => {
        const { id } = req.params;
        PodcastService.updatePodcastInformation(id, req.body).then((podcast) => {
            Response.json(res, 200, podcast);
        }).catch((err) => {
            Response.error(res, 404, err);
        });
    }
};

export default PodcastController;
