import express from 'express';
import { WikiController } from '../controllers/wiki.controller';

const router = express.Router();
const wikiController = new WikiController();

router.get('/', wikiController.getWikiData);
router.get('/wikipedia', wikiController.getWikiDataWithWikipediaClient);

export default router;
