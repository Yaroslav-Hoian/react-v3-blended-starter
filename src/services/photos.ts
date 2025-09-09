import axios from "axios";
import type { PhotoHTTPResponse } from "../types/photo";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

export const getPhotos = async (query: string): Promise<PhotoHTTPResponse> => {
  const response = await axios.get<PhotoHTTPResponse>(`search?query=${query}`);

  return response.data;
};
