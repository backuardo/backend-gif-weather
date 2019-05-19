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
        const {
          timezone, currently, hourly, daily,
        } = response.data;
        console.log(timezone);
        const result = {
          currently: {
            summary: currently.summary,
            icon: currently.icon,
            temperature: currently.temperature,
            humidity: currently.humidity,
          },
          hourly: {
            summary: hourly.summary,
            data: hourly.data.slice(1, 14).map((time) => {
              return {
                time: time.time,
                summary: time.summary,
                icon: time.icon,
                temperature: time.temperature,
              };
            }),
          },
          daily: {
            summary: daily.summary,
            icon: daily.icon,
            data: daily.data.map((time) => {
              return {
                time: time.time,
                summary: time.summary,
                icon: time.icon,
                high: time.temperatureHigh,
                low: time.temperatureLow,
              };
            }),
          },
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
