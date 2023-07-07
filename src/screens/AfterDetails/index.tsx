import { Menu } from '@components/Menu'
import { useRoute } from '@react-navigation/native'
import { RouteParamsProps } from '@routes/routes'

import { Image, ScrollView, Text, View } from 'react-native'

export function AfterDetails() {
  const {
    params: { data },
  } = useRoute<RouteParamsProps<'AfterDetails'>>()

  return (
    <>
      <ScrollView className="bg-gray-950">
        <View>
          <Image
            className="w-auto"
            height={300}
            source={{
              uri: `${data.pic}`,
            }}
            alt="after pic"
          />
          <View className="p-4">
            <Text>{data.name}</Text>
            <Text>{data.description}</Text>
            <Text>{data.hour}</Text>
            <Text>{data.indicator}</Text>
            <Text>{data.phone}</Text>
            <Text>{data.payment}</Text>
            <Text>{data.stars}</Text>
            <Text>{data.local}</Text>
          </View>
        </View>
      </ScrollView>
      <Menu />
    </>
  )
}
