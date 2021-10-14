import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SignInScreenProps } from '../../utils/types'

interface Props extends SignInScreenProps{}

const SignInScreen = () => {
  return (
    <View style={ styles.container }>
      <Text>SignInScreen Test</Text>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
