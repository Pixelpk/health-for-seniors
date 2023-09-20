import axios from "axios";
import { baseURL } from "../../constants";

export const sendEmail = async (body: any) => {
  const response = await axios.post(baseURL + "send-email", body);
  return response.data;
};
