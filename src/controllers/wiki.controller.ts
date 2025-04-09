import { Request, Response } from 'express';
import { WikiService } from '../services/wiki.service';

export class WikiController {
  private wikiService: WikiService;

  constructor() {
    this.wikiService = new WikiService();
  }

  getWikiData = async (req: Request, res: Response) => {
    try {
      const data = await this.wikiService.getWikiData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch wiki data' });
    }
  };

  getWikiDataWithWikipediaClient = async (req: Request, res: Response) => {
    try {
      const data = await this.wikiService.getWikiDataWithWikipediaClient();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch wiki data with Wikipedia client' });
    }
  };
}
