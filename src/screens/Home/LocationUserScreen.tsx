import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import { LocationUserScreenProps } from '../../utils/types'
import Header from '../../components/Header'
import { CallHelp } from '../../interfaces/callHelp'
import MapView, { Marker } from 'react-native-maps'
import Button from '../../components/Button'
import { FONTS } from '../../utils/constants'
import { ModalEmergency } from '../../components/ModalEmergency'
import { IPosition } from '../../interfaces/LocationInterface'
import PersonaIcon from '../../assets/svg/ubicación-persona.svg'
import GreenPosition from '../../assets/svg/placeholder.svg'

const { height } = Dimensions.get('window')

interface Props extends LocationUserScreenProps { }

export const LocationUserScreen = ({ navigation, route }: Props) => {
  // const params = route.params;

  const { call } = route.params
  const fullName = `${call.user.profile.firstName} ${call.user.profile.lastName}`
  const [isActive, setIsActive] = useState(false)
  const [modal, setModal] = useState(true)

  const location = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  useEffect(() => {
    setModal(true)
  }, [call])

  return (
    <SafeAreaView>
      <View>
        <Header title="Historial de Emergencias" navigation={ navigation } />
        <View style={ styles.container }>
          <TouchableOpacity
            style={ styles.toUserPerfil }
            onPress={ () => navigation.navigate('ProfileUser', { profile: call.user.profile }) }
          >
            <Text style={ styles.toUserPerfilTxt }>Ir al perfil</Text>
          </TouchableOpacity>
          <MapView
            mapType="standard"
            style={ styles.mapContainer }
            initialRegion={ location }
          >
            <CustomMarker
              location={ location }
              title={ 'User' }
            />
          </MapView>
          <View style={ styles.containBtns }>
            { isActive
              ? (
                <TouchableOpacity
                  onPress={ () => setIsActive(false) }
                  style={ [styles.btn, styles.btnGreen] }
                >
                  <Text style={ styles.btnTxt }>La emergencia ha sido atendida</Text>
                </TouchableOpacity>
                )
              : (
                <TouchableOpacity
                  onPress={ () => setIsActive(true) }
                  style={ [styles.btn, styles.btnRed] }
                >
                  <Text style={ styles.btnTxt }>Atender emergencia</Text>
                </TouchableOpacity>
                )
            }
            { isActive
              ? (
                <TouchableOpacity style={ styles.btn }>
                  <Text style={ styles.btnTxt }>Sin respuesta</Text>
                </TouchableOpacity>
                )
              : (
                <TouchableOpacity /* onPress={ () => setIsActive(true) } */ style={ styles.btn }>
                  <Text style={ styles.btnTxt }>Atender otra emergencia</Text>
                </TouchableOpacity>
                )
            }
          </View>
        </View>
        <ModalEmergency
          userName={ fullName }
          isVisible={ modal }
          hideAction={ () => setModal(false) }
        />
      </View>
    </SafeAreaView>
  )
}

interface PropsMarker {
  location: IPosition
  title: string
}

const CustomMarker = ({ location, title }: PropsMarker) => {
  return (
    <Marker coordinate={ location }>
      <View style={ styles.positionContainer }>
        <View style={ styles.imageIconContainer }>
          <PersonaIcon width={ '100%' } height={ '100%' } />
        </View>
        <View style={ styles.containerIcon }>
          <Text style={ styles.txtIcon }>{ title }</Text>
        </View>
        <View style={ styles.markerIconContainer }>
          <GreenPosition width={ '50%' } height={ '100%' } />
        </View>
      </View>
    </Marker>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  toUserPerfil: {
    zIndex: 9999,
    position: 'absolute',
    top: '10%',
    right: 20,
    backgroundColor: '#8F9290'
  },
  toUserPerfilTxt: {
    color: '#fff',
    fontSize: 18,
    fontFamily: FONTS.ProximaNovaBold,
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 3,
    borderWidth: 1
  },
  mapContainer: {
    width: '100%',
    height: '100%'
  },
  containBtns: {
    height: '20%',
    width: '100%',
    padding: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '57%'
  },
  btn: {
    width: '100%',
    backgroundColor: '#8F9290',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    marginBottom: 10
  },
  btnRed: {
    backgroundColor: '#E30027'
  },
  btnGreen: {
    backgroundColor: '#216D3F'
  },
  btnTxt: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONTS.ProximaNovaBold
  },
  positionContainer: {
    width: 110,
    height: 90
  },
  imageIconContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerIcon: {
    width: '70%',
    top: 18,
    marginLeft: '30%',
    marginRight: '10%',
    position: 'absolute'
  },
  txtIcon: {
    textAlign: 'center',
    position: 'relative',
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
