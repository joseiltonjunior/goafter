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
import { Input } from '@components/Input'
import { useCallback, useState } from 'react'

import findIcon from '@assets/lupa.png'

export function FindAfters() {
  const {
    params: { key, data },
  } = useRoute<RouteParamsProps<'ListAfters'>>()

  //   const [filter, setFilter] = useState('')
  const [aftersFiltered, setAftersFiltered] = useState<FavoriteProps[]>()

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

  const handleFilterAfters = useCallback(
    (text: string) => {
      if (text.length < 1) {
        setAftersFiltered([])

        return
      }

      const filtered = data.filter(
        (after) =>
          after.name.includes(text) ||
          after.type.includes(text) ||
          after.locale.includes(text),
      )

      setAftersFiltered(filtered)
    },
    [data],
  )

  return (
    <>
      <View className="p-4 pt-10 flex-1">
        <HeaderScreen title={key} />

        <Input
          className="mt-4"
          placeholder="Onde é o After?"
          onChangeText={(text) => {
            handleFilterAfters(text)
          }}
        />

        <FlatList
          className="mt-4"
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-[20%]">
              <Image source={findIcon} alt="empty icon" className="w-40 h-40" />
              <Text className="font-medium text-lg text-white mt-8  text-center max-w-xs">
                Busque por nome, categoria ou região
              </Text>
            </View>
          )}
          data={aftersFiltered}
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
                className="flex-row items-center justify-center bg-gray-500 p-2 rounded-full"
              >
                <IconCustom
                  name="heart"
                  size={16}
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

      <Menu data={data} />
    </>
  )
}
