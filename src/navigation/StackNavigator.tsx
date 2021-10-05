import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/Auth/SignInScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'

export type RootStackParams = {
  SignUpScreen: undefined
  SignInScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParams>()

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ 'SignInScreen' } screenOptions={ { headerShown: false } }>
      <Stack.Screen name="SignInScreen" component={ SignInScreen } />
      <Stack.Screen name="SignUpScreen" component={ SignUpScreen } />
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
