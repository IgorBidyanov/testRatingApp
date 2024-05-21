import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios"; 
import { $host } from "api";
import { IGetToken, IGetRefreshToken, IGetAdminUserResponse } from "types/AuthTypes";
import axios from "axios";

interface IAuthProps {
  email: string,
  password: string
}

interface ErrorResponse {
  error: {
    errors: Array<{
      domain: string
      reason: string
      message: string
    }>;
    code: number
    message: string
  };
}

export const getTokenByAuthAction = createAsyncThunk(
  'auth/getTokenByAuthAction',
  async ({ email, password }: IAuthProps) => {
    const payload = {
      email,
      password,
      returnSecureToken: true
    }
    try {
      const res: IGetToken = await $host.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTVv75XsbEZbomGs8Jcb09HULbZ0It_iU`, payload)
        .then(result => {
          return result.data
        })
        return res
    } catch (error) {
      throw new AxiosError('Не верный логин или пароль')
    }
  }
)

export const refreshTokenAction = createAsyncThunk(
  'auth/refreshTokenAction',
  async (refreshToken: string) => {
    const payload = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
    try {
      const res = await axios.post(
        'https://securetoken.googleapis.com/v1/token?key=AIzaSyBTVv75XsbEZbomGs8Jcb09HULbZ0It_iU',
        payload,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      return res.data as IGetRefreshToken
    } catch (error) {
      throw new AxiosError('Не удалось получить данные')
    }
  }
)

export const getAdminDataAction = createAsyncThunk(
  'auth/getAdminDataAction',
  async (token: string) => {
    const payload = { idToken: token }
    try {
      const res: IGetAdminUserResponse = await $host.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBTVv75XsbEZbomGs8Jcb09HULbZ0It_iU`, payload)
        .then(result => result.data.users[0])
      return res
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      const code = axiosError.response?.data.error.code
      const message = axiosError.response?.data.error.message

      if (code === 400 && message === 'INVALID_ID_TOKEN' ) {
        throw new AxiosError('INVALID_ID_TOKEN')
      } else {
        throw new AxiosError('Не удалось получить данные')
      }
    }
  }
)