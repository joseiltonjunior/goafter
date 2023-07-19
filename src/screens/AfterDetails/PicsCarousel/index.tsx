import { IconCustom } from '@components/IconCustom'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { ReduxProps } from '@storage/index'
import {
  setAddFavorites,
  setRemoveFavorites,
} from '@storage/modules/favorites/actions'
import { FavoriteProps } from '@storage/modules/favorites/types'
import { VerifyFavorite } from '@utils/verifyFavorite'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useDispatch, useSelector } from 'react-redux'
import colors from 'tailwindcss/colors'

interface picsUrlProps {
  data: FavoriteProps
}

export function PicsUrl({ data }: picsUrlProps) {
  const navigation = useNavigation<StackNavigationProps>()
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  const size = Dimensions.get('window').width * 1

  const dispatch = useDispatch()

  function removeFavorite() {
    if (!data) return
    dispatch(setRemoveFavorites(data))
  }

  function addFavorite() {
    if (!data) return

    dispatch(setAddFavorites(data))
  }

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
        <TouchableOpacity
          onPress={() => {
            if (VerifyFavorite({ favorites, name: data.name })) {
              removeFavorite()
            } else {
              addFavorite()
            }
          }}
          className="bg-gray-950/70 h-9 w-9 rounded-full items-center justify-center p-2"
          activeOpacity={0.6}
        >
          <IconCustom
            name="heart"
            size={16}
            color={
              VerifyFavorite({ favorites, name: data.name })
                ? '#e3342f'
                : '#e2e8f0'
            }
          />
        </TouchableOpacity>
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
