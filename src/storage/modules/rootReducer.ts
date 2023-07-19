import { combineReducers } from 'redux'

import actualLocation from './location/reducer'
import favorites from './favorites/reducer'
import sideMenu from './sideMenu/reducer'
import user from './user/reducer'

export default combineReducers({
  actualLocation,
  favorites,
  sideMenu,
  user,
})
