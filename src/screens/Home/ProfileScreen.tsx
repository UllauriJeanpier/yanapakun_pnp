import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/Header'
import { ProfileScreenProps, RootDrawerParams } from '../../utils/types'

interface Props extends ProfileScreenProps{}

const ProfileScreen = ({ navigation }: Props) => {
  return (
    <>
      <Header title='Yanapakun Policía H.' navigation={ navigation } />
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
