import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ROOT_URL = 'https://api.darksky.net/forecast';
const EXCLUSIONS = 'minutely,alerts,flags';

// eslint-disable-next-line import/prefer-default-export
const getWeather = (lat, lng) => {
  const { DARKSKY_KEY } = process.env;

  return new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}/${DARKSKY_KEY}/${lat},${lng}?exclude=${EXCLUSIONS}?units=auto`)
      .then((response) => {
        const { currently } = response.data;
        const result = {
          summary: currently.summary,
          icon: currently.icon,
          temperature: currently.temperature,
        };
        resolve(result);
      })
      .catch((error) => {
        console.log(`weather error: ${error}`);
        reject(error);
      });
  });
};

export default getWeather;
