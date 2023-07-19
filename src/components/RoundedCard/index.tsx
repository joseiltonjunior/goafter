import React from 'react'

import { Image, Text, TouchableOpacity } from 'react-native'

interface CardProps {
  name: string
  pic: string
  onAction: () => void
}

export function RoundedCard({ name, pic, onAction }: CardProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onAction} className="mr-4">
      <Image
        className="h-24 rounded-full bg-gray-500"
        alt="role pic"
        source={{
          uri: pic,
        }}
      />
      <Text
        className="font-medium text-xs text-white text-center mt-1"
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  )
}
