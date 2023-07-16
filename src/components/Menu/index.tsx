import { View } from 'react-native'
import { ButtonMenu } from './ButtonMenu'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { FavoriteProps } from '@storage/modules/favorites/types'
import { useDispatch, useSelector } from 'react-redux'
import { handleVisibleSideMenu } from '@storage/modules/sideMenu/actions'

import { ReduxProps } from '@storage/index'
import { SideMenuProps } from '@storage/modules/sideMenu/types'

interface menuProps {
  data?: FavoriteProps[]
}

export function Menu({ data }: menuProps) {
  const navigation = useNavigation<StackNavigationProps>()

  const sideMenu = useSelector<ReduxProps, SideMenuProps>(
    (state) => state.sideMenu,
  )

  const dispatch = useDispatch()

  return (
    <View className="flex-row items-center justify-center p-2 bg-gray-500">
      <ButtonMenu
        icon="home"
        title="Início"
        onAction={() => {
          dispatch(handleVisibleSideMenu({ isVisible: false }))
          navigation.navigate('Home', {})
        }}
      />
      {data && (
        <ButtonMenu
          icon="search"
          title="Busca"
          onAction={() => {
            dispatch(handleVisibleSideMenu({ isVisible: false }))
            navigation.navigate('FindAfters', { data, key: 'Buscar Afters' })
          }}
        />
      )}
      <ButtonMenu
        icon="heart"
        title="Favoritos"
        onAction={() => {
          dispatch(handleVisibleSideMenu({ isVisible: false }))
          navigation.navigate('Favorites', { data })
        }}
      />
      <ButtonMenu
        icon="navicon"
        title="Menu"
        onAction={() => {
          if (sideMenu.isVisible) {
            dispatch(handleVisibleSideMenu({ isVisible: false }))
          } else {
            dispatch(handleVisibleSideMenu({ isVisible: true }))
          }
        }}
      />
    </View>
  )
}
