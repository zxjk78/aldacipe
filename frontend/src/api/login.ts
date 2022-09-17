import { API_URL } from './http-config';
import { axiosPostCommonInstance, axiosAuthInstance } from './apiController';
import axios from 'axios';
export const login = async (userInfo: { email: string; password: string }) => {
  try {
    const response = await axiosPostCommonInstance({
      url: API_URL + 'login',
      method: 'POST',
      data: userInfo,
    });

    if (response.data.success) {
      const { accessToken, accessTokenExpireDate } = response.data.data;
      axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN'] = accessToken;
      localStorage.setItem('expireDate', accessTokenExpireDate);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
