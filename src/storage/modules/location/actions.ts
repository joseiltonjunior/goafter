import { LocationProps, SET_ACTUAL_LOCATION } from './types'

export function setActualLocation(location: LocationProps) {
  return {
    type: SET_ACTUAL_LOCATION,
    payload: {
      location,
    },
  }
}
