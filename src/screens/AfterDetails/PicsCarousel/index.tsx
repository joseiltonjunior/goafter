import { IconCustom } from '@components/IconCustom'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'

import { UserProps } from '@storage/modules/user/types'

import { VerifyFavorite } from '@utils/verifyFavorite'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import colors from 'tailwindcss/colors'
import { useFavorites } from '@hooks/useFavorites'
import { AfterProps } from '@utils/types/after'

interface picsUrlProps {
  data: AfterProps
  user: UserProps
}

export function PicsUrl({ data, user }: picsUrlProps) {
  const navigation = useNavigation<StackNavigationProps>()

  const { addFavorite, removeFavorite } = useFavorites()

  const size = Dimensions.get('window').width * 1

  return (
    <>
      <View className="flex-row justify-between absolute z-10 p-4 w-full mt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-gray-950/70 h-9 w-9 rounded-full items-center justify-center p-2"
          activeOpacity={0.6}
        >
          <IconCustom name="arrow-left" size={16} color={colors.gray[100]} />
        </TouchableOpacity>
        {user.uid && (
          <TouchableOpacity
            onPress={() => {
              if (
                VerifyFavorite({
                  favorites: user.favoritesAfters,
                  name: data.name,
                })
              ) {
                removeFavorite({ name: data.name, user })
              } else {
                addFavorite({ name: data.name, user })
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
                  name: data.name,
                })
                  ? '#e3342f'
                  : '#e2e8f0'
              }
            />
          </TouchableOpacity>
        )}
      </View>
      <Carousel
        loop={false}
        width={size}
        height={320}
        data={data.picsUrl}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            className="flex-1 w-auto bg-gray-500"
            source={{
              uri: `${item}`,
            }}
            alt="after pic"
          />
        )}
      />
    </>
  )
}
