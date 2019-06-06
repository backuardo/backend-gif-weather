import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const getGeocode = (query) => {
  const { GEO_KEY } = process.env;

  return new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}?address=${query}&tag=${query}&key=${GEO_KEY}`)
      .then((response) => {
        const result = {
          location: response.data.results[0].formatted_address,
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        };
        resolve(result);
      })
      .catch((error) => {
        console.log(`geo error: ${error}`);
        reject(error);
      });
  });
};

export default getGeocode;
