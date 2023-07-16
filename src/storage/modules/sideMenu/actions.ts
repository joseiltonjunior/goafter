import { SET_SHOW_SIDE_MENU, SideMenuProps } from './types'

export function handleVisibleSideMenu(isVisible: SideMenuProps) {
  return {
    type: SET_SHOW_SIDE_MENU,
    payload: {
      isVisible,
    },
  }
}
