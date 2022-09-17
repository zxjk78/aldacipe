import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { getCookie, setCookie, removeCookie } from './cookie';
import { API_URL } from './http-config';

async function reissueToken() {
  try {
    const reissueRes = await axios.post(
      API_URL + 'reissue',
      {
        accessToken: getCookie('accessToken'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': API_URL,
        },
        withCredentials: true,
      }
    );
    console.log('재발급받았습니다.');
    return reissueRes.data.data;
  } catch (error: any) {
    // refresh token도 만료된 상황이면
    if (error.response.data.code === 1006) {
      // console.log('refresh도 유효기한을 넘겼습니다.');
      removeCookie('accessToken');
      removeCookie('accessTokenExpireDate');
      window.location.reload();
    }
  }
}

export const axiosCommonInstance = axios.create({
  timeout: 10000,
});

axiosCommonInstance.interceptors.request.use(
  (config: any) => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// X-AUTH-TOKEN으로 인증 필요로 하는 요청들
export const axiosAuthInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': API_URL,
  },
  withCredentials: true,
  timeout: 10000,
});
axiosAuthInstance.interceptors.request.use(
  async (config: any) => {
    const expireTime = moment(new Date(getCookie('accessTokenExpireDate')));

    // 요청-응답 소요 유효기간 지날 것 같으면 재발급위해서, 30초 전에 미리 재발급 요청
    const currentAddRequestTime = moment(moment().add(30, 'seconds'));
    if (expireTime < currentAddRequestTime) {
      // console.log('요청쪽에서 재발급 합니다.');
      const reissueRes = await reissueToken();
      if (reissueRes) {
        const { accessToken, accessTokenExpireDate } = reissueRes;
        setCookie('accessToken', accessToken);
        setCookie('accessTokenExpireDate', accessTokenExpireDate);
      }
    }

    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers['X-AUTH-TOKEN'] = getCookie('accessToken');
    // console.log(config.headers['X-AUTH-TOKEN']);
    // console.log(getCookie('accessToken'));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosAuthInstance.interceptors.response.use(
  async (response) => {
    // false가 온 경우: accessToken 만료인 경우
    if (!response.data.success) {
      console.log(response);

      if (response.data.code === 1013) {
        // console.log('응답쪽에서 재발급 합니다.');

        const reissueRes = await axios.post(API_URL + 'reissue', {
          accessToken: getCookie('accessToken'),
        });

        const { accessToken, accessTokenExpireDate } = reissueRes.data.data;
        setCookie('accessToken', accessToken);
        setCookie('accessTokenExpireDate', accessTokenExpireDate);
        return axios(response.config);
      }
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// import axios, { AxiosResponse } from 'axios';
// import moment from 'moment';
// import { API_URL } from './http-config';

// export const axiosCommonInstance = axios.create({
//   timeout: 10000,

// });

// axiosCommonInstance.interceptors.request.use(
//   (config: any) => {
//     config.headers['Content-Type'] = 'application/json; charset=utf-8';
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// // expire check 하는 함수

// const isExpired = () => {
//   const expireDate = localStorage?.getItem('expireDate');
//   if (expireDate) {
//     const expireBefore30Second = moment(new Date()) - moment(expireDate).subtract(30, 'seconds'));
//   }
// };

// export const axiosAuthInstance = axios.create({
//   timeout: 10000,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8',
//   },
// });

// axiosAuthInstance.interceptors.request.use(
//   async (config: any) => {
//     if (!axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN'] ||  ) {
//       console.log('accessToken 없음 또는 기간만료');
//       const reissueRes = await axios.post(
//         API_URL + `reissue`,
//         {},
//         { withCredentials: true }
//       );
//       const { newAccessToken } = reissueRes.data;
//       axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN'] =
//         newAccessToken;
//     }
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );
// axiosAuthInstance.interceptors.response.use(
//   async (response: any) => {
//     console.log('axios Auth 통신 성공', response);
//     if (response?.success === false) {
//       console.log(
//         '만료 응답 success:false 중 에러코드 1013이 accessToken 만료입니다.'
//       );
//       // 리이슈 전에 보내려던 원래 요청을 저장해놓는 로직 필요

//       const reissueRes = await axiosAuthInstance.post(
//         API_URL + `reissue`,
//         {
//           accessToken:
//             axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN'],
//         },
//         { withCredentials: true }
//       );
//       const { newAccessToken } = reissueRes.data;
//       axios.defaults.headers.common['X-AUTH-TOKEN'] = newAccessToken;
//     } else if (response?.code === 1006) {
//       window.location.href = '/login';
//     }
//     return response;
//   },
//   (error) => {
//     console.log('axios Auth 통신 실패', error);
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.request.use(
//   (config: any) => {
//     axios.defaults.headers.common['X-AUTH-TOKEN'] =
//       localStorage.getItem('accessToken')!;
//     console.log(axios.defaults.headers.common['X-AUTH-TOKEN']);

//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

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
