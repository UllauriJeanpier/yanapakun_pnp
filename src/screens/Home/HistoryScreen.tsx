import React, { useEffect, useState } from 'react'
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
import { getCallHelp } from '../../services/yanapakun/callHelp'
import { CallHelp } from '../../interfaces/callHelp'
import { ModalEmergency } from '../../components/ModalEmergency'

interface Props extends HistoryScreenProps{}

interface DataNotification {
  userName: string
  time: string
  id: number
  atention: boolean
}

const HistoryScreen = ({ navigation }: Props) => {
  const [callsHelp, setCallsHelp] = useState<CallHelp[]>([])
  const getCallsHelp = async () => {
    try {
      const { data } = await getCallHelp()
      setCallsHelp(data)
    } catch (e) {
      console.log(e)
    }
  }
  const userNotifications: DataNotification[] = [
    {
      userName: 'Marisol Ochoa',
      id: 1,
      time: '19:20',
      atention: true
    }
    // {
    //   userName: 'Juan Garcia',
    //   id: 2,
    //   time: '08:10',
    //   atention: false
    // },
    // {
    //   userName: 'Amanda Aguirre',
    //   id: 3,
    //   time: '23:53',
    //   atention: true
    // },
    // {
    //   userName: 'Camila Rios',
    //   id: 4,
    //   time: '23:53',
    //   atention: true
    // }
  ]

  const [atention, setAtention] = useState(false)
  const [modal, setModal] = useState(true)
  const [user, onChangeUser] = useState<CallHelp>()

  useEffect(() => {
    getCallsHelp().then(() => console.log('get calls help'))
  }, [])
  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView>
        <View>
          <Header title="Historial de Emergencias" navigation={ navigation } hasDrawer />
          <Text>{ callsHelp.length }</Text>
          <View style={ styles.containNotifications }>
            {
              callsHelp.map((callHep: CallHelp, index: number) => {
                return (
                  <View style={ styles.notification } key={ index }>
                    <View>
                      <Text style={ styles.emergencyUser }>{ callHep.user.email }</Text>
                      <Text style={ styles.emergencyTime }>Hoy { callHep.createdAt }</Text>
                    </View>
                    {
                      !callHep.status
                        ? <TouchableOpacity
                            style={ styles.btn }
                            onPress={ () => {
                              onChangeUser(callHep)
                              setAtention(true)
                            } }
                    >
                          <Reject/>
                          <Text style={ styles.btnRed }>Sin respuesta</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity
                            style={ styles.btn }
                            onPress={ () => {
                              onChangeUser(callHep)
                              setAtention(true)
                            } }
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
          { /* <ModalNotification */ }
          { /*  isVisible={ atention } */ }
          { /*  hideAction={ () => setAtention(false) } */ }
          { /*  user={ user } */ }
          { /* /> */ }
          {/*<ModalNotification*/}
          {/*  isVisible={ atention }*/}
          {/*  hideAction={ () => setAtention(false)}*/}
          {/*  user={ user }*/}
          {/*/>*/}
          <ModalEmergency
            isVisible={ modal }
            hideAction={ () => setModal(false)}
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
  containNotifications: {
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
  emergencyUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A413D'
  },
  emergencyTime: {
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
