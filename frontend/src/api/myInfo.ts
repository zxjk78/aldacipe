import { axiosAuthInstance } from './config/apiController';

export const fetchMyInfo = async () => {
  try {
    const response: any = await axiosAuthInstance.get('user/userinfo');
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const modifyMyInfo = async (data: {
  height: number;
  weight: number;
}) => {
  try {
    const response: any = await axiosAuthInstance.put('user/userinfo', data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
