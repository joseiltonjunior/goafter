import React from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'

import { useSelector } from 'react-redux'
import { ReduxProps } from '@storage/index'
import { FavoriteProps } from '@storage/modules/favorites/types'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { VerifyFavorite } from '@utils/verifyFavorite'

interface CardProps {
  name: string
  pic: string
  stars: number
  onAction: any
  favorite?: boolean
}

export function Card({ name, pic, stars, onAction }: CardProps) {
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onAction} className="mr-4">
      <View>
        <View>
          <ImageBackground
            className="h-32 rounded-md overflow-hidden bg-gray-500"
            alt="role pic"
            source={{
              uri: `${pic}`,
            }}
          >
            <View className="flex-1">
              <View className="flex-row items-center justify-between p-1">
                <View className="flex-row items-center justify-center bg-gray-900/70 rounded-xl px-[5px] py-[3px]">
                  <Icon name="star" color={'#fedc3d'} size={12} />
                  <Text className="font-bold text-xs text-white ml-1">
                    {stars}
                  </Text>
                </View>

                <View className="flex-row items-center justify-center bg-gray-900/70 rounded-full p-[5px]">
                  <Icon
                    name="heart"
                    size={12}
                    color={
                      VerifyFavorite({ favorites, name })
                        ? '#e3342f'
                        : '#e2e8f0'
                    }
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
          <View className="mt-auto pt-2">
            <Text
              className="font-bold text-md text-white text-center"
              numberOfLines={1}
            >
              {name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
