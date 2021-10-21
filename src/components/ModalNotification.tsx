import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Close from '../assets/svg/Closegreen.svg'
import Ready from '../assets/svg/checkCircle.svg'
import Reject from '../assets/svg/notDisturbon.svg'

interface Props {
    isVisible: boolean,
    hideAction: () => void,
    user: User
}

interface User {
  userName: string,
  time: string,
  id?: number,
  atention: boolean
}

const ModalNotification = ({ isVisible=false, hideAction, user}: Props) => {
    return (
        <Modal transparent={ true } visible={ isVisible }>
            <View style={ styles.containerFondo }>
                <View style={ styles.containerModal }>
                    <TouchableOpacity
                        style={ styles.iconClose }
                        onPress={ hideAction }>
                        <Close width={ 20 } height={ 20 } />
                    </TouchableOpacity>
                    <View style={ styles.dataShow }>
                        <Text>{user.userName}</Text>
                        <Text>Hoy {user.time}</Text>
                        {
                            user.atention === true
                            ?
                            <View>
                                <Ready width={ 40 } height={ 40 } />
                                <Text>Atendida</Text>
                            </View>
                            :
                            <View>
                                <Reject width={ 40 } height={ 40 }/>
                                <Text>Sin respuesta</Text>
                            </View>
                        }
                    </View>
                    <View>
                        <Text>Descripcion de la emergencia:</Text>
                        <TouchableOpacity>
                            <Text>Añadir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalNotification;

const styles = StyleSheet.create({
    containerFondo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000aa'
    },
    containerModal: {
      padding: 15,
      height: '40%',
      width: '85%',
      justifyContent: 'space-evenly',
      backgroundColor: 'white',
      borderRadius: 20
    },
    iconClose: {
      position: 'absolute',
      padding: 12,
      top: 0,
      right: 0
    },
    dataShow: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'        
    }
  })