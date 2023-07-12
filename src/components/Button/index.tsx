import React from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import colors from 'tailwindcss/colors'

interface ButtonCustomProps extends TouchableOpacityProps {
  children: string
  isLoading?: boolean
}

export function Button({ children, isLoading, ...rest }: ButtonCustomProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="bg-gray-500 h-[50px] rounded-md items-center justify-center"
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <Text className="font-bold text-white text-base">{children}</Text>
      )}
    </TouchableOpacity>
  )
}
