import axios from "axios";
import Cookies from "js-cookie";
import { getAdminDataAction, refreshTokenAction } from "stores/auth/actions";

const $host = (() => {
  return axios.create({
    baseURL: 'https://ratingapp-11053-default-rtdb.europe-west1.firebasedatabase.app/',
    headers: { accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8' },
  })
})()

export const axiosMiddleware = (store: any) => (next: any) => (action: any) => {
  setInterceptors(store)

  return next(action)
}

export const setInterceptors = (store: any) => {
  if (!store) {
    return
  }

  $host.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const { code, message } = error.response?.data?.error
      if (code === 400 && message === 'INVALID_ID_TOKEN' ) {
        const refreshToken = Cookies.get('ratingAppRefreshToken')
        
        if (refreshToken) {
          store.dispatch(refreshTokenAction(refreshToken)).then((result: any) => {
            if (result.meta.requestStatus === 'fulfilled') {
              store.dispatch(getAdminDataAction(result.payload.access_token))
            }
          })
        }
      }
  
      return Promise.reject(error)
    }
  )
}

export { $host }