import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { axiosMiddleware } from 'api'
// reducers
import auth from './auth'
import employers from './employers'

const rootReducer = combineReducers({ auth, employers })

export const rootStore = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(axiosMiddleware)
  },
})

export type RootStore = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch
