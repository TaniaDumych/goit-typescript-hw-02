import axios from 'axios';
import type { ImageData } from "./types";

const BASE_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'QcOtebRNO0irrj5xxHJuMzDzGgfZ6uVannyB9weKdIU';


interface FetchImagesResponse {
  total: number;
  images: ImageData[];
}

export const fetchImages = async (
  query: string,
  currentPage: number
): Promise<FetchImagesResponse> => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query: query,
      page: currentPage,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  return {
    total: response.data.total ?? 0,
    images: response.data.results ?? [], 
  };
};