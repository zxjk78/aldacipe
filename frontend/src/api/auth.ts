import { API_URL } from './config/http-config';
import moment from 'moment';
import axios from 'axios';
import { axiosCommonInstance, axiosAuthInstance } from './config/apiController';
import { setCookie, removeCookie, getCookie } from './config/cookie';

export const login = async (userInfo: { email: string; password: string }) => {
  try {
    const response = await axiosCommonInstance.post('login', userInfo, {
      withCredentials: true,
    });

    if (response.data.success) {
      const { accessToken, accessTokenExpireDate } =
        response.data.data.tokenData;

      const { userId } = response.data.data;
      // accessToken, 만료기간 cookie에 저장
      setCookie('accessToken', accessToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });

      setCookie('accessTokenExpireDate', accessTokenExpireDate, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });

      // userId localStorage에 저장
      localStorage.setItem('userId', userId);

      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function logout() {
  // console.log('로그아웃합니다.');

  try {
    const response = await axiosAuthInstance.delete('log-out', {});

    removeCookie('accessToken');
    removeCookie('accessTokenExpireDate');

    return true;
  } catch (err) {
    // console.log(err);
  }
}
