import React from 'react'
import { ScrollView, View } from 'react-native'

import { Menu } from '@components/Menu'
import { BoxCarousel } from '@components/BoxCarousel'
import { RoundedCarousel } from '@components/RoundedCarousel'
import { useSelector } from 'react-redux'
import { ReduxProps } from '@storage/index'

import { Categories } from '@components/Categories'
import { HeaderSection } from '@components/HeaderSection'
import { StackNavigationProps } from '@routes/routes'
import { useNavigation } from '@react-navigation/native'
import { UserProps } from '@storage/modules/user/types'

import { AfterProps } from '@utils/types/after'
import { useFavorites } from '@hooks/useFavorites'

export function Home() {
  const user = useSelector<ReduxProps, UserProps>((state) => state.user)

  const afters = useSelector<ReduxProps, AfterProps[]>((state) => state.afters)

  const navigation = useNavigation<StackNavigationProps>()

  const { favoriteList } = useFavorites()

  return (
    <>
      <ScrollView className="bg-gray-950">
        <View className="p-4 mt-10">
          <HeaderSection style={{ marginBottom: 8 }} title="Categorias" />
          <Categories data={afters} />
          {user.favoritesAfters.length > 0 && (
            <>
              <HeaderSection
                style={{ marginBottom: 8, marginTop: 24 }}
                title="Meus favoritos"
                viewMore={() => navigation.navigate('Favorites')}
              />
              <RoundedCarousel data={favoriteList()} />
            </>
          )}

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 24 }}
            title="Indicação do app"
            viewMore={() =>
              navigation.navigate('ListAfters', { key: 'Indicação' })
            }
          />
          <BoxCarousel
            data={afters.filter((item) => item.recommendation === true)}
          />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 16 }}
            title="Olinda"
            viewMore={() =>
              navigation.navigate('ListAfters', { key: 'Olinda' })
            }
          />
          <BoxCarousel
            data={afters.filter((item) => item.locale.includes('Olinda'))}
          />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 16 }}
            title="Recife"
            viewMore={() =>
              navigation.navigate('ListAfters', { key: 'Recife' })
            }
          />
          <BoxCarousel
            data={afters.filter((item) => item.locale.includes('Recife'))}
          />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 16 }}
            title="Jaboatão dos Guararapes"
            viewMore={() =>
              navigation.navigate('ListAfters', {
                key: 'Jaboatão dos Guararapes',
              })
            }
          />
          <BoxCarousel
            data={afters.filter((item) => item.locale.includes('Jaboatão'))}
          />
        </View>
      </ScrollView>
      <Menu />
    </>
  )
}
