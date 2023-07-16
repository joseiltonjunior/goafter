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
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@storage/index'

import '@config/ReactotronConfig'
import { SideMenu } from '@components/SideMenu'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar backgroundColor={'#202022'} />
          <SideMenu />
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
