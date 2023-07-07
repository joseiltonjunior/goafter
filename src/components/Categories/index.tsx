import { categoriesImages } from '@utils/categoriesImages'
import { View } from 'react-native'
import { Item } from './Item'

export function Categories() {
  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Item image={categoriesImages.barImg} title="Bar" />
        <Item image={categoriesImages.restaurantImg} title="Restaurante" />
      </View>

      <View className="mt-3" style={{ flexDirection: 'row', gap: 12 }}>
        <Item image={categoriesImages.winebarImg} title="Wine Bar" small />
        <Item image={categoriesImages.mercadoImg} title="Mercados" small />
        <Item image={categoriesImages.cervejariaImg} title="Cervejaria" small />
        <Item image={categoriesImages.pubImg} title="Pubs" small />
      </View>
    </View>
  )
}
