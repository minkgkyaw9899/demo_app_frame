import {combineReducers, configureStore} from '@reduxjs/toolkit'
import EncryptedStorage from 'react-native-encrypted-storage'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'

import authUserReducer from 'features/authUserSlice'

const rootReducer = combineReducers({
  authUser: authUserReducer,
})

const persistConfig = {
  storage: EncryptedStorage,
  key: 'root',
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
