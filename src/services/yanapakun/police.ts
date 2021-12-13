import Api, { baseURL } from './api'

export const getPoliceByCIP = async (numberCIP: string) =>
  await fetch(`${baseURL}/police/${numberCIP}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async response => await response.json())

export const updatePoliceData = async (policeId: number, payload: any) => {
  return await Api.patch(`/police/${policeId}`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
