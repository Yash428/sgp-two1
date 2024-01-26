import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authSlice from './authSlice'
import roleSlice from './roleSlice'
import themeSlice from './themeSlice'
import storage  from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'iws',
  storage
}
// const reducers = combineReducers({
//   auth : authSlice,
//   role: roleSlice,
// })
const persistAuthReducer = persistReducer(persistConfig,authSlice)

export const store = configureStore({
  reducer: {
    auth : persistAuthReducer,
    role: roleSlice,
    theme : themeSlice
  },
})

export const persistedStore = persistStore(store)