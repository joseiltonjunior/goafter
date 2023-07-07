import Icon from 'react-native-vector-icons/FontAwesome'

interface iconCustomProps {
  name: string
  size?: number
  color?: string
}

export function IconCustom({ name, size, color }: iconCustomProps) {
  return <Icon name={name} size={size} color={color} />
}
