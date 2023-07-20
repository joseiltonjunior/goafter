import { IconCustom } from '@components/IconCustom'
import { ButtonProps, Text, TouchableOpacity } from 'react-native'

interface optionsProps extends ButtonProps {
  title: string
  icon: string
}

export function Options({ title, icon, ...rest }: optionsProps) {
  return (
    <TouchableOpacity className="p-2 flex-row items-center" {...rest}>
      <IconCustom name={icon} size={20} />
      <Text className="ml-4 text-lg font-medium text-gray-300">{title}</Text>
    </TouchableOpacity>
  )
}
