import { Router } from 'express';
import getWeather from './services/weather';
import getGif from './services/giphy';
import getGeocode from './services/geocode';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the gif-weather api' });
});

router.get('/:query', async (req, res) => {
  const { query } = req.params;

  try {
    const geo = await getGeocode(query);
    const weather = await getWeather(geo.lat, geo.lng);
    const gif = await getGif(weather.currently.summary);
    res.send({ location: geo.location, weather, gif });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
