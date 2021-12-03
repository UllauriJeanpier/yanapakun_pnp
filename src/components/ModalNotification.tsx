import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Close from '../assets/svg/Closegreen.svg'
import Ready from '../assets/svg/checkCircle.svg'
import Reject from '../assets/svg/notDisturbon.svg'
import { TextInput } from 'react-native-gesture-handler'
import { CallHelp } from '../interfaces/callHelp'

interface Props {
  isVisible: boolean
  hideAction: () => void
  user: CallHelp
}

const ModalNotification = ({
  isVisible = false,
  hideAction,
  user
}: Props) => {
  const [textDescription, setTextDescription] = useState('')

  const getHour = ( createdAt: string ) => {
    return  createdAt.substring(11,16)
  }
  const getDay = (createdAt: string ) => {
    return  parseInt(createdAt.substring(8,10))
  }
  const date = new Date().getDate()

  return (
    <Modal transparent={ true } visible={ isVisible }>
      <View style={ styles.containerFondo }>
        <View style={ styles.containerModal }>
          <TouchableOpacity
            style={ styles.iconClose }
            onPress={ hideAction }>
            <Close width={ 20 } height={ 20 }/>
          </TouchableOpacity>
          <View style={ styles.dataShow }>
            <Text style={ styles.userName }>{ `${user.user.profile.firstName} ${user.user.profile.lastName}` }</Text>
            <Text style={ styles.time }>{ (getDay(user.createdAt) > date) ? 'Ayer' :'Hoy' } { getHour(user.createdAt) }</Text>
            {
              !user.isActive
                ? <View style={ styles.atentionContainer }>
                  <Ready width={ 40 } height={ 40 }/>
                  <Text style={ styles.textGreen }>Atendida</Text>
                </View>
                : <View style={ styles.atentionContainer }>
                  <Reject width={ 40 } height={ 40 }/>
                  <Text style={ styles.textRed }>Sin respuesta</Text>
                </View>
            }
          </View>
          <View>
            <Text style={ styles.txtDescription }>Descripción de la emergencia:</Text>
            <TextInput
              editable
              maxLength={ 400 }
              multiline
              numberOfLines={ 6 }
              onChangeText={ text => setTextDescription(text) }
              value={ textDescription }
              style={ styles.inputDescription }
            />
            <TouchableOpacity style={ styles.btnAdd }>
              <Text style={ styles.txtAdd }>Añadir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalNotification

const styles = StyleSheet.create({
  containerFondo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa'
  },
  containerModal: {
    padding: 20,
    //   height: '50%',
    width: '85%',
    backgroundColor: '#FFFCF7',
    borderRadius: 20
  },
  iconClose: {
    position: 'absolute',
    padding: 12,
    top: 0,
    right: 0
  },
  userName: {
    color: '#3A413D',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 17,
    marginTop: 6
  },
  time: {
    color: '#3A413D',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 3,
    marginBottom: 20
  },
  dataShow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  atentionContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textGreen: {
    color: '#216D3F',
    marginTop: 7,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
    marginBottom: 40
  },
  textRed: {
    color: '#A41C1C',
    marginTop: 7,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
    marginBottom: 40
  },
  txtDescription: {
    color: '#3A413D',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    marginBottom: 6
  },
  inputDescription: {
    height: 130,
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    marginBottom: 15,
    padding: 8
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#216D3F',
    borderRadius: 24
  },
  txtAdd: {
    color: '#FFFCF7',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 15
  }
})
