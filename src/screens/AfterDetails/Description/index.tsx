import { Text, View, ViewProps } from 'react-native'

interface descriptionProps extends ViewProps {
  title: string
  value: string
}

export function Description({ title, value, ...rest }: descriptionProps) {
  return (
    <View {...rest}>
      <Text className="text-lg font-semibold text-white">{title}</Text>
      <Text className="text-base font-normal ">{value}</Text>
    </View>
  )
}
