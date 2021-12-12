import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import InputForm from '../../components/InputForm'
import { COLORS } from '../../utils/constants'
import { RootStackParams, SignInScreenProps } from '../../utils/types'
import { handleCPI, handleEmail, handlePassword } from '../../utils/validateFuntions'
import { AuthContext } from '../../context/authContext'
import Loading from '../../components/Loading'

interface Props extends NativeStackScreenProps<RootStackParams, 'SignInScreen'> {
}

const SignInScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [validateEmail, setValidateEmail] = useState(false)
  const [CPI, setCPI] = useState('')
  const [validateCPI, setValidateCPI] = useState(false)
  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)

  const { signIn, authState } = useContext(AuthContext)

  const goToSignUp = () => navigation.navigate('SignUpScreen')

  const goToIndex = () => navigation.navigate('IndexScreen')

  const login = async () => {
    if (CPI.length === 0 || password.length === 0) {
      Alert.alert('Complete todos los campos')
      return
    }
    try {
      setLoading(true)
      signIn({
        cid: CPI,
        password
      })
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Loading loading={ loading }>
      <ScrollView>
        <Header title="Iniciar sesión" navigation={ navigation }/>
        <View style={ styles.container }>
          <View style={ styles.inputsContainer }>
            <InputForm
              label={ 'CPI:' }
              placeholder={ 'Escriba su CPI' }
              valueInput={ CPI }
              setValueInput={ setCPI }
              validateInput={ validateCPI }
              setValidateInput={ setValidateCPI }
              functionValidation={ handleCPI }
              errorMessage={ 'Escribe CPI válido' }
            />
            <InputForm
              label={ 'Contraseña:' }
              placeholder={ 'Escriba su contraseña' }
              valueInput={ password }
              setValueInput={ setPassword }
              validateInput={ validatePassword }
              setValidateInput={ setValidatePassword }
              functionValidation={ handlePassword }
              errorMessage={ 'Escribe una contraseña válida' }
              isPassword
            />
          </View>
          <View style={ styles.sesionContainer }>
            <Text style={ styles.txtInf }>Olvidaste tu contraseña</Text>
            <Button title={ 'Iniciar sesión' } action={ login }/>
            <Text style={ styles.txtInf }>¿No estás registrado?{ ' ' }
              <Text style={ styles.boldTxtInfo } onPress={ goToSignUp }>
                Regístrate
              </Text>
            </Text>
          </View>

        </View>
      </ScrollView>
    </Loading>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 75,
    justifyContent: 'space-evenly'
  },
  inputsContainer: {
    height: '50%',
    justifyContent: 'center'
  },
  sesionContainer: {
    height: '50%'
  },
  txtInf: {
    marginVertical: 15,
    color: COLORS.PRIMARY,
    fontSize: 15,
    textAlign: 'center'
  },
  boldTxtInfo: {
    fontWeight: 'bold'
  }
})
