import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SignUpScreenProps } from '../../utils/types'

interface Props extends SignUpScreenProps{}

const SignUpScreen = () => {
  return (
    <View>
      <Text> SignUpScreen test</Text>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({})
