import { axiosAuthInstance } from './config/apiController';

export const fetchMyInfo = async () => {
  try {
    const response: any = await axiosAuthInstance.get(
      `user/${localStorage.getItem('userId')}/userinfo`
    );
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
    const response: any = await axiosAuthInstance.put(
      `user/${localStorage.getItem('userId')}/userinfo`,
      data
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMyBlackList = async () => {
  try {
    const response: any = await axiosAuthInstance.get(
      `user/${localStorage.getItem('userId')}/blacklist`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const addMyBlackList = async (ingredientId: number) => {
  try {
    const response: any = await axiosAuthInstance.post(
      `user/${localStorage.getItem('userId')}/blacklist/${ingredientId}`
    );

    return response.data.success;
  } catch (error: any) {
    return error.response.data.code;
    // return error.response.config
  }
};
export const removeMyBlackList = async (ingredientId: number) => {
  try {
    const response: any = await axiosAuthInstance.delete(
      `user/${localStorage.getItem('userId')}/blacklist/${ingredientId}`
    );

    return response.data.success;
  } catch (error) {
    console.log(error);
  }
};
