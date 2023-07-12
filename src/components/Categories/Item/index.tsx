import {
  ImageBackground,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native'

interface itemProps {
  title: string
  image: ImageSourcePropType
  small?: boolean
  onAction?: () => void
}

export function Item({ image, title, small, onAction }: itemProps) {
  return (
    <TouchableOpacity
      className="flex-1 rounded-md overflow-hidden"
      activeOpacity={0.6}
      onPress={onAction}
    >
      <ImageBackground
        source={image}
        className="h-14 items-center justify-center"
      >
        <Text
          className={`font-medium text-base text-gray-100 bg-gray-500/70 px-1 rounded ${
            small && 'text-xs'
          }`}
        >
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}
