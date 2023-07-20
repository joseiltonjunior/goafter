import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { ReduxProps } from '@storage/index'

import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'

import documentIcon from '@assets/documento.png'
import { IconCustom } from '@components/IconCustom'
import { VerifyFavorite } from '@utils/verifyFavorite'

import { HeaderScreen } from '@components/HeaderScreen'
import { Menu } from '@components/Menu'
import { UserProps } from '@storage/modules/user/types'
import { useFavorites } from '@hooks/useFavorites'

export function Favorites() {
  const user = useSelector<ReduxProps, UserProps>((state) => state.user)

  const { addFavorite, removeFavorite, favoriteList } = useFavorites()

  const navigation = useNavigation<StackNavigationProps>()

  return (
    <>
      <View className="p-4 mt-10 flex-1">
        <HeaderScreen title="Favoritos" />
        <FlatList
          className="mt-8"
          data={favoriteList()}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-[20%]">
              <Image
                source={documentIcon}
                alt="empty icon"
                className="w-40 h-40"
              />
              <Text className="font-medium text-lg text-white mt-8 max-w-[250px] text-center">
                Sua lista de favoritos está vázia.
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                className="mt-20 bg-gray-500 w-full p-4 rounded-md items-center justify-center"
                activeOpacity={0.5}
              >
                <Text className="font-bold text-base text-white">
                  Adicionar
                </Text>
              </TouchableOpacity>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('AfterDetails', {
                  selected: item,
                })
              }
            >
              <ImageBackground
                source={{ uri: item.picsUrl[0] }}
                className="h-24 rounded-md overflow-hidden justify-between p-4 items-center flex-row"
              >
                <Text className="text-lg font-medium text-white bg-gray-950/70 px-2 rounded-md">
                  {item.name}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    if (
                      VerifyFavorite({
                        favorites: user.favoritesAfters,
                        name: item.name,
                      })
                    ) {
                      removeFavorite({ name: item.name, user })
                    } else {
                      addFavorite({ name: item.name, user })
                    }
                  }}
                  className="bg-gray-950/70 h-9 w-9 rounded-full items-center justify-center p-2"
                  activeOpacity={0.6}
                >
                  <IconCustom
                    name="heart"
                    size={16}
                    color={
                      VerifyFavorite({
                        favorites: user.favoritesAfters,
                        name: item.name,
                      })
                        ? '#e3342f'
                        : '#e2e8f0'
                    }
                  />
                </TouchableOpacity>
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
