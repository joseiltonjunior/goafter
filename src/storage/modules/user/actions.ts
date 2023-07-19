import { UserProps } from './types'

export function setSaveUser(user: UserProps) {
  return {
    type: '@user/SAVE_USER',
    payload: {
      user,
    },
  }
}
