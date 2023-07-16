import { FlatList, Text, View } from 'react-native'

interface schedulesProps {
  data: [
    {
      name: string
      value: string
    },
  ]
}

export function Schedules({ data }: schedulesProps) {
  return (
    <View>
      <Text className="text-lg font-semibold text-white mb-1 mt-4">
        Horários de funcionamento
      </Text>

      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-normal text-gray-400">
              {item.name[0].toUpperCase() + item.name.substring(1)}
            </Text>
            <Text className="text-base font-normal text-gray-400">
              {item.value}
            </Text>
          </View>
        )}
      />
    </View>
  )
}
