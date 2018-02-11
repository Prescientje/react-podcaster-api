import express from 'express';
import bodyParser from 'body-parser';

import PodcastController from '../controllers/podcast.controller';
import { auth } from '../../dal/config/config'; // Fix this later, should not import from dal layer

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

// Availible via the base_url/podcast route
router.route('/')
    .get(PodcastController.getAllPodcasts);

router.route('/:id')
    .get(auth, PodcastController.getPodcastById);


export default router;
