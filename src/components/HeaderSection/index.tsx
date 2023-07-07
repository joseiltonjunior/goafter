import { Text, View, ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface headerSectionProps extends ViewProps {
  title: string
  viewMore?: () => void
}

export function HeaderSection({
  title,
  viewMore,
  ...rest
}: headerSectionProps) {
  return (
    <View className="flex-row items-center justify-between" {...rest}>
      <Text className="font-bold text-base text-gray-100">{title}</Text>
      {viewMore && (
        <TouchableOpacity onPress={viewMore} activeOpacity={0.4}>
          <Text className="font-medium text-gray-400">Ver mais</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
