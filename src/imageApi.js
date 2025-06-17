
import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'QcOtebRNO0irrj5xxHJuMzDzGgfZ6uVannyB9weKdIU'; 

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });

  return response.data;
};
