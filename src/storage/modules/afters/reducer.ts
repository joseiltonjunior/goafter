import { AfterProps } from '@utils/types/after'
import { Reducer } from 'redux'

const INITIAL_STATE: AfterProps[] = []

const afters: Reducer<AfterProps[]> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@afters/SET_AFTERS': {
      const { afters } = action.payload

      return (state = afters)
    }

    default: {
      return state
    }
  }
}

export default afters
