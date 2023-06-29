import AnimatedLottieView from 'lottie-react-native'
import splashJson from '@assets/splash.json'
import { Dimensions, View } from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'

const size = Dimensions.get('window').width * 0.8

export function SplashScreen() {
  const navigation = useNavigation<StackNavigationProps>()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Home')
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [navigation])

  return (
    <View className="flex-1 items-center justify-center bg-yellow-500">
      <AnimatedLottieView
        source={splashJson}
        autoPlay
        loop
        resizeMode="contain"
        style={{ width: size, height: size }}
      />
    </View>
  )
}
