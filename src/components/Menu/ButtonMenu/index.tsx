import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from 'tailwindcss/colors'

interface ButtonMenuProps {
  icon: string
  title: string
}

export function ButtonMenu({ icon, title }: ButtonMenuProps) {
  return (
    <TouchableOpacity
      className="flex-1 justify-center items-center"
      activeOpacity={0.2}
    >
      <Icon name={icon} color={colors.gray[500]} size={25} />
      <Text className="text-gray-300 text-center text-xs font-normal">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
