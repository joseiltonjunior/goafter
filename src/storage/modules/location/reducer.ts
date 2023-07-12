import { Reducer } from 'redux'
import { LocationProps, SET_ACTUAL_LOCATION } from './types'

const INITIAL_STATE: LocationProps = {
  latitude: 0,
  longitude: 0,
}

const user: Reducer<LocationProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTUAL_LOCATION: {
      const { location } = action.payload

      return (state = location)
    }
    default: {
      return state
    }
  }
}

export default user
