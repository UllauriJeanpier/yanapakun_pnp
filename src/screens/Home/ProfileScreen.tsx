import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, Image, Alert, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { ProfileScreenProps } from '../../utils/types'

import * as ImagePicker from 'expo-image-picker'
import UserPhoto from '../../assets/svg/User-yanapakun.svg'
import Camera from '../../assets/svg/Camara.svg'
import { SCREEN } from '../../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserLogin } from '../../interfaces/authInterfaces'
import { getProfile, getProfilePhoto, updateProfile, uploadImage } from '../../services/yanapakun/profile'
import { IProfile } from '../../interfaces/profile'
import Button from '../../components/Button'
import { updatePoliceData } from '../../services/yanapakun/police'
import { updatePartialUser } from '../../services/yanapakun/user'

interface UserData {
  email: string
}

interface Props extends ProfileScreenProps{}

const ProfileScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<IProfile>()

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await getProfile()
      if (response) {
        setProfile(response.data)
        await fetchPhotoUser()
      }
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
        Alert.alert('Lo sentimos, necesitamos estos permisos para que esto funcione.')
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
      alert('Hubo un error al subir la imagen')
    }
  }

  const onSave = async () => {
    if (profile) {
      // save profile
      const profileDataPayload = {
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        age: profile?.age,
        document: profile?.document,
        district: profile?.district
      }
      await updateProfile(profile.id, JSON.stringify(profileDataPayload))
      // save policeUnite
      const policeDataPayload = {
        policeUnit: profile.user.police.policeUnit
      }
      await updatePoliceData(profile.user.police.id, JSON.stringify(policeDataPayload))
      // save userEmail
      const userDataPayload = {
        email: profile.user.email
      }
      await updatePartialUser(profile.user.id, JSON.stringify(userDataPayload))
    }
    navigation.navigate('HomeScreen')
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
            { profile && (
              <>
                <View style={ styles.data }>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Nombres:</Text>
                    <TextInput
                      value={ profile.firstName }
                      maxLength={ 30 }
                      style={ styles.fontText }
                      onChangeText={ e => setProfile({ ...profile, firstName: e }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Apellidos:</Text>
                    <TextInput
                      value={ profile.lastName }
                      maxLength={ 30 }
                      style={ styles.fontText }
                      onChangeText={ e => setProfile({ ...profile, lastName: e }) }
                  />

                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Edad:</Text>
                    <TextInput
                      value={ profile.age.toString() }
                      keyboardType= 'numeric'
                      maxLength={ 2 }
                      style={ styles.fontText }
                      onChangeText={ e => setProfile({ ...profile, age: Number(e) }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>DNI:</Text>
                    <TextInput
                      value={ profile.document }
                      keyboardType= 'numeric'
                      maxLength={ 8 }
                      style={ styles.fontText }
                      onChangeText={ e => setProfile({ ...profile, document: e }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Distrito:</Text>
                    <TextInput
                      value={ profile.district }
                      style={ styles.fontText }
                      maxLength={ 40 }
                      onChangeText={ e => setProfile({ ...profile, district: e }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>E-mail:</Text>
                    <TextInput
                      value={ profile.user.email }
                      style={ styles.fontText }
                      maxLength={ 40 }
                      onChangeText={ e => setProfile({ ...profile, user: { ...profile.user, email: e } }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>CPI:</Text>
                    <Text style={ styles.fontText }>{ profile.user.police.numberCIP }</Text>
                  </View>
                  <View style={ styles.lastDataUser }>
                    <Text style={ styles.fontText }>Unidad Policial:</Text>
                    <TextInput
                      value={ profile.user.police.policeUnit }
                      style={ styles.fontText }
                      maxLength={ 30 }
                      onChangeText={ e => setProfile({
                        ...profile,
                        user: {
                          ...profile.user,
                          police: {
                            ...profile.user.police,
                            policeUnit: e
                          }
                        }
                      }) }
                  />
                  </View>
                </View>
                <View style={ styles.btnContainer } >
                  <Button title='Guardar' action={ onSave } />
                </View>
              </>
            ) }
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
  },
  btnContainer: {
    paddingHorizontal: 25,
    marginBottom: 10
  }
})
