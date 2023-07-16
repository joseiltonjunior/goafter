import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

import { Menu } from '@components/Menu'
import { BoxCarousel } from '@components/BoxCarousel'
import { RoundedCarousel } from '@components/RoundedCarousel'
import { useSelector } from 'react-redux'
import { ReduxProps } from '@storage/index'
import { FavoriteProps } from '@storage/modules/favorites/types'
import { Categories } from '@components/Categories'
import { HeaderSection } from '@components/HeaderSection'
import { RouteParamsProps, StackNavigationProps } from '@routes/routes'
import { useNavigation, useRoute } from '@react-navigation/native'
import ImmersiveMode from 'react-native-immersive-mode'

export function Home() {
  const favorites = useSelector<ReduxProps, FavoriteProps[]>(
    (state) => state.favorites,
  )

  const {
    params: { data },
  } = useRoute<RouteParamsProps<'Home'>>()

  const navigation = useNavigation<StackNavigationProps>()

  const [afters, setAfters] = useState<FavoriteProps[]>()

  useEffect(() => {
    ImmersiveMode.fullLayout(true)
    if (data) {
      setAfters(data)
    }
  }, [data])

  if (!afters) {
    return <></>
  }

  return (
    <>
      <ScrollView className="bg-gray-950">
        <View className="p-4 pt-10">
          <HeaderSection style={{ marginBottom: 8 }} title="Categorias" />
          <Categories data={afters} />
          {favorites.length > 0 && (
            <>
              <HeaderSection
                style={{ marginBottom: 8, marginTop: 24 }}
                title="Meus favoritos"
                viewMore={() => navigation.navigate('Favorites')}
              />
              <RoundedCarousel data={favorites} />
            </>
          )}

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 24 }}
            title="Indicação do app"
            viewMore={() =>
              navigation.navigate('ListAfters', {
                key: 'Indicação do app',
                data: afters.filter((item) => item.recommendation === true),
              })
            }
          />
          <BoxCarousel
            data={afters.filter((item) => item.recommendation === true)}
          />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 16 }}
            title="Olinda"
            viewMore={() =>
              navigation.navigate('ListAfters', {
                key: 'Olinda',
                data: afters.filter((item) => item.locale.includes('Olinda')),
              })
            }
          />
          <BoxCarousel
            data={afters.filter((item) => item.locale.includes('Olinda'))}
          />

          <HeaderSection
            style={{ marginBottom: 8, marginTop: 16 }}
            title="Recife"
            viewMore={() =>
              navigation.navigate('ListAfters', {
                key: 'Recife',
                data: afters.filter((item) => item.locale.includes('Recife')),
              })
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
                data: afters.filter((item) => item.locale.includes('Jaboatão')),
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
