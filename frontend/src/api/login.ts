import { API_URL } from './http-config';
import { axiosAuthInstance } from './apiController';
export const login = async (userInfo: { email: string; password: string }) => {
  return axiosAuthInstance({
    url: API_URL + 'login',
    method: 'POST',
    data: userInfo,
  });
};
