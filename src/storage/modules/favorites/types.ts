export interface FavoriteProps {
  locale: string
  name: string
  hour: string
  payment: string
  stars: number
  logoUrl: string
  instagramUrl: string
  picsUrl: string[]
  phone: string
  description: string
  indicator: number
  type: string
  coords: {
    latitude: number
    longitude: number
  }
}
