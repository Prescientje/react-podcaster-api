import express from 'express';
import bodyParser from 'body-parser';

import PodcastController from '../controllers/podcast.controller';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

// Availible via the base_url/podcasts route
router.route('/')
    .get(PodcastController.getAllPodcasts);


export default router;
