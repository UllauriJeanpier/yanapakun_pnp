/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentComponentProps
} from '@react-navigation/drawer'
import HomeScreen from '../screens/Home/HomeScreen'

import ProfileScreen from '../screens/Home/ProfileScreen'
import HistoryScreen from '../screens/Home/HistoryScreen'
import DrawerLogo from '../assets/svg/PoliciaLogoHorizontal.svg'
import { COLORS, FONTS } from '../utils/constants'
import { RootDrawerParams } from '../utils/types'
import { AuthContext } from '../context/authContext'
import { LocationUserScreen } from '../screens/Home/LocationUserScreen'
import ProfileUser from '../screens/Home/ProfileUser'

const Drawer = createDrawerNavigator<RootDrawerParams>()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ 'HomeScreen' }
      screenOptions={ { headerShown: false } }
      drawerContent={ props => <CustomDrawer { ...props } /> }>
      <Drawer.Screen name="HomeScreen" component={ HomeScreen }/>
      <Drawer.Screen name="ProfileScreen" component={ ProfileScreen }/>
      <Drawer.Screen name="HistoryScreen" component={ HistoryScreen }/>
      <Drawer.Screen name="LocationUserScreen" component={ LocationUserScreen }/>
      <Drawer.Screen name="ProfileUser" component={ ProfileUser }/>
    </Drawer.Navigator>
  )
}

const CustomDrawer = ({ navigation }: DrawerContentComponentProps) => {
  const { logOut } = useContext(AuthContext)

  const logout = () => {
    logOut()
  }
  return (

    <View style={ styles.container }>
      <View style={ styles.iconContainer }>
        <DrawerLogo width={ '80%' } height={ '100%' }/>
      </View>
      { /* Opciones  */ }
      <View style={ styles.optionsContainer }>
        <View>
          <BtnOption
            title={ 'Inicio' }
            action={ () => navigation.navigate('HomeScreen') }/>
          <BtnOption
            title={ 'Perfil' }
            action={ () => navigation.navigate('ProfileScreen') }/>
          <BtnOption
            title={ 'Historial de emergencias' }
            action={ () => navigation.navigate('HistoryScreen') }/>
        </View>
        <BtnOption
          title={ 'Cerrar sesión' }
          isLogoutOption
          action={ logout }/>
      </View>
    </View>
  )
}

/*****************************************/

// Button Option

interface BtnOptionsProps {
  title: string
  isLogoutOption?: boolean
  action?: () => void
}

const BtnOption = ({
  title,
  isLogoutOption,
  action
}: BtnOptionsProps) => {
  return (
    <TouchableOpacity
      style={
        [styles.btnOption, !isLogoutOption && styles.btnCommonOption] }
      onPress={ action }
    >
      <Text style={ {
        ...styles.textBtn,
        textDecorationLine: isLogoutOption ? 'underline' : 'none'
      } }>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

/*****************************************/

export default DrawerNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  iconContainer: {
    width: '100%',
    height: 100,
    marginTop: 20
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  btnOption: {
    marginVertical: 10,
    paddingVertical: 4
  },
  btnCommonOption: {
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.PRIMARY
  },
  textBtn: {
    fontFamily: FONTS.ProximaNovaBold,
    color: COLORS.TEXT_COLOR
  }
})
