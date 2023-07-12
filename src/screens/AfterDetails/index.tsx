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
  Linking,
  // FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import colors from 'tailwindcss/colors'
import { Description } from './Description'
import { Map } from './Map'
import { Schedules } from './Schedules'

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

  function handleOpenWhatsApp(phone: string) {
    const phoneNumber = `+55${phone}`

    const url = `whatsapp://send?phone=${phoneNumber}`

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
        } else {
          console.log('Não é possível abrir o WhatsApp')
        }
      })
      .catch((err) => console.error('Erro ao abrir o WhatsApp:', err))
  }

  return (
    <>
      <ScrollView className="bg-gray-950">
        <View>
          <ImageBackground
            className="h-72 p-4 pb-12"
            source={{
              uri: `${data.picUrl}`,
            }}
            alt="after pic"
          >
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-gray-950/70 h-9 w-9 rounded-full items-center justify-center p-2"
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
          </ImageBackground>
          <View className="p-4  rounded-t-3xl bg-gray-950 -mt-8 overflow-hidden">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">{data.name}</Text>
              <View className="flex-row items-center">
                <IconCustom name="star" color={colors.yellow[500]} size={16} />
                <Text className="text-md font-bold text-white px-0.5">
                  {data.stars}
                </Text>
                <Text className="text-md font-light text-gray-400">
                  ({data.indicator})
                </Text>
              </View>
            </View>

            <Text className="text-md font-normal text-gray-400">
              {data.type}
            </Text>

            <Description
              title="Descrição"
              value={data.description}
              style={{ marginTop: 16 }}
            />

            <Description
              title="Avaliação dos clientes"
              value={handleFormatIndicator(data.indicator)}
              style={{ marginTop: 16 }}
            />

            <Schedules data={data.hour} />

            <View className="flex-row justify-between items-center mt-4">
              <View>
                <Text className="text-lg font-semibold text-white">
                  Contato
                </Text>
                <Text className="text-base font-normal text-gray-400">
                  {data.phone}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleOpenWhatsApp(data.phone)}>
                <IconCustom
                  name="whatsapp"
                  size={32}
                  color={colors.green[600]}
                />
              </TouchableOpacity>
            </View>

            <Description
              title="Formas de pagamento"
              value={data.payment}
              style={{ marginTop: 16 }}
            />

            <View className="mt-4">
              <Text className="text-lg font-semibold text-white mb-1">
                Como chegar
              </Text>

              <Map coords={data.coords} />
              <Text className="text-base font-normal text-gray-400">
                {data.locale}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu />
    </>
  )
}
