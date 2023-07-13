import {
  ImageBackground,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
  View,
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
      {!onAction && (
        <View className="bg-gray-950/70 h-14 absolute z-[999] w-full" />
      )}
      <ImageBackground
        source={image}
        className="h-14 items-center justify-center "
      >
        <Text
          className={`font-medium text-base text-gray-100 bg-gray-950/70 px-1 rounded ${
            small && 'text-xs'
          }`}
        >
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}
