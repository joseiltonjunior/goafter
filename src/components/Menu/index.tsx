import { View } from 'react-native'
import { ButtonMenu } from './ButtonMenu'

export function Menu() {
  return (
    <View className="flex-row items-center justify-center py-2 bg-gray-500 shadow-2xl shadow-white">
      <ButtonMenu icon="home" title="Início" />
      <ButtonMenu icon="search" title="Busca" />
      <ButtonMenu icon="heart" title="Favoritos" />
      <ButtonMenu icon="user" title="Perfil" />
    </View>
  )
}
