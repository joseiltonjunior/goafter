import { View } from 'react-native'
import { ButtonMenu } from './ButtonMenu'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'

export function Menu() {
  const navigation = useNavigation<StackNavigationProps>()

  return (
    <View className="flex-row items-center justify-center py-2 bg-gray-500">
      <ButtonMenu
        icon="home"
        title="Início"
        onAction={() => navigation.navigate('Home')}
      />
      <ButtonMenu
        icon="search"
        title="Busca"
        onAction={() => navigation.navigate('Home')}
      />
      <ButtonMenu
        icon="heart"
        title="Favoritos"
        onAction={() => navigation.navigate('Home')}
      />
    </View>
  )
}
