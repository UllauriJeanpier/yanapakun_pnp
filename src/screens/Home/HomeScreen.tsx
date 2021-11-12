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
import { getUsers, updatePartialUser } from '../../services/yanapakun/user'
import { User } from '../../interfaces/user.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserLogin } from '../../interfaces/authInterfaces'
import { ws } from '../../services/yanapakun/socket'
import { Socket } from 'socket.io-client'

interface Props extends HomeScreenProps { }

const HomeScreen = ({ navigation }: Props) => {
  const [location, setlocation] = useState<IPosition>()
  const [users, setUsers] = useState<User[]>([])

  const callData = async () => {
    const socket = await ws()
    socket.on('revice_call_help', () => {
      getAllUsers()
      console.log('reload users')
    })
  }

  const saveTokenNotification = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      const token = await AsyncStorage.getItem('tokenNotification') ?? ''
      let dataUser: IUserLogin
      if (typeof user === 'string') {
        dataUser = JSON.parse(user)
        if (token ?? user) {
          await updatePartialUser(dataUser?.id, {
            notificationToken: token
          })
        }
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const getAllUsers = async () => {
    // get user storage
    const userStorage = await AsyncStorage.getItem('user')
    let dataUser: IUserLogin
    if (typeof userStorage === 'string') {
      dataUser = JSON.parse(userStorage)
    }
    // find all user api
    const response = await getUsers()
    const { data } = response.data
    let users: User[]
    users = data
    // exclude current user
    users = users.filter((i: User) => i.id !== dataUser.id)
    setUsers(users)
  }

  useEffect(() => {
    saveTokenNotification().then(() => console.log('save token notification'))
    getLocation()
    getAllUsers()
    callData()
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
            // Aquí se puede intercambiar por la region de Huancavelica de manera estática
            initialRegion={ location }
          >
            <CustomMarker
              location={ location }
              title={ 'Tú' }
              isPolice
             />
            { users.map((user: User) => {
              return (<CustomMarker
                key={ user.id }
                location={ {
                  latitude: Number(user.profile.latitude),
                  longitude: Number(user.profile.longitude),
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001
                } }
                title={ user.profile.firstName }
                isPolice={ !!user.roles.find((i) => i === 'police') }
              />)
            }) }
          </MapView>) }
      </View>
    </>
  )
}

interface PropsMarker {
  location: IPosition
  title: string
  isPolice: boolean
}

const CustomMarker = ({ location, title, isPolice }: PropsMarker) => {
  return (
    <Marker coordinate={ location }>
      <View style={ styles.positionContainer }>
        <View style={ styles.imageIconContainer }>
          { isPolice
            ? (
              <PoliceIcon width={ '100%' } height={ '100%' } />
              )
            : (
              <PersonaIcon width={ '100%' } height={ '100%' } />
              ) }

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
