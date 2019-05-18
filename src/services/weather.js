import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ROOT_URL = 'https://api.darksky.net/forecast';
const EXCLUSIONS = 'minutely,hourly,alerts,flags';

// eslint-disable-next-line import/prefer-default-export
export const getWeather = (lat, long) => {
  const { DARKSKY_KEY } = process.env;

  return new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}/${DARKSKY_KEY}/${lat},${long}?exclude=${EXCLUSIONS}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(`weather error: ${error}`);
        reject(error);
      });
  });
};
