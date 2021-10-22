import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { ProfileScreenProps, RootDrawerParams } from '../../utils/types'

import UserPhoto from '../../assets/svg/User-yanapakun.svg'
import Camera from '../../assets/svg/Camara.svg'
import { SCREEN } from '../../utils/constants'

interface Props extends ProfileScreenProps{}

const ProfileScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView>
        <View>
          <Header title='Yanapakun Policía H.' navigation={ navigation } />
          <View>
            <View style={ styles.UserPhoto }>
              { /* <Image
                source={ img }
              /> */ }
              <UserPhoto />
              <TouchableOpacity
                style={ styles.saveUserPhoto }
                onPress={ () => alert('click') }
              >
                <Camera />
              </TouchableOpacity>
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
  UserPhoto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 44
  },
  saveUserPhoto: {
    position: 'absolute',
    alignSelf: 'flex-end',
    left: (SCREEN.width * 2) / 3,
    top: 160
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
