import { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import MapView, { Marker } from 'react-native-maps'

interface mapProps {
  afterTitle: string
  actualCoords: {
    latitude: number
    longitude: number
  }
  afterCoords: {
    latitude: number
    longitude: number
  }
}

export function Map({ afterCoords, actualCoords, afterTitle }: mapProps) {
  const mapRef = useRef<MapView | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  const calculateZoom = useCallback(() => {
    if (mapRef.current) {
      const latitudeDelta =
        Math.abs(actualCoords.latitude - afterCoords.latitude) * 1.2
      const longitudeDelta =
        Math.abs(actualCoords.longitude - afterCoords.longitude) * 1.2

      const midLatitude = (actualCoords.latitude + afterCoords.latitude) / 2
      const midLongitude = (actualCoords.longitude + afterCoords.longitude) / 2

      mapRef.current.animateToRegion({
        latitude: midLatitude,
        longitude: midLongitude,
        latitudeDelta,
        longitudeDelta,
      })
    }
  }, [
    actualCoords.latitude,
    actualCoords.longitude,
    afterCoords.latitude,
    afterCoords.longitude,
  ])

  const handleMapLayout = () => {
    setIsMapReady(true)
  }

  useEffect(() => {
    if (isMapReady) {
      calculateZoom()
    }
  }, [calculateZoom, isMapReady])

  return (
    <View className="rounded-md overflow-hidden">
      <MapView
        ref={mapRef}
        className="flex-1 h-60 "
        onLayout={handleMapLayout}
        initialRegion={{
          latitude: afterCoords.latitude,
          longitude: afterCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          title="Localização atual"
          coordinate={{
            latitude: actualCoords.latitude,
            longitude: actualCoords.longitude,
          }}
        />

        <Marker
          title={afterTitle}
          coordinate={{
            latitude: afterCoords.latitude,
            longitude: afterCoords.longitude,
          }}
        />
      </MapView>
    </View>
  )
}
