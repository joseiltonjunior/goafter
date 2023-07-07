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

import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from 'tailwindcss/colors'
import { Description } from './Description'

export function AfterDetails() {
  const {
    params: { data },
  } = useRoute<RouteParamsProps<'AfterDetails'>>()
  const navigation = useNavigation<StackNavigationProps>()
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  const dispatch = useDispatch()

  function removeFavorite() {
    if (!data) return
    dispatch(setRemoveFavorites(data))
  }

  function addFavorite() {
    if (!data) return

    dispatch(setAddFavorites(data))
  }

  function handleFormatIndicator(indicator: number) {
    if (indicator && indicator <= 10) return 'Pouco recomendado'
    if (indicator > 10 && indicator <= 20) return 'Recomendado'
    if (indicator > 20) return 'Super recomendado'

    return 'Sem recomendações'
  }

  return (
    <>
      <ScrollView className="bg-gray-950">
        <View>
          <ImageBackground
            className="h-60 p-4"
            source={{
              uri: `${data.picUrl}`,
            }}
            alt="after pic"
          >
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-gray-500 h-9 w-9 rounded-full items-center justify-center p-2"
                activeOpacity={0.6}
              >
                <IconCustom
                  name="arrow-left"
                  size={16}
                  color={colors.gray[100]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (VerifyFavorite({ favorites, name: data.name })) {
                    removeFavorite()
                  } else {
                    addFavorite()
                  }
                }}
                className="bg-gray-500 h-9 w-9 rounded-full items-center justify-center p-2"
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

            <View className="mt-auto">
              <FlatList
                scrollEnabled={false}
                numColumns={5}
                data={Array.from({ length: data.stars }, (v, k) => k)}
                renderItem={() => (
                  <IconCustom
                    name="star"
                    color={colors.yellow[500]}
                    size={16}
                  />
                )}
              />
              <Text className="text-lg font-bold text-white ">{data.name}</Text>
            </View>
          </ImageBackground>
          <View className="p-4">
            <Description title="Descrição" value={data.description} />
            <Description
              title="Horário de Funcionamento"
              value={data.hour}
              style={{ marginTop: 16 }}
            />
            <Description
              title="Recomendação"
              value={handleFormatIndicator(data.indicator)}
              style={{ marginTop: 16 }}
            />

            <Description
              title="Contato"
              value={data.phone}
              style={{ marginTop: 16 }}
            />
            <Description
              title="Formas de pagamento"
              value={data.payment}
              style={{ marginTop: 16 }}
            />
            <Description
              title="Localização"
              value={data.locale}
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </ScrollView>
      <Menu />
    </>
  )
}
