import Api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const updatePartialUser = async (id: number, payload: any) => {
  return await Api.patch(`/users/${id}`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getUsers = async () => {
  return await Api.get('/users')
}
