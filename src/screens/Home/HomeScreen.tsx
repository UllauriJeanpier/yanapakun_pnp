import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Header from '../../components/Header'
import { IPosition } from '../../interfaces/LocationInterface'
import { getCurrentLocation } from '../../utils/helpers'
import { HomeScreenProps, RootDrawerParams } from '../../utils/types'

interface Props extends HomeScreenProps{}

const HomeScreen = ({ navigation }: Props) => {
  const [location, setlocation] = useState<IPosition>()

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    const { status, position } = await getCurrentLocation()
    if (!status) {
      // Mostrar nuevamente el modal
      return
    }
    position && setlocation(position)
    // Guardar latitud y longitud
  }

  return (
    <>
      <Header title='Yanapakun Policía H.' navigation={ navigation } hasDrawer />
      <View style={ styles.container }>
        { location && (<MapView
          style={ styles.mapContainer }
          initialRegion={ location }
          >
          <Marker coordinate={ location }>

          </Marker>
        </MapView>) }
      </View>
    </>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContainer: {
    width: '100%',
    height: '100%'
  }
})
