import Carousel from 'react-native-reanimated-carousel'
import { Card } from '../Card'
import { FavoriteProps } from '@storage/modules/favorites/types'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'

interface SectionProps {
  data: FavoriteProps[]
}

export function BoxCarousel({ data }: SectionProps) {
  const navigation = useNavigation<StackNavigationProps>()

  return (
    <Carousel
      loop={false}
      style={{ width: 'auto' }}
      width={150}
      height={170}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <Card
          name={item.name}
          pic={item.picsUrl[0]}
          stars={item.stars}
          onAction={() => navigation.navigate('AfterDetails', { data: item })}
        />
      )}
    />
  )
}
