import { DrawerScreenProps } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { ProfileUserScrenProps } from '../../utils/types'
import { getProfile, getProfilePhoto, uploadImage } from '../../services/yanapakun/profile'

import UserPhoto from '../../assets/svg/User-yanapakun.svg'

interface Props extends ProfileUserScrenProps { }

const ProfileUser = ({ navigation, route }: Props) => {
  const { profile } = route.params

  const [image, setImage] = useState('')

  useEffect(() => {
    fetchPhotoUser()
  }, [profile])

  const fetchPhotoUser = async () => {
    const response = await getProfilePhoto(profile?.id)
    if (response) {
      setImage(String(response))
    } else {
      setImage('')
    }
  }

  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView>
        <View>
          <Header title='Yanapakun Policía H.' navigation={ navigation } />
          <View>
            <View style={ styles.containPhotoUser }>
              <View style={ styles.UserPhoto }>
                { image !== ''
                  ? (
                    <Image
                      source={ { uri: image } }
                      style={ styles.usePickerPhoto }
                    />
                    )
                  : (
                    <UserPhoto />
                    ) }
              </View>
            </View>
            <View style={ styles.data }>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>Nombre:</Text>
                <Text style={ styles.fontText }>{ profile.firstName } { profile.lastName }</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>Edad:</Text>
                <Text style={ styles.fontText }>{ profile.age } años</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>DNI:</Text>
                <Text style={ styles.fontText }>{ profile.document }</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>Distrito:</Text>
                <Text style={ styles.fontText }>{ profile.district }</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>Nro de Teléfono:</Text>
                <Text style={ styles.fontText }>{ profile.phone }</Text>
              </View>
              <View style={ styles.lastDataUser }>
                <Text style={ styles.fontText }>Teléfono de emergencia::</Text>
                <Text style={ styles.fontText }>{ profile.emergencyNumber }</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7'
  },
  containPhotoUser: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  UserPhoto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 44,
    height: 200,
    width: 180,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: '#e3e3e3',
    borderWidth: 1
  },
  saveUserPhoto: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: -10,
    bottom: -10
  },
  usePickerPhoto: {
    width: 180,
    height: 200,
    borderRadius: 20
  },
  data: {
    paddingHorizontal: 28
  },
  dataUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#216D3F',
    borderBottomWidth: 1,
    paddingVertical: 18
  },
  lastDataUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18
  },
  fontText: {
    color: '#3A413D',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
