import React from 'react'
import { ScrollView, View } from 'react-native'

import Afters from '@utils/afters.json'

import { Menu } from '@components/Menu'
import { BoxCarousel } from '@components/BoxCarousel'
import { RoundedCarousel } from '@components/RoundedCarousel'
import { useSelector } from 'react-redux'
import { ReduxProps } from '@storage/index'
import { FavoriteProps } from '@storage/modules/favorites/types'
import { Categories } from '@components/Categories'
import { HeaderSection } from '@components/HeaderSection'

export function Home() {
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  return (
    <>
      <ScrollView className="bg-gray-950">
        <View className="p-4">
          <HeaderSection
            style={{ marginBottom: 8 }}
            title="Categorias"
            viewMore={() => console.log('ok')}
          />
          <Categories />
          <HeaderSection
            style={{ marginBottom: 8, marginTop: 24 }}
            title="Meus Favoritos"
            viewMore={() => console.log('ok')}
          />
          <RoundedCarousel data={favorites} />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 24 }}
            title="Mais indicados"
            viewMore={() => console.log('ok')}
          />
          <BoxCarousel data={Afters} />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 16 }}
            title="Olinda"
            viewMore={() => console.log('ok')}
          />
          <BoxCarousel data={Afters} />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 16 }}
            title="Recife"
            viewMore={() => console.log('ok')}
          />
          <BoxCarousel data={Afters} />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 16 }}
            title="Jaboatão dos Guararapes"
            viewMore={() => console.log('ok')}
          />
          <BoxCarousel data={Afters} />
        </View>
      </ScrollView>
      <Menu />
    </>
  )
}
