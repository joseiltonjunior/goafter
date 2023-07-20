import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { ReduxProps } from '@storage/index'
import { SideMenuProps } from '@storage/modules/sideMenu/types'
import { IconCustom } from '@components/IconCustom'
import { handleVisibleSideMenu } from '@storage/modules/sideMenu/actions'
import { UserPic } from './UserPic'
import { Options } from './Options'
import { ModalCustom } from '@components/ModalCustom'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { UserProps } from '@storage/modules/user/types'
import { setSaveUser } from '@storage/modules/user/actions'

import auth from '@react-native-firebase/auth'

export function SideMenu() {
  const size = Dimensions.get('window').height + 18
  const [exitApp, setExitApp] = useState(false)
  const [exitAccount, setExitAccount] = useState(false)

  const dispatch = useDispatch()

  const sideMenu = useSelector<ReduxProps, SideMenuProps>(
    (state) => state.sideMenu,
  )

  const user = useSelector<ReduxProps, UserProps>((state) => state.user)

  const navigation = useNavigation<StackNavigationProps>()

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        dispatch(
          setSaveUser({
            displayName: null,
            email: null,
            photoURL: null,
            uid: '',
            favoritesAfters: [],
          }),
        )
      })
  }

  return (
    <>
      <ModalCustom
        title="Já vai?"
        description="Você realmente deseja sair do app?"
        show={exitApp}
        twoActions={{
          textConfirm: 'Cancelar',
          actionConfirm() {
            setExitApp(false)
          },
          textCancel: 'Sair',
          actionCancel() {
            setExitApp(false)
            BackHandler.exitApp()
          },
        }}
      />
      <ModalCustom
        title="Já vai?"
        description="Você realmente deseja sair da sua conta?"
        show={exitAccount}
        twoActions={{
          textConfirm: 'Cancelar',
          actionConfirm() {
            setExitAccount(false)
          },
          textCancel: 'Sair',
          actionCancel() {
            setExitAccount(false)
            handleSignOut()
          },
        }}
      />
      <View
        className={`absolute z-10 bg-black/70 flex-1 w-full  ${
          !sideMenu.isVisible && 'hidden'
        }`}
        style={{ height: size }}
      >
        <View className="bg-gray-950 h-full w-80 pt-8">
          <View className="pt-12">
            <UserPic user={user} />
            {user.displayName && (
              <Text className="ml-auto mr-auto mt-2 font-bold text-white text-lg">
                {user.displayName}
              </Text>
            )}
            {user.email && (
              <Text className="ml-auto mr-auto font-normal text-gray-400 text-md">
                {user.email}
              </Text>
            )}

            <TouchableOpacity
              className="absolute right-[-40px] top-4"
              onPress={() =>
                dispatch(handleVisibleSideMenu({ isVisible: false }))
              }
            >
              <IconCustom
                name="times-circle"
                size={32}
                className="text-gray-300"
              />
            </TouchableOpacity>
          </View>

          <View className="pl-4 pt-8">
            {/* <Options icon="handshake-o" title="Colabore" /> */}
            {user.uid ? (
              <Options
                icon="sign-out"
                title="Sair da conta"
                onPress={() => {
                  setExitAccount(true)
                }}
              />
            ) : (
              <Options
                icon="sign-in"
                title="Acessar conta"
                onPress={() => {
                  dispatch(handleVisibleSideMenu({ isVisible: false }))
                  navigation.navigate('SignIn')
                }}
              />
            )}
            {/* <Options icon="info-circle" title="Sobre o app" /> */}
            <Options
              icon="times-circle"
              title="Sair do app"
              onPress={() => {
                // dispatch(handleVisibleSideMenu({ isVisible: false }))
                setExitApp(true)
              }}
            />
          </View>

          <TouchableOpacity className="p-4 mt-auto">
            <Text className="text-center text-xs font-bold">AFTER CO.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
