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
import { useDispatch, useSelector } from 'react-redux'

import emptyIcon from '@assets/empty.png'
import { IconCustom } from '@components/IconCustom'
import { VerifyFavorite } from '@utils/verifyFavorite'
import {
  setAddFavorites,
  setRemoveFavorites,
} from '@storage/modules/favorites/actions'

import { HeaderScreen } from '@components/HeaderScreen'

export function Favorites() {
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  const dispatch = useDispatch()

  const navigation = useNavigation<StackNavigationProps>()

  function removeFavorite(data: FavoriteProps) {
    if (!data) return
    dispatch(setRemoveFavorites(data))
  }

  function addFavorite(data: FavoriteProps) {
    if (!data) return

    dispatch(setAddFavorites(data))
  }

  return (
    <>
      <View className="p-4 flex-1">
        <HeaderScreen title="Favoritos" />
        <FlatList
          className="mt-8"
          data={favorites}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-[20%]">
              <Image
                source={emptyIcon}
                alt="empty icon"
                className="w-40 h-40"
              />
              <Text className="font-medium text-lg text-white mt-8 max-w-[250px] text-center">
                Sua lista de favoritos está vázia.
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
                source={{ uri: after.item.picsUrl[0] }}
                className="h-24 rounded-md overflow-hidden justify-between p-4 items-center flex-row"
              >
                <Text className="text-lg font-medium text-white bg-gray-950/70 px-2 rounded-md">
                  {after.item.name}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    if (VerifyFavorite({ favorites, name: after.item.name })) {
                      removeFavorite(after.item)
                    } else {
                      addFavorite(after.item)
                    }
                  }}
                  className="bg-gray-950/70 h-9 w-9 rounded-full items-center justify-center p-2"
                  activeOpacity={0.6}
                >
                  <IconCustom
                    name="heart"
                    size={16}
                    color={
                      VerifyFavorite({ favorites, name: after.item.name })
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
    </>
  )
}
