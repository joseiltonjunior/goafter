import { legacy_createStore as createStore } from 'redux'
import rootReducer from './modules/rootReducer'
import { LocationProps } from './modules/location/types'
import { FavoriteProps } from './modules/favorites/types'

import { persistStore, persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { SideMenuProps } from './modules/sideMenu/types'
import { UserProps } from './modules/user/types'

export interface ReduxProps {
  actualLocation: LocationProps
  favorites: FavoriteProps[]
  sideMenu: SideMenuProps
  user: UserProps
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['sideMenu'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
