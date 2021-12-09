import Api, { baseURL } from './api'

export const userLogin = async (payload: any) => {
  return await fetch(`${baseURL}/auth/log-in/police`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async response => await response.json())
  /* return await Api.post('/auth/log-in/police', JSON.stringify(payload)) */
}

export const refreshToken = async () => {
  return await Api.get('/auth/token')
}
