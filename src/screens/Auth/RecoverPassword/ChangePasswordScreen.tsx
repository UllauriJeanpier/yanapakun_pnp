import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../../../components/Button'
import CustomHeader from '../../../components/CustomHeader'
import InputForm from '../../../components/InputForm'
import Loading from '../../../components/Loading'
import { changePassword } from '../../../services/yanapakun/user'
import { FONTS } from '../../../utils/constants'
import { RESPONSE_MSG } from '../../../utils/responseTexts'
import { RootStackParams } from '../../../utils/types'
import { handlePassword } from '../../../utils/validateFuntions'

interface Props extends NativeStackScreenProps<RootStackParams, 'ChangePasswordScreen'> { }

const ChangePasswordScreen = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false)

  const goToSignIn = () => navigation.replace('SignInScreen')

  const onSend = async () => {
    const { email } = route.params
    if (password.length === 0 || confirmPassword.length === 0) {
      Alert.alert('Complete los campos para continuar')
      return
    }
    if (password !== confirmPassword) {
      return
    }
    try {
      setLoading(true)
      const response = await changePassword({ email, password })
      console.log(response)
      if (response.message === RESPONSE_MSG.CHANGEPASSWORDWRONGEMAIL) {
        Alert.alert('No existe este email registrado')
      } else {
        goToSignIn()
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <Loading loading={ loading }>
      <ScrollView>
        <CustomHeader title="Regístrate" icon="keyboard-arrow-left" action={ () => navigation.navigate('IndexScreen') } />
        <View style={ styles.container }>
          <Text style={ styles.txtSubtitle }>Ingresa tu nueva contraseña</Text>
          <InputForm
            label={ 'Nueva Contraseña:' }
            placeholder={ '' }
            valueInput={ password }
            setValueInput={ setPassword }
            validateInput={ validatePassword }
            setValidateInput={ setValidatePassword }
            functionValidation={ handlePassword }
            errorMessage={ 'Escribe una contraseña válida' }
            isPassword
          />
          <InputForm
            label={ 'Confirmar contraseña:' }
            placeholder={ '' }
            valueInput={ confirmPassword }
            setValueInput={ setConfirmPassword }
            validateInput={ validateConfirmPassword }
            setValidateInput={ setValidateConfirmPassword }
            functionValidation={ handlePassword }
            // errorMessage={'Escribe una contraseña válida' }
            isPassword
          />
          {
            password !== confirmPassword
              ? (
                <Text style={ styles.errorMsg }>Las contraseñas no coinciden</Text>
                )
              : null
          }
          <Button title={ 'Enviar' } action={ onSend } />

        </View>
      </ScrollView>
    </Loading>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 100,
    justifyContent: 'space-evenly'
  },
  txtSubtitle: {
    fontFamily: FONTS.ProximaNovaBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  errorMsg: {
    marginTop: -12,
    fontSize: 15,
    fontFamily: FONTS.ProximaNovaRegular,
    color: 'red'
  }
})
