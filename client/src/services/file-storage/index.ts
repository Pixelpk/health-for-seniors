import axios from "axios";
import { baseURL } from "../../constants";

export const readFiles = async (
  query: String,
  prefix: String,
  searchQuery: String
) => {
  const response = await axios.post(
    baseURL + `get-files?userID=${query}&prefix=${prefix}&search=${searchQuery}`
  );
  return response.data;
};
