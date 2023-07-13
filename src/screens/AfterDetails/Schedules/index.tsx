import { Text, View } from 'react-native'

interface schedulesProps {
  data: string
}

export function Schedules({ data }: schedulesProps) {
  return (
    <View>
      <Text className="text-lg font-semibold text-white mb-1 mt-4">
        Horários de funcionamento
      </Text>

      <View className="flex-row justify-between items-center">
        <Text className="text-base font-normal text-gray-400">
          Segunda-feira
        </Text>
        <Text className="text-base font-normal text-gray-400">{data}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-normal text-gray-400">Terça-feira</Text>
        <Text className="text-base font-normal text-gray-400">{data}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-normal text-gray-400">
          Quarta-feira
        </Text>
        <Text className="text-base font-normal text-gray-400">{data}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-normal text-gray-400">
          Quinta-feira
        </Text>
        <Text className="text-base font-normal text-gray-400">{data}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-normal text-gray-400">Sexta-feira</Text>
        <Text className="text-base font-normal text-gray-400">{data}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-normal text-gray-400">Sabádo</Text>
        <Text className="text-base font-normal text-gray-400">{data}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-normal text-gray-400">Domingo</Text>
        <Text className="text-base font-normal text-gray-400">{data}</Text>
      </View>
    </View>
  )
}
