import { FavoriteProps } from '@storage/modules/favorites/types'

interface verifyFavoriteProps {
  favorites: FavoriteProps[]
  name: string
}

export function VerifyFavorite({ favorites, name }: verifyFavoriteProps) {
  const filter = favorites.find((item) => item.name === name)

  return !!filter
}
