import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ slient: true });

const ROOT_URL = 'https://api.giphy.com/v1/gifs/search';
const LIMIT = '1';

// eslint-disable-next-line import/prefer-default-export
export const getGif = (req, res) => {
  const { query } = req.params;
  const { GIPHY_KEY } = process.env;
  axios.get(`${ROOT_URL}?api_key=${GIPHY_KEY}&q=${query}&limit=${LIMIT}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
