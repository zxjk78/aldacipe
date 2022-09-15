import { API_URL } from './http-config';
import axios from 'axios';

export const login = async (userInfo: { email: string; password: string }) => {
  try {
    const response = await axios.post(API_URL + 'login', userInfo, {
      // http only cookie 부분, 다른 도메인일 때 이렇게 해줘야 한다.
      withCredentials: true,
    });

    // localStorage.setItem('user', JSON.stringify(response.data.data));
    // localStorage.setItem('expireDate', moment(new Date()).format());

    // accsesToken은 memory 의 변수에(휘발됨), refresh는 http-only cookie에(백엔드에서 처리해줌)
    const { accessToken, accessTokenExpireDate } = response.data;
    // 그래서 나는 axios header에 넣었음, acessToken 항상 header에 담기:

    // 이 문장이 실제로 memory의 변수에 담는건지 알아보아야 함
    axios.defaults.headers.common['X-AUTH-TOKEN'] = `Bearer ${accessToken}`;

    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};
