import { View } from 'react-native'

import MapView, { Marker } from 'react-native-maps'

interface mapProps {
  coords: {
    latitude: number
    longitude: number
  }
}

export function Map({ coords }: mapProps) {
  return (
    <View className="rounded-md overflow-hidden">
      <MapView
        className="flex-1 h-60 "
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
        />
      </MapView>
    </View>
  )
}
