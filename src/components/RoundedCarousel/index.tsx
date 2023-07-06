import Carousel from 'react-native-reanimated-carousel'

import { FavoriteProps } from '@storage/modules/favorites/types'
import { RoundedCard } from '../RoundedCard'

interface SectionProps {
  data: FavoriteProps[]
}

export function RoundedCarousel({ data }: SectionProps) {
  return (
    <Carousel
      vertical={false}
      style={{ width: 'auto' }}
      loop={false}
      width={110}
      height={150}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <RoundedCard
          name={item.name}
          pic={item.pic}
          stars={item.stars}
          action={() => {}}
        />
      )}
    />
  )
}
