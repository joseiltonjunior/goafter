import { Reducer } from 'redux'
import { UserProps } from './types'

const INITIAL_STATE: UserProps = {
  displayName: '',
  email: '',
  photoURL: '',
  uid: '',
}

const user: Reducer<UserProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@user/SAVE_USER': {
      const { user } = action.payload

      return (state = user)
    }

    default: {
      return state
    }
  }
}

export default user
