interface verifyFavoriteProps {
  favorites: string[]
  name: string
}

export function VerifyFavorite({ favorites, name }: verifyFavoriteProps) {
  const filter = favorites.find((item) => item === name)

  return !!filter
}
