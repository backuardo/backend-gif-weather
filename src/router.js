import { Router } from 'express';
import { getWeather } from './services/weather';
import { getGif } from './services/giphy';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the gif-weather api' });
});

router.route('/w/:lat/:long')
  .get(getWeather);

router.route('/g/:query')
  .get(getGif);

export default router;
