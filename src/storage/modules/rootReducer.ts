import { combineReducers } from 'redux'

import actualLocation from './location/reducer'
import favorites from './favorites/reducer'
import sideMenu from './sideMenu/reducer'

export default combineReducers({
  actualLocation,
  favorites,
  sideMenu,
})
