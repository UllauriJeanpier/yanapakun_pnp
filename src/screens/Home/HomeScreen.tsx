import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Header from '../../components/Header'
import PoliceIcon from '../../assets/svg/ubicación-policía.svg'
import PersonaIcon from '../../assets/svg/ubicación-persona.svg'
import GreenPosition from '../../assets/svg/placeholder.svg'
import { IPosition } from '../../interfaces/LocationInterface'
import { getCurrentLocation } from '../../utils/helpers'
import { HomeScreenProps, RootDrawerParams } from '../../utils/types'
import { FONTS } from '../../utils/constants'

interface Props extends HomeScreenProps { }

const HomeScreen = ({ navigation }: Props) => {
  const [location, setlocation] = useState<IPosition>()

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    const { status, position } = await getCurrentLocation()
    if (!status) {
      return
    }
    position && setlocation(position)
    // Guardar latitud y longitud
  }

  return (
    <>
      <Header title='Yanapakun Policía H.' navigation={ navigation } hasDrawer />
      <View style={ styles.container }>
        { location && (
          <MapView
            style={ styles.mapContainer }
            mapType="standard"
            // Aqui se puede intercambiar por la region de Huancavelica de manera estatica
            initialRegion={ location }
          >
            <CustomMarker
              location={ location }
              title={ 'Tú' }
              isPolice
            />
          </MapView>) }
      </View>
    </>
  )
}

interface PropsMarker {
  location: IPosition
  title: string
  isPolice?: boolean
}

const CustomMarker = ({ location, title, isPolice }: PropsMarker) => {
  return (
    <Marker coordinate={ location }>
      <View style={ styles.positionContainer }>
        <View style={ styles.imageIconContainer }>
          <Text style={ styles.txtIcon }>{ title }</Text>
          { isPolice
            ? (
              <PoliceIcon width={ '100%' } height={ '100%' } />
              )
            : (
              <PersonaIcon width={ '100%' } height={ '100%' } />
              ) }
        </View>
        <View style={ styles.markerIconContainer }>
          <GreenPosition width={ '50%' } height={ '100%' } />
        </View>
      </View>
    </Marker>
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
  },
  positionContainer: {
    width: 110,
    height: 90
    // backgroundColor: 'red'
  },
  imageIconContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtIcon: {
    position: 'absolute',
    top: 17,
    right: 32,
    zIndex: 10,
    fontFamily: FONTS.ProximaNovaBold,
    fontSize: 16,
    color: '#FFFCF7'
  },
  markerIconContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
