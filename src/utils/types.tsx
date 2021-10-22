import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

// Main Stack Screens params

export type RootStackParams = {
  IndexScreen: undefined
  SignUpScreen: undefined
  SignInScreen: undefined
  DrawerNavigator: undefined
}

// Drawer Screens params

export type RootDrawerParams = {
  HomeScreen: undefined
  ProfileScreen: undefined
  HistoryScreen: undefined
}

// SreenProps Stack Screens

export type SignInScreenProps = NativeStackScreenProps<RootStackParams, 'SignInScreen'>
export type SignUpScreenProps = NativeStackScreenProps<RootStackParams, 'SignUpScreen'>
export type IndexScreen = NativeStackScreenProps<RootStackParams, 'IndexScreen'>

// SreenProps Drawer Screens

export type HomeScreenProps = DrawerScreenProps<RootDrawerParams, 'HomeScreen'>
export type ProfileScreenProps = DrawerScreenProps<RootDrawerParams, 'ProfileScreen'>
export type HistoryScreenProps = DrawerScreenProps<RootDrawerParams, 'HistoryScreen'>

// Navigation Prop

export type NavigationSignInProp = NativeStackNavigationProp<RootStackParams, 'SignInScreen'>
export type NavigationSignUpProp = NativeStackNavigationProp<RootStackParams, 'SignUpScreen'>
export type NavigationHomeProp = DrawerNavigationProp<RootDrawerParams, 'HomeScreen'>
export type NavigationProfileProp = DrawerNavigationProp<RootDrawerParams, 'ProfileScreen'>
export type NavigationHistoryProp = DrawerNavigationProp<RootDrawerParams, 'HistoryScreen'>

export type NavigationStackProp = NavigationSignInProp | NavigationSignUpProp
export type NavigationDrawerProp = NavigationHomeProp | NavigationProfileProp | NavigationHistoryProp
export type NavigationScreenProp = NavigationStackProp | NavigationDrawerProp

// type predicates verification

export function isNavigatioonDrawerProp (navigation: NavigationScreenProp): navigation is NavigationDrawerProp {
  return (navigation as NavigationDrawerProp).toggleDrawer !== undefined
}
