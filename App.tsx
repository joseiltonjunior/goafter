/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Routes } from '@routes/routes'

import '@config/ReactotronConfig'

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fedc3d'} />
      <Routes />
    </NavigationContainer>
  )
}

export default App
