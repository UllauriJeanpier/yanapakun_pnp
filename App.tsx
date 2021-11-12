import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Notifications from 'expo-notifications'
import { useFonts } from 'expo-font'
import StackNavigator from './src/navigation/StackNavigator'
import { COLORS, FONTS_TO_LOAD } from './src/utils/constants'
import useNotifications from './src/hooks/useNotifications'
import { AuthProvider } from './src/context/authContext'

// Function that decides whether the notification is displayed or not

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export default function App () {
  const [loaded] = useFonts(FONTS_TO_LOAD)

  // Push Notifications config hook
  useNotifications()

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppState>
          <StatusBar backgroundColor={ COLORS.SECONDARY }/>
          <StackNavigator />
        </AppState>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}

const styles = StyleSheet.create({

})
