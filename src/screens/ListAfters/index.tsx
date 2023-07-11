import { HeaderScreen } from '@components/HeaderScreen'
import { IconCustom } from '@components/IconCustom'
import { Menu } from '@components/Menu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteParamsProps, StackNavigationProps } from '@routes/routes'
import { ReduxProps } from '@storage/index'
import {
  setAddFavorites,
  setRemoveFavorites,
} from '@storage/modules/favorites/actions'
import { FavoriteProps } from '@storage/modules/favorites/types'
import { VerifyFavorite } from '@utils/verifyFavorite'
import { FlatList, Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

export function ListAfters() {
  const {
    params: { key, data },
  } = useRoute<RouteParamsProps<'ListAfters'>>()
  const navigation = useNavigation<StackNavigationProps>()
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  const dispatch = useDispatch()

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
        <HeaderScreen title={key} />
        <FlatList
          className="mt-4"
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('AfterDetails', { data: item })
              }
              className="flex-row items-center gap-2 my-1"
            >
              <Image
                source={{ uri: item.picUrl }}
                alt="after pic"
                className="w-14 h-14 rounded-full"
              />

              <View className="mr-auto">
                <Text className="text-base text-white font-bold">
                  {item.name}
                </Text>

                <View className="flex-row items-center">
                  <IconCustom name="star" color={'#fedc3d'} size={14} />
                  <Text className="font-bold text-md ml-1">{item.stars}</Text>
                  <Text className="font-normal text-md ml-1">
                    ({item.indicator})
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (VerifyFavorite({ favorites, name: item.name })) {
                    removeFavorite(item)
                  } else {
                    addFavorite(item)
                  }
                }}
                hitSlop={20}
                className="flex-row items-center justify-center"
              >
                <IconCustom
                  name="heart"
                  size={18}
                  color={
                    VerifyFavorite({ favorites, name: item.name })
                      ? '#e3342f'
                      : '#e2e8f0'
                  }
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>

      <Menu />
    </>
  )
}
