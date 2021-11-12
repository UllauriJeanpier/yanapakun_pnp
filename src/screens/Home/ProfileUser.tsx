import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { ProfileScreenProps, RootDrawerParams } from '../../utils/types'

import UserPhoto from '../../assets/svg/User-yanapakun.svg'

interface Props extends ProfileScreenProps{}

const ProfileUser = ({ navigation }: Props) => {

  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView>
        <View>
          <Header title='Yanapakun Policía H.' navigation={ navigation } />
          <View>
            <View style={ styles.containPhotoUser }>
              <View style={ styles.UserPhoto }>
                {/* {
                    (img)
                      ? (
                        <Image
                          source={ { uri: imagen perfil } }
                          style={ styles.usePickerPhoto }
                        />
                        )
                      : ( <UserPhoto/> ) 
                } */}
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
                <Text style={ styles.fontText }>Nro de Teléfono:</Text>
                <Text style={ styles.fontText }>946845604</Text>
              </View>
              <View style={ styles.dataUser }>
                <Text style={ styles.fontText }>Teléfono de emergencia::</Text>
                <Text style={ styles.fontText }>946845604</Text>
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
