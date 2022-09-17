import { API_URL } from './http-config';
import { axiosPostCommonInstance } from './apiController';
import axios from 'axios';

// export const signup = async (userInfo: {
//   email: string;
//   password: string;
//   gender: string;
//   height: number;
//   weight: number;
// }) => {
//   try {
//     const response = await axiosPostCommonInstance({
//       url: API_URL + 'signup',
//       method: 'POST',
//       data: userInfo,
//     });

//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };
export const signup = async (userInfo: {
  email: string;
  password: string;
  gender: string;
  height: number;
  weight: number;
}) => {
  try {
    const response: any = await axios.post(API_URL + `signup`, userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.success;
  } catch (error) {
    console.error(error);
  }
};
