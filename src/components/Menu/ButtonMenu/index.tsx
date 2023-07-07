import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from 'tailwindcss/colors'

interface ButtonMenuProps {
  icon: string
  title: string
  onAction: () => void
}

export function ButtonMenu({ icon, title, onAction }: ButtonMenuProps) {
  return (
    <TouchableOpacity
      className="flex-1 justify-center items-center"
      activeOpacity={0.5}
      onPress={onAction}
    >
      <Icon name={icon} color={colors.gray[500]} size={25} />
      <Text className="text-gray-300 text-center text-xs font-normal">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
