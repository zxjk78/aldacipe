import { API_URL } from './http-config';
import moment from 'moment';
import { axiosAuthInstance, axiosCommonInstance } from './apiController';
import { setCookie, removeCookie } from './cookie';

export const login = async (userInfo: { email: string; password: string }) => {
  try {
    const response = await axiosCommonInstance({
      url: API_URL + 'login',
      method: 'POST',
      data: userInfo,
      withCredentials: true,
    });

    if (response.data.success) {
      const { accessToken, accessTokenExpireDate } = response.data.data;
      // accessToken은 cookie에 저장
      setCookie('accessToken', accessToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
      // 만료기간은 response만 intercept 사용해서 할꺼면 의미없긴함, 일단은 저장
      setCookie('accessTokenExpireDate', accessTokenExpireDate, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function logout() {
  try {
    // localStorage.removeItem('expireDate');
    // localStorage.removeItem('isLoggedIn');

    // console.log(axiosAuthInstance.defaults.headers.common);
    // console.log(axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN']);

    const response = await axiosAuthInstance.delete(API_URL + 'log-out', {});

    if (response.data.success) {
      removeCookie('accessToken');
      removeCookie('accessTokenExpireDate');
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

// axios delete 로 x-auth token 넣어준 경우는 됨

// export async function logout() {
//   try {
//     const response = await axios.delete(API_URL + 'log-out', {});
//     console.log(response);

//     // if (response.data.success) {
//     //   axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN'] = '';
//     //   return true;
//     // }
//   } catch (err) {
//     console.log(err);
//   }
// }
