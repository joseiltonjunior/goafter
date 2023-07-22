import { categoriesImages } from '@utils/categoriesImages'
import { View } from 'react-native'
import { Item } from './Item'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'

export function Categories() {
  const navigation = useNavigation<StackNavigationProps>()

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Item
          image={categoriesImages.barImg}
          title="Bares"
          onAction={() => {
            navigation.navigate('ListAfters', {
              key: 'Bares',
            })
          }}
        />
        <Item
          image={categoriesImages.restaurantImg}
          title="Restaurantes"
          onAction={() => {
            navigation.navigate('ListAfters', {
              key: 'Restaurantes',
            })
          }}
        />
      </View>

      <View className="mt-3" style={{ flexDirection: 'row', gap: 12 }}>
        <Item image={categoriesImages.mercadoImg} title="Eventos" />

        <Item
          image={categoriesImages.pubImg}
          title="Pubs"
          onAction={() => {
            navigation.navigate('ListAfters', {
              key: 'Pubs',
            })
          }}
        />
      </View>
    </View>
  )
}
