import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface headerSectionProps {
  title: string
  viewMore?: () => void
}

export function HeaderSection({ title, viewMore }: headerSectionProps) {
  return (
    <View className="flex-row items-center justify-between mb-2 mt-8">
      <Text className="font-bold text-base text-gray-100">{title}</Text>
      {viewMore && (
        <TouchableOpacity onPress={viewMore}>
          <Text className="font-medium text-gray-400">Ver mais</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
