import { TAvailableCountries } from "@utils/types/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAvailableCountries = async (): Promise<TAvailableCountries> => {
  const response = await axios.get(`${API_URL}/available-countries`);
  console.log(response.data);

  return response.data;
};

export const getCountryInfo = async (countryCode: string) => {
  const response = await axios.get(`${API_URL}/country-info/${countryCode}`);
  return response.data;
};
