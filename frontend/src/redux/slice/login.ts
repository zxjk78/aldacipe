import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import { API_URL } from '../../api/http-config';

export const login = createAsyncThunk(
  'LOGIN',
  async (userInfo: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'login', userInfo, {
        // http only cookie 부분, 다른 도메인일 때 이렇게 해줘야 한다.
        withCredentials: true,
      });

      // localStorage.setItem('user', JSON.stringify(response.data.data));
      // localStorage.setItem('expireDate', moment(new Date()).format());

      // accsesToken은 memory 의 변수에(휘발됨), refresh는 http-only cookie에(백엔드에서 처리해줌)
      const { accessToken, accessTokenExpireDate } = response.data;
      // 그래서 나는 axios header에 넣었음, acessToken 항상 header에 담기
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = { isLoggedIn: false, accessToken: '', currentUser: {} };
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.accessToken = payload.accessToken;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      console.error(payload);
    });
  },
});
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
