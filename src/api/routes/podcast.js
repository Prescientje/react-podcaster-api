import express from 'express';
import bodyParser from 'body-parser';

import PodcastController from '../controllers/podcast.controller';
import { auth } from '../../dal/config/config'; // Fix this later, should not import from dal layer
import RouterService from './services/router.service';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

// Availible via the base_url/podcast route
router.route('/:id')
    .get(PodcastController.getPodcastById);

router.route('')
    .post(auth, RouterService.canPost, PodcastController.createPodcast)


export default router;
