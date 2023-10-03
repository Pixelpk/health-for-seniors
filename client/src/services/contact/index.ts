import axios from "axios";
import { baseURL } from "../../constants";

export const readContacts = async () => {
  const response = await axios.get(baseURL + "read-users");
  return response.data;
};
