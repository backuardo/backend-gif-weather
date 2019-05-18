import axios from 'axios';
import moment from 'moment';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ROOT_URL = 'https://api.darksky.net/forecast';
const EXCLUSIONS = 'minutely,hourly,alerts,flags';

// eslint-disable-next-line import/prefer-default-export
const getWeather = (lat, lng) => {
  const { DARKSKY_KEY } = process.env;

  return new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}/${DARKSKY_KEY}/${lat},${lng}?exclude=${EXCLUSIONS}`)
      .then((response) => {
        const curr = response.data.currently;
        const { daily } = response.data;
        const result = {
          currently: {
            time: moment(curr.time, 'X').format('dddd, MM/DD/YYYY, h:mm:ss a'),
            summary: curr.summary,
            icon: curr.icon,
            temperature: curr.temperature,
            humidity: curr.humidity,
          },
          daily: {
            summary: daily.summary,
            icon: daily.icon,
            data: daily.data.map((time) => {
              return {
                time: moment(time.time, 'X').format('dddd, MM/DD/YYYY'),
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
