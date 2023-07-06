import { UserProps } from './types'

export function setUser(user: UserProps) {
  return {
    type: '@user/SET_USER',
    payload: {
      user,
    },
  }
}
