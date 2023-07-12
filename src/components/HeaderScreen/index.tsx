import { IconCustom } from '@components/IconCustom'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

interface headerScreen {
  title: string
}

export function HeaderScreen({ title }: headerScreen) {
  const navigation = useNavigation<StackNavigationProps>()

  return (
    <View className="flex-row items-center justify-center">
      <View className="absolute left-0">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-gray-500 h-9 w-9 rounded-full items-center justify-center p-2"
          activeOpacity={0.6}
        >
          <IconCustom name="arrow-left" size={16} color={colors.gray[100]} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className={`font-bold text-lg text-white text-center`}>
          {title}
        </Text>
      </View>
    </View>
  )
}
