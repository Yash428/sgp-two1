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
import themeSlice from './themeSlice'
import storage  from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'iws',
  storage
}

const persistAuthReducer = persistReducer(persistConfig,authSlice)


export const store = configureStore(
  {
    reducer:{
      auth : persistAuthReducer,
      theme : themeSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })

export const persistedStore = persistStore(store)