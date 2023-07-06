import React from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'

import { useSelector } from 'react-redux'
import { ReduxProps } from '@storage/index'
import { FavoriteProps } from '@storage/modules/favorites/types'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

interface CardProps {
  name: string
  pic: string
  stars: number
  action: any
  favorite?: boolean
}

export function Card({ name, pic, stars, action }: CardProps) {
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={action} className="mr-2">
      <View>
        <View>
          <ImageBackground
            className="h-32 rounded-md overflow-hidden"
            alt="role pic"
            source={{
              uri: `${pic}`,
            }}
          >
            <View className="flex-1">
              <View className="flex-row items-center justify-between p-3">
                <View className="flex-row items-center justify-center bg-gray-900/60 rounded-xl px-2 h-7">
                  <Icon name="star" color={'#fedc3d'} size={14} />
                  <Text className="font-bold text-md text-white ml-1">
                    {stars}
                  </Text>
                </View>

                <View className="flex-row items-center justify-center bg-gray-900/60 rounded-full p-2">
                  <Icon
                    name="heart"
                    size={14}
                    color={
                      favorites.find((item) => item.name === name)
                        ? '#fe0016'
                        : '#e2e8f0'
                    }
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
          <View className="mt-auto pt-2">
            <Text className="font-bold text-md text-white text-center">
              {name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
