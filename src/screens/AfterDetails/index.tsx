import { IconCustom } from '@components/IconCustom'
import { Menu } from '@components/Menu'
import { useRoute } from '@react-navigation/native'
import { RouteParamsProps } from '@routes/routes'
import { ReduxProps } from '@storage/index'

import crashlytics from '@react-native-firebase/crashlytics'

import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'

import { useSelector } from 'react-redux'
import colors from 'tailwindcss/colors'
import { Description } from './Description'
import { Map } from './Map'
import { Schedules } from './Schedules'
import { calculateDistance } from '@utils/calculateDistance'
import { formatDistance } from '@utils/formatDistance'
import { LocationProps } from '@storage/modules/location/types'
import { openLinkProps } from '@utils/types/openLinking'
import { handleFormatIndicator } from '@utils/formatIndicator'
import { PicsUrl } from './PicsCarousel'

export function AfterDetails() {
  const {
    params: { data },
  } = useRoute<RouteParamsProps<'AfterDetails'>>()

  const actualLocation = useSelector<ReduxProps, LocationProps>(
    (state) => state.actualLocation,
  )

  const distance = calculateDistance({
    actualCoords: actualLocation,
    afterCoords: data.coords,
  })

  function handleOpenLink({ insta, phone }: openLinkProps) {
    let url = ''
    let errorMessage = ''

    if (insta) {
      errorMessage = 'Não é possível abrir o Instagram'
      url = insta
    } else if (phone) {
      errorMessage = 'Não é possível abrir o WhatsApp'
      const phoneNumber = `+55${phone}`
      url = `whatsapp://send?phone=${phoneNumber}`
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
        } else {
          crashlytics().recordError({
            message: errorMessage,
            name: 'Linking error',
          })
        }
      })
      .catch((err) => crashlytics().recordError(err))
  }

  return (
    <>
      <ScrollView className="bg-gray-950">
        <PicsUrl data={data} />
        <View>
          <View className="p-4  rounded-t-3xl bg-gray-950 -mt-8 overflow-hidden">
            <View className="flex-row items-center gap-2">
              <Image
                source={{ uri: data.logoUrl }}
                alt="logo after"
                className="rounded-full w-16 h-16"
              />
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">
                  {data.name}
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-md font-normal text-gray-400">
                    {data.type}
                  </Text>
                  <View className="flex-row items-center">
                    <IconCustom
                      name="star"
                      color={colors.yellow[500]}
                      size={16}
                    />
                    <Text className="text-md font-bold text-white px-0.5">
                      {data.stars}
                    </Text>
                    <Text className="text-md font-medium text-gray-400">
                      ({data.indicator})
                    </Text>
                  </View>
                </View>
              </View>
            </View>

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

            <View className="mt-4">
              <Text className="text-lg font-semibold text-white">Telefone</Text>
              <Text className="text-base font-normal text-gray-400">
                {data.phone}
              </Text>
            </View>

            <View className="mt-4">
              <Text className="text-lg font-semibold text-white">
                Redes sociais
              </Text>
              <View className="flex-row items-center gap-4 pt-1">
                <TouchableOpacity
                  onPress={() => handleOpenLink({ phone: data.phone })}
                >
                  <IconCustom
                    name="whatsapp"
                    size={32}
                    color={colors.green[600]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleOpenLink({ insta: data.instagramUrl })}
                >
                  <IconCustom
                    name="instagram"
                    size={32}
                    color={colors.rose[400]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Description
              title="Formas de pagamento"
              value={data.payment}
              style={{ marginTop: 16 }}
            />

            <View className="mt-4">
              <View className="flex-row mb-1 items-center">
                <Text className="text-lg font-semibold text-white">
                  Como chegar
                </Text>
                <IconCustom
                  name="circle"
                  color={colors.gray[400]}
                  size={6}
                  className="px-2 mt-1"
                />
                <Text className="text-base font-semibold text-gray-400">
                  {formatDistance(distance)} de distância
                </Text>
              </View>

              <Map
                afterTitle={data.name}
                afterCoords={data.coords}
                actualCoords={actualLocation}
              />
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
