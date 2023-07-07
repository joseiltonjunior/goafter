import { Menu } from '@components/Menu'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { ReduxProps } from '@storage/index'
import { FavoriteProps } from '@storage/modules/favorites/types'
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'

import emptyIcon from '@assets/empty.png'

export function Favorites() {
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  const navigation = useNavigation<StackNavigationProps>()

  return (
    <>
      <View className="p-4 flex-1">
        <Text className="font-bold text-xl text-white">Meus favoritos</Text>
        <FlatList
          className="mt-2"
          data={favorites}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-[20%]">
              <Image
                source={emptyIcon}
                alt="empty icon"
                className="w-40 h-40"
              />
              <Text className="font-medium text-lg text-white mt-8 max-w-[250px] text-center">
                Opss.. Sua lista de favoritos está vázia.
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Home', {})}
                className="mt-20 bg-gray-500 w-full p-4 rounded-md items-center justify-center"
                activeOpacity={0.5}
              >
                <Text className="font-bold text-base text-white">
                  Voltar para a home
                </Text>
              </TouchableOpacity>
            </View>
          )}
          renderItem={(after) => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('AfterDetails', { data: after.item })
              }
            >
              <ImageBackground
                source={{ uri: after.item.picUrl }}
                className="h-24 rounded-md overflow-hidden justify-center p-4 items-start"
              >
                <Text className="text-lg font-bold text-white bg-gray-500/50 px-2 rounded-md">
                  {after.item.name}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>

      <Menu />
    </>
  )
}
