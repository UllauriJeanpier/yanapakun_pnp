import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LogoPolicia from '../../assets/svg/LogoPolicia.svg'
import Policia from '../../assets/svg/PoliciaLogoVertical.svg'
import { COLORS, FONTS } from '../../utils/constants'
import Button from '../../components/Button'
import { RootStackParams } from '../../utils/types'

interface Props extends NativeStackScreenProps<RootStackParams, 'IndexScreen'> {}

const IndexScreen = ({ navigation }: Props) => {
  const goToSignIn = () => {
    navigation.navigate('SignInScreen')
  }

  const goToSignUp = () => {
    navigation.navigate('SignUpScreen')
  }

  return (
    <>
      <View style={ styles.container }>
        <Policia width={ 200 } height={ 200 }/>
        <View style={ styles.btnContainer }>
          <Button title={ 'Iniciar sesión' } action={ goToSignIn }/>
          <Button title={ 'Regístrate' } action={ goToSignUp }/>
        </View>
      </View>
      <View style={ styles.footerContainer }>
        <LogoPolicia width={ '35%' } height={ '100%' } />
        <View style={ styles.textContainer }>
          <Text style={ styles.textBoldFooter }>
            Policía Nacional del Perú
          </Text>
          <Text style={ styles.textBoldFooter }>
            al servicio de los ciudadanos
          </Text>
          <Text style={ styles.textFooter }>
            Comisaría de Huancavelica
          </Text>
        </View>
      </View>
    </>
  )
}

export default IndexScreen

const styles = StyleSheet.create({
  container: {
    flex: 5,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center'
  },
  footerContainer: {
    flex: 1,
    paddingHorizontal: 25,
    flexDirection: 'row',
    paddingVertical: 15
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textFooter: {
    fontFamily: FONTS.ProximaNovaBold,
    color: COLORS.PRIMARY
  },
  textBoldFooter: {
    fontFamily: FONTS.ProximaNovaRegular,
    color: COLORS.PRIMARY
  }
})
