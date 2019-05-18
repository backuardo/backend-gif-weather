import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ROOT_URL = 'https://api.giphy.com/v1/gifs/random';

const getGif = (query) => {
  const { GIPHY_KEY } = process.env;
  query += ' weather';
  return new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}?api_key=${GIPHY_KEY}&tag=${query}`)
      .then((response) => {
        resolve(response.data.data.image_original_url);
      })
      .catch((error) => {
        console.log(`gif error: ${error}`);
        reject(error);
      });
  });
};

export default getGif;
