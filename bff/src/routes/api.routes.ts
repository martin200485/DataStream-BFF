import { Router } from 'express';
import { getPosts, addPost } from '../services/cache.service';

const router = Router();

router.get('/data', async (req, res) => {
  const data = await getPosts();
  res.json(data);
});

router.post('/create', async (req, res) => { 
  const { userId, id, title, body } = req.body;
  await addPost({ userId, id, title, body });
  res.sendStatus(200);
});

export default router;