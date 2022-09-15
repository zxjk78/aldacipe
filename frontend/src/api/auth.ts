import axios from 'axios';

import { API_URL } from './http-config';

// refresh 만료 시 재발급 위한 응답 인터셉터 추가 (응답시 콜백, 에러시 콜백)

axios.interceptors.response.use(
  (response: any) => {
    console.log('인터셉터 정상 콜백', response);

    if (response?.success === false) {
      if (response?.code === 1013) {
      }
    }

    return response;
  },
  async (error) => {
    console.log('인터셉터 에러 콜백', error);

    const {
      config,
      response: { data },
    } = error;
    console.log(config, data);

    if (data.code === 1013) {
      const response = await axios.post(API_URL + `reissue`, {}, {});
      const { newAccessToken } = response.data;
      axios.defaults.headers.common['X-AUTH-TOKEN'] = newAccessToken;
      window.location.href = '/main';
    } else if (data.code === 1006) {
      window.location.href = '/login';
    }
  }
);
