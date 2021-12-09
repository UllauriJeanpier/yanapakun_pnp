import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from '../screens/Auth/SignInScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'
import IndexScreen from '../screens/Auth/IndexScreen'

import DrawerNavigator from './DrawerNavigator'
import { RootStackParams } from '../utils/types'
import { AuthContext } from '../context/authContext'

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
        </>)
        : (<>
          <Stack.Screen name="DrawerNavigator" component={ DrawerNavigator }/>
        </>) }
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
