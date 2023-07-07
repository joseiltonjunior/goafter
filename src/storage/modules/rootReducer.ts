import { combineReducers } from 'redux'

import user from './user/reducer'
import favorites from './favorites/reducer'

export default combineReducers({
  user,
  favorites,
})
