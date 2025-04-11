import axios, { AxiosHeaders } from "axios";

export const httpClient = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const headers = new AxiosHeaders();

  return axios.create({
    baseURL,
    headers,
  });
};
