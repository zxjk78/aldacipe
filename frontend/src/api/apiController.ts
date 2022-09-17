import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { getCookie, setCookie, removeCookie } from './cookie';
import { API_URL } from './http-config';

let isTokenRefreshing = false;
let refreshSubscribers: any[] = [];

function onTokenRefreshed(accessToken: any) {
  refreshSubscribers.map((callback) => callback(accessToken));
}
function addRefreshRequestQueue(callback: any) {
  refreshSubscribers.push(callback);
}

// 재발급 요청, 만료시 로그아웃 함수
// request 랑 response의 차이? 요청은 accessToken 만료 30초 전부터 문제라고 인식, 응답은 에러 코드 1013를 받아야 만료되었다고 인식
// 다중 요청을 처리하면서 두개를 공통적으로 사용하려면??  throw Error 시도해보기?

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
    // console.log('재발급받았습니다.');
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
      // throw new AxiosError('accessToken 시간 만료 예상 에러 강제발생', 1013, {})
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
  // 정상작동
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 1013) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        const reissueRes = await reissueToken();
        const {
          accessToken: newAccessToken,
          accessTokenExpireDate: newAccessTokenExpireDate,
        } = reissueRes;
        setCookie('accessToken', newAccessToken);
        setCookie('accessTokenExpireDate', newAccessTokenExpireDate);
        isTokenRefreshing = false;
        axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN'] =
          newAccessToken;
        onTokenRefreshed(newAccessToken);
      }
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshRequestQueue((newAccessToken: any) => {
          originalRequest.headers['X-AUTH-TOKEN'] = newAccessToken;
          resolve(axiosAuthInstance(originalRequest));
        });
      });
      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);
