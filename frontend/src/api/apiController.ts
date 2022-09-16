import axios, { AxiosResponse } from 'axios';

import { API_URL } from './http-config';

export const axiosAuthInstance = axios.create({
  baseURL: API_URL,
  timeout: 2000,
});

axiosAuthInstance.interceptors.request.use(
  (config: any) => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers['X-AUTH-TOKEN'] =
      axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN'];
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
axiosAuthInstance.interceptors.response.use(
  async (response: any) => {
    console.log('axios Auth 통신 성공', response);
    if (response?.success === false) {
      console.log(
        '만료 응답 success:false 중 에러코드 1013이 accessToken 만료입니다.'
      );
      // 리이슈 전에 보내려던 원래 요청을 저장해놓는 로직 필요

      const reissueRes = await axiosAuthInstance.post(
        API_URL + `reissue`,
        { accessToken: axios.defaults.headers.common['X-AUTH-TOKEN'] },
        { withCredentials: true }
      );
      const { newAccessToken } = reissueRes.data;
      axios.defaults.headers.common['X-AUTH-TOKEN'] = newAccessToken;
    } else if (response?.code === 1006) {
      window.location.href = '/login';
    }
    return response;
  },
  (error) => {
    console.log('axios Auth 통신 실패', error);
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   async (response: any) => {
//     console.log('인터셉터 성공 콜백.', response);

//     if (response?.success === false) {
//       if (response?.code === 1013) {
//         console.log(
//           '만료 응답 success:false 중 에러코드 1013이 accessToken 만료입니다.'
//         );

//         // 현재 요청들을 어디다가 keep 해놓아야한다.

//         const reissueRes = await axios.post(
//           API_URL + `reissue`,
//           { accessToken: axios.defaults.headers.common['X-AUTH-TOKEN'] },
//           { withCredentials: true }
//         );
//         const { newAccessToken } = reissueRes.data;
//         axios.defaults.headers.common['X-AUTH-TOKEN'] = newAccessToken;
//       } else if (response?.code === 1006) {
//         window.location.href = '/login';
//       }
//     }

//     return response;
//   },
//   (error) => {
//     console.log('인터셉터 에러 콜백', error);
//   }
// );
