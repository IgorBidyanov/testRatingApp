import { useDispatch, useSelector } from 'react-redux'
import type { RootStore, AppDispatch } from './rootStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootStore>()
