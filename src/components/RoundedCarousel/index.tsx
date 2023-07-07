import Carousel from 'react-native-reanimated-carousel'

import { FavoriteProps } from '@storage/modules/favorites/types'
import { RoundedCard } from '../RoundedCard'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'

interface SectionProps {
  data: FavoriteProps[]
}

export function RoundedCarousel({ data }: SectionProps) {
  const navigation = useNavigation<StackNavigationProps>()

  return (
    <Carousel
      vertical={false}
      style={{ width: 'auto' }}
      loop={false}
      width={110}
      height={120}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <RoundedCard
          name={item.name}
          pic={item.picUrl}
          onAction={() => navigation.navigate('AfterDetails', { data: item })}
        />
      )}
    />
  )
}
