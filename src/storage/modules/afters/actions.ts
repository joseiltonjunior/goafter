import { AfterProps } from '@utils/types/after'

export function setAfters(afters: AfterProps[]) {
  return {
    type: '@afters/SET_AFTERS',
    payload: {
      afters,
    },
  }
}
