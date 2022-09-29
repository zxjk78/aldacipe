import { axiosAuthInstance } from './config/apiController';

// 냉장고 재료로 만들 수 있는 요리
export const getRefrigerator = async () => {
  try {
    const response = await axiosAuthInstance.get('refrigerator');
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
export const addMyRefrigekList = async (ingredientId: number) => {
  try {
    const response: any = await axiosAuthInstance.post(
      `user/${localStorage.getItem('userId')}/refrigerator/${ingredientId}`
    );

    return response.data.success;
  } catch (error: any) {
    return error.response.data.code;
    // return error.response.config
  }
};

