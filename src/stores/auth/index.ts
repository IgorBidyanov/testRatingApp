import { createSlice } from "@reduxjs/toolkit"
import { getAdminDataAction, getTokenByAuthAction, refreshTokenAction } from "./actions"
import Cookies from 'js-cookie'
import { IGetAdminUserResponse } from "types/AuthTypes"

interface IAuthStore {
  admin: IGetAdminUserResponse | null,
  adminToken: string | null
  isLoading: boolean
  authError: string | undefined
}

const initialState: IAuthStore = {
  admin: null,
  adminToken: null,
  isLoading: false,
  authError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.authError = ''
    },
    logoutReducer(state) {
      state.admin = null
      state.adminToken = null
      state.authError = ''
      Cookies.remove('ratingAppToken')
      Cookies.remove('ratingAppRefreshToken')
    }
  },
  extraReducers(builder) {
     // ========= GET TOKEN BY AUTH ========== //
    builder.addCase(getTokenByAuthAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getTokenByAuthAction.fulfilled, (state, action) => {
      Cookies.set('ratingAppToken', action.payload.idToken, { expires: 7 })
      Cookies.set('ratingAppRefreshToken', action.payload.refreshToken, { expires: 7 })
      state.isLoading = false
      state.adminToken = action.payload.idToken
    })
    builder.addCase(getTokenByAuthAction.rejected, (state, action) => {
      state.isLoading = false
      state.authError = action.error.message
      state.admin = null
      state.adminToken = null
    })

    // ========= REFRESH TOKEN BY AUTH ========== //
    builder.addCase(refreshTokenAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
      Cookies.set('ratingAppToken', action.payload.access_token, { expires: 7 })
      Cookies.set('ratingAppRefreshToken', action.payload.refresh_token, { expires: 7 })
      state.adminToken = action.payload.access_token
    })
    builder.addCase(refreshTokenAction.rejected, (state, action) => {
      state.isLoading = false
      state.authError = action.error.message
      state.admin = null
      state.adminToken = null
    })

     // ========= GET ADMIN DATA ========== //
    builder.addCase(getAdminDataAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAdminDataAction.fulfilled, (state, action) => {
      state.isLoading = false
      state.admin = action.payload
    })
    builder.addCase(getAdminDataAction.rejected, (state, action) => {
      if (action.error.message !== 'INVALID_ID_TOKEN') {
        state.isLoading = false
      }
      state.authError = action.error.message
      state.admin = null
      state.adminToken = null
    })
  },
})

export const { clearAuthError, logoutReducer } = authSlice.actions

export default authSlice.reducer