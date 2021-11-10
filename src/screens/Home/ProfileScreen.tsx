import { DrawerScreenProps } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { ProfileScreenProps, RootDrawerParams } from '../../utils/types'

import UserPhoto from '../../assets/svg/User-yanapakun.svg'
import Camera from '../../assets/svg/Camara.svg'
import { SCREEN } from '../../utils/constants'

import * as ImagePicker from 'expo-image-picker'

interface Props extends ProfileScreenProps{}

const ProfileScreen = ({ navigation }: Props) => {

  const [img, setImg] = useState('')

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

  const pickerPicture = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 0.8,
    })
    console.log(pickerResult);
    if(!pickerResult.cancelled) {
      setImg(pickerResult.uri)
    }
  }

  useEffect(() => {
    pickImg()
  }, [])
  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView>
        <View>
          <Header title='Yanapakun Policía H.' navigation={ navigation } />
          <View>
            <View style={ styles.containPhotoUser }>
              <View style={ styles.UserPhoto }>
                {
                    (img)
                      ? (
                        <Image
                          source={ { uri: img } }
                          style={ styles.usePickerPhoto }
                        />
                        )
                      : ( <UserPhoto/> ) 
                }
                <TouchableOpacity
                  style={ styles.saveUserPhoto }
                  onPress={ pickerPicture }
                >
                  <Camera />
                </TouchableOpacity>
              </View>
            </View>
            <View style={ styles.data }>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>Nombre:</Text>
                <Text style={ styles.fontText }>Jose Luis Amaranto</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>Edad:</Text>
                <Text style={ styles.fontText }>51 años</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>DNI:</Text>
                <Text style={ styles.fontText }>70659234</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>Distrito:</Text>
                <Text style={ styles.fontText }>San pedro</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>E-mail:</Text>
                <Text style={ styles.fontText }>juanluis@gmail.com</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>CPI:</Text>
                <Text style={ styles.fontText }>06789546</Text>
              </View>
              <View style={ styles.lastDataUser }>
                <Text style={ styles.fontText }>Unidad policia:</Text>
                <Text style={ styles.fontText }>CPNP HUACHOCOLPA</Text>
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
