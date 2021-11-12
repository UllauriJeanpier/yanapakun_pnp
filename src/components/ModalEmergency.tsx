import React from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Alert from '../assets/svg/Alarma2.svg'
import { FONTS } from '../utils/constants';

interface Props {
    isVisible: boolean
    hideAction: () => void
}

export const ModalEmergency = ({ isVisible, hideAction }: Props) => {
    return (
        <Modal transparent={ true } visible={ isVisible }>
            <View style={ styles.containerFondo }>
                <View style={ styles.containerModal }>
                    <Alert style={{marginTop: 40}}/>
                    <Text style={ styles.text }>Marisol Ochoa tiene una emergencia y solicita tu ayuda</Text>
                    <TouchableOpacity style={ styles.btn } onPress={ hideAction }>
                        <Text style={ styles.btnText }>Visualizar ubicación</Text>
                    </TouchableOpacity>
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
    text: {
      color: '#3A413D',
      fontSize: 18,
      fontFamily: FONTS.ProximaNovaBold ,
      textAlign: 'center',
      marginVertical: 30
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#216D3F',
        borderRadius: 25,
        width: '100%',
        marginBottom: 15
    },
    btnText: {
        fontSize: 16,
        color: '#FFFCF7',
        fontFamily: FONTS.ProximaNovaBold ,
    }
  })
