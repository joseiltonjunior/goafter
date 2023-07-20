import { combineReducers } from 'redux'

import actualLocation from './location/reducer'
import afters from './afters/reducer'
import sideMenu from './sideMenu/reducer'
import user from './user/reducer'

export default combineReducers({
  actualLocation,
  afters,
  sideMenu,
  user,
})
