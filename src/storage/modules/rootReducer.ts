import { combineReducers } from 'redux'

import actualLocation from './location/reducer'
import favorites from './favorites/reducer'

export default combineReducers({
  actualLocation,
  favorites,
})
