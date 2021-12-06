import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS } from '../utils/constants'
import MenuIcon from '../assets/svg/menu_black.svg'
import ChevronLeft from '../assets/svg/chevron_left.svg'
import { isNavigatioonDrawerProp, NavigationScreenProp } from '../utils/types'

interface Props {
  title: string
  hasDrawer?: boolean
  navigation: NavigationScreenProp
}

const Header = ({ title, hasDrawer, navigation }: Props) => {
  return (
    <View style={ styles.container }>
      <TouchableOpacity
        style={ styles.iconContainer }
        onPress={
         () => {
           hasDrawer && isNavigatioonDrawerProp(navigation)
             ? navigation.toggleDrawer()
             : navigation.goBack()
         } }
         >
        { hasDrawer
          ? (<MenuIcon width={ 20 } height={ 20 } />)
          : (<ChevronLeft width={ 20 } height={ 20 } />) }
      </TouchableOpacity>
      <Text style={ styles.title }>{ title }</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute',
    top: 22,
    left: 25
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONTS.ProximaNovaBold
  }
})
