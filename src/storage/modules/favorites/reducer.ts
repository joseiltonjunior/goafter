import { Reducer } from 'redux'
import { FavoriteProps } from './types'

const INITIAL_STATE: FavoriteProps[] = []

const favorites: Reducer<FavoriteProps[]> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@favorites/ADD_FAVORITE': {
      const { favorite } = action.payload

      return [...state, favorite]
    }

    case '@favorites/REMOVE_FAVORITE': {
      const { favorite } = action.payload

      const newArray = state.filter((item) => item.name !== favorite.name)

      return newArray
    }

    default: {
      return state
    }
  }
}

export default favorites
