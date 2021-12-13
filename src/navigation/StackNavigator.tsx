import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from '../screens/Auth/SignInScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'
import IndexScreen from '../screens/Auth/IndexScreen'

import DrawerNavigator from './DrawerNavigator'
import { RootStackParams } from '../utils/types'
import { AuthContext } from '../context/authContext'
import SendEmailScreen from '../screens/Auth/RecoverPassword/SendEmailScreen'
import SendCodeScreen from '../screens/Auth/RecoverPassword/SendCodeScreen'
import ChangePasswordScreen from '../screens/Auth/RecoverPassword/ChangePasswordScreen'

const Stack = createNativeStackNavigator<RootStackParams>()

const StackNavigator = () => {
  const { authState } = useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={ { headerShown: false } }>
      { !authState.isLogIn && !authState.token
        ? (<>
          <Stack.Screen name="IndexScreen" component={ IndexScreen }/>
          <Stack.Screen name="SignInScreen" component={ SignInScreen }/>
          <Stack.Screen name="SignUpScreen" component={ SignUpScreen }/>
          <Stack.Screen name="SendEmailScreen" component={ SendEmailScreen }/>
          <Stack.Screen name="SendCodeScreen" component={ SendCodeScreen }/>
          <Stack.Screen name="ChangePasswordScreen" component={ ChangePasswordScreen }/>
        </>)
        : (<>
          <Stack.Screen name="DrawerNavigator" component={ DrawerNavigator }/>
        </>) }
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
