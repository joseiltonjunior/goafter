import { Reducer } from 'redux'
import { SideMenuProps, SET_SHOW_SIDE_MENU } from './types'

const INITIAL_STATE: SideMenuProps = {
  isVisible: false,
}

const sideMenu: Reducer<SideMenuProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SHOW_SIDE_MENU: {
      const { isVisible } = action.payload

      return (state = isVisible)
    }
    default: {
      return state
    }
  }
}

export default sideMenu
