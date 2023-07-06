import React from 'react'

import { Image, Text, TouchableOpacity } from 'react-native'

interface CardProps {
  name: string
  pic: string
  stars: number
  action: any
  favorite?: boolean
}

export function RoundedCard({ name, pic, stars, action }: CardProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={action} className="mr-3">
      <Image
        className="h-24 rounded-full"
        alt="role pic"
        source={{
          uri: `${pic}`,
        }}
      />
      <Text className="font-medium text-xs text-white text-center mt-1 truncate">
        {name}
      </Text>
    </TouchableOpacity>
  )
}
