import React, { useState, useEffect }  from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { SignUpScreenProps } from '../../utils/types'
import Header from '../../components/Header'
import {
  handleName,
  handleAge,
  handleCPI,
  handleDNI,
  handleDistrit,
  handleUnitPolice,
  handleEmail,
  handlePassword
} from '../../utils/validateFuntions'
import InputForm from '../../components/InputForm'
import { COLORS, FONTS } from '../../utils/constants'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { userSignUp } from '../../services/yanapakun/sigup'

interface Props extends SignUpScreenProps{}

const SignUpScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true)
  const [names, setNames] = useState('')
  const [validateName, setValidateName] = useState(false)
  const [surnames, setSurnames] = useState('')
  const [validateSurname, setValidateSurname] = useState(false)
  const [age, setAge] = useState('')
  const [CPI, setCPI] = useState('')
  const [validateCPI, setValidateCPI] = useState(false)
  const [validateAge, setValidateAge] = useState(false)
  const [DNI, setDNI] = useState('')
  const [validateDNI, setValidateDNI] = useState(false)
  const [district, setDistrict] = useState('')
  const [validateDistrict, setValidateDistrict] = useState(false)
  const [unitPolice, setUnitPolice] = useState('')
  const [validateUnitPolice, setValidateUnitPolice] = useState(false)
  const [email, setEmail] = useState('')
  const [validateEmail, setValidateEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const goToSignIn = () => navigation.navigate('SignInScreen')

  const registro = async () => {
    if (names.length === 0 || surnames.length === 0 || age.length === 0 || DNI.length === 0 || CPI.length === 0 || district.length ===0 || unitPolice.length === 0 ||email.length === 0 || password.length === 0 || confirmPassword !== password || confirmPassword.length === 0  || !isChecked) {
      Alert.alert('Rellene los campos correctamente')
      return
    }
    try {
      setLoading(true)
      await userSignUp({
        numberCIP: CPI,
        email,
        password,
        roles: ['admin'],
        isActive: true,
        firstName: names,
        lastName: surnames,
        age: parseInt(age),
        phone: '',
        emergencyNumber: '',
        document: DNI,
        district,
        gender: '',
        dateBirth: new Date(),
        latitude: '',
        longitude: ''
      })
      setLoading(true)
      goToSignIn()
    } catch (err) {
      console.log(err);
      setLoading(false)
    } 
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Loading loading={ loading } >
      <ScrollView>
      <Header title="Regístrate" navigation={navigation}/>
      <View style={ styles.container }>
        <InputForm
          label={ 'Nombres:' }
          placeholder={ 'Nombres' }
          valueInput={ names }
          setValueInput={ setNames }
          validateInput={ validateName }
          setValidateInput={ setValidateName }
          functionValidation={ handleName }
          errorMessage={ 'Escribe un nombre válido' }
        />
        <InputForm
          label={ 'Apellidos:' }
          placeholder={ 'Apellidos' }
          valueInput={ surnames }
          setValueInput={ setSurnames }
          validateInput={ validateSurname }
          setValidateInput={ setValidateSurname }
          functionValidation={ handleName }
          errorMessage={ 'Escribe un apellido válido' }
        />
        <InputForm
          label={ 'Edad:' }
          placeholder={ 'Edad' }
          valueInput={ age }
          setValueInput={ setAge }
          validateInput={ validateAge }
          keyboardType= 'numeric'
          setValidateInput={ setValidateAge }
          functionValidation={ handleAge }
          errorMessage={ 'Escribe una edad válida' }
        />
        <InputForm
          label={ 'Número de DNI:' }
          placeholder={ 'DNI' }
          valueInput={ DNI }
          setValueInput={ setDNI }
          validateInput={ validateDNI }
          setValidateInput={ setValidateDNI }
          functionValidation={ handleDNI }
          keyboardType="numeric"
          errorMessage={ 'Escribe un DNI válido' }
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

        <InputForm
          label={ 'Distrito:' }
          placeholder={ 'Distrito' }
          valueInput={ district }
          setValueInput={ setDistrict }
          validateInput={ validateDistrict }
          setValidateInput={ setValidateDistrict }
          functionValidation={ handleDistrit }
          errorMessage={ 'Escribe un distrito válido' }
        />

        <InputForm
          label={ 'Unidad policial:' }
          placeholder={ 'Unidad policial' }
          valueInput={ unitPolice }
          setValueInput={ setUnitPolice}
          validateInput={ validateUnitPolice }
          setValidateInput={ setValidateUnitPolice }
          functionValidation={ handleUnitPolice }
          errorMessage={ 'Escribe una unidad policial válida' }
        />

        <InputForm
          label={ 'Correo electrónico:' }
          placeholder={ 'Correo' }
          valueInput={ email }
          setValueInput={ setEmail }
          validateInput={ validateEmail }
          setValidateInput={ setValidateEmail }
          functionValidation={ handleEmail }
          errorMessage={ 'Escribe un correo válido' }
        />

        <InputForm
          label={ 'Contraseña:' }
          placeholder={ 'Contraseña' }
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
          placeholder={ 'Confirmar contraseña' }
          valueInput={ confirmPassword }
          setValueInput={ setConfirmPassword }
          validateInput={ validateConfirmPassword }
          setValidateInput={ setValidateConfirmPassword }
          functionValidation={ handlePassword }
          // errorMessage={ 'Escribe una contraseña válida' }
          isPassword
        />
        {
          password !== confirmPassword
            ? (
              <Text style={ styles.errorMsg }>Las contraseñas no coinciden</Text>
              )
            : null
        }
        <View style={ styles.checkSection }>
          <Checkbox
            style={ styles.checkbox }
            value={ isChecked }
            onValueChange={ setIsChecked }
            color={ COLORS.PRIMARY }
          />
          <Text style={ styles.paragraph }>Acepto términos, condiciones y politicas</Text>
        </View>
        <Button title='Regístrate' action={ registro } />
        <Text style={ styles.txtInf }>¿Ya estás registrado?{ ' ' }
          <Text style={ styles.boldTxtInfo } onPress={ goToSignIn } >
            Iniciar Sesión
          </Text>
        </Text>
      </View>
    </ScrollView>
  
    </Loading>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  checkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  paragraph: {
    fontSize: 13,
    color: COLORS.PRIMARY,
    textAlign: 'justify'
  },
  checkbox: {},
  txtInf: {
    marginVertical: 15,
    color: COLORS.PRIMARY,
    fontSize: 15,
    textAlign: 'center'
  },
  boldTxtInfo: {
    fontWeight: 'bold'
  },
  errorMsg: {
    margin: 5,
    fontSize: 15,
    fontFamily: FONTS.ProximaNovaRegular,
    color: 'red'
  }
})
