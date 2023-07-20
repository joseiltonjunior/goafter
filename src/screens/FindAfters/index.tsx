import { HeaderScreen } from '@components/HeaderScreen'
import { IconCustom } from '@components/IconCustom'
import { Menu } from '@components/Menu'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { ReduxProps } from '@storage/index'

import { LocationProps } from '@storage/modules/location/types'
import { VerifyFavorite } from '@utils/verifyFavorite'
import { FlatList, Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import colors from 'tailwindcss/colors'
import { formatDistance } from '@utils/formatDistance'
import { calculateDistance } from '@utils/calculateDistance'
import { Input } from '@components/Input'
import { useCallback, useState } from 'react'

import findIcon from '@assets/lupa.png'
import { UserProps } from '@storage/modules/user/types'
import { useFavorites } from '@hooks/useFavorites'
import { AfterProps } from '@utils/types/after'

export function FindAfters() {
  const [aftersFiltered, setAftersFiltered] = useState<AfterProps[]>()

  const navigation = useNavigation<StackNavigationProps>()

  const user = useSelector<ReduxProps, UserProps>((state) => state.user)

  const afters = useSelector<ReduxProps, AfterProps[]>((state) => state.afters)

  const { addFavorite, removeFavorite } = useFavorites()

  const actualCoords = useSelector<ReduxProps, LocationProps>(
    (state) => state.actualLocation,
  )

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

      const filtered = afters.filter(
        (after) =>
          after.name.includes(text) ||
          after.type.includes(text) ||
          after.locale.includes(text),
      )

      setAftersFiltered(filtered)
    },
    [afters],
  )

  return (
    <>
      <View className="p-4 mt-10 flex-1">
        <HeaderScreen title="Buscar Afters" />

        <Input
          className="mt-8"
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
                navigation.navigate('AfterDetails', { selected: item })
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

              {user.uid && (
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
                  hitSlop={20}
                  className="flex-row items-center justify-center bg-gray-500 p-2 rounded-full"
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
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      <Menu />
    </>
  )
}
