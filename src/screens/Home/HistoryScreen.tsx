import React, { useState } from 'react'
import 
{ 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Header from '../../components/Header'
import { HistoryScreenProps } from '../../utils/types'
import Ready from '../../assets/svg/checkCircle.svg'
import Reject from '../../assets/svg/notDisturbon.svg'
import ModalNotification from '../../components/ModalNotification'

interface Props extends HistoryScreenProps{}

interface DataNotification {
  userName: string,
  time: string,
  id: number,
  atention: boolean
}

const HistoryScreen = ({navigation}: Props) => {

  const userNotifications:DataNotification[] = [
    {
      userName: 'Marisol Ochoa',
      id: 1,
      time: '19:20',
      atention: true,
    },
    {
      userName: 'Juan Garcia',
      id: 2,
      time: '08:10',
      atention: false,
    },
    {
      userName: 'Amanda Aguirre',
      id: 3,
      time: '23:53',
      atention: true,
    },
    {
      userName: 'Camila Rios',
      id: 4,
      time: '23:53',
      atention: true,
    },
  ]

  const [atention, setAtention] = useState(false)
  const [user, onChangeUser]= useState({
    userName: 'Prueba Prueba',
    id: 0,
    time: '00:00',
    atention: false,
  })
  
  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView>
        <View>
          <Header title="Historial de Emergencias" navigation={ navigation } hasDrawer />
          <View style={styles.containNotifications}>
            {
              userNotifications.map((usuario, index: number) => {
                return (
                  <View style={ styles.notification } key={ index }>
                    <View>
                      <Text style={ styles.emergencyUser }>{ usuario.userName }</Text>
                      <Text style={ styles.emergencyTime }>Hoy { usuario.time }</Text>
                    </View>
                    {
                      usuario.atention === false 
                      ? 
                    <TouchableOpacity
                      style={ styles.btn }
                      onPress={() => {
                        onChangeUser(usuario)
                        setAtention(true)
                      }}
                    >
                      <Reject/>
                      <Text style={styles.btnRed}>Sin respuesta</Text>
                    </TouchableOpacity>
                      :
                    <TouchableOpacity
                      style={ styles.btn }
                      onPress={() => {
                        onChangeUser(usuario)
                        setAtention(true)
                      }}
                    >
                      <Ready/>
                      <Text style={ styles.btnGreen }>Atendida</Text>
                    </TouchableOpacity>
                    }
                  </View>
                )
              })
            }
          </View>
          <ModalNotification
            isVisible={ atention }
            hideAction={ () => setAtention(false)}
            user={ user }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7'
  },
  containNotifications:{
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F4EEE3',
    marginBottom: 12,
    height: 72,
    borderRadius: 12,
    alignItems: 'center',
    paddingLeft: 15
  },
  emergencyUser:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A413D'
  },
  emergencyTime:{
    fontSize: 16,
    fontWeight: '500',
    color: '#3A413D',
    marginTop: 9
  },
  btn: {
    marginRight: 13,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnGreen: {
    color: '#216D3F',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 9
  },
  btnRed: {
    color: '#A41C1C',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 9
  }
})
