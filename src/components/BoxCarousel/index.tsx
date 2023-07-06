import Carousel from 'react-native-reanimated-carousel'
import { Card } from '../Card'
import { FavoriteProps } from '@storage/modules/favorites/types'

interface SectionProps {
  data: FavoriteProps[]
}

export function BoxCarousel({ data }: SectionProps) {
  return (
    <Carousel
      loop={false}
      vertical={false}
      style={{ width: 'auto' }}
      width={150}
      height={170}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <Card
          name={item.name}
          pic={item.pic}
          stars={item.stars}
          action={() => {}}
        />
      )}
    />
  )
}
