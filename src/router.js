import { Router } from 'express';
import { getWeather } from './services/weather';
import getGif from './services/giphy';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the gif-weather api' });
});

router.get('/:lat/:long', async (req, res) => {
  const { lat, long } = req.params;
  const weather = await getWeather(lat, long);
  const gif = await getGif(weather.currently.summary);
  res.send({ weather, gif });
});

export default router;
