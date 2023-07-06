import { Reducer } from 'redux'
import { FavoriteProps } from './types'

const INITIAL_STATE: FavoriteProps[] = [
  {
    local: 'R. Dep. Célso Miranda - Ipsep, Recife - PE',
    name: 'Petiscaria Pajuçara',
    hour: '11:00 - 22:00',
    payment: 'Cartão e Dinheiro',
    stars: 5,
    pic: 'https://lh3.googleusercontent.com/p/AF1QipOzRMlfVf8nvBVLkA-TRPzXyQHbK7R-Tgj05w_k=s680-w680-h510',
    phone: '(81) 3125-0280',
    description: 'Restaurante.',
    indicator: 33,
  },
  {
    local: 'R. São Mateus, 576 - Loja 1 - Iputinga, Recife - PE',
    name: 'Barteco',
    hour: '17:00 - 22:00',
    payment: 'Cartão e Dinheiro',
    stars: 5,
    pic: 'https://clientes.programaconsumer.com.br/wp-content/uploads/2020/01/barteco-recife-pe-destaque.png',
    phone: '(81) 98679-8371',
    description: 'Hamburgueria.',
    indicator: 33,
  },
]

const favorites: Reducer<FavoriteProps[]> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@favorites/ADD_FAVORITE': {
      const { favorite } = action.payload

      return [...state, favorite]
    }

    case '@favorites/REMOVE_FAVORITE': {
      const { favorite } = action.payload

      const newArray = state.filter((item) => item.name !== favorite.name)

      return newArray
    }

    default: {
      return state
    }
  }
}

export default favorites
