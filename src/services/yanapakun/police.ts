import Api from './api'

export const updatePoliceData = async (policeId: number, payload: any) => {
  return await Api.patch(`/police/${policeId}`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
