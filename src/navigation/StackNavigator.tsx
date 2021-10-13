import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/Auth/SignInScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import DrawerNavigator from './DrawerNavigator'
import { RootStackParams } from '../utils/types'

const Stack = createNativeStackNavigator<RootStackParams>()

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ 'DrawerNavigator' } screenOptions={ { headerShown: false } }>
      <Stack.Screen name="SignInScreen" component={ SignInScreen } />
      <Stack.Screen name="SignUpScreen" component={ SignUpScreen } />
      <Stack.Screen name="DrawerNavigator" component={ DrawerNavigator } />
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
