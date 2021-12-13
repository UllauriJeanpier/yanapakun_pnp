import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../../../components/Button'
import CustomHeader from '../../../components/CustomHeader'
import InputForm from '../../../components/InputForm'
import Loading from '../../../components/Loading'
import { IPolice, IPoliceRes } from '../../../interfaces/profile'
import { getPoliceByCIP } from '../../../services/yanapakun/police'

import { sendMail } from '../../../services/yanapakun/user'
import { FONTS } from '../../../utils/constants'
import { RootStackParams } from '../../../utils/types'
import { handleCPI, handleEmail } from '../../../utils/validateFuntions'

interface Props extends NativeStackScreenProps<RootStackParams, 'SendEmailScreen'> {
}

const SendEmailScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [validateEmail, setValidateEmail] = useState(false)
  const [CPI, setCPI] = useState('')
  const [validateCPI, setValidateCPI] = useState(false)

  const goToSignIn = () => navigation.replace('SignInScreen')

  const validatePoliceEmail = async (): Promise<boolean> => {
    if (CPI.length === 0) {
      Alert.alert('Ingrese su CIP para continuar')
      return false
    }
    const response: IPoliceRes = await getPoliceByCIP(CPI)
    const { data } = response
    if (!data) {
      Alert.alert('Este CIP no esta registrado')
      return false
    }
    if (!data.user) {
      Alert.alert('Este CIP no tiene usuario asignado')
      return false
    }
    if (email !== data.user.email) {
      Alert.alert('El email no corresponse a este CIP')
      return false
    }
    return true
  }

  const onSend = async () => {
    if (email.length === 0) {
      Alert.alert('Ingrese su contraseña para continuar')
      return
    }
    try {
      setLoading(true)
      const isValid = await validatePoliceEmail()
      if (!isValid) {
        setLoading(false)
        return
      } else {
        const response = await sendMail({ email })
        console.log(response)
        if (response.status) {
          navigation.navigate('SendCodeScreen', { email })
        } else {
          Alert.alert('No existe este email registrado')
        }
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Loading loading={ loading }>
      <ScrollView>
        <CustomHeader title="Recuperar Contraseña" icon="keyboard-arrow-left" action={ goToSignIn } />
        <View style={ styles.container }>
          <View style={ styles.inputsContainer }>
            <Text style={ styles.txtSubtitle }>Al ingresar tu CPI y tu correo electrónico se te enviará las indicaciones para recuperar tu contraseña</Text>
            <InputForm
              label={ 'Correo electrónico:' }
              placeholder={ 'Escriba su correo electrónico' }
              valueInput={ email }
              setValueInput={ setEmail }
              validateInput={ validateEmail }
              setValidateInput={ setValidateEmail }
              functionValidation={ handleEmail }
              errorMessage={ 'Escribe un correo válido' }
            />
            <InputForm
              label={ 'Número de CPI:' }
              placeholder={ 'CPI' }
              valueInput={ CPI }
              setValueInput={ setCPI }
              validateInput={ validateCPI }
              setValidateInput={ setValidateCPI }
              functionValidation={ handleCPI }
              keyboardType="numeric"
              errorMessage={ 'Escribe un CPI válido' }
            />
          </View>
          <Button title={ 'Enviar' } action={ onSend } />
        </View>
      </ScrollView>
    </Loading>
  )
}

export default SendEmailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 60,
    justifyContent: 'space-evenly'
  },
  inputsContainer: {
    justifyContent: 'center'
  },
  txtSubtitle: {
    fontFamily: FONTS.ProximaNovaBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  sessionContainer: {
  }
})
