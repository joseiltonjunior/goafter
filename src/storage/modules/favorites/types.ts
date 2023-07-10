export interface FavoriteProps {
  locale: string
  name: string
  hour: string
  payment: string
  stars: number
  picUrl: string
  phone: string
  description: string
  indicator: number
  coords: {
    latitude: number
    longitude: number
  }
}
