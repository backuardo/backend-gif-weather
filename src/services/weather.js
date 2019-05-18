import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ slient: true });

const ROOT_URL = 'https://api.darksky.net/forecast';
const EXCLUSIONS = 'minutely,hourly,alerts,flags';


// eslint-disable-next-line import/prefer-default-export
export const getWeather = (req, res) => {
  const { lat, long } = req.params;
  const { DARKSKY_KEY } = process.env;
  axios.get(`${ROOT_URL}/${DARKSKY_KEY}/${lat},${long}?exclude=${EXCLUSIONS}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
