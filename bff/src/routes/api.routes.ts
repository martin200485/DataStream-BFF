import { Router } from 'express';
import { getPosts } from '../services/cache.service';

const router = Router();

router.get('/data', async (req, res) => {
  const data = await getPosts();
  res.json(data);
});

export default router;