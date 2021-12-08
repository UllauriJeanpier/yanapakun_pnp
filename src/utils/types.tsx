import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { CallHelp } from '../interfaces/callHelp'
import { Profile } from '../interfaces/user.interface'
import { LocationUserScreen } from '../screens/Home/LocationUserScreen'

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
  LocationUserScreen: {
    call: CallHelp
  }
  ProfileUser: {
    profile: Profile
  }
}

// ScreenProps Stack Screens

export type SignInScreenProps = NativeStackScreenProps<RootStackParams, 'SignInScreen'>
export type SignUpScreenProps = NativeStackScreenProps<RootStackParams, 'SignUpScreen'>
export type IndexScreen = NativeStackScreenProps<RootStackParams, 'IndexScreen'>

// ScreenProps Drawer Screens

export type HomeScreenProps = DrawerScreenProps<RootDrawerParams, 'HomeScreen'>
export type ProfileScreenProps = DrawerScreenProps<RootDrawerParams, 'ProfileScreen'>
export type HistoryScreenProps = DrawerScreenProps<RootDrawerParams, 'HistoryScreen'>
export type LocationUserScreenProps = DrawerScreenProps<RootDrawerParams, 'LocationUserScreen'>
export type ProfileUserScrenProps = DrawerScreenProps<RootDrawerParams, 'ProfileUser'>

// Navigation Prop

export type NavigationSignInProp = NativeStackNavigationProp<RootStackParams, 'SignInScreen'>
export type NavigationSignUpProp = NativeStackNavigationProp<RootStackParams, 'SignUpScreen'>
export type NavigationHomeProp = DrawerNavigationProp<RootDrawerParams, 'HomeScreen'>
export type NavigationProfileProp = DrawerNavigationProp<RootDrawerParams, 'ProfileScreen'>
export type NavigationProfileUserProp = DrawerNavigationProp<RootDrawerParams, 'ProfileUser'>
export type NavigationHistoryProp = DrawerNavigationProp<RootDrawerParams, 'HistoryScreen'>
export type NavigationLocationUserProp = DrawerNavigationProp<RootDrawerParams, 'LocationUserScreen'>

export type NavigationStackProp = NavigationSignInProp | NavigationSignUpProp
export type NavigationDrawerProp = NavigationHomeProp | NavigationProfileProp | NavigationHistoryProp | NavigationLocationUserProp | NavigationProfileUserProp
export type NavigationScreenProp = NavigationStackProp | NavigationDrawerProp

// type predicates verification

export function isNavigatioonDrawerProp (navigation: NavigationScreenProp): navigation is NavigationDrawerProp {
  return (navigation as NavigationDrawerProp).toggleDrawer !== undefined
}
