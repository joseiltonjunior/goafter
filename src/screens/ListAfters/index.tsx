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
import { LocationProps } from '@storage/modules/location/types'
import { VerifyFavorite } from '@utils/verifyFavorite'
import { FlatList, Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import colors from 'tailwindcss/colors'
import { formatDistance } from '@utils/formatDistance'
import { calculateDistance } from '@utils/calculateDistance'

export function ListAfters() {
  const {
    params: { key, data },
  } = useRoute<RouteParamsProps<'ListAfters'>>()
  const navigation = useNavigation<StackNavigationProps>()
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  const actualCoords = useSelector<ReduxProps, LocationProps>(
    (state) => state.actualLocation,
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
  function handleDistance(afterCoords: LocationProps) {
    const distance = calculateDistance({
      actualCoords,
      afterCoords,
    })

    return formatDistance(distance)
  }

  return (
    <>
      <View className="p-4 pt-10 flex-1">
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
                source={{ uri: item.logoUrl }}
                alt="after pic"
                className="w-14 h-14 rounded-full"
              />

              <View className="mr-auto">
                <Text className="text-base text-white font-bold">
                  {item.name}
                </Text>

                <View className="flex-row items-center">
                  <View className="flex-row items-center">
                    <IconCustom name="star" color={'#fedc3d'} size={12} />
                    <Text className="font-medium text-xs ml-1 text-md text-[#fedc3d]">
                      {item.stars}
                    </Text>
                  </View>
                  <View className="flex-row items-center ml-2">
                    <IconCustom
                      name="circle"
                      color={colors.gray[400]}
                      size={5}
                    />
                    <Text className="font-medium text-xs ml-2 text-gray-400">
                      {item.type}
                    </Text>

                    <IconCustom
                      className="ml-2"
                      name="circle"
                      color={colors.gray[400]}
                      size={5}
                    />
                    <Text className="font-medium text-xs ml-2 text-gray-400">
                      {handleDistance(item.coords)}
                    </Text>
                  </View>
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
