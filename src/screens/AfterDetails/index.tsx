import { IconCustom } from '@components/IconCustom'
import { Menu } from '@components/Menu'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { RouteParamsProps } from '@routes/routes'
import { ReduxProps } from '@storage/index'
import crashlytics from '@react-native-firebase/crashlytics'
import ImmersiveMode from 'react-native-immersive-mode'

import {
  ScrollView,
  Text,
  View,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Linking,
  TouchableOpacity,
} from 'react-native'

import { useSelector } from 'react-redux'
import colors from 'tailwindcss/colors'
import { Description } from './Description'
import { Map } from './Map'
import { Schedules } from './Schedules'
import { calculateDistance } from '@utils/calculateDistance'
import { formatDistance } from '@utils/formatDistance'
import { LocationProps } from '@storage/modules/location/types'

import { PicsUrl } from './PicsCarousel'
import React, { useEffect, useState } from 'react'

export function AfterDetails() {
  const {
    params: { selected, data },
  } = useRoute<RouteParamsProps<'AfterDetails'>>()

  const [scrollPosition, setScrollPosition] = useState(0)

  const actualLocation = useSelector<ReduxProps, LocationProps>(
    (state) => state.actualLocation,
  )

  const distance = calculateDistance({
    actualCoords: actualLocation,
    afterCoords: selected.coords,
  })

  useFocusEffect(() => {
    ImmersiveMode.setBarTranslucent(true)

    return () => {
      ImmersiveMode.setBarTranslucent(false)
    }
  })

  function handleFormatPhoneNumber(number: string): string {
    const regex10Digitos = /^(\d{2})(\d{4})(\d{4})$/
    const regex11Digitos = /^(\d{2})(\d{5})(\d{4})$/

    if (regex10Digitos.test(number)) {
      return number.replace(regex10Digitos, '($1) $2-$3')
    } else if (regex11Digitos.test(number)) {
      return number.replace(regex11Digitos, '($1) $2-$3')
    }

    return number
  }

  function handleOpenDisk(number: string): void {
    const url = `tel:${number}`
    Linking.openURL(url).catch((err) => crashlytics().recordError(err))
  }

  useEffect(() => {
    const parseScroll = parseInt(scrollPosition.toString())

    if (parseScroll > 250) {
      ImmersiveMode.setBarTranslucent(false)
    }
  }, [scrollPosition])

  return (
    <>
      <ScrollView
        className="bg-gray-950"
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const currentPosition = event.nativeEvent.contentOffset.y
          setScrollPosition(currentPosition)
        }}
      >
        <PicsUrl data={selected} />
        <View>
          <View className="p-4  rounded-t-3xl bg-gray-950 -mt-8 overflow-hidden">
            <View className="flex-row items-center gap-2">
              <Image
                source={{ uri: selected.logoUrl }}
                alt="logo after"
                className="rounded-full w-16 h-16"
              />
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">
                  {selected.name}
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-md font-normal text-gray-400">
                    {selected.type}
                  </Text>
                  <View className="flex-row items-center">
                    <IconCustom
                      name="star"
                      color={colors.yellow[500]}
                      size={16}
                    />
                    <Text className="text-md font-bold text-white px-0.5">
                      {selected.stars}
                    </Text>
                    <Text className="text-md font-medium text-gray-400">
                      ({selected.indicator})
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Description
              title="Descrição"
              value={selected.description}
              style={{ marginTop: 16 }}
            />

            <Schedules data={selected.schedules} />

            <View className="mt-4">
              <Text className="text-lg font-semibold text-white">Telefone</Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-normal text-gray-400">
                  {handleFormatPhoneNumber(selected.phone)}
                </Text>
                <TouchableOpacity
                  className="bg-green-600 w-8 h-8 rounded-full items-center justify-center"
                  hitSlop={40}
                >
                  <IconCustom
                    name="phone"
                    size={20}
                    color={colors.white}
                    onPress={() => handleOpenDisk(selected.phone)}
                  />
                </TouchableOpacity>
              </View>
            </View>

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
                afterTitle={selected.name}
                afterCoords={selected.coords}
                actualCoords={actualLocation}
              />
              <Text className="text-base font-normal text-gray-400">
                {selected.locale}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu data={data} />
    </>
  )
}
