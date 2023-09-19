import axios from 'axios';
import { baseURL } from '../../constants';

export const login = async (body: any) => {
  const response = await axios.post(baseURL + 'login', body);
  return response.data;
};
