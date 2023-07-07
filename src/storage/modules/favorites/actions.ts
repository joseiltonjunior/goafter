import { FavoriteProps } from './types'

export function setAddFavorites(favorite: FavoriteProps) {
  return {
    type: '@favorites/ADD_FAVORITE',
    payload: {
      favorite,
    },
  }
}

export function setRemoveFavorites(favorite: FavoriteProps) {
  return {
    type: '@favorites/REMOVE_FAVORITE',
    payload: {
      favorite,
    },
  }
}
