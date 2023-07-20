import { categoriesImages } from '@utils/categoriesImages'
import { View } from 'react-native'
import { Item } from './Item'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { FavoriteProps } from '@storage/modules/afters/types'

interface categoriesProps {
  data: FavoriteProps[]
}

export function Categories({ data }: categoriesProps) {
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
              data: data.filter((item) => item.type === 'Bar'),
            })
          }}
        />
        <Item
          image={categoriesImages.restaurantImg}
          title="Restaurantes"
          onAction={() => {
            navigation.navigate('ListAfters', {
              key: 'Restaurantes',
              data: data.filter((item) => item.type === 'Restaurante'),
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
              data: data.filter((item) => item.type === 'Pub'),
            })
          }}
        />
      </View>
    </View>
  )
}
