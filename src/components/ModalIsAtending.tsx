import React from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FONTS } from '../utils/constants';
import Alert from '../assets/svg/Alarma.svg'
import Close from '../assets/svg/Closegreen.svg'

interface Props {
    isVisible: boolean
    hideAction: () => void
}

export const ModalIsBeingAttended = ({ isVisible, hideAction }: Props) => {
    return (
        <Modal transparent={ true } visible={ isVisible }>
            <View style={ styles.containerFondo }>
                <View style={ styles.containerModal }>
                <TouchableOpacity
                    style={ styles.iconClose }
                    onPress={ hideAction }
                >
                    <Close width={ 20 } height={ 20 } />
                </TouchableOpacity>
                <View style={ styles.dataShow }>
                    <Alert style={{marginTop: 40}}/>
                    <Text style={ styles.text }>Esta emergencia ya está siendo atendida por otra autoridad.</Text>
                </View>    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    containerFondo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000aa'
    },
    containerModal: {
      padding: 15,
      width: '85%',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFFCF7',
      borderRadius: 20
    },
    dataShow: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'        
      },
    text: {
      color: '#3A413D',
      fontSize: 18,
      fontFamily: FONTS.ProximaNovaBold ,
      textAlign: 'center',
      marginVertical: 30
    },
    iconClose: {
        position: 'absolute',
        padding: 12,
        top: 0,
        right: 0
    },
    btnText: {
        fontSize: 16,
        color: '#FFFCF7',
        fontFamily: FONTS.ProximaNovaBold ,
    }
  })