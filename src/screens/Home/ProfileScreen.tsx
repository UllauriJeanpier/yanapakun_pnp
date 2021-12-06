import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { ProfileScreenProps } from '../../utils/types'

import * as ImagePicker from 'expo-image-picker'
import UserPhoto from '../../assets/svg/User-yanapakun.svg'
import Camera from '../../assets/svg/Camara.svg'
import { SCREEN } from '../../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserLogin } from '../../interfaces/authInterfaces'
import { getProfile, getProfilePhoto, uploadImage } from '../../services/yanapakun/profile'

interface UserData {
  email: string
}

interface ProfileData {
  age: number
  dateBirth: string
  district: string
  document: string
  policeUnit: string
  firstName: string
  gender: string
  id: number
  lastName: string
  latitude: string
  longitude: string
  phone: string
  updatedAt: string
  user: UserData
}

interface Props extends ProfileScreenProps{}

const ProfileScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileData>({
    age: 0,
    dateBirth: '',
    district: '',
    document: '',
    firstName: '',
    policeUnit: '',
    gender: '',
    id: 0,
    lastName: '',
    latitude: '',
    longitude: '',
    phone: '',
    updatedAt: '',
    user: {
      email: ''
    }
  })
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await getProfile()
      setProfile(response.data)
      await fetchPhotoUser()
    } catch (e) {
      console.log(e)
    }
  }
  const [image, setImage] = useState<string>('')

  const fetchPhotoUser = async () => {
    try {
      setLoading(true)
      const user = await AsyncStorage.getItem('user')
      let dataUser: IUserLogin
      if (typeof user === 'string') {
        dataUser = JSON.parse(user)
        const response = await getProfilePhoto(dataUser?.id)
        if (response) {
          setImage(String(response))
        } else {
          setImage('')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  const pickImg = async () => {
    if (Platform.OS === 'ios') {
      const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
      if (
        cameraRollStatus.status !== 'granted' ||
        cameraStatus.status !== 'granted'
      ) {
        alert('Lo sentimos, necesitamos estos permisos para que esto funcione.')
      }
    }
  }

  useEffect(() => {
    fetchData().then(() => {
      setLoading(false)
    })
    pickImg()
  }, [])

  const pickerPicture = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [2, 2]
      })
      await handleImagePicked(pickerResult)
    } catch (e) {
      console.log(e)
    }
  }

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        const user = await AsyncStorage.getItem('user')
        let dataUser: IUserLogin
        if (typeof user === 'string') {
          dataUser = JSON.parse(user)
          await uploadImage(pickerResult.uri, dataUser.id)
          await fetchData()
          setLoading(false)
        }
      }
    } catch (e) {
      console.log({ e })
      alert('Upload failed, sorry :(')
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
                {
                  (image)
                    ? (
                      <Image
                        source={ { uri: image } }
                        style={ styles.usePickerPhoto }
                      />
                      )
                    : (
                      <UserPhoto/>
                      ) }
                <TouchableOpacity
                  style={ styles.saveUserPhoto }
                  onPress={ pickerPicture }
                >
                  <Camera/>
                </TouchableOpacity>
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
                <Text style={ styles.fontText }>E-mail:</Text>
                <Text style={ styles.fontText }>{ profile.user.email }</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>CPI:</Text>
                <Text style={ styles.fontText }>{ profile.phone }</Text>
              </View>
              <View style={ styles.lastDataUser }>
                <Text style={ styles.fontText }>Unidad Policial:</Text>
                <Text style={ styles.fontText }>{ profile.policeUnit }</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

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
