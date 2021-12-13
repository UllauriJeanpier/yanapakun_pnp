import Api, { baseURL } from './api'
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

// Recover Password

export const sendMail = async (payload: any) =>
  await fetch(`${baseURL}/users/sendEmail`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async response => await response.json())

export const sendCode = async (payload: any) =>
  await fetch(`${baseURL}/users/verifyCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async response => await response.json())

export const changePassword = async (payload: any) =>
  await fetch(`${baseURL}/users/resetPassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async response => await response.json())
