import { Menu } from '@components/Menu'
import { ScrollView, Text, View } from 'react-native'

export function Favorites() {
  return (
    <>
      <ScrollView>
        <View className="p-4">
          <Text>favoritos</Text>
        </View>
      </ScrollView>
      <Menu />
    </>
  )
}
