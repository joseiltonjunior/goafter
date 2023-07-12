import Icon from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon'

export function IconCustom({ name, size, color, ...rest }: IconProps) {
  return <Icon name={name} size={size} color={color} {...rest} />
}
