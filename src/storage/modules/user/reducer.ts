import { Reducer } from 'redux'
import { UserProps } from './types'

const INITIAL_STATE: UserProps = {
  id: 1,
  name: 'Junior Ferreira',
  email: 'joseiltonjuniortech@gmail.com',
  password: 'teste0',
  phone_number: '81995764897',
  pic: 'https://avatars.githubusercontent.com/u/47725788?v=4',
}

const user: Reducer<UserProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@user/SET_USER': {
      const { user } = action.payload

      return (state = user)
    }
    default: {
      return state
    }
  }
}

export default user
