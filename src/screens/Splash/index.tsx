import AnimatedLottieView from 'lottie-react-native'
import splashJson from '@assets/splash.json'
import { Dimensions, Text, View } from 'react-native'
import { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'

import firestore from '@react-native-firebase/firestore'
import { FavoriteProps } from '@storage/modules/favorites/types'

const size = Dimensions.get('window').width * 1

export function SplashScreen() {
  const navigation = useNavigation<StackNavigationProps>()

  const handleFetchManyAfters = useCallback(async () => {
    await firestore()
      .collection('afters')
      .get()
      .then((querySnapshot) => {
        const aftersResponses = querySnapshot.docs.map(
          (doc) =>
            ({
              picUrl: doc.data().picUrl,
              description: doc.data().description,
              hour: doc.data().hour,
              indicator: doc.data().indicator,
              locale: doc.data().locale,
              name: doc.data().name,
              payment: doc.data().payment,
              phone: doc.data().phone,
              stars: doc.data().stars,
              coords: doc.data().coords,
              type: doc.data().type,
            } as FavoriteProps),
        )

        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              params: { data: aftersResponses },
            },
          ],
        })
      })
  }, [navigation])

  useEffect(() => {
    handleFetchManyAfters()
  }, [handleFetchManyAfters])

  return (
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
  )
}
