import { legacy_createStore as createStore } from 'redux'
import rootReducer from './modules/rootReducer'
import { UserProps } from './modules/user/types'
import { FavoriteProps } from './modules/favorites/types'

import { persistStore, persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ReduxProps {
  user: UserProps
  favorites: FavoriteProps[]
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['favorites'],
  // blacklist: ['user'],
  // version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
