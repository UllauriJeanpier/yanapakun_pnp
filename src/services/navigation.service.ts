import * as React from 'react'
import { StackActions } from '@react-navigation/native'

export const navigationRef = React.createRef()

export function navigate (name) {
  navigationRef.current?.navigate(name)
}

export function replace (name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params))
}

export function push (...args) {
  navigationRef.current?.dispatch(StackActions.push(...args))
}

export function pop (...args) {
  navigationRef.current?.dispatch(StackActions.pop(...args))
}

export function popToTop () {
  navigationRef.current?.dispatch(StackActions.popToTop())
}

export function goBack () {
  navigationRef.current?.goBack()
}
