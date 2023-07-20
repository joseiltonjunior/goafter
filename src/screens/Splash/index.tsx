import AnimatedLottieView from 'lottie-react-native'
import splashJson from '@assets/splash.json'
import { BackHandler, Dimensions, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'

import crashlytics from '@react-native-firebase/crashlytics'

import firestore from '@react-native-firebase/firestore'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Geolocation from '@react-native-community/geolocation'
import { ModalCustom } from '@components/ModalCustom'
import { useDispatch } from 'react-redux'
import { setActualLocation } from '@storage/modules/location/actions'
import ImmersiveMode from 'react-native-immersive-mode'
import { handleVisibleSideMenu } from '@storage/modules/sideMenu/actions'
import { setAfters } from '@storage/modules/afters/actions'
import { AfterProps } from '@utils/types/after'

const size = Dimensions.get('window').width * 1

export function SplashScreen() {
  const navigation = useNavigation<StackNavigationProps>()
  const [modalError, setModalError] = useState(false)
  const dispatch = useDispatch()

  const handleFetchManyAfters = useCallback(async () => {
    await firestore()
      .collection('afters')
      .get()
      .then((querySnapshot) => {
        const aftersResponses = querySnapshot.docs.map(
          (doc) =>
            ({
              logoUrl: doc.data().logoUrl,
              description: doc.data().description,
              picsUrl: doc.data().picsUrl,
              indicator: doc.data().indicator,
              locale: doc.data().locale,
              name: doc.data().name,
              phone: doc.data().phone,
              stars: doc.data().stars,
              coords: doc.data().coords,
              type: doc.data().type,
              recommendation: doc.data().recommendation,
              schedules: doc.data().schedules,
            } as AfterProps),
        )

        dispatch(setAfters(aftersResponses))

        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        })
      })
      .catch((err) => crashlytics().recordError(err))
  }, [dispatch, navigation])

  const handleFetchCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(setActualLocation({ latitude, longitude }))
        handleFetchManyAfters()
      },
      (error) => {
        crashlytics().recordError({
          message: error.message,
          name: error.code.toString(),
        })
        setModalError(true)
      },
      {
        timeout: 20000,
      },
    )
  }, [dispatch, handleFetchManyAfters])

  const handleCheckLocation = useCallback(async () => {
    const value = await AsyncStorage.getItem('accessLocation')
    let verifyAccessLocation = false
    if (value === null || !value) {
      navigation.navigate('AccessLocation')
    } else {
      verifyAccessLocation = true
    }

    return verifyAccessLocation
  }, [navigation])

  const handleCheckPermission = useCallback(async () => {
    const accessLocation = await handleCheckLocation()

    if (accessLocation) {
      handleFetchCurrentLocation()
    }
  }, [handleCheckLocation, handleFetchCurrentLocation])

  useEffect(() => {
    dispatch(handleVisibleSideMenu({ isVisible: false }))
    ImmersiveMode.fullLayout(true)
    handleCheckPermission()
  }, [dispatch, handleCheckPermission, navigation])

  return (
    <>
      <ModalCustom
        title="Opss.."
        description="Desculpe-nos, atualmente estamos enfrentando dificuldades para acessar os dados solicitados. Por favor, tente novamente em um momento posterior."
        show={modalError}
        singleAction={{
          title: 'Sair',
          action() {
            setModalError(false)
            BackHandler.exitApp()
          },
        }}
      />
      <View className="flex-1 items-center justify-center bg-gray-950">
        <AnimatedLottieView
          source={splashJson}
          autoPlay
          loop
          resizeMode="contain"
          style={{ width: size, height: size }}
        />
        <Text className="text-gray-100 font-bold text-base">
          Buscando os melhores Afters...
        </Text>
      </View>
    </>
  )
}
