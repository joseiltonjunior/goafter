import { View } from 'react-native'
import { ButtonMenu } from './ButtonMenu'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { FavoriteProps } from '@storage/modules/favorites/types'

interface menuProps {
  data: FavoriteProps[]
}

export function Menu({ data }: menuProps) {
  const navigation = useNavigation<StackNavigationProps>()

  return (
    <View className="flex-row items-center justify-center py-2 bg-gray-500">
      <ButtonMenu
        icon="home"
        title="Início"
        onAction={() => navigation.navigate('Home', {})}
      />
      <ButtonMenu
        icon="search"
        title="Busca"
        onAction={() =>
          navigation.navigate('FindAfters', { data, key: 'Buscar Afters' })
        }
      />
      <ButtonMenu
        icon="heart"
        title="Favoritos"
        onAction={() => navigation.navigate('Favorites')}
      />
      <ButtonMenu icon="navicon" title="Menu" onAction={() => {}} />
    </View>
  )
}
