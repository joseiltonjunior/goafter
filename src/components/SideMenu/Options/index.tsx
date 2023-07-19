import { IconCustom } from '@components/IconCustom'
import { ButtonProps, Text, TouchableOpacity } from 'react-native'

interface optionsProps extends ButtonProps {
  title: string
  icon: string
}

export function Options({ title, icon, ...rest }: optionsProps) {
  return (
    <TouchableOpacity className="py-2 flex-row items-center gap-4" {...rest}>
      <IconCustom name={icon} size={20} />
      <Text className="text-lg font-medium text-gray-300">{title}</Text>
    </TouchableOpacity>
  )
}
