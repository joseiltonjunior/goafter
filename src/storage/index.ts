import { legacy_createStore as createStore } from 'redux'
import rootReducer from './modules/rootReducer'
import { LocationProps } from './modules/location/types'
import { FavoriteProps } from './modules/favorites/types'

import { persistStore, persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ReduxProps {
  actualLocation: LocationProps
  favorites: FavoriteProps[]
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
