import React from 'react'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'

import { RouteProp } from '@react-navigation/native'

import { Home } from '@screens/Home'
import { SplashScreen } from '@screens/Splash'
import { Favorites } from '@screens/Favorites'

import { AfterDetails } from '@screens/AfterDetails'
import { ListAfters } from '@screens/ListAfters'
import { AccessLocation } from '@screens/AccessLocation'
import { FindAfters } from '@screens/FindAfters'

import { FavoriteProps } from '@storage/modules/favorites/types'

type RootStackParamList = {
  Splash: undefined
  Home: {
    data?: FavoriteProps[]
  }
  AfterDetails: {
    data: FavoriteProps
  }
  Favorites: undefined
  ListAfters: {
    key: string
    data: FavoriteProps[]
  }
  AccessLocation: undefined
  FindAfters: {
    data: FavoriteProps[]
    key: string
  }
}

export type StackNavigationProps = StackNavigationProp<RootStackParamList>
export type RouteParamsProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>

const Stack = createStackNavigator<RootStackParamList>()

export function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#202024' },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          }
        },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AfterDetails" component={AfterDetails} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="ListAfters" component={ListAfters} />
      <Stack.Screen name="AccessLocation" component={AccessLocation} />
      <Stack.Screen name="FindAfters" component={FindAfters} />
    </Stack.Navigator>
  )
}
