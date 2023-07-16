import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import logoIcon from '@assets/after.png'
import { useDispatch, useSelector } from 'react-redux'
import { ReduxProps } from '@storage/index'
import { SideMenuProps } from '@storage/modules/sideMenu/types'
import { IconCustom } from '@components/IconCustom'
import { handleVisibleSideMenu } from '@storage/modules/sideMenu/actions'

export function SideMenu() {
  const size = Dimensions.get('window').height + 18

  const dispatch = useDispatch()

  const sideMenu = useSelector<ReduxProps, SideMenuProps>(
    (state) => state.sideMenu,
  )

  return (
    <View
      className={`absolute z-10 bg-black/70 flex-1 w-full  ${
        !sideMenu.isVisible && 'hidden'
      }`}
      style={{ height: size }}
    >
      <View className="bg-gray-950 h-full w-80 pt-8">
        <View className="flex-row items-center justify-between bg-gray-500 px-4 py-2 border-b border-gray-500 border-t ">
          <Image source={logoIcon} alt="logo app" className="h-10 w-10" />
          <Text className="text-xl font-bold text-white">Menu</Text>
          <TouchableOpacity
            onPress={() =>
              dispatch(handleVisibleSideMenu({ isVisible: false }))
            }
          >
            <IconCustom
              name="times-circle"
              size={24}
              className="text-gray-300"
            />
          </TouchableOpacity>
        </View>

        <View className="px-4 pt-2">
          <TouchableOpacity className="py-2 flex-row items-center gap-4">
            <IconCustom name="user" size={20} />
            <Text className="text-lg font-medium text-gray-300">
              Sobre o App
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-2 flex-row items-center gap-4">
            <IconCustom name="user" size={20} />
            <Text className="text-lg font-medium text-gray-300 text-right">
              Contato
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-2 flex-row items-center gap-4">
            <IconCustom name="user" size={20} />
            <Text className="text-lg font-medium text-gray-300 text-right">
              Colabore
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-2 flex-row items-center gap-4"
            onPress={() => BackHandler.exitApp()}
          >
            <IconCustom name="user" size={20} />
            <Text className="text-lg font-medium text-gray-300 text-right">
              Sair
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="p-4 mt-auto">
          <Text className="text-center text-md font-bold">AFTER CO.</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
