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
}

export function Item({ image, title, small }: itemProps) {
  return (
    <TouchableOpacity className="flex-1 rounded-md overflow-hidden">
      <ImageBackground
        source={image}
        className="h-14 items-center justify-center"
      >
        <Text
          className={`font-medium text-lg text-gray-100 bg-gray-950/80 px-1 rounded ${
            small && 'text-sm'
          }`}
        >
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}
